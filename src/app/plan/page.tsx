"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

/* ===== Step definitions ===== */
type TravelPreferences = {
  departureCity: string;
  entryCity: string;
  exitCity: string;
  duration: number;
  budget: "budget" | "economic" | "comfortable" | "luxury";
  companions: "solo" | "couple" | "friends" | "family_kids" | "family_elderly";
  firstTime: boolean;
  appFamiliarity: number; // 1–5
  preferences: string[];
  pace: "packed" | "balanced" | "relaxed";
  diet: string[];
  specialNeeds: string;
};

const departureCities = [
  { value: "new_york", label: "New York (JFK)" },
  { value: "los_angeles", label: "Los Angeles (LAX)" },
  { value: "san_francisco", label: "San Francisco (SFO)" },
  { value: "london", label: "London (LHR)" },
  { value: "paris", label: "Paris (CDG)" },
  { value: "sydney", label: "Sydney (SYD)" },
  { value: "tokyo", label: "Tokyo (NRT)" },
  { value: "seoul", label: "Seoul (ICN)" },
  { value: "singapore", label: "Singapore (SIN)" },
  { value: "bangkok", label: "Bangkok (BKK)" },
  { value: "kuala_lumpur", label: "Kuala Lumpur (KUL)" },
  { value: "other", label: "Other" },
];

const entryCities = [
  { value: "beijing_capital", label: "北京首都 (PEK)" },
  { value: "beijing_daxing", label: "北京大兴 (PKX)" },
  { value: "shanghai_pudong", label: "上海浦东 (PVG)" },
  { value: "shanghai_hongqiao", label: "上海虹桥 (SHA)" },
  { value: "guangzhou_baiyun", label: "广州白云 (CAN)" },
  { value: "chengdu_tianfu", label: "成都天府 (TFU)" },
  { value: "xian_xianyang", label: "西安咸阳 (XIY)" },
  { value: "chongqing_jiangbei", label: "重庆江北 (CKG)" },
];

const preferenceOptions = [
  { id: "history", label: "History & Culture", emoji: "🏛️", desc: "Historic sites, museums, ancient cities" },
  { id: "nature", label: "Nature & Scenery", emoji: "⛰️", desc: "Mountains, lakes, national parks" },
  { id: "urban", label: "Modern City", emoji: "🌃", desc: "Skylines, shopping, nightlife" },
  { id: "food", label: "Food Exploration", emoji: "🍜", desc: "Street food, local cuisine" },
  { id: "tech", label: "Tech & Innovation", emoji: "🔬", desc: "Tech parks, modern facilities" },
  { id: "culture", label: "Cultural Experiences", emoji: "🎭", desc: "Ethnic minority culture, handicrafts" },
  { id: "relax", label: "Leisure & Relaxation", emoji: "♨️", desc: "Hot springs, resorts, slow pace" },
  { id: "adventure", label: "Outdoor Adventure", emoji: "🧗", desc: "Hiking, cycling, extreme sports" },
];

const dietOptions = [
  { id: "none", label: "No restrictions" },
  { id: "vegetarian", label: "Vegetarian / Vegan" },
  { id: "halal", label: "Halal" },
  { id: "no_spicy", label: "No spicy" },
];

export default function PlanPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const [form, setForm] = useState<TravelPreferences>({
    departureCity: "",
    entryCity: "",
    exitCity: "",
    duration: 5,
    budget: "comfortable",
    companions: "solo",
    firstTime: true,
    appFamiliarity: 2,
    preferences: [],
    pace: "balanced",
    diet: [],
    specialNeeds: "",
  });

  const update = (key: keyof TravelPreferences, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const togglePreference = (id: string) => {
    setForm((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(id)
        ? prev.preferences.filter((p) => p !== id)
        : [...prev.preferences, id].slice(0, 3),
    }));
  };

  const toggleDiet = (id: string) => {
    setForm((prev) => ({
      ...prev,
      diet: prev.diet.includes(id)
        ? prev.diet.filter((d) => d !== id)
        : [...prev.diet, id],
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      // Store the result in sessionStorage and redirect
      sessionStorage.setItem("itinerary", JSON.stringify(data));
      router.push("/plan/result/custom");
    } catch {
      // Fallback: use demo data if API fails
      router.push("/plan/result/demo");
    } finally {
      setIsGenerating(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return form.entryCity !== "";
    if (step === 2) return form.preferences.length > 0;
    return true;
  };

  // Loading state
  if (isGenerating) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
        <div className="text-center animate-fade-in">
          {/* Loading animation */}
          <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-celadon/20" />
            <div className="absolute inset-2 rounded-full bg-celadon/30" />
            <Sparkles size={28} className="relative text-celadon" />
          </div>
          <p className="text-lg font-medium">Crafting your personalized itinerary</p>
          <p className="mt-2 text-sm text-stone">
            Analyzing preferences, matching cities, planning routes...
          </p>
          <div className="mx-auto mt-8 h-1 w-48 overflow-hidden rounded-full bg-celadon/10">
            <div className="h-full w-1/2 animate-[slide_1.5s_ease-in-out_infinite] rounded-full bg-celadon/40" />
          </div>
        </div>
        <style jsx>{`
          @keyframes slide {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(200%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 md:py-20">
      {/* Step indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                  s === step
                    ? "bg-celadon text-paper"
                    : s < step
                      ? "bg-celadon/20 text-celadon"
                      : "bg-black/5 text-stone/40"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              {s < 3 && (
                <div
                  className={`h-px w-8 transition-colors duration-300 ${
                    s < step ? "bg-celadon/40" : "bg-black/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs font-medium tracking-[3px] text-stone/60 uppercase">
          {step === 1 && "Basic Info"}
          {step === 2 && "Preferences"}
          {step === 3 && "Details"}
        </p>
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="animate-fade-in space-y-6">
          <h2 className="text-2xl font-[450]">Where and when?</h2>

          {/* Departure city */}
          <div>
            <label className="mb-2 block text-sm font-medium">Departure City <span className="text-stone/50">(where you're flying from)</span></label>
            <select
              value={form.departureCity}
              onChange={(e) => update("departureCity", e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm outline-none transition-colors focus:border-celadon focus:ring-1 focus:ring-celadon/20"
            >
              <option value="">Select departure...</option>
              {departureCities.map((city) => (
                <option key={city.value} value={city.value}>{city.label}</option>
              ))}
            </select>
          </div>

          {/* Entry city */}
          <div>
            <label className="mb-2 block text-sm font-medium">Entry Airport (in China)</label>
            <select
              value={form.entryCity}
              onChange={(e) => update("entryCity", e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm outline-none transition-colors focus:border-celadon focus:ring-1 focus:ring-celadon/20"
            >
              <option value="">Select your entry city...</option>
              {entryCities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>

          {/* Exit city */}
          <div>
            <label className="mb-2 block text-sm font-medium">Exit Airport (leave China from)</label>
            <select
              value={form.exitCity}
              onChange={(e) => update("exitCity", e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm outline-none transition-colors focus:border-celadon focus:ring-1 focus:ring-celadon/20"
            >
              <option value="">Select exit city...</option>
              {entryCities.map((city) => (
                <option key={city.value} value={city.value}>{city.label}</option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Duration: <span className="text-celadon">{form.duration} days</span>
            </label>
            <input
              type="range"
              min={1}
              max={30}
              value={form.duration}
              onChange={(e) => update("duration", Number(e.target.value))}
              className="w-full accent-celadon"
            />
            <div className="mt-1 flex justify-between text-xs text-stone/50">
              <span>1 day</span>
              <span>30 days</span>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="mb-2 block text-sm font-medium">Budget</label>
            <div className="grid grid-cols-4 gap-2">
              {(["budget", "economic", "comfortable", "luxury"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => update("budget", b)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${
                    form.budget === b
                      ? "border-celadon bg-celadon/10 text-celadon"
                      : "border-black/5 bg-white/40 text-stone hover:border-black/10"
                  }`}
                >
                  {b === "budget" && "🎒 Budget"}
                  {b === "economic" && "💰 Economic"}
                  {b === "comfortable" && "🌟 Comfortable"}
                  {b === "luxury" && "👑 Luxury"}
                </button>
              ))}
            </div>
          </div>

          {/* Companions */}
          <div>
            <label className="mb-2 block text-sm font-medium">Traveling with</label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {([
                { value: "solo", label: "Solo" },
                { value: "couple", label: "Couple" },
                { value: "friends", label: "Friends" },
                { value: "family_kids", label: "Family (kids)" },
                { value: "family_elderly", label: "Family (elderly)" },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update("companions", opt.value)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${
                    form.companions === opt.value
                      ? "border-celadon bg-celadon/10 text-celadon"
                      : "border-black/5 bg-white/40 text-stone hover:border-black/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* First time + App familiarity */}
          <div className="flex flex-col gap-4 rounded-xl bg-white/30 p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 sm:flex-1">
              <span className="text-sm">First time in China?</span>
              <button
                onClick={() => update("firstTime", true)}
                className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-all ${
                  form.firstTime
                    ? "bg-celadon text-paper"
                    : "bg-black/5 text-stone"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => update("firstTime", false)}
                className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-all ${
                  !form.firstTime
                    ? "bg-celadon text-paper"
                    : "bg-black/5 text-stone"
                }`}
              >
                No
              </button>
            </div>
            <div className="sm:flex-1">
              <span className="text-sm">
                Chinese Apps familiarity:{" "}
                <span className="text-celadon">
                  {["None", "A little", "Some", "Quite", "Pro"][
                    form.appFamiliarity - 1
                  ]}
                </span>
              </span>
              <input
                type="range"
                min={1}
                max={5}
                value={form.appFamiliarity}
                onChange={(e) =>
                  update("appFamiliarity", Number(e.target.value))
                }
                className="mt-1 w-full accent-celadon"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Preferences */}
      {step === 2 && (
        <div className="animate-fade-in space-y-6">
          <h2 className="text-2xl font-[450]">What do you love?</h2>
          <p className="text-sm text-stone">Choose up to 3 preferences</p>

          {/* Quick Tags — Gemini suggestion */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "food", label: "#Foodie 🍜" },
              { id: "history", label: "#Historian 🏛️" },
              { id: "nature", label: "#NatureLover ⛰️" },
              { id: "urban", label: "#CityExplorer 🌃" },
              { id: "tech", label: "#TechGeek 🔬" },
              { id: "culture", label: "#CultureSeeker 🎭" },
              { id: "relax", label: "#ChillVibes ♨️" },
              { id: "adventure", label: "#Adventurer 🧗" },
              { id: "budget", label: "#BudgetTraveler 💰" },
            ].map((tag) => (
              <button
                key={tag.id}
                onClick={() => togglePreference(tag.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  form.preferences.includes(tag.id)
                    ? "border-celadon bg-celadon/10 text-celadon"
                    : "border-black/5 bg-white/40 text-stone hover:border-black/10 hover:bg-white/60"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {preferenceOptions.map((opt) => {
              const selected = form.preferences.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => togglePreference(opt.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    selected
                      ? "border-celadon bg-celadon/5"
                      : "border-black/5 bg-white/30 hover:border-black/10"
                  }`}
                >
                  <span className="text-lg">{opt.emoji} {opt.label}</span>
                  <p className="mt-1 text-xs text-stone">{opt.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Pace */}
          <div>
            <label className="mb-2 block text-sm font-medium">Pace</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: "packed", label: "Packed", desc: "Full schedule every day" },
                { value: "balanced", label: "Balanced", desc: "Mix of busy and relaxed" },
                { value: "relaxed", label: "Relaxed", desc: "Take it slow" },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update("pace", opt.value)}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    form.pace === opt.value
                      ? "border-celadon bg-celadon/10 text-celadon"
                      : "border-black/5 bg-white/40 text-stone hover:border-black/10"
                  }`}
                >
                  <span className="text-sm font-medium">{opt.label}</span>
                  <p className="mt-0.5 text-xs opacity-60">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <div className="animate-fade-in space-y-6">
          <h2 className="text-2xl font-[450]">Any restrictions?</h2>

          <div>
            <label className="mb-2 block text-sm font-medium">Dietary</label>
            <div className="flex flex-wrap gap-2">
              {dietOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleDiet(opt.id)}
                  className={`rounded-xl border px-4 py-2 text-xs font-medium transition-all ${
                    form.diet.includes(opt.id)
                      ? "border-celadon bg-celadon/10 text-celadon"
                      : "border-black/5 bg-white/40 text-stone hover:border-black/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Special needs <span className="text-stone/50">(optional)</span>
            </label>
            <textarea
              value={form.specialNeeds}
              onChange={(e) => update("specialNeeds", e.target.value)}
              placeholder="e.g. wheelchair accessible, allergies, afraid of heights..."
              className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm outline-none transition-colors focus:border-celadon focus:ring-1 focus:ring-celadon/20"
              rows={3}
            />
          </div>

          <div className="rounded-xl border border-osmanthus/20 bg-osmanthus/5 p-4">
            <p className="text-xs font-medium text-osmanthus">
              💡 AI Assistant
            </p>
            <p className="mt-1 text-sm text-stone">
              You can also chat with our AI to refine your itinerary after
              generation.
            </p>
          </div>
        </div>
      )}

      {/* Bottom buttons */}
      <div className="mt-10 flex items-center justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="btn-secondary text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className={`btn-primary text-sm ${
              !canProceed() && "pointer-events-none opacity-40"
            }`}
          >
            Next
            <ArrowRight size={16} />
          </button>
        ) : (
          <button onClick={handleGenerate} className="btn-primary text-sm">
            <Sparkles size={16} />
            Generate My Guide
          </button>
        )}
      </div>
    </div>
  );
}
