import { act } from '@testing-library/react';
import { useQuotationStore } from '@/stores/quotationStore';

describe('useQuotationStore', () => {
  beforeEach(() => {
    useQuotationStore.setState(useQuotationStore.getInitialState());
  });

  it('addItem 新增一筆 item', () => {
    act(() => {
      useQuotationStore.getState().addItem();
    });
    const items = useQuotationStore.getState().quotation.items;
    expect(items.length).toBe(2);
  });

  it('updateItem 可更新 item 欄位', () => {
    const id = useQuotationStore.getState().quotation.items[0].id;
    act(() => {
      useQuotationStore.getState().updateItem(id, 'name', '測試項目');
    });
    const item = useQuotationStore.getState().quotation.items[0];
    expect(item.name).toBe('測試項目');
  });

  it('removeItem 可刪除 item，且至少保留一筆', () => {
    const id = useQuotationStore.getState().quotation.items[0].id;
    act(() => {
      useQuotationStore.getState().removeItem(id);
    });
    const items = useQuotationStore.getState().quotation.items;
    expect(items.length).toBe(1);
  });

  it('updateQuotation 可更新 quotation 欄位', () => {
    act(() => {
      useQuotationStore.getState().updateQuotation('customerName', '小明');
    });
    expect(useQuotationStore.getState().quotation.customerName).toBe('小明');
  });

  it('calculateTotals 正確計算小計與總計', () => {
    const id = useQuotationStore.getState().quotation.items[0].id;
    act(() => {
      useQuotationStore.getState().updateItem(id, 'hourlyRate', 200);
      useQuotationStore.getState().updateItem(id, 'hours', 3);
      useQuotationStore.getState().calculateTotals();
    });
    const { subtotal, total } = useQuotationStore.getState().quotation;
    expect(subtotal).toBe(600);
    expect(total).toBe(600);
  });

  it('setQuotationHistory 可設定歷史紀錄', () => {
    const history = [{ ...useQuotationStore.getState().quotation, id: 'test' }];
    act(() => {
      useQuotationStore.getState().setQuotationHistory(history);
    });
    expect(useQuotationStore.getState().quotationHistory).toEqual(history);
  });
});
