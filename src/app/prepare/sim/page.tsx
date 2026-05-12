import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SimPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <Link href="/prepare" className="mb-8 inline-flex items-center gap-1.5 text-xs text-stone transition-colors hover:text-ink">
        <ArrowLeft size={14} />
        Back to Prepare
      </Link>

      <h1 className="text-3xl font-[450] tracking-tight">SIM & Internet</h1>
      <p className="mt-3 text-sm text-stone">
        Stay connected during your trip. Here are your options.
      </p>

      <div className="mt-10 space-y-8">
        {/* Plan comparison table */}
        <div className="overflow-hidden rounded-2xl border border-black/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-card">
                <th className="px-5 py-3 text-left font-medium">Option</th>
                <th className="px-5 py-3 text-left font-medium">Pros</th>
                <th className="px-5 py-3 text-left font-medium">Price</th>
                <th className="px-5 py-3 text-left font-medium">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {[
                { option: "eSIM (Airalo/Nomad)", pros: "Buy online, activate before landing", price: "$10-30/week", best: "Most travelers" },
                { option: "China Unicom Tourist SIM", pros: "Local number, reliable 5G", price: "¥100-300/week", best: "Longer stays" },
                { option: "International Roaming", pros: "Keep your number, no setup", price: "$10-15/day", best: "Short trips (3-5 days)" },
                { option: "Pocket WiFi", pros: "Share between devices", price: "¥30-50/day", best: "Groups" },
              ].map((row, i) => (
                <tr key={i} className="bg-white/30">
                  <td className="px-5 py-4 font-medium">{row.option}</td>
                  <td className="px-5 py-4 text-stone">{row.pros}</td>
                  <td className="px-5 py-4 text-stone">{row.price}</td>
                  <td className="px-5 py-4 text-stone">{row.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* VPN */}
        <div className="rounded-2xl border border-cinnabar/20 bg-cinnabar/5 p-6">
          <h2 className="text-lg font-semibold text-cinnabar">⚠️ VPN — Important</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone">
            Many Western websites (Google, Instagram, WhatsApp, Facebook, YouTube) are
            blocked in China. Install a reliable VPN <strong>before</strong> you
            leave — it&apos;s very hard to do after arrival.
          </p>
          <div className="mt-4 rounded-xl bg-white/50 p-4">
            <p className="text-sm font-medium">Recommended VPNs (pre-install required):</p>
            <ul className="mt-2 space-y-1 text-sm text-stone">
              <li>• AstrillVPN — most reliable in China</li>
              <li>• ExpressVPN — good speeds</li>
              <li>• NordVPN — solid option</li>
              <li>• Mullvad — privacy focused</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <a href="#" className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-xs font-medium text-white transition-all hover:bg-blue-700">Get ExpressVPN →</a>
              <a href="#" className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-xs font-medium text-white transition-all hover:bg-blue-700">Get Astrill →</a>
            </div>
          </div>
        </div>

        {/* eSIM Purchase CTA */}
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-lg">📱</span>
            <div>
              <p className="text-sm font-semibold">Need a China eSIM?</p>
              <p className="text-xs text-stone/50">Instant 4G/5G, no physical SIM needed</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <a href="#" className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-center text-xs font-medium text-white transition-all hover:bg-emerald-700">Airalo eSIM →</a>
            <a href="#" className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-center text-xs font-medium text-white transition-all hover:bg-emerald-700">Holafly eSIM →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
