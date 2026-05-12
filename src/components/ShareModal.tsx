"use client";

import { useState } from "react";
import { Download, Share2, X, Check, QrCode } from "lucide-react";

export function ShareModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const shareData = {
    title: "EasyChina Travel Itinerary",
    text: "Check out my personalized China travel itinerary!",
    url: pageUrl,
  };

  // Web Share API not supported in all browsers, but TS DOM types declare it as always-present
  const nav = typeof window !== "undefined" ? (navigator as { share?: typeof navigator.share }) : null;
  const supportsShare = !!nav?.share;

  const handleNativeShare = async () => {
    if (supportsShare) {
      try { await navigator.share(shareData); } catch {}
    } else {
      handleCopyLink();
    }
  };

  return (
    <>
      {/* Share & Download buttons */}
      <div className="flex gap-3">
        <button onClick={handleDownloadPDF} className="btn-primary flex-1 justify-center text-sm">
          <Download size={16} />
          Download PDF
        </button>
        <button onClick={() => setIsOpen(true)} className="btn-secondary flex-1 justify-center text-sm">
          <Share2 size={16} />
          Share
        </button>
      </div>

      {/* Share Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 p-4 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-sm animate-slide-up rounded-2xl border border-black/5 bg-paper p-6 shadow-elevated">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-medium">Share Itinerary</h2>
              <button onClick={() => setIsOpen(false)} className="p-1 text-stone/40 hover:text-stone">
                <X size={18} />
              </button>
            </div>

            {/* QR Code placeholder */}
            <div className="mb-5 flex flex-col items-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-xl border border-black/5 bg-white">
                <QrCode size={64} className="text-stone/30" />
              </div>
              <p className="mt-2 text-xs text-stone/50">Scan to view on your phone</p>
            </div>

            {/* Share options */}
            <div className="space-y-2">
              <button
                onClick={handleCopyLink}
                className="flex w-full items-center gap-3 rounded-xl border border-black/5 bg-white px-4 py-3 text-sm transition-all hover:border-black/10"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Share2 size={16} className="text-stone" />}
                <span>{copied ? "Link copied!" : "Copy link"}</span>
              </button>

              {supportsShare && (
                <button
                  onClick={handleNativeShare}
                  className="flex w-full items-center gap-3 rounded-xl bg-celadon px-4 py-3 text-sm font-medium text-paper transition-all hover:bg-celadon/90"
                >
                  <Share2 size={16} />
                  <span>Share via...</span>
                </button>
              )}

              <button
                onClick={handleDownloadPDF}
                className="flex w-full items-center gap-3 rounded-xl border border-black/5 bg-white px-4 py-3 text-sm transition-all hover:border-black/10"
              >
                <Download size={16} className="text-stone" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
