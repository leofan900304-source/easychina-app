import { NextResponse } from "next/server";

/* ===== Request Schema ===== */
interface PlanRequest {
  entryCity: string;
  duration: number;
  budget: "budget" | "economic" | "comfortable" | "luxury";
  companions: "solo" | "couple" | "friends" | "family_kids" | "family_elderly";
  firstTime: boolean;
  appFamiliarity: number;
  preferences: string[];
  pace: "packed" | "balanced" | "relaxed";
  diet: string[];
  specialNeeds: string;
}

const cityNameMap: Record<string, string> = {
  beijing_capital: "Beijing (PEK)",
  beijing_daxing: "Beijing (PKX)",
  shanghai_pudong: "Shanghai (PVG)",
  shanghai_hongqiao: "Shanghai (SHA)",
  guangzhou_baiyun: "Guangzhou (CAN)",
  chengdu_tianfu: "Chengdu (TFU)",
  xian_xianyang: "Xi'an (XIY)",
  chongqing_jiangbei: "Chongqing (CKG)",
};

const preferenceLabels: Record<string, string> = {
  history: "History & Culture",
  nature: "Nature & Scenery",
  urban: "Modern City",
  food: "Food Exploration",
  tech: "Tech & Innovation",
  culture: "Cultural Experiences",
  relax: "Leisure & Relaxation",
  adventure: "Outdoor Adventure",
};

export async function POST(request: Request) {
  try {
    const body: PlanRequest = await request.json();

    // Build prompt
    const entryCityName = cityNameMap[body.entryCity] || body.entryCity;
    const prefLabels = body.preferences.map((p) => preferenceLabels[p] || p).join(", ");
    const dietLabels = body.diet.length > 0 ? body.diet.join(", ") : "No restrictions";
    const companionLabels: Record<string, string> = {
      solo: "Solo",
      couple: "A couple",
      friends: "Friends",
      family_kids: "Family with kids",
      family_elderly: "Family with elderly",
    };
    const paceLabels: Record<string, string> = {
      packed: "Packed — full days",
      balanced: "Balanced",
      relaxed: "Relaxed — taking it easy",
    };
    const budgetLabels: Record<string, string> = {
      budget: "Budget (backpacker)",
      economic: "Economic",
      comfortable: "Comfortable",
      luxury: "Luxury",
    };

    const appLevel =
      body.appFamiliarity <= 2
        ? "Novice — needs detailed app/payment guidance"
        : "Experienced — brief app/payment tips are enough";

    // City allocation logic based on trip length
    let cityGuidance = "";
    if (body.duration <= 3) {
      cityGuidance = "Stay in 1 city (the entry city).";
    } else if (body.duration <= 7) {
      cityGuidance = "Recommend 2 cities including the entry city. Split days roughly evenly.";
    } else if (body.duration <= 14) {
      cityGuidance = "Recommend 3 cities including the entry city. Spend 4-5 days per city.";
    } else {
      cityGuidance = "Recommend 4 cities including the entry city. Spend 3-5 days per city. Use high-speed rail between cities.";
    }

    const prompt = `You are EasyChina's AI travel planner. Generate a personalized China itinerary based on the user's preferences below. Respond in valid JSON only, no markdown wrapping.

User profile:
- Entry: ${entryCityName}
- Duration: ${body.duration} days
- Budget: ${budgetLabels[body.budget]}
- Traveling with: ${companionLabels[body.companions]}
- First time in China: ${body.firstTime ? "Yes" : "No"}
- Chinese apps familiarity: ${appLevel}
- Interests: ${prefLabels}
- Pace: ${paceLabels[body.pace]}
- Dietary: ${dietLabels}
${body.specialNeeds ? `- Special needs: ${body.specialNeeds}` : ""}

CRITICAL: The "days" array MUST contain exactly ${body.duration} entries (day 1 through day ${body.duration}). Do NOT output fewer days. This is the most important requirement.

City allocation: ${cityGuidance}

Rules:
1. ${cityGuidance}
2. The "days" array MUST have ${body.duration} entries. Day 1 starts at the entry city. Number them sequentially 1,2,3...${body.duration}.
3. If multi-city, include transport between cities (high-speed rail recommended with prices) as a "transport" type item on the travel day.
4. Each day entry MUST have: time (Morning/Midday/Afternoon/Evening/Full Day), content (activity description), and type ("transport"/"hotel"/"sight"/"food"/"shopping").
5. Include practical tips per day: tickets, payment, transport, reservations.
6. Include payment tips section — tailored to the user's app familiarity level.
7. Include transport tips section — intercity + within-city.
8. Include app tips section.
9. Before ending, verify: the "days" array has exactly ${body.duration} items. If not, add more days.

Respond with this exact JSON structure:
{
  "route": "string — summary of the route like 'Beijing(4 days) → Xi'an(5 days) → Chengdu(5 days)'",
  "days": [
    {
      "day": number,
      "title": "string",
      "location": "string",
      "items": [{ "time": "string", "content": "string", "type": "string", "cn": "string (Chinese name for driver)", "metro": "string (nearest metro station in Chinese & English)", "walking": "string (exit number and walking time, e.g. '1号口步行5分钟')" }],
      "tips": ["string"]
    }
  ],
  "paymentTips": ["string"],
  "transportTips": ["string"],
  "appTips": ["string"]
}`;

    // Dynamic token allocation: longer trips need more output
    const maxTokens = body.duration <= 4
      ? 4096
      : body.duration <= 10
        ? 6144
        : 8192;

    const deepseekRes = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: maxTokens,
        }),
      }
    );

    if (!deepseekRes.ok) {
      const errorText = await deepseekRes.text();
      console.error("DeepSeek API error:", deepseekRes.status, errorText);
      return NextResponse.json(
        { error: "AI service temporarily unavailable" },
        { status: 502 }
      );
    }

    const data = await deepseekRes.json();

    // Parse the AI response
    const content = data.choices?.[0]?.message?.content || "";
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in response:", content);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const itinerary = JSON.parse(jsonMatch[0]);

    console.log(
      `[Itinerary] req=${body.duration}d | got=${itinerary.days?.length || 0}d | max_tokens=${maxTokens} | prompt_len=${prompt.length}`
    );

    if (itinerary.days && itinerary.days.length < body.duration) {
      console.warn(
        `[Itinerary] Token limit likely hit: requested ${body.duration} days, got ${itinerary.days.length}. ` +
        `max_tokens was ${maxTokens}. Consider increasing token budget.`
      );
    }

    return NextResponse.json(itinerary);
  } catch (error) {
    console.error("Itinerary generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate itinerary" },
      { status: 500 }
    );
  }
}
