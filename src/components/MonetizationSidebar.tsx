"use client";

import { Coffee } from "lucide-react";

export function MonetizationSidebar() {
  return (
    <>
      {/* Desktop sidebar — fixed right */}
      <aside className="hidden xl:fixed xl:right-8 xl:top-1/3 xl:flex xl:w-56 xl:-translate-y-1/4 xl:flex-col xl:gap-4">
        <div className="rounded-xl border border-black/5 bg-white p-4 shadow-soft">
          <h3 className="mb-3 text-[10px] font-semibold tracking-[3px] text-stone/50 uppercase">Get Connected</h3>
          <div className="space-y-3">
            <a href="#" className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-50 to-white p-2.5 text-xs transition-all hover:from-emerald-100">
              <span>📱</span>
              <span className="font-medium text-stone">Airalo eSIM</span>
            </a>
            <a href="#" className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-50 to-white p-2.5 text-xs transition-all hover:from-emerald-100">
              <span>📱</span>
              <span className="font-medium text-stone">Holafly eSIM</span>
            </a>
            <a href="#" className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-50 to-white p-2.5 text-xs transition-all hover:from-blue-100">
              <span>🔒</span>
              <span className="font-medium text-stone">ExpressVPN</span>
            </a>
            <a href="#" className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-50 to-white p-2.5 text-xs transition-all hover:from-blue-100">
              <span>🔒</span>
              <span className="font-medium text-stone">Astrill VPN</span>
            </a>
          </div>
        </div>

        <a href="#" className="flex items-center justify-center gap-2 rounded-xl border border-black/5 bg-amber-50/50 p-3 text-xs text-stone transition-all hover:bg-amber-100/50">
          <Coffee size={14} className="text-amber-700" />
          Buy Me a Coffee
        </a>
      </aside>

      {/* Mobile bottom — already in city pages */}
    </>
  );
}
