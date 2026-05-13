import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gochina-rouge.vercel.app";

  const staticRoutes = [
    "",
    "/plan",
    "/cities",
    "/prepare",
    "/prepare/sim",
    "/prepare/payment",
    "/prepare/visa",
    "/prepare/apps",
    "/prepare/checklist",
    "/faq",
    "/about",
  ];

  const citySlugs = [
    "beijing",
    "shanghai",
    "guangzhou",
    "xian",
    "chengdu",
    "chongqing",
    "guilin",
    "lijiang",
    "hangzhou",
    "kunming",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const cityEntries = citySlugs.map((slug) => ({
    url: `${baseUrl}/cities/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...cityEntries];
}
