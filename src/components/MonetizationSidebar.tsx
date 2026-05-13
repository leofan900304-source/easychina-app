"use client";

import { Coffee } from "lucide-react";

const links = [
  { href: "https://www.airalo.com/", icon: "📱", label: "Airalo eSIM", color: "emerald" },
  { href: "https://esim.holafly.com/esim-china/", icon: "📱", label: "Holafly eSIM", color: "emerald" },
  { href: "https://www.expressvpn.com/", icon: "🔒", label: "ExpressVPN", color: "blue" },
  { href: "https://www.astrill.com/", icon: "🔒", label: "Astrill VPN", color: "blue" },
];

const colorStyles: Record<string, string> = {
  emerald: "bg-gradient-to-r from-emerald-50 to-white hover:from-emerald-100",
  blue: "bg-gradient-to-r from-blue-50 to-white hover:from-blue-100",
};

export function MonetizationSidebar() {
  const handleClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Desktop sidebar — fixed right */}
      <aside className="hidden xl:fixed xl:right-8 xl:top-1/3 xl:z-10 xl:flex xl:w-56 xl:-translate-y-1/4 xl:flex-col xl:gap-4">
        <div className="rounded-xl border border-black/5 bg-white p-4 shadow-soft">
          <h3 className="mb-3 text-[10px] font-semibold tracking-[3px] text-stone/50 uppercase">Get Connected</h3>
          <div className="space-y-3">
            {links.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleClick(link.href)}
                className={`flex w-full items-center gap-2 rounded-lg p-2.5 text-left text-xs transition-all ${colorStyles[link.color]}`}
              >
                <span>{link.icon}</span>
                <span className="font-medium text-stone">{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleClick("https://www.buymeacoffee.com/easychina")}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/5 bg-amber-50/50 p-3 text-xs text-stone transition-all hover:bg-amber-100/50"
        >
          <Coffee size={14} className="text-amber-700" />
          Buy Me a Coffee
        </button>
      </aside>

      {/* Mobile bottom — already in city pages */}
    </>
  );
}
