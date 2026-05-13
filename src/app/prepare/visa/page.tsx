import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "China Visa Guide for Tourists",
  description:
    "L-Visa requirements, 144-hour visa-free transit policy, eligible cities, required documents, and arrival tips for international travelers visiting China.",
};

export default function VisaPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <Link href="/prepare" className="mb-8 inline-flex items-center gap-1.5 text-xs text-stone transition-colors hover:text-ink">
        <ArrowLeft size={14} />
        Back to Prepare
      </Link>

      <h1 className="text-3xl font-[450] tracking-tight">Visa & Entry</h1>

      <div className="mt-10 space-y-6">
        <div className="rounded-2xl border border-black/5 bg-surface-card p-6">
          <h2 className="text-base font-semibold">L-Visa (Tourist Visa)</h2>
          <ul className="mt-3 space-y-2 text-sm text-stone">
            <li>• Valid for 30-90 days depending on nationality</li>
            <li>• Apply at Chinese embassy/visa center in your country</li>
            <li>• Processing time: 4-7 business days</li>
            <li>• Required documents: passport, photo, flight booking, hotel reservation</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-celadon/20 bg-celadon/5 p-6">
          <h2 className="text-base font-semibold text-celadon">144-Hour Visa-Free Transit</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone">
            Citizens of 53 countries can transit through select Chinese cities
            without a visa for up to 144 hours (6 days).
          </p>
          <div className="mt-4 rounded-xl bg-white/50 p-4 text-sm">
            <p className="font-medium">Eligible cities include:</p>
            <p className="mt-1 text-stone">
              Beijing, Shanghai, Guangzhou, Chengdu, Xi&apos;an, Chongqing,
              Kunming, Hangzhou, and more.
            </p>
            <p className="mt-2 text-stone">
              <strong>Requirements:</strong> Valid passport, confirmed
              onward ticket to a third country, and staying within the transit
              area.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-osmanthus/20 bg-osmanthus/5 p-6">
          <h2 className="text-base font-semibold">📋 Arrival Tips</h2>
          <ul className="mt-3 space-y-2 text-sm text-stone">
            <li>• Fill out the arrival card on the plane (keep a pen handy)</li>
            <li>• Have your hotel address written in Chinese ready</li>
            <li>• Take a screenshot of your visa — useful if asked</li>
            <li>• Police registration: Hotels do this automatically; if staying in a private residence, register within 24 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
