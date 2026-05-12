import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cities = [
  { name: "Beijing", slug: "beijing", tag: "🏛️ Ancient Capital, Modern Heartbeat", type: ["History & Culture", "Urban", "Food"], bg: "bg-[#E8E3DC]" },
  { name: "Shanghai", slug: "shanghai", tag: "🌃 The Pearl of the Orient", type: ["Urban", "Food", "Technology"], bg: "bg-[#E3E8E4]" },
  { name: "Guangzhou", slug: "guangzhou", tag: "🥟 Cantonese Food Capital", type: ["Food", "Urban"], bg: "bg-[#E8E8E0]" },
  { name: "Xi'an", slug: "xian", tag: "🏯 Ancient Capital of 13 Dynasties", type: ["History & Culture", "Food"], bg: "bg-[#E8E0D8]" },
  { name: "Chengdu", slug: "chengdu", tag: "🐼 Panda Sanctuary & Slow Living", type: ["Food", "Leisure", "Nature"], bg: "bg-[#E0E8E0]" },
  { name: "Chongqing", slug: "chongqing", tag: "🏔️ 8D Futuristic Mountain City", type: ["Food", "Urban", "Nature"], bg: "bg-[#E8E0E0]" },
  { name: "Guilin", slug: "guilin", tag: "⛰️ Legendary Karst Landscapes", type: ["Nature & Scenery", "Leisure"], bg: "bg-[#E0E8E6]" },
  { name: "Lijiang", slug: "lijiang", tag: "🏘️ Ancient Town & Hidden Paradise", type: ["Culture", "Nature", "Leisure"], bg: "bg-[#E8E8E8]" },
  { name: "Hangzhou", slug: "hangzhou", tag: "🌊 Picturesque Water Town", type: ["Nature", "Leisure", "History & Culture"], bg: "bg-[#E0E8E4]" },
  { name: "Kunming", slug: "kunming", tag: "🌸 Spring City, Gateway to Yunnan", type: ["Nature & Scenery", "Culture", "Leisure"], bg: "bg-[#E8E4E0]" },
];

const preferenceFilters = [
  "All",
  "History & Culture",
  "Nature & Scenery",
  "Urban",
  "Food",
  "Culture",
  "Leisure",
  "Technology",
];

export default function CitiesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-[3px] text-stone uppercase">— Explore</span>
        <h1 className="mt-3 text-3xl font-[450] tracking-tight">China&apos;s Best Cities</h1>
        <p className="mt-3 max-w-lg text-sm text-stone">
          Each city has its own personality. Browse to find your perfect match, then add them to your personalized itinerary.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {preferenceFilters.map((filter) => (
          <button key={filter} className="rounded-full border border-black/5 bg-surface-card px-4 py-1.5 text-xs font-medium text-stone transition-all hover:border-celadon/30 hover:text-celadon">
            {filter}
          </button>
        ))}
      </div>

      {/* City Grid — Original style */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/cities/${city.slug}`}
            className={`${city.bg} group rounded-2xl border border-black/5 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium">{city.name}</span>
              <ArrowRight size={18} className="text-stone/30 transition-all group-hover:translate-x-1 group-hover:text-celadon" />
            </div>
            <p className="mt-1 text-sm text-stone">{city.tag}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {city.type.map((t) => (
                <span key={t} className="inline-block rounded-full bg-white/50 px-2.5 py-0.5 text-[11px] text-stone">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
