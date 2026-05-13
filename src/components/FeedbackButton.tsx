"use client";

import { useState } from "react";
import { MessageSquareText, X, Send, Sparkles } from "lucide-react";

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ type: "suggestion", message: "", email: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
      setTimeout(() => {
        setIsOpen(false);
        setSent(false);
        setForm({ type: "suggestion", message: "", email: "" });
        setError("");
      }, 2000);
    } catch {
      setError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      {/* 悬浮按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-celadon text-paper shadow-lg shadow-celadon/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-celadon/30"
        aria-label="Feedback"
      >
        <MessageSquareText size={20} />
      </button>

      {/* 反馈弹窗 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 p-4 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-md animate-slide-up rounded-2xl border border-black/5 bg-paper p-6 shadow-elevated">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-celadon" />
                <h2 className="font-medium">Share your thoughts</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 text-stone/40 hover:text-stone" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {sent ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-celadon/10">
                  <Send size={20} className="text-celadon" />
                </div>
                <p className="font-medium">Thank you! 🙏</p>
                <p className="mt-1 text-sm text-stone">We&apos;ll review your feedback and make EasyChina better.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-stone">Type</label>
                  <div className="flex gap-2">
                    {[
                      { value: "suggestion", label: "💡 Suggestion" },
                      { value: "bug", label: "🐛 Bug Report" },
                      { value: "feature", label: "🚀 Feature Request" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, type: opt.value }))}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                          form.type === opt.value
                            ? "border-celadon bg-celadon/10 text-celadon"
                            : "border-black/5 bg-white/40 text-stone hover:border-black/10"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-stone">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us what you'd like to see improved..."
                    required
                    rows={4}
                    className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm outline-none transition-colors focus:border-celadon focus:ring-1 focus:ring-celadon/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-stone">
                    Email <span className="text-stone/50">(optional, if you'd like a reply)</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-celadon focus:ring-1 focus:ring-celadon/20"
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!form.message}
                  className="btn-primary w-full justify-center text-sm disabled:pointer-events-none disabled:opacity-40"
                >
                  <Send size={16} />
                  Send Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
