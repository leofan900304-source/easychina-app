import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Coffee } from "lucide-react";
import { getCity, getAllCitySlugs } from "@/data/cities";
import ShowDriverButton from "./ShowDriverButton";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const city = getCity(params.slug);
  if (!city) {
    return { title: "City Not Found" };
  }
  return {
    title: `${city.name} Travel Guide — Best Experiences & 3-Day Itinerary`,
    description: `Discover ${city.name} (${city.nameCn}): top attractions, food, suggested 3-day itinerary, and practical tips for traveling in China.`,
  };
}

export default function CityPage({ params }: { params: { slug: string } }) {
  const city = getCity(params.slug);

  if (!city) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold">City not found</h1>
        <Link href="/cities" className="mt-4 inline-block text-sm text-celadon underline">
          Back to all cities
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      {/* Back */}
      <Link
        href="/cities"
        className="mb-4 inline-flex items-center gap-1.5 text-xs text-stone transition-colors hover:text-ink"
      >
        <ArrowLeft size={14} />
        All Cities
      </Link>

      {/* Hero 16:9 */}
      <div
        className="relative mb-10 overflow-hidden rounded-2xl"
        style={{ aspectRatio: "16/9" }}
      >
        <Image
          src={city.heroImage}
          alt={city.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
          <h1 className="text-3xl font-semibold text-white md:text-5xl">
            {city.name}
          </h1>
          <p className="mt-1 text-sm text-white/70 md:text-base">{city.nameCn}</p>
        </div>
      </div>

      {/* Top Experiences */}
      <section className="mb-12">
        <h2 className="mb-5 text-xs font-semibold tracking-[3px] text-stone/50 uppercase">
          Top Experiences
        </h2>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {city.experiences.map((item) => (
            <div key={item.name} className="group cursor-pointer">
              <div
                className="relative mb-2 overflow-hidden rounded-xl"
                style={{ aspectRatio: "1/1" }}
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </div>
              <p className="text-center text-xs font-medium text-ink">{item.name}</p>
              <p className="text-center text-[10px] text-stone/50">{item.cn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary Preview */}
      <section className="mb-12">
        <h2 className="mb-5 text-xs font-semibold tracking-[3px] text-stone/50 uppercase">
          Suggested Itinerary
        </h2>

        {city.itinerary.map((day, dayIndex) => (
          <div key={day.title} className="mb-10">
            <h3 className="mb-3 text-lg font-medium">{day.title}</h3>
            <div
              className="relative mb-4 overflow-hidden rounded-2xl"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={day.img}
                alt={day.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">
                {day.label}
              </span>
            </div>
            <div className="space-y-2 text-sm text-stone">
              {day.activities.map((activity) => (
                <p key={activity.timeOfDay + activity.description}>
                  🔵 <strong>{activity.timeOfDay}:</strong> {activity.description}
                </p>
              ))}
              {dayIndex === 0 && <ShowDriverButton />}
            </div>
          </div>
        ))}
      </section>

      {/* GET CONNECTED - Monetization Module */}
      <section className="mb-8 rounded-2xl border border-black/5 bg-white p-6">
        <h2 className="mb-5 text-xs font-semibold tracking-[3px] text-stone/50 uppercase">
          Get Connected in China
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {/* eSIM */}
          <div className="rounded-xl border border-black/5 bg-gradient-to-br from-emerald-50 to-white p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-lg">
                📱
              </span>
              <div>
                <p className="text-sm font-medium">eSIM for China</p>
                <p className="text-xs text-stone/50">
                  Instant connectivity, no physical SIM needed
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="https://www.airalo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-emerald-600 py-2 text-center text-xs font-medium text-white transition-all hover:bg-emerald-700"
              >
                Airalo →
              </a>
              <a
                href="https://esim.holafly.com/esim-china/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-emerald-600 py-2 text-center text-xs font-medium text-white transition-all hover:bg-emerald-700"
              >
                Holafly →
              </a>
            </div>
          </div>

          {/* VPN */}
          <div className="rounded-xl border border-black/5 bg-gradient-to-br from-blue-50 to-white p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-lg">
                🔒
              </span>
              <div>
                <p className="text-sm font-medium">VPN Services</p>
                <p className="text-xs text-stone/50">
                  Access Google, Instagram & more
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="https://www.expressvpn.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-xs font-medium text-white transition-all hover:bg-blue-700"
              >
                ExpressVPN →
              </a>
              <a
                href="https://www.astrill.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-xs font-medium text-white transition-all hover:bg-blue-700"
              >
                Astrill →
              </a>
            </div>
          </div>
        </div>

        {/* Buy Me a Coffee */}
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-black/5 bg-amber-50/50 py-3">
          <Coffee size={16} className="text-amber-700" />
          <span className="text-xs text-stone">Support Solo Developer</span>
          <a
            href="https://www.buymeacoffee.com/easychina"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-amber-600 px-4 py-1 text-xs font-medium text-white transition-all hover:bg-amber-700"
          >
            Buy Me a Coffee
          </a>
        </div>
      </section>
    </div>
  );
}
