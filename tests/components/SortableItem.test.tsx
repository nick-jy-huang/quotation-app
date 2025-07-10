import { renderWithIntl } from '@/tests/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortableItem from '@/components/QuotationForm/ItemList/SortableItem';
import React from 'react';

describe('SortableItem', () => {
  const item = { id: '1', name: '項目A', hourlyRate: 100, hours: 2, total: 200 };
  it('renders all input fields', () => {
    renderWithIntl(
      <SortableItem
        item={item}
        index={0}
        updateItem={vi.fn()}
        removeItem={vi.fn()}
        itemsLength={2}
      />,
    );
    expect(screen.getByLabelText('項目 1')).toBeInTheDocument();
    expect(screen.getByLabelText('時薪')).toBeInTheDocument();
    expect(screen.getByLabelText('時數')).toBeInTheDocument();
    expect(screen.getByLabelText('刪除')).toBeInTheDocument();
  });

  it('calls updateItem when input changes', async () => {
    const updateItem = vi.fn();
    renderWithIntl(
      <SortableItem
        item={item}
        index={0}
        updateItem={updateItem}
        removeItem={vi.fn()}
        itemsLength={2}
      />,
    );
    const nameInput = screen.getByLabelText('項目 1');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, '新項目');
    await new Promise((r) => setTimeout(r, 350));
    expect(updateItem).toHaveBeenCalled();
  });

  it('calls removeItem when 刪除 clicked', async () => {
    const removeItem = vi.fn();
    renderWithIntl(
      <SortableItem
        item={item}
        index={0}
        updateItem={vi.fn()}
        removeItem={removeItem}
        itemsLength={2}
      />,
    );
    const removeBtn = screen.getByLabelText('刪除');
    await userEvent.click(removeBtn);
    expect(removeItem).toHaveBeenCalled();
  });
});
