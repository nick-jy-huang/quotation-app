import { renderWithIntl } from '@/tests/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuotationHistoryItem from '@/components/QuotationHistoryList/QuotationHistoryItem';
describe('QuotationHistoryItem', () => {
  const history = [
    {
      id: '1',
      date: '2025-01-01',
      customerName: '客戶A',
      customerEmail: 'a@example.com',
      customerPhone: '0912345678',
      customerAddress: '台北市',
      freelancer: '小明',
      companyEmail: 'f@example.com',
      techStack: '',
      mainWorkContent: '',
      items: [],
      subtotal: 0,
      taxAmount: 0,
      total: 0,
      notes: '',
      validUntil: '2025-01-31',
    },
    {
      id: '2',
      date: '2025-01-02',
      customerName: '客戶B',
      customerEmail: 'b@example.com',
      customerPhone: '0987654321',
      customerAddress: '新北市',
      freelancer: '小王',
      companyEmail: 'g@example.com',
      techStack: '',
      mainWorkContent: '',
      items: [],
      subtotal: 0,
      taxAmount: 0,
      total: 0,
      notes: '',
      validUntil: '2025-02-28',
    },
  ];
  it('renders history items', () => {
    renderWithIntl(<QuotationHistoryItem quotationHistory={history} onLoad={() => {}} />);
    expect(screen.getAllByText('- -').length).toBe(history.length);
  });
  it('calls onLoad when item clicked', async () => {
    const onLoad = vi.fn();
    renderWithIntl(<QuotationHistoryItem quotationHistory={history} onLoad={onLoad} />);
    const buttons = screen.getAllByLabelText('載入匯出紀錄');
    await userEvent.click(buttons[0]);
    expect(onLoad).toHaveBeenCalled();
  });
});
