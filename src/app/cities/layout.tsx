import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Cities to Visit in China",
  description:
    "Browse China's top destinations — Beijing, Shanghai, Xi'an, Chengdu, Guilin, and more. Find your perfect city match by culture, food, nature, or urban vibe.",
};

export default function CitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
