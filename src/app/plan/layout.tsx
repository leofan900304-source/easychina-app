import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your China Trip",
  description:
    "Build your personalized China itinerary with AI. Tell us your preferences — cities, budget, pace, and interests — and get a day-by-day travel plan in seconds.",
};

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
