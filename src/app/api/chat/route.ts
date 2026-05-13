import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const allowed = await checkRateLimit(ip, "chat", 10, "1 m");
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests. Please wait and try again." }, { status: 429 });
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array required" }, { status: 400 });
    }

    const MAX_MSG_LENGTH = 2000;
    const VALID_ROLES = ["user", "assistant", "system"];
    for (const msg of messages) {
      if (!msg.role || !VALID_ROLES.includes(msg.role)) {
        return NextResponse.json({ error: "Invalid message role" }, { status: 400 });
      }
      if (typeof msg.content !== "string" || msg.content.length > MAX_MSG_LENGTH) {
        return NextResponse.json({ error: "Invalid message content" }, { status: 400 });
      }
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Service not configured" }, { status: 500 });
    }

    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a friendly China travel assistant named Panda. Answer questions about traveling in China. Be concise (2-4 sentences)." },
          ...messages.slice(-10),
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: "AI service error", detail: errText }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
