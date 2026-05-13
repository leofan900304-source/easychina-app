import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — China Travel",
  description:
    "Answers to common questions about traveling in China: VPN, SIM cards, payments, transportation, language, safety, and more. Everything first-time visitors need to know.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
