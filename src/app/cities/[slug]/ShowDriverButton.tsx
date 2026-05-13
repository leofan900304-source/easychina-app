"use client";

import { useState } from "react";
import { ExternalLink, X } from "lucide-react";

interface ShowDriverButtonProps {
  cityNameCn: string;
}

export default function ShowDriverButton({ cityNameCn }: ShowDriverButtonProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        type="button"
        className="mt-2 inline-flex items-center gap-1 rounded-full bg-celadon/10 px-3 py-1.5 text-xs font-medium text-celadon hover:bg-celadon/20 transition-colors"
      >
        🚕 Show Driver
        <ExternalLink size={12} />
      </button>

      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShow(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-stone">Show to your driver</h3>
              <button
                onClick={() => setShow(false)}
                className="rounded-lg p-1 text-stone/40 hover:bg-black/5"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mb-2 text-xs text-stone/50">Tap the Chinese text to expand it fullscreen</p>
            <div
              className="flex cursor-pointer items-center justify-center rounded-xl bg-celadon/5 py-10"
              onClick={() => {
                const el = document.createElement("div");
                el.style.cssText =
                  "position:fixed;inset:0;z-index:100;background:#fff;display:flex;align-items:center;justify-content:center;font-size:12vw;font-weight:700;color:#111;cursor:pointer;";
                el.textContent = cityNameCn;
                el.onclick = () => el.remove();
                document.body.appendChild(el);
              }}
            >
              <span className="text-5xl font-bold text-ink">{cityNameCn}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
