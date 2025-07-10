import { toThousand } from '@/utils/toThousand';

describe('toThousand', () => {
  it('formats positive integer with currency', () => {
    expect(toThousand(1234567)).toBe('NT$ 1,234,567');
  });

  it('formats negative integer with currency', () => {
    expect(toThousand(-9876543)).toBe('NT$ -9,876,543');
  });

  it('formats decimal with currency', () => {
    expect(toThousand(12345.67)).toBe('NT$ 12,345.67');
  });

  it('formats string number with currency', () => {
    expect(toThousand('100200300')).toBe('NT$ 100,200,300');
  });

  it('formats zero with currency', () => {
    expect(toThousand(0)).toBe('NT$ 0');
  });

  it('formats without currency when showCurrency=false', () => {
    expect(toThousand(1234567, false)).toBe('1,234,567');
  });

  it('handles non-numeric string gracefully', () => {
    expect(toThousand('abc')).toBe('NT$ abc');
  });
});
