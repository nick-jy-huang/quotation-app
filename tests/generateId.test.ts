import { generateId } from '@/utils/generateId';

describe('generateId', () => {
  it('should return a string of length 9', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id).toHaveLength(9);
  });

  it('should generate unique ids', () => {
    const ids = new Set(Array.from({ length: 1000 }, generateId));
    expect(ids.size).toBe(1000);
  });

  it('should only contain alphanumeric characters', () => {
    const id = generateId();
    expect(id).toMatch(/^[a-z0-9]{9}$/);
  });
});
