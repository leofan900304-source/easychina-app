import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Smartphone, CreditCard, Globe, FileCheck, QrCode } from "lucide-react";

export const metadata: Metadata = {
  title: "Prepare for China Travel",
  description:
    "Everything you need before landing in China: SIM cards, VPN setup, Alipay & WeChat Pay guide, essential apps, visa requirements, and a printable pre-trip checklist.",
};

const guides = [
  {
    href: "/prepare/sim",
    title: "SIM & Internet",
    desc: "eSIM vs physical SIM, VPN setup, and data plans comparison",
    icon: Smartphone,
    color: "text-celadon bg-celadon/10",
  },
  {
    href: "/prepare/payment",
    title: "Payment Guide",
    desc: "Alipay, WeChat Pay, credit cards, and cash — what you need",
    icon: CreditCard,
    color: "text-osmanthus bg-osmanthus/10",
  },
  {
    href: "/prepare/apps",
    title: "Essential Apps",
    desc: "Apps you must install before landing: maps, ride-hailing, food delivery",
    icon: QrCode,
    color: "text-cinnabar bg-cinnabar/10",
  },
  {
    href: "/prepare/visa",
    title: "Visa & Entry",
    desc: "Visa types, 144-hour transit policy, and arrival procedures",
    icon: Globe,
    color: "text-celadon bg-celadon/10",
  },
  {
    href: "/prepare/checklist",
    title: "Pre-Trip Checklist",
    desc: "Printable checklist of everything to prepare before departure",
    icon: FileCheck,
    color: "text-osmanthus bg-osmanthus/10",
  },
];

export default function PreparePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-[3px] text-stone uppercase">
          — Prepare
        </span>
        <h1 className="mt-3 text-3xl font-[450] tracking-tight">
          Before You Go
        </h1>
        <p className="mt-3 max-w-lg text-sm text-stone">
          Everything you need to set up before landing in China — from internet
          and payments to apps and paperwork.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {guides.map((guide) => {
          const Icon = guide.icon;
          return (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-2xl border border-black/5 bg-surface-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${guide.color}`}
                >
                  <Icon size={22} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium">{guide.title}</h2>
                    <ArrowRight
                      size={16}
                      className="text-stone/30 transition-all group-hover:translate-x-1 group-hover:text-celadon"
                    />
                  </div>
                  <p className="mt-1 text-sm text-stone">{guide.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
