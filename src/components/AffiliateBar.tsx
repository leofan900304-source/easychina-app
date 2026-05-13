"use client";

import { Coffee } from "lucide-react";

export function AffiliateBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-black/5 bg-white/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2 text-xs md:gap-6">
        {/* TODO: Replace with actual Airalo affiliate link */}
        <a href="https://www.airalo.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-stone transition-colors hover:text-emerald-600">
          <span>📱</span>
          <span className="hidden sm:inline">Airalo eSIM</span>
        </a>
        <span className="text-stone/20">|</span>
        {/* TODO: Replace with actual Holafly affiliate link */}
        <a href="https://www.holafly.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-stone transition-colors hover:text-emerald-600">
          <span>📱</span>
          <span className="hidden sm:inline">Holafly eSIM</span>
        </a>
        <span className="text-stone/20">|</span>
        {/* TODO: Replace with actual VPN affiliate link */}
        <a href="https://www.expressvpn.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-stone transition-colors hover:text-blue-600">
          <span>🔒</span>
          <span className="hidden sm:inline">VPN</span>
        </a>
        <span className="text-stone/20">|</span>
        <a href="https://www.buymeacoffee.com/easychina" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-stone transition-colors hover:text-amber-600">
          <Coffee size={12} />
          <span className="hidden sm:inline">Support Us</span>
        </a>
      </div>
    </div>
  );
}
