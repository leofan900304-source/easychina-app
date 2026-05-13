import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "China Travel Checklist — Pre-Trip Preparation",
  description:
    "Printable pre-trip checklist for China: documents, digital setup, finance, packing, and connectivity. Track your progress and make sure you don't forget anything.",
};

export default function ChecklistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
