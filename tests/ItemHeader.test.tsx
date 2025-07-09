import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemHeader from '@/components/QuotationForm/ItemList/ItemHeader';
import React from 'react';

describe('ItemHeader', () => {
  it('renders 新增 button', () => {
    render(<ItemHeader onAddItem={vi.fn()} />);
    expect(screen.getByRole('button', { name: '新增' })).toBeInTheDocument();
  });

  it('calls onAddItem when button clicked', async () => {
    const onAddItem = vi.fn();
    render(<ItemHeader onAddItem={onAddItem} />);
    const btn = screen.getByRole('button', { name: '新增' });
    await userEvent.click(btn);
    expect(onAddItem).toHaveBeenCalled();
  });
});
