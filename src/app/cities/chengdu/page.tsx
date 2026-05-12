"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Coffee } from "lucide-react";

export default function ChengduPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      {/* Back */}
      <Link href="/cities" className="mb-4 inline-flex items-center gap-1.5 text-xs text-stone transition-colors hover:text-ink">
        <ArrowLeft size={14} />
        All Cities
      </Link>

      {/* Hero 16:9 */}
      <div className="relative mb-10 overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
        <Image
          src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80"
          alt="Chengdu"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
          <h1 className="text-3xl font-semibold text-white md:text-5xl">Chengdu</h1>
          <p className="mt-1 text-sm text-white/70 md:text-base">成都</p>
        </div>
      </div>

      {/* Top Experiences */}
      <section className="mb-12">
        <h2 className="mb-5 text-xs font-semibold tracking-[3px] text-stone/50 uppercase">Top Experiences</h2>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {[
            { name: "Panda Base", cn: "大熊猫基地", img: "https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=300&q=80" },
            { name: "Jinli Ancient Street", cn: "锦里古街", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80" },
            { name: "Wuhou Shrine", cn: "武侯祠", img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&q=80" },
            { name: "Dujiangyan", cn: "都江堰", img: "https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=300&q=80" },
            { name: "Leshan Giant Buddha", cn: "乐山大佛", img: "https://images.unsplash.com/photo-1585565804112-f295f2f95a11?w=300&q=80" },
            { name: "Sichuan Hotpot", cn: "四川火锅", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80" },
          ].map((item) => (
            <div key={item.name} className="group cursor-pointer">
              <div className="relative mb-2 overflow-hidden rounded-xl" style={{ aspectRatio: "1/1" }}>
                <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <p className="text-center text-xs font-medium text-ink">{item.name}</p>
              <p className="text-center text-[10px] text-stone/50">{item.cn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary Preview */}
      <section className="mb-12">
        <h2 className="mb-5 text-xs font-semibold tracking-[3px] text-stone/50 uppercase">Suggested Itinerary</h2>

        {/* Day 1 */}
        <div className="mb-10">
          <h3 className="mb-3 text-lg font-medium">Day 1: Pandas & Ancient Streets</h3>
          <div className="relative mb-4 overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
            <Image
              src="https://images.unsplash.com/photo-1557411732-1797ed2f8a1c?w=800&q=80"
              alt="Panda Base"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">🐼 Panda Base</span>
          </div>
          <div className="space-y-2 text-sm text-stone">
            <p>🔵 <strong>Morning:</strong> Panda Base (¥55, arrive by 8am — pandas are most active in the morning)</p>
            <p>🔵 <strong>Transport:</strong> Metro Line 3, Panda Avenue Station + shuttle bus</p>
            <p>🔵 <strong>Evening:</strong> Jinli Ancient Street (Free, best when red lanterns light up)</p>
            <button className="mt-2 inline-flex items-center gap-1 rounded-full bg-celadon/10 px-3 py-1.5 text-xs font-medium text-celadon">
              🚕 Show Driver
              <ExternalLink size={12} />
            </button>
          </div>
        </div>

        {/* Day 2 */}
        <div className="mb-10">
          <h3 className="mb-3 text-lg font-medium">Day 2: History & Engineering</h3>
          <div className="relative mb-4 overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
            <Image
              src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80"
              alt="Wuhou Shrine"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">⛩️ Wuhou Shrine</span>
          </div>
          <div className="space-y-2 text-sm text-stone">
            <p>🔵 <strong>Morning:</strong> Wuhou Shrine (¥50, the red wall corridor is the most photogenic spot)</p>
            <p>🔵 <strong>Afternoon:</strong> Dujiangyan Irrigation System (¥80, HSR 30min ¥30 — 2,200-year-old marvel)</p>
            <p>🔵 <strong>Evening:</strong> Mapo Tofu at Chen Mapo Tofu (¥25-35) + Dan Dan Noodles (¥10-15)</p>
          </div>
        </div>

        {/* Day 3 */}
        <div className="mb-10">
          <h3 className="mb-3 text-lg font-medium">Day 3: Buddha & Hotpot</h3>
          <div className="relative mb-4 overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
            <Image
              src="https://images.unsplash.com/photo-1559715541-5d5e8b2b2d6a?w=800&q=80"
              alt="Leshan Giant Buddha"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">🗿 Leshan Giant Buddha</span>
          </div>
          <div className="space-y-2 text-sm text-stone">
            <p>🔵 <strong>Full Day:</strong> Leshan Giant Buddha (¥80, take the boat ¥70 for the full view)</p>
            <p>🔵 <strong>Transport:</strong> HSR from Chengdu South to Leshan (45min, ¥54)</p>
            <p>🔵 <strong>Evening:</strong> Sichuan Hotpot at Huangcheng Laoma (¥80-150/person)</p>
          </div>
        </div>
      </section>

      {/* GET CONNECTED - Monetization Module */}
      <section className="mb-8 rounded-2xl border border-black/5 bg-white p-6">
        <h2 className="mb-5 text-xs font-semibold tracking-[3px] text-stone/50 uppercase">Get Connected in China</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {/* eSIM */}
          <div className="rounded-xl border border-black/5 bg-gradient-to-br from-emerald-50 to-white p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-lg">📱</span>
              <div>
                <p className="text-sm font-medium">eSIM for China</p>
                <p className="text-xs text-stone/50">Instant connectivity, no physical SIM needed</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="#" className="flex-1 rounded-lg bg-emerald-600 py-2 text-center text-xs font-medium text-white transition-all hover:bg-emerald-700">Airalo →</a>
              <a href="#" className="flex-1 rounded-lg bg-emerald-600 py-2 text-center text-xs font-medium text-white transition-all hover:bg-emerald-700">Holafly →</a>
            </div>
          </div>

          {/* VPN */}
          <div className="rounded-xl border border-black/5 bg-gradient-to-br from-blue-50 to-white p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-lg">🔒</span>
              <div>
                <p className="text-sm font-medium">VPN Services</p>
                <p className="text-xs text-stone/50">Access Google, Instagram & more</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="#" className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-xs font-medium text-white transition-all hover:bg-blue-700">ExpressVPN →</a>
              <a href="#" className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-xs font-medium text-white transition-all hover:bg-blue-700">Astrill →</a>
            </div>
          </div>
        </div>

        {/* Buy Me a Coffee */}
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-black/5 bg-amber-50/50 py-3">
          <Coffee size={16} className="text-amber-700" />
          <span className="text-xs text-stone">Support Solo Developer</span>
          <a href="#" className="rounded-full bg-amber-600 px-4 py-1 text-xs font-medium text-white transition-all hover:bg-amber-700">Buy Me a Coffee</a>
        </div>
      </section>
    </div>
  );
}
