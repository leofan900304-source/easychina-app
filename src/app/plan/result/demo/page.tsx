"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Share2, ArrowLeft, Sparkles } from "lucide-react";

const itinerary = {
  entry: "上海浦东 (PVG)",
  duration: "8天7晚",
  budget: "Comfort",
  preferences: ["History & Culture", "Food Exploration"],
  route: "Shanghai (3 days) → 🚄 High-speed rail to Beijing (4 days) → Depart from Beijing Capital Airport",
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
  const [expandedDay, setExpandedDay] = useState(1);

  const generatePDF = () => {
    // Build clean HTML for print — only itinerary content, NO website UI
    const content = `
      <html>
      <head>
        <meta charset="utf-8">
        <title>EasyChina Itinerary</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; padding: 40px; line-height: 1.6; }
          h1 { font-size: 28px; font-weight: 600; margin-bottom: 4px; }
          .subtitle { color: #666; font-size: 14px; margin-bottom: 24px; }
          .overview { background: #f5f5f5; border-radius: 12px; padding: 16px; margin-bottom: 32px; font-size: 14px; }
          .day { margin-bottom: 32px; page-break-inside: avoid; }
          .day-header { font-size: 18px; font-weight: 600; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #5C7A6E; color: #5C7A6E; }
          .item { display: flex; gap: 12px; margin-bottom: 8px; font-size: 14px; }
          .time { width: 80px; flex-shrink: 0; color: #888; font-weight: 500; }
          .content { flex: 1; color: #333; }
          .tips { margin-top: 8px; padding: 8px 12px; background: #fafafa; border-radius: 8px; font-size: 13px; color: #666; }
          .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 12px; color: #999; text-align: center; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <h1>Your China Trip</h1>
        <p class="subtitle">${itinerary.route}</p>
        <div class="overview">📍 Entry: ${itinerary.entry} &nbsp;|&nbsp; ⏱ ${itinerary.duration} &nbsp;|&nbsp; 💰 ${itinerary.budget} &nbsp;|&nbsp; 🎯 ${itinerary.preferences.join(", ")}</div>
        ${itinerary.days.map(d => `
          <div class="day">
            <div class="day-header">Day ${d.day}: ${d.title} <span style="font-weight:400;font-size:14px;color:#888;">— ${d.location}</span></div>
            ${d.items.map(i => `<div class="item"><span class="time">${i.time}</span><span class="content">${["🚄","🏨","📍","🍜","🛍️"][["transport","hotel","sight","food","shopping"].indexOf(i.type)]} ${i.content}</span></div>${i.metro ? `<div style="font-size:12px;color:#5C7A6E;margin:-4px 0 8px 92px;">🚇 ${i.metro}</div>` : ""}${i.driver ? `<div style="font-size:11px;color:#888;margin:4px 0 8px 92px;padding:4px 8px;background:#fff8e1;border-radius:4px;">🚕 Show Driver: ${i.driver}</div>` : ""}`).join("")}
            ${d.tips.length > 0 ? `<div class="tips">💡 ${d.tips.join("<br/>💡 ")}</div>` : ""}
          </div>
        `).join("")}
        <div class="footer">Generated by EasyChina — China Travel, Made Easy</div>
        <script>window.print()</script>
      </body>
      </html>
    `;

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(content);
      win.document.close();
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: "My China Trip", url });
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out my China trip!")}&url=${encodeURIComponent(url)}`, "_blank");
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 md:py-16">
      <Link href="/plan" className="mb-8 inline-flex items-center gap-1.5 text-xs text-stone">
        <ArrowLeft size={14} />
        Back to Planner
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-[450]">Your China Trip</h1>
        <p className="mt-2 text-sm text-stone">Here&apos;s your personalized itinerary</p>
      </div>

      <div className="mb-10 rounded-2xl border border-black/5 bg-white p-6">
        <h2 className="mb-4 text-xs font-semibold tracking-[3px] text-stone/50 uppercase">Trip Overview</h2>
        <p className="text-sm">{itinerary.route}</p>
      </div>

      {itinerary.days.map((day) => (
        <div key={day.day} className="mb-4 overflow-hidden rounded-2xl border border-black/5 bg-white">
          <button onClick={() => setExpandedDay(expandedDay === day.day ? -1 : day.day)} className="flex w-full items-center justify-between p-5">
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
                      <span>{["🚄","🏨","📍","🍜","🛍️"][["transport","hotel","sight","food","shopping"].indexOf(item.type)]} {item.content}</span>
                    </div>
                    {/* Metro station info */}
                    {item.metro && (
                      <div className="ml-16 mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-celadon/70">🚇</span>
                        <span className="font-medium text-stone/50">Metro Station:</span>
                        <span className="text-celadon/70">{item.metro}{item.walking ? `（${item.walking}）` : ""}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {day.tips.map((tip, i) => <p key={i} className="mt-2 text-xs text-stone/70">💡 {tip}</p>)}
            </div>
          )}
        </div>
      ))}

      <div className="mt-8 flex flex-col gap-3">
        <div className="flex gap-3">
          <button onClick={generatePDF} className="btn-primary flex-1 justify-center text-sm py-3">
            <Download size={16} />
            Download PDF
          </button>
          <button onClick={handleShare} className="btn-secondary flex-1 justify-center text-sm py-3">
            <Share2 size={16} />
            Share
          </button>
        </div>
        <div className="flex gap-2">
          <Link href="/plan" className="btn-secondary flex-1 justify-center text-sm py-3">
            <Sparkles size={16} />
            Generate Again
          </Link>
          <a href="#" className="btn-secondary flex-1 justify-center gap-1.5 text-sm py-3 whitespace-nowrap">
            ☕ Support Us
          </a>
        </div>
      </div>
    </div>
  );
}
