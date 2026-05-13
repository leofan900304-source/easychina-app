/**
 * Encode itinerary data into a URL-safe base64 string for sharing.
 * Handles non-ASCII characters (Chinese, emoji) correctly via UTF-8.
 */
export function encodeItinerary(data: unknown): string {
  const json = JSON.stringify(data);
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) {
    bin += String.fromCharCode(bytes[i]);
  }
  return btoa(bin);
}

/**
 * Decode itinerary data from a URL-safe base64 string.
 */
export function decodeItinerary<T = unknown>(encoded: string): T | null {
  try {
    const bin = atob(encoded);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    return JSON.parse(new TextDecoder().decode(bytes));
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
