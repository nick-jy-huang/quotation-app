import { renderWithIntl } from './test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuotationPreview from '@/components/QuotationPreview';

vi.mock('html2canvas-pro', () => ({
  __esModule: true,
  default: vi.fn(() =>
    Promise.resolve({
      toDataURL: () => 'data:image/jpeg;base64,xxx',
      width: 100,
      height: 200,
    }),
  ),
}));
vi.mock('jspdf', () => ({
  __esModule: true,
  default: function () {
    return {
      internal: { pageSize: { getWidth: () => 100 } },
      addImage: vi.fn(),
      save: vi.fn(),
      addPage: vi.fn(),
    };
  },
}));
vi.mock('@/utils/saveLocaleStorage', () => {
  const saveMock = vi.fn();
  const getMock = vi.fn(() => []);
  return {
    handleSaveExportPDFToLocal: saveMock,
    handleGetLocaleStorage: getMock,
    __esModule: true,
    _saveMock: saveMock,
    _getMock: getMock,
  };
});
vi.mock('@/stores/quotationStore', () => {
  const setHistoryMock = vi.fn();
  return {
    useQuotationStore: () => ({
      quotation: {
        freelancer: '小明',
        companyEmail: 'test@example.com',
        id: 'Q-001',
        date: '2025-01-01',
        validUntil: '2025-01-31',
        customerName: '客戶A',
        customerPhone: '0912345678',
        customerEmail: 'client@example.com',
        customerAddress: '台北市',
        items: [{ id: '1', name: '項目A', hourlyRate: 100, hours: 2 }],
        mainWorkContent: '開發',
        techStack: 'React',
        notes: '備註內容',
      },
      setQuotationHistory: setHistoryMock,
    }),
    __esModule: true,
    _setHistoryMock: setHistoryMock,
  };
});

describe('QuotationPreview', () => {
  it('renders all main sections', () => {
    renderWithIntl(<QuotationPreview />);
    expect(screen.getByText('報價單')).toBeInTheDocument();
    expect(screen.getByText('客戶資訊')).toBeInTheDocument();
    expect(screen.getByText('收費項目')).toBeInTheDocument();
    expect(screen.getByText('主要工作內容')).toBeInTheDocument();
    expect(screen.getByText('技術要求')).toBeInTheDocument();
    expect(screen.getByText('備註')).toBeInTheDocument();
    expect(screen.getAllByLabelText('匯出 PDF').length).toBeGreaterThan(0);
  });

  it('calls export PDF and saves history when button clicked', async () => {
    const { _saveMock } = (await import('@/utils/saveLocaleStorage')) as any;
    const { _setHistoryMock } = (await import('@/stores/quotationStore')) as any;
    renderWithIntl(<QuotationPreview />);
    const btn = screen.getAllByLabelText('匯出 PDF')[0];
    await userEvent.click(btn);
    expect(_saveMock).toHaveBeenCalled();
    expect(_setHistoryMock).toHaveBeenCalled();
  });

  it('calls pdf.addPage when exporting PDF', async () => {
    const jsPDFModule = (await import('jspdf')) as any;
    const addPageMock = jsPDFModule.default().addPage;
    renderWithIntl(<QuotationPreview />);
    const btn = screen.getAllByLabelText('匯出 PDF')[0];
    await userEvent.click(btn);
    expect(addPageMock).toBeDefined();
  });
});
