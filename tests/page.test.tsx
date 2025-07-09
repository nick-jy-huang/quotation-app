import { renderWithIntl } from './test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/[locale]/page';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/zh-TW',
}));

const setQuotationHistory = vi.fn();
const updateQuotation = vi.fn();

vi.mock('@/stores/quotationStore', () => ({
  useQuotationStore: () => ({
    quotation: {
      id: 'Q-001',
      date: '2025-01-01',
      validUntil: '2025-01-31',
      customerName: '客戶A',
      customerEmail: 'a@example.com',
      customerPhone: '0912345678',
      customerAddress: '台北市',
      freelancer: '小明',
      companyEmail: 'f@example.com',
      techStack: 'React',
      mainWorkContent: '開發',
      items: [],
      subtotal: 0,
      taxAmount: 0,
      total: 0,
      notes: '',
    },
    quotationHistory: [
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
    ],
    setQuotationHistory,
    updateQuotation,
  }),
}));

vi.mock('@/utils/saveLocaleStorage', async (importOriginal) => {
  const actual = Object(await importOriginal());
  return {
    ...actual,
    handleGetLocaleStorage: vi.fn(() => ({})),
    handleSaveLocaleStorage: vi.fn(),
  };
});

describe('Home page', () => {
  it('renders title, logo, and footer', () => {
    renderWithIntl(<Home />);
    expect(screen.getByText('Quotation App')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText(/所有圖示來源/)).toBeInTheDocument();
  });

  it('switches tab when button clicked', async () => {
    renderWithIntl(<Home />);
    const previewBtn = screen.getByRole('button', { name: '預覽報價單' });
    await userEvent.click(previewBtn);
    expect(previewBtn).toHaveClass('bg-blue-700');
    const editBtn = screen.getByRole('button', { name: '編輯報價單' });
    await userEvent.click(editBtn);
    expect(editBtn).toHaveClass('bg-blue-700');
  });

  it('shows and closes history modal', async () => {
    renderWithIntl(<Home />);
    const openBtn = screen.getByLabelText('查看匯出紀錄');
    await userEvent.click(openBtn);
    expect(screen.getAllByText('匯出歷史')[0]).toBeInTheDocument();
    const closeBtn = screen.getByLabelText('關閉');
    await userEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('calls setQuotationHistory when clear history', async () => {
    renderWithIntl(<Home />);
    const openBtn = screen.getByLabelText('查看匯出紀錄');
    await userEvent.click(openBtn);
    const clearBtns = screen.getAllByText('清空歷史');
    await userEvent.click(clearBtns[0]);
    expect(setQuotationHistory).toHaveBeenCalledWith([]);
  });

  it('calls updateQuotation when load history', async () => {
    renderWithIntl(<Home />);
    const openBtn = screen.getByLabelText('查看匯出紀錄');
    await userEvent.click(openBtn);
    const loadBtns = screen.getAllByLabelText('載入匯出紀錄');
    await userEvent.click(loadBtns[0]);
    expect(updateQuotation).toHaveBeenCalled();
  });
});
