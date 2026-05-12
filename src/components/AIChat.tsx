"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your Panda travel assistant. Ask me anything about your China trip!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful China travel assistant. Answer questions about travel in China, recommend places, give tips. Be concise (2-3 sentences)." },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMsg },
          ],
        }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || data.content || "Sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm having trouble connecting. Please try again later or check the city guides for info." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-celadon text-2xl text-paper shadow-lg shadow-celadon/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        aria-label="AI Chat"
      >
        🐼
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-paper md:bottom-6 md:left-auto md:right-6 md:top-auto md:h-[500px] md:w-[380px] md:rounded-2xl md:border md:border-black/5 md:shadow-elevated">
          <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🐼</span>
              <span className="text-sm font-medium">Panda Travel Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 text-stone/40 hover:text-stone"><X size={18} /></button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-stone/10 text-xs">
                      {msg.role === "user" ? "👤" : "🐼"}
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-celadon text-paper" : "bg-white text-stone shadow-soft"}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <span className="text-xs">🐼</span>
                    <div className="rounded-2xl bg-white px-4 py-2.5 text-sm text-stone shadow-soft">
                      <span className="animate-pulse">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          <div className="border-t border-black/5 px-4 py-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about your trip..."
                className="flex-1 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-celadon"
              />
              <button onClick={handleSend} disabled={!input.trim() || loading} className="flex h-10 w-10 items-center justify-center rounded-xl bg-celadon text-paper disabled:opacity-40">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
