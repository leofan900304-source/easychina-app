import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FEEDBACK_FILE = path.join(process.cwd(), "feedback-data.json");
const VALID_TYPES = ["suggestion", "bug", "feature"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, message, email } = body;

    // Validate type
    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${VALID_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate message
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // Read existing feedback
    let feedbackList: unknown[] = [];
    try {
      const raw = await fs.readFile(FEEDBACK_FILE, "utf-8");
      feedbackList = JSON.parse(raw);
      if (!Array.isArray(feedbackList)) feedbackList = [];
    } catch {
      // File doesn't exist yet, start fresh
      feedbackList = [];
    }

    // Append new feedback
    const entry = {
      type,
      message: message.trim(),
      email: email || null,
      createdAt: new Date().toISOString(),
    };
    feedbackList.push(entry);

    // Write back to file
    await fs.writeFile(FEEDBACK_FILE, JSON.stringify(feedbackList, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
