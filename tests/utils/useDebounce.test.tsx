import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('A', 200));
    expect(result.current).toBe('A');
  });

  it('updates value after delay', async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'A' },
    });
    rerender({ value: 'B' });
    expect(result.current).toBe('A');
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('B');
    vi.useRealTimers();
  });

  it('resets timer if value changes before delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
      initialProps: { value: 'A' },
    });
    rerender({ value: 'B' });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    rerender({ value: 'C' });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('C');
    vi.useRealTimers();
  });
});
