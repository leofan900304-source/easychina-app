import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FeedbackButton } from "@/components/FeedbackButton";
import { AIChat } from "@/components/AIChat";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EasyChina — China Travel, Made Easy",
    template: "%s | EasyChina",
  },
  description:
    "Plan your China trip with confidence. Personalized itineraries, prep guides, and insider tips for international travelers.",
  openGraph: {
    title: "EasyChina — China Travel, Made Easy",
    description:
      "Your personalized guide to exploring China with confidence.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-paper font-sans antialiased">
        <div className="ink-bar" />
        <Header />
        <main className="min-h-[calc(100vh-12rem)]">{children}</main>
        <Footer />
        <AIChat />
        <FeedbackButton />
      </body>
    </html>
  );
}
