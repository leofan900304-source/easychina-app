import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Essential Apps for China Travel",
  description:
    "Must-install apps before arriving in China: Alipay, WeChat, DiDi, Amap, Trip.com, Meituan, REDnote, and Youdao Translate. iOS and Android links included.",
};

const apps = [
  {
    name: "支付宝 (Alipay)",
    category: "Payment",
    desc: "Everything from paying at restaurants to buying train tickets. Essential.",
    urlIos: "https://apps.apple.com/app/id333206289",
    urlAndroid: "https://play.google.com/store/apps/details?id=com.eg.android.AlipayGphone",
    labelIos: "App Store",
    labelAndroid: "Google Play",
  },
  {
    name: "微信 (WeChat)",
    category: "Messaging + Payment",
    desc: "China's super app — messaging, payments, and mini-programs.",
    urlIos: "https://apps.apple.com/app/id414478124",
    urlAndroid: "https://play.google.com/store/apps/details?id=com.tencent.mm",
    labelIos: "App Store",
    labelAndroid: "Google Play",
  },
  {
    name: "滴滴出行 (DiDi)",
    category: "Ride-hailing",
    desc: "China's Uber. Has an English version. Bind your card in advance.",
    urlIos: "https://apps.apple.com/app/id1362398401",
    urlAndroid: "https://www.didiglobal.com/app",
    labelIos: "App Store",
    labelAndroid: "Official APK",
  },
  {
    name: "高德地图 (Amap)",
    category: "Navigation",
    desc: "Best map app in China. Public transport directions are excellent.",
    urlIos: "https://apps.apple.com/app/id461703208",
    urlAndroid: "https://mobile.amap.com/",
    labelIos: "App Store",
    labelAndroid: "Official APK",
  },
  {
    name: "Trip.com",
    category: "Travel Booking",
    desc: "Hotels, flights, train tickets in English. Accepts foreign cards.",
    urlIos: "https://apps.apple.com/app/id681752345",
    urlAndroid: "https://www.trip.com/pages/appdownload/",
    labelIos: "App Store",
    labelAndroid: "Official APK",
  },
  {
    name: "REDnote (小红书)",
    category: "Social / Discovery",
    desc: "Travel inspiration & hidden gems from locals. International version.",
    urlIos: "https://apps.apple.com/app/id741292507",
    urlAndroid: "https://www.xiaohongshu.com/explore/download",
    labelIos: "App Store",
    labelAndroid: "Official APK",
  },
  {
    name: "美团 (Meituan)",
    category: "Food / Local Services",
    desc: "Food delivery, restaurant reviews, movie tickets, and more.",
    urlIos: "https://www.meituan.com/mobile/",
    urlAndroid: "https://www.meituan.com/mobile/",
    labelIos: "Official Site",
    labelAndroid: "Official APK",
  },
  {
    name: "有道翻译官 (Youdao)",
    category: "Translation",
    desc: "Translate text, voice & camera. Essential for menus and signs.",
    urlIos: "https://fanyi.youdao.com/download.html",
    urlAndroid: "https://fanyi.youdao.com/download.html",
    labelIos: "Official Site",
    labelAndroid: "Official APK",
  },
];

export default function AppsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <Link href="/prepare" className="mb-8 inline-flex items-center gap-1.5 text-xs text-stone transition-colors hover:text-ink">
        <ArrowLeft size={14} />
        Back to Prepare
      </Link>

      <h1 className="text-3xl font-[450] tracking-tight">Essential Apps</h1>
      <p className="mt-3 text-sm text-stone">
        Install these before you arrive for a smooth trip.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {apps.map((app) => (
          <div
            key={app.name}
            className="group rounded-2xl border border-black/5 bg-surface-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-medium">{app.name}</h2>
                <span className="text-[11px] text-celadon">{app.category}</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-stone">{app.desc}</p>
            <div className="mt-3 flex gap-2">
              <a href={app.urlIos} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg bg-black/5 px-3 py-1.5 text-[11px] font-medium text-stone transition-all hover:bg-black/10">
                🍎 {app.labelIos}
              </a>
              <a href={app.urlAndroid} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg bg-black/5 px-3 py-1.5 text-[11px] font-medium text-stone transition-all hover:bg-black/10">
                ▶️ {app.labelAndroid}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
