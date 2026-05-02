import { GoogleGenAI } from "@google/genai";
import { ZodiacSign, HoroscopeReading, UserProfile, UserMood } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const MODEL_NAME = "gemini-3-flash-preview";

export async function generateHoroscope(profile: UserProfile, mood: UserMood): Promise<HoroscopeReading> {
  const prompt = `Generate a highly personalized daily horoscope for ${profile.name}, a ${profile.zodiacSign} (Born ${profile.birthDate} at ${profile.birthPlace}). 
  User's current mood: ${mood}.
  Return MUST be a JSON object with this exact schema:
  {
    "sign": "${profile.zodiacSign}",
    "date": "${new Date().toISOString().split('T')[0]}",
    "mood": "${mood}",
    "summary": "Deep insight relevant to their mood and sign",
    "focus": "Immediate actionable focus for today",
    "avoid": "What they should steer clear of today",
    "luckyTiming": "One specific timeframe (e.g., 2:00 PM - 4:00 PM) and why",
    "energyLevel": number (1-100),
    "love": "Insight on relationships",
    "career": "Insight on work",
    "wellness": "Health/spiritual advice",
    "luckNumber": number,
    "luckyColor": "Color name",
    "compatibleSigns": ["ZodiacSign", "ZodiacSign"]
  }
  Tone: Sage, mystical, yet practically useful. Avoid generic fluff. Use the user's specific birth context.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text returned from Gemini");
    return JSON.parse(text) as HoroscopeReading;
  } catch (error) {
    console.error("Error generating personalized horoscope:", error);
    // Meaningful fallback
    return {
      sign: profile.zodiacSign,
      date: new Date().toISOString().split('T')[0],
      mood: mood,
      summary: `In your ${mood} state, the planetary alignment suggests a period of introspection for ${profile.zodiacSign}. Your birth coordinates currently harmonize with the shifting tides.`,
      focus: "Prioritize gentle movement and clear communication.",
      avoid: "Large financial commitments or exhaustive social obligations.",
      luckyTiming: "Late afternoon as the sun dips below the horizon.",
      energyLevel: 62,
      love: "Patience is your greatest romantic asset today.",
      career: "A minor breakthrough in a complex task is imminent.",
      wellness: "Check your breathing; ensure you are not holding tension in your jaw.",
      luckNumber: 11,
      luckyColor: "Celestial Blue",
      compatibleSigns: [ZodiacSign.Gemini, ZodiacSign.Aquarius]
    };
  }
}

export async function getAstrologyResponse(history: { role: string; content: string }[], profile: UserProfile): Promise<string> {
  try {
    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: `You are 'Cosmic Oracle' from the Zentara app. You are a professional, high-end astrologer. 
        You are conversing with ${profile.name}, a ${profile.zodiacSign} born on ${profile.birthDate} in ${profile.birthPlace}. 
        Reference their specific birth details and zodiac nature when answering. 
        Your tone is sophisticated, mystical yet grounded, and deeply encouraging. 
        Maintain context from previous messages. Keep responses concise and perfectly formatted for a mobile interface.`
      },
      history: history.slice(0, -1).map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      })),
    });

    const lastMessage = history[history.length - 1].content;
    const result = await chat.sendMessage({ message: lastMessage });
    return result.text || "The stars are veiled. Let us try once more.";
  } catch (error) {
    console.error("Error in AI Chat:", error);
    return "A local atmospheric disturbance has interrupted the cosmic frequency. I am still here—please clarify your inquiry.";
  }
}


