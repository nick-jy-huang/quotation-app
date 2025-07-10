import { renderWithIntl } from '@/tests/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import QuotationHistoryList from '@/components/QuotationHistoryList';

window.confirm = vi.fn(() => true);

describe('QuotationHistoryList', () => {
  const mockHistory = [
    {
      id: '1',
      date: '2024-01-01',
      customerName: 'A',
      customerEmail: 'a@test.com',
      customerPhone: '123',
      customerAddress: '台北',
      freelancer: 'B',
      companyEmail: 'b@test.com',
      techStack: '',
      mainWorkContent: '',
      items: [],
      subtotal: 0,
      taxAmount: 0,
      total: 0,
      notes: '',
      validUntil: '2024-12-31',
      fileName: '報價單A.pdf',
      exportedAt: '2024-01-01T00:00:00Z',
    },
  ];

  it('does not render when history is empty', () => {
    const { container } = renderWithIntl(
      <QuotationHistoryList quotationHistory={[]} onClear={vi.fn()} onLoad={vi.fn()} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders history and clear button', () => {
    renderWithIntl(
      <QuotationHistoryList quotationHistory={mockHistory} onClear={vi.fn()} onLoad={vi.fn()} />,
    );
    expect(screen.getByText('匯出歷史')).toBeInTheDocument();
    expect(screen.getByText('清空歷史')).toBeInTheDocument();
    expect(screen.getByText('報價單A.pdf')).toBeInTheDocument();
  });

  it('calls onClear when clear button clicked', () => {
    const onClear = vi.fn();
    renderWithIntl(
      <QuotationHistoryList quotationHistory={mockHistory} onClear={onClear} onLoad={vi.fn()} />,
    );
    fireEvent.click(screen.getByText('清空歷史'));
    expect(onClear).toHaveBeenCalled();
  });

  it('calls onLoad when item load button clicked', () => {
    const onLoad = vi.fn();
    renderWithIntl(
      <QuotationHistoryList quotationHistory={mockHistory} onClear={vi.fn()} onLoad={onLoad} />,
    );
    fireEvent.click(screen.getByLabelText('載入匯出紀錄'));
    expect(onLoad).toHaveBeenCalled();
  });
});
