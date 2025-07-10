import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/prototype/Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>測試按鈕</Button>);
    expect(screen.getByText('測試按鈕')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    await userEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant and size classes', () => {
    render(
      <>
        <Button variant="primary" size="sm">
          A
        </Button>
        <Button variant="secondary" size="md">
          B
        </Button>
        <Button variant="ghost" size="lg">
          C
        </Button>
        <Button variant="error">D</Button>
        <Button variant="warning">E</Button>
      </>,
    );
    expect(screen.getByText('A')).toHaveClass('bg-blue-600');
    expect(screen.getByText('B')).toHaveClass('bg-gray-200');
    expect(screen.getByText('C')).toHaveClass('bg-transparent');
    expect(screen.getByText('D')).toHaveClass('bg-red-500');
    expect(screen.getByText('E')).toHaveClass('bg-yellow-400');
  });

  it('applies type, className, tabIndex, autoFocus, id, aria-label', () => {
    render(
      <Button
        type="submit"
        className="test-class"
        tabIndex={2}
        autoFocus
        id="test-btn"
        aria-label="自訂標籤"
      >
        送出
      </Button>,
    );
    const btn = screen.getByRole('button', { name: '自訂標籤' });
    expect(btn).toHaveAttribute('type', 'submit');
    expect(btn).toHaveClass('test-class');
    expect(btn).toHaveAttribute('tabindex', '2');
    expect(btn).toHaveAttribute('id', 'test-btn');
    expect(btn).toHaveAttribute('aria-label', '自訂標籤');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });
});
