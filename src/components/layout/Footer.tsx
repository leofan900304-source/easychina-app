import { Logo } from "@/components/Logo";
import Link from "next/link";

const footerLinks = {
  Explore: [{ href: "/plan", label: "Trip Planner" }, { href: "/cities", label: "Cities" }, { href: "/prepare", label: "Prepare" }],
  Resources: [{ href: "/prepare/sim", label: "SIM & Internet" }, { href: "/prepare/payment", label: "Payment Guide" }, { href: "/prepare/apps", label: "Essential Apps" }, { href: "/faq", label: "FAQ" }],
  About: [{ href: "/about", label: "About EasyChina" }],
};

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white/30">
      <div className="ink-bar" />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo showTagline size="sm" />
            <p className="mt-4 text-sm leading-relaxed text-stone">China Travel, Made Easy. Your personalized guide to exploring China with confidence.</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-ink">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm text-stone transition-colors hover:text-ink">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-black/5 pt-8 text-center text-xs text-stone/60">&copy; {new Date().getFullYear()} EasyChina. China Travel, Made Easy.</div>
      </div>
    </footer>
  );
}
