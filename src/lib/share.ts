/**
 * Encode itinerary data into a URL-safe base64 string for sharing.
 */
export function encodeItinerary(data: unknown): string {
  const json = JSON.stringify(data);
  return btoa(encodeURIComponent(json));
}

/**
 * Decode itinerary data from a URL-safe base64 string.
 */
export function decodeItinerary<T = unknown>(encoded: string): T | null {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    return null;
  }
}

/**
 * Build a full share URL for an itinerary.
 */
export function buildShareUrl(encoded: string): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/plan/result/shared?d=${encoded}`;
}
