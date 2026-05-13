import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let rateLimiters: Map<string, Ratelimit> | null = null;

function getRedis() {
  const url = process.env.UPSTASH_REDIS_URL;
  const token = process.env.UPSTASH_REDIS_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function initRateLimiters(): Map<string, Ratelimit> | null {
  const redis = getRedis();
  if (!redis) return null;

  if (!rateLimiters) {
    rateLimiters = new Map();
  }
  return rateLimiters;
}

/**
 * Apply rate limiting to an API route. Falls back silently (no limit)
 * if Upstash Redis is not configured.
 *
 * @param ip - Client IP (x-forwarded-for or similar)
 * @param key - Unique key for this rate limit bucket
 * @param limit - Max requests
 * @param window - Time window (e.g. "1 m" = 1 minute)
 * @returns true if allowed, false if rate limited
 */
export async function checkRateLimit(
  ip: string,
  key: string,
  limit: number,
  window: `${number} ${"s" | "m" | "h" | "d"}`,
): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return true; // no Upstash configured — allow all

  const bucketKey = `${key}:${ip}`;

  // Create ratelimit per-bucket to avoid shared state issues
  let rl = rateLimiters?.get(key);
  if (!rl) {
    rl = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, window),
      analytics: false,
    });
    rateLimiters?.set(key, rl);
  }

  const { success } = await rl.limit(bucketKey);
  return success;
}

/**
 * Extract client IP from request headers. Returns "anonymous" if not found.
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}
