import { render, screen } from '@testing-library/react';
import TotalSection from '@/components/TotalSection';

describe('TotalSection', () => {
  it('renders subtotal and total correctly', () => {
    const items = [
      { id: '1', name: 'A', hourlyRate: 100, hours: 2 },
      { id: '2', name: 'B', hourlyRate: 200, hours: 1 },
    ];
    render(<TotalSection items={items} />);
    expect(screen.getByTestId('subtotal-amount')).toHaveTextContent('NT$ 400');
    expect(screen.getByTestId('total-amount')).toHaveTextContent('NT$ 400');
  });

  it('renders 0 when items is empty', () => {
    render(<TotalSection items={[]} />);
    expect(screen.getByTestId('subtotal-amount')).toHaveTextContent('NT$ 0');
    expect(screen.getByTestId('total-amount')).toHaveTextContent('NT$ 0');
  });
});
