import { render } from '@testing-library/react';
import NotFound from '@/app/not-found';

const replace = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace }),
}));

describe('NotFound', () => {
  it('calls router.replace on mount', () => {
    render(<NotFound />);
    expect(replace).toHaveBeenCalledWith('/');
  });
});
