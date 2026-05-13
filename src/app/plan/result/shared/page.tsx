"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { decodeItinerary } from "@/lib/share";
import { MonetizationSidebar } from "@/components/MonetizationSidebar";

interface ItineraryItem {
  time: string;
  content: string;
  type: string;
  cn?: string;
  metro?: string;
  walking?: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  items: ItineraryItem[];
  tips: string[];
}

interface ItineraryData {
  route: string;
  days: ItineraryDay[];
  paymentTips: string[];
  transportTips: string[];
  appTips: string[];
}

const typeIcons: Record<string, string> = {
  transport: "🚄",
  hotel: "🏨",
  sight: "📍",
  food: "🍜",
  shopping: "🛍️",
};

export default function SharedResultPage() {
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("d");
    if (!data) {
      setError("No itinerary data found in the link.");
      return;
    }
    const decoded = decodeItinerary<ItineraryData>(data);
    if (!decoded || !decoded.days) {
      setError("Invalid or corrupted itinerary data.");
      return;
    }
    setItinerary(decoded);
  }, []);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-stone">{error}</p>
        <Link href="/plan" className="btn-primary mt-6 inline-flex text-sm">
          Start Planning
        </Link>
        <MonetizationSidebar />
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-celadon border-t-transparent" />
          <p className="text-sm text-stone">Loading shared itinerary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 md:py-16">
      <Link href="/plan" className="mb-8 inline-flex items-center gap-1.5 text-xs text-stone">
        <ArrowLeft size={14} />
        Plan Your Own Trip
      </Link>

      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-celadon/10 px-3 py-1 text-xs font-medium text-celadon">
          📋 Shared Itinerary
        </div>
        <h1 className="text-3xl font-[450]">A China Trip</h1>
        <p className="mt-2 text-sm text-stone">Shared by a traveler via EasyChina</p>
      </div>

      <div className="mb-10 rounded-2xl border border-black/5 bg-white p-6">
        <h2 className="mb-3 text-xs font-semibold tracking-[3px] text-stone/50 uppercase">Route</h2>
        <p className="text-sm text-stone">{itinerary.route}</p>
      </div>

      {itinerary.paymentTips?.length > 0 && (
        <div className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
          <h3 className="mb-3 text-sm font-semibold">💳 Payment</h3>
          <ul className="space-y-1.5 text-sm text-stone">
            {itinerary.paymentTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-yellow-600">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {itinerary.transportTips?.length > 0 && (
        <div className="mb-10 rounded-2xl border border-celadon/20 bg-celadon/5 p-6">
          <h3 className="mb-3 text-sm font-semibold">🚄 Transport</h3>
          <ul className="space-y-1.5 text-sm text-stone">
            {itinerary.transportTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-celadon">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2 className="mb-6 text-xs font-semibold tracking-[3px] text-stone/50 uppercase">Your Itinerary</h2>

      <div className="space-y-3">
        {itinerary.days.map((day) => (
          <div key={day.day} className="overflow-hidden rounded-2xl border border-black/5 bg-white transition-all">
            <button
              onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
              className="flex w-full items-center justify-between p-5"
            >
              <div>
                <span className="text-xs font-medium text-celadon">Day {day.day}</span>
                <h3 className="mt-0.5 font-medium">{day.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone/50">{day.location}</span>
                {expandedDay === day.day ? (
                  <ChevronUp size={16} className="text-stone/30" />
                ) : (
                  <ChevronDown size={16} className="text-stone/30" />
                )}
              </div>
            </button>

            {expandedDay === day.day && (
              <div className="border-t border-black/5 px-5 pb-5">
                <div className="mt-4 space-y-3">
                  {day.items.map((item, i) => (
                    <div key={i}>
                      <div className="flex gap-3 text-sm text-stone">
                        <span className="w-16 flex-shrink-0 text-xs font-medium text-stone/60">{item.time}</span>
                        <span>
                          {typeIcons[item.type] || "📍"} {item.content}
                        </span>
                      </div>
                      {item.metro && (
                        <div className="ml-16 mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="text-celadon/70">🚇</span>
                          <span className="font-medium text-stone/50">Metro Station:</span>
                          <span className="text-celadon/70">
                            {item.metro}
                            {item.walking ? `（${item.walking}）` : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {day.tips.length > 0 && (
                  <div className="mt-4 rounded-xl bg-white/50 p-3">
                    {day.tips.map((tip, i) => (
                      <p key={i} className="text-xs text-stone/70">
                        💡 {tip}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {itinerary.appTips?.length > 0 && (
        <div className="my-10 rounded-2xl border border-black/5 bg-white p-6">
          <h3 className="mb-3 text-sm font-semibold">📱 Apps</h3>
          <ul className="space-y-1.5 text-sm text-stone">
            {itinerary.appTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-stone/30">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/plan" className="btn-primary inline-flex text-sm">
          Create Your Own Trip
        </Link>
      </div>
      <MonetizationSidebar />
    </div>
  );
}
