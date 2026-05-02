import { ZodiacSign } from './types.ts';

export const ZODIAC_DATA: Record<ZodiacSign, { start: string; end: string; symbol: string }> = {
  [ZodiacSign.Aries]: { start: '03-21', end: '04-19', symbol: '♈' },
  [ZodiacSign.Taurus]: { start: '04-20', end: '05-20', symbol: '♉' },
  [ZodiacSign.Gemini]: { start: '05-21', end: '06-20', symbol: '♊' },
  [ZodiacSign.Cancer]: { start: '06-21', end: '07-22', symbol: '♋' },
  [ZodiacSign.Leo]: { start: '07-23', end: '08-22', symbol: '♌' },
  [ZodiacSign.Virgo]: { start: '08-23', end: '09-22', symbol: '♍' },
  [ZodiacSign.Libra]: { start: '09-23', end: '10-22', symbol: '♎' },
  [ZodiacSign.Scorpio]: { start: '10-23', end: '11-21', symbol: '♏' },
  [ZodiacSign.Sagittarius]: { start: '11-22', end: '12-21', symbol: '♐' },
  [ZodiacSign.Capricorn]: { start: '12-22', end: '01-19', symbol: '♑' },
  [ZodiacSign.Aquarius]: { start: '01-20', end: '02-18', symbol: '♒' },
  [ZodiacSign.Pisces]: { start: '02-19', end: '03-20', symbol: '♓' },
};

export function getZodiacSign(date: Date): ZodiacSign {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  for (const [sign, data] of Object.entries(ZODIAC_DATA)) {
    if (sign === 'Capricorn') {
      if (dateStr >= '12-22' || dateStr <= '01-19') return ZodiacSign.Capricorn;
    } else {
      if (dateStr >= data.start && dateStr <= data.end) return sign as ZodiacSign;
    }
  }
  return ZodiacSign.Aries; // Fallback
}

export const MOCK_TRANSITS = [
  {
    planet: 'Mercury',
    sign: ZodiacSign.Libra,
    date: '2024-10-15',
    description: 'Mercury enters Libra. Focus on diplomacy, relationships, and finding balance in communication.'
  },
  {
    planet: 'Venus',
    sign: ZodiacSign.Scorpio,
    date: '2024-10-18',
    description: 'Venus in Scorpio brings intensity to passions. Deep connections and emotional honesty are favored.'
  },
  {
    planet: 'Mars',
    sign: ZodiacSign.Cancer,
    date: '2024-10-20',
    description: 'Mars in Cancer highlights domestic activities. Protective instincts are high, but avoid passive-aggression.'
  }
];
