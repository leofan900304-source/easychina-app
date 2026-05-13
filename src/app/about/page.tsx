import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About EasyChina",
  description:
    "EasyChina is an AI-powered travel planner built for foreigners visiting China. We make trip planning simple — from itineraries to SIM cards and payment guides.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <h1 className="text-3xl font-[450] tracking-tight">About EasyChina</h1>
      <p className="mt-4 text-sm leading-relaxed text-stone">
        EasyChina was born from a simple observation: planning a trip to China as a
        foreigner is unnecessarily hard. Between VPN setups, unfamiliar payment
        systems, language barriers, and scattered information, the friction of
        preparation often overshadows the excitement of the journey.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-stone">
        We believe that travel should be about discovery, not paperwork. EasyChina
        is your personal trip assistant — combining curated data with AI to build
        itineraries that match your preferences, budget, and travel style.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-stone">
        We&apos;re independent, traveler-focused, and committed to one thing: making
        China travel, made easy.
      </p>

      <div className="mt-12 rounded-2xl border border-black/5 bg-surface-card p-6">
        <h2 className="text-sm font-semibold">Get in touch</h2>
        <p className="mt-2 text-sm text-stone">
          Have feedback or suggestions? We&apos;d love to hear from you.
        </p>
        <Link href="/plan" className="btn-primary mt-6 inline-flex text-sm">
          Start Planning <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
