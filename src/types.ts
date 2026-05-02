export enum ZodiacSign {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Scorpio',
  Sagittarius = 'Sagittarius',
  Capricorn = 'Capricorn',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces',
}

export type UserMood = 'focused' | 'anxious' | 'confident' | 'flow' | 'restless' | 'low-energy';

export interface UserProfile {
  name: string;
  birthDate: string; // ISO string
  birthTime?: string; // HH:mm
  birthPlace: string;
  zodiacSign: ZodiacSign;
  ascendant?: string;
}

export interface HoroscopeReading {
  sign: ZodiacSign;
  date: string;
  mood: UserMood;
  summary: string;
  focus: string;
  avoid: string;
  luckyTiming: string;
  energyLevel: number; // 1-100
  love: string;
  career: string;
  wellness: string;
  luckNumber: number;
  luckyColor: string;
  compatibleSigns: ZodiacSign[];
}

export interface PlanetaryTransit {
  planet: string;
  sign: ZodiacSign;
  date: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AstrologyReminder {
  id: string;
  eventName: string;
  date: string;
  type: 'transit' | 'moon' | 'eclipse';
}

export type AppScreen = 'onboarding' | 'dashboard' | 'chart' | 'compatibility' | 'transits' | 'chat' | 'profile';
