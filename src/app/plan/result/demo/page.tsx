"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Download, Share2, ArrowLeft, Sparkles, Copy, Check, X } from "lucide-react";
import { MonetizationSidebar } from "@/components/MonetizationSidebar";
import { encodeItinerary, buildShareUrl } from "@/lib/share";

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

const typeIcons: Record<string, string> = {
  transport: "🚄",
  hotel: "🏨",
  sight: "📍",
  food: "🍜",
  shopping: "🛍️",
};

export default function ResultPage() {
  const [expandedDay, setExpandedDay] = useState(1);

  // Share / QR state
  const [showQR, setShowQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [showCopied, setShowCopied] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!printRef.current) return;
    setPdfGenerating(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = position - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("EasyChina_Itinerary.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setPdfGenerating(false);
    }
  };

  const handleShare = async () => {
    const encoded = encodeItinerary(itinerary);
    const url = buildShareUrl(encoded);
    setShareUrl(url);

    try {
      const QRCode = (await import("qrcode")).default;
      const dataUrl = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: { dark: "#5C7A6E", light: "#ffffff" },
      });
      setQrDataUrl(dataUrl);
    } catch {
      // QR generation failed
    }

    setShowQR(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
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

      {/* Printable content wrapper */}
      <div ref={printRef}>
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
        <div className="flex gap-3">
          <button
            onClick={generatePDF}
            disabled={pdfGenerating}
            className={`btn-primary flex-1 justify-center text-sm py-3 ${pdfGenerating ? "pointer-events-none opacity-60" : ""}`}
          >
            <Download size={16} />
            {pdfGenerating ? "Generating..." : "Download PDF"}
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
          <a href="https://www.buymeacoffee.com/easychina" target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 justify-center gap-1.5 text-sm py-3 whitespace-nowrap">
            {"☕"} Support Us
          </a>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setShowQR(false)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Share Your Itinerary</h3>
              <button onClick={() => setShowQR(false)} className="rounded-lg p-1 text-stone/40 hover:bg-black/5">
                <X size={18} />
              </button>
            </div>

            {qrDataUrl ? (
              <div className="mx-auto mb-4 flex h-56 w-56 items-center justify-center rounded-xl bg-celadon/5">
                <img src={qrDataUrl} alt="QR Code" className="h-52 w-52" />
              </div>
            ) : (
              <div className="mx-auto mb-4 flex h-56 w-56 items-center justify-center rounded-xl bg-black/5">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-celadon border-t-transparent" />
              </div>
            )}

            <p className="mb-3 text-center text-xs text-stone/60">
              Scan QR code or copy the link to share
            </p>

            <div className="flex items-center gap-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 rounded-lg border border-black/10 bg-black/5 px-3 py-2 text-xs text-stone outline-none"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg bg-celadon px-4 py-2 text-xs font-medium text-white transition-all hover:bg-celadon/90"
              >
                {showCopied ? <Check size={14} /> : <Copy size={14} />}
                {showCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}

    <MonetizationSidebar />
    </div>
  );
}
