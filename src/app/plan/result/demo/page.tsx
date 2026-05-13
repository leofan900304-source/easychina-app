"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { MonetizationSidebar } from "@/components/MonetizationSidebar";
import { ShareModal } from "@/components/ShareModal";
import { typeIcons } from "@/types/itinerary";

const itinerary = {
  entry: "上海浦东 (PVG)",
  duration: "3天2晚",
  budget: "Comfort",
  preferences: ["History & Culture", "Food Exploration"],
  route: "Shanghai (2 days) → 🚄 High-speed rail to Beijing (1 day) → Depart from Beijing Capital Airport",
  days: [
    { day: 1, title: "Arrival in Shanghai & The Bund", location: "Shanghai", items: [
      { time: "Morning", content: "Arrive at Pudong Airport → Take Metro Line 2/Maglev to city center", type: "transport", metro: "浦东机场站 (Pudong Airport)", driver: "浦东国际机场 | Pudong International Airport" },
      { time: "Midday", content: "Check in to hotel (near Nanjing East Road, ¥500-800/night)", type: "hotel" },
      { time: "Afternoon", content: "Stroll along The Bund → Nanjing Road Pedestrian Street", type: "sight", metro: "南京东路站 (East Nanjing Rd) Line 2/10", driver: "外滩 | The Bund", walking: "1号口步行5分钟" },
      { time: "Evening", content: "Dinner at Yu Garden (Nanxiang Steamed Bun Restaurant)", type: "food", metro: "豫园站 (Yu Garden) Line 10", driver: "豫园 | Yu Garden", walking: "3号口步行3分钟" },
    ], tips: ["The Bund is free, no reservation needed", "Large restaurants accept intl credit cards"] },
    { day: 2, title: "History & French Concession", location: "Shanghai", items: [
      { time: "Morning", content: "Shanghai Museum (Free, reservation via WeChat)", type: "sight", metro: "人民广场站 (People's Square) Line 1/8", driver: "上海博物馆 | Shanghai Museum", walking: "1号口步行8分钟" },
      { time: "Midday", content: "Lunch in French Concession (Old Jesse)", type: "food", metro: "陕西南路站 (South Shaanxi Rd) Line 10/12", driver: "老吉士 | Old Jesse Restaurant", walking: "2号口步行6分钟" },
      { time: "Afternoon", content: "Wukang Road → Tianzifang", type: "sight", metro: "武康路站 (Wukang Rd) / 打浦桥站 (Dapuqiao) Line 9", driver: "武康路 | Wukang Road", walking: "1号口步行10分钟" },
      { time: "Evening", content: "Dinner at Xintiandi", type: "food", metro: "新天地站 (Xintiandi) Line 10/13", driver: "新天地 | Xintiandi" },
    ], tips: ["Shanghai Museum: reserve 3 days ahead via WeChat"] },
    { day: 3, title: "Great Wall Day Trip", location: "Beijing", items: [
      { time: "Full Day", content: "Badaling Great Wall (¥40, reservation required)", type: "sight", metro: "清河站 (Qinghe Station) → HSR to 八达岭站 (Badaling)", driver: "八达岭长城 | Badaling Great Wall" },
      { time: "Morning", content: "Qinghe Station → 20min HSR to Badaling (¥20)", type: "transport" },
    ], tips: ["Reserve on 'Badaling Great Wall' WeChat account", "Wear comfortable shoes"] },
  ],
};

export default function ResultPage() {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const printRef = useRef<HTMLDivElement>(null);

  return (
    <>
    <div className="mx-auto max-w-3xl px-6 py-8 md:py-16">
      <Link href="/plan" className="mb-8 inline-flex items-center gap-1.5 text-xs text-stone">
        <ArrowLeft size={14} />
        Back to Planner
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-[450]">Your China Trip</h1>
        <p className="mt-2 text-sm text-stone">Here&apos;s your personalized itinerary</p>
      </div>

      {/* Printable content wrapper */}
      <div ref={printRef}>
        <div className="mb-10 rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="mb-4 text-xs font-semibold tracking-[3px] text-stone/50 uppercase">Trip Overview</h2>
          <p className="text-sm">{itinerary.route}</p>
        </div>

        {itinerary.days.map((day) => (
          <div key={day.day} className="mb-4 overflow-hidden rounded-2xl border border-black/5 bg-white">
            <button onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)} className="flex w-full items-center justify-between p-5">
              <div>
                <span className="text-xs font-medium text-celadon">Day {day.day}</span>
                <h3 className="mt-0.5 font-medium">{day.title}</h3>
              </div>
              <span className="text-xs text-stone/50">{day.location}</span>
            </button>
            {expandedDay === day.day && (
              <div className="border-t border-black/5 px-5 pb-5">
                <div className="mt-4 space-y-3">
                  {day.items.map((item, i) => (
                    <div key={i}>
                      <div className="flex gap-3 text-sm text-stone">
                        <span className="w-16 flex-shrink-0 text-xs font-medium text-stone/60">{item.time}</span>
                        <span>{typeIcons[item.type] || "📍"} {item.content}</span>
                      </div>
                      {item.metro && (
                        <div className="ml-16 mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="text-celadon/70">{"🚇"}</span>
                          <span className="font-medium text-stone/50">Metro Station:</span>
                          <span className="text-celadon/70">{item.metro}{item.walking ? `（${item.walking}）` : ""}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {day.tips.map((tip, i) => <p key={i} className="mt-2 text-xs text-stone/70">{"💡"} {tip}</p>)}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <ShareModal itinerary={itinerary} printRef={printRef} />
        <div className="flex gap-2">
          <Link href="/plan" className="btn-secondary flex-1 justify-center text-sm py-3">
            <Sparkles size={16} />
            Generate Again
          </Link>
          <a href="https://www.buymeacoffee.com/easychina" target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 justify-center gap-1.5 text-sm py-3 whitespace-nowrap">
            {"☕"} Support Us
          </a>
        </div>
      </div>

    </div>
    <MonetizationSidebar />
    </>
  );
}
