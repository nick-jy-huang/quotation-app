import { renderHook, act } from '@testing-library/react';
import { useDebouncedInputValue } from '@/hooks/useDebouncedInputValue';

describe('useDebouncedInputValue', () => {
  it('returns initial value and setLocalValue updates localValue', () => {
    const { result } = renderHook(() => useDebouncedInputValue<string>('A'));
    const [localValue, setLocalValue] = result.current;
    expect(localValue).toBe('A');
    act(() => {
      setLocalValue('B');
    });
    expect(result.current[0]).toBe('B');
  });

  it('syncs localValue when value prop changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedInputValue<string>(value), {
      initialProps: { value: 'A' },
    });
    expect(result.current[0]).toBe('A');
    rerender({ value: 'C' });
    expect(result.current[0]).toBe('C');
  });

  it('calls onChange after debounce', async () => {
    const handleChange = vi.fn();
    vi.useFakeTimers();
    const { result } = renderHook(() => useDebouncedInputValue<string>('A', handleChange, 200));
    const [, setLocalValue] = result.current;
    act(() => {
      setLocalValue('B');
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(handleChange).toHaveBeenCalledWith('B');
    vi.useRealTimers();
  });

  it('does not call onChange if value does not change', () => {
    const handleChange = vi.fn();
    vi.useFakeTimers();
    renderHook(() => useDebouncedInputValue<string>('A', handleChange, 100));
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(handleChange).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
