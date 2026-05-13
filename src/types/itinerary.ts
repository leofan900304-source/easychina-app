export interface ItineraryItem {
  time: string;
  content: string;
  type: string;
  cn?: string;
  metro?: string;
  walking?: string;
  driver?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  items: ItineraryItem[];
  tips: string[];
}

export interface ItineraryData {
  route: string;
  days: ItineraryDay[];
  paymentTips: string[];
  transportTips: string[];
  appTips: string[];
}

export const typeIcons: Record<string, string> = {
  transport: "🚄",
  hotel: "🏨",
  sight: "📍",
  food: "🍜",
  shopping: "🛍️",
};
