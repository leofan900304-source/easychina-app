"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    category: "🌐 Internet & VPN",
    items: [
      { q: "Do I need a VPN for China?", a: "Yes. Google, Instagram, WhatsApp, Facebook, and many other Western sites are blocked. Install a reliable VPN (Astrill, ExpressVPN, NordVPN) before you leave — it's very difficult to do after arrival." },
      { q: "What's the best SIM card option?", a: "For most travelers, we recommend an eSIM from Airalo or Nomad (buy online, activate before landing). For longer stays, a China Unicom tourist SIM at the airport is a good option." },
      { q: "Can I use Google Maps in China?", a: "Google Maps works intermittently but is not reliable. Download Amap (高德地图) or Baidu Maps — they're much more accurate for public transit directions." },
    ],
  },
  {
    category: "💳 Payment & Money",
    items: [
      { q: "Do I need cash?", a: "China is mostly cashless. ¥500-1000 is enough for emergencies. Most places use Alipay or WeChat Pay. Large hotels and malls accept international credit cards." },
      { q: "Can I use my foreign credit card?", a: "Yes, at most hotels, large restaurants, and shopping malls. Street food stalls and small shops likely won't accept cards. Always carry some cash as backup." },
      { q: "How do I set up Alipay as a foreigner?", a: "Download Alipay, register with your foreign phone number, go to Me → Cards → Add international card. You can bind Visa/Mastercard/Amex." },
    ],
  },
  {
    category: "🚄 Transportation",
    items: [
      { q: "How do I book trains?", a: "Use Trip.com (has English interface, accepts foreign cards) or the official 12306 app. High-speed trains are the best way to travel between cities." },
      { q: "Can I use Uber in China?", a: "Uber doesn't operate in China. Use Didi Chuxing (滴滴出行) — it has an English version and can bind foreign credit cards." },
      { q: "Is the subway easy to use?", a: "Yes. Major cities have excellent metro systems with English signs and announcements. Use Alipay's transport card to scan and ride." },
    ],
  },
  {
    category: "🗣️ Language & Communication",
    items: [
      { q: "Do I need to speak Chinese?", a: "In major cities and tourist areas, some English is spoken. Learn a few basic phrases (谢谢, 你好, 多少钱) — it goes a long way. Use a translation app for complex situations." },
      { q: "What translation app should I use?", a: "Youdao Translate (有道翻译) is excellent — it does text, voice, and camera translation for menus and signs. Google Translate also works with a VPN." },
      { q: "Will people understand my English?", a: "In big cities, younger people and hotel staff often speak basic English. In smaller cities and rural areas, communication will rely on gestures and translation apps." },
    ],
  },
  {
    category: "🛡️ Safety & Health",
    items: [
      { q: "Is China safe for tourists?", a: "Yes, China is very safe for tourists. Violent crime is extremely rare. The biggest risks are petty scams (taxi overcharging, fake ticket vendors) — use official services to avoid these." },
      { q: "Can I drink tap water?", a: "No. Tap water is not drinkable in China. Buy bottled water (¥2-3) or bring a reusable bottle and boil water. Hotels often provide bottled water." },
      { q: "What emergency numbers should I know?", a: "Police: 110, Ambulance: 120, Fire: 119. Save your country's embassy/consulate number in China as well." },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("Internet & VPN-0");

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-[3px] text-stone uppercase">— FAQ</span>
        <h1 className="mt-3 text-3xl font-[450] tracking-tight">Frequently Asked Questions</h1>
        <p className="mt-3 max-w-lg text-sm text-stone">Everything you need to know before your China trip.</p>
      </div>

      <div className="space-y-8">
        {faqs.map(({ category, items }) => (
          <div key={category}>
            <h2 className="mb-4 text-sm font-semibold text-stone/60">{category}</h2>
            <div className="space-y-2">
              {items.map((faq, i) => {
                const idx = `${category}-${i}`;
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="overflow-hidden rounded-2xl border border-black/5 bg-surface-card">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <span className="text-sm font-medium pr-4">{faq.q}</span>
                      {isOpen ? <ChevronUp size={16} className="flex-shrink-0 text-stone/30" /> : <ChevronDown size={16} className="flex-shrink-0 text-stone/30" />}
                    </button>
                    {isOpen && (
                      <div className="border-t border-black/5 px-5 pb-5 animate-fade-in">
                        <p className="mt-3 text-sm leading-relaxed text-stone">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
