"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

const navLinks = [
  { href: "/plan", label: "Plan" },
  { href: "/cities", label: "Cities" },
  { href: "/prepare", label: "Prepare" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-paper/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo size="sm" />
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-stone transition-colors hover:text-ink">{link.label}</Link>
          ))}
          <Link href="/plan" className="btn-primary !py-2 !px-5 !text-sm">
            Start Planning
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#F5F0EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center p-2 md:hidden" aria-label="Toggle menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {isOpen && (
        <div className="border-t border-black/5 bg-paper md:hidden animate-fade-in">
          <nav className="flex flex-col gap-2 px-6 py-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-stone transition-colors hover:bg-surface-hover hover:text-ink">{link.label}</Link>
            ))}
            <Link href="/plan" onClick={() => setIsOpen(false)} className="btn-primary mt-2 !justify-center">
              Start Planning
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#F5F0EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
