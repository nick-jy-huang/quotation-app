import { renderWithIntl } from './test-utils';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemList from '@/components/QuotationForm/ItemList';
import React from 'react';

describe('ItemList', () => {
  const baseItems = [
    { id: '1', name: '項目A', hourlyRate: 100, hours: 2 },
    { id: '2', name: '項目B', hourlyRate: 200, hours: 1 },
  ];

  it('renders all items and input fields', () => {
    renderWithIntl(
      <ItemList
        items={baseItems}
        addItem={vi.fn()}
        updateItem={vi.fn()}
        removeItem={vi.fn()}
        reorderItems={vi.fn()}
      />,
    );
    expect(screen.getByTestId('item-name-0')).toBeInTheDocument();
    expect(screen.getByTestId('item-name-1')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('請輸入時薪...').length).toBeGreaterThan(0);
    expect(screen.getAllByPlaceholderText('請輸入時數...').length).toBeGreaterThan(0);
  });

  it('calls addItem when add button clicked', async () => {
    const addItem = vi.fn();
    renderWithIntl(
      <ItemList
        items={baseItems}
        addItem={addItem}
        updateItem={vi.fn()}
        removeItem={vi.fn()}
        reorderItems={vi.fn()}
      />,
    );
    const addBtn = screen.getByRole('button', { name: '新增' });
    await userEvent.click(addBtn);
    expect(addItem).toHaveBeenCalled();
  });

  it('calls updateItem when input changes', async () => {
    const updateItem = vi.fn();
    function ControlledItemList(props: any) {
      const [items, setItems] = React.useState(baseItems);
      return (
        <ItemList
          {...props}
          items={items}
          updateItem={(id, field, value) => {
            setItems((items) =>
              items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
            );
            updateItem(id, field, value);
          }}
        />
      );
    }
    renderWithIntl(
      <ControlledItemList
        addItem={vi.fn()}
        updateItem={updateItem}
        removeItem={vi.fn()}
        reorderItems={vi.fn()}
      />,
    );
    const nameInput = screen.getByTestId('item-name-0');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, '新名稱');
    await new Promise((r) => setTimeout(r, 350));
    expect(updateItem).toHaveBeenCalled();
  });

  it('calls removeItem when remove button clicked', async () => {
    const removeItem = vi.fn();
    renderWithIntl(
      <ItemList
        items={baseItems}
        addItem={vi.fn()}
        updateItem={vi.fn()}
        removeItem={removeItem}
        reorderItems={vi.fn()}
      />,
    );
    const removeBtns = screen.getAllByLabelText('刪除');
    await userEvent.click(removeBtns[0]);
    expect(removeItem).toHaveBeenCalled();
  });

  it('renders nothing for items input when items is empty', () => {
    renderWithIntl(
      <ItemList
        items={[]}
        addItem={vi.fn()}
        updateItem={vi.fn()}
        removeItem={vi.fn()}
        reorderItems={vi.fn()}
      />,
    );
    expect(screen.queryByTestId('item-name-0')).toBeNull();
  });
});
