import { renderWithIntl } from '@/tests/test-utils';
import { screen } from '@testing-library/react';
import Header from '@/components/QuotationPreview/Header';
describe('Header', () => {
  it('renders header info', () => {
    renderWithIntl(
      <Header
        freelancer="小明"
        companyEmail="test@example.com"
        id="Q-001"
        date="2025-01-01"
        validUntil="2025-01-31"
      />,
    );
    expect(screen.getByText('報價單')).toBeInTheDocument();
    expect(screen.getByText('接案人: 小明')).toBeInTheDocument();
    expect(screen.getByText('信箱: test@example.com')).toBeInTheDocument();
    expect(screen.getByText('No: Q-001')).toBeInTheDocument();
    expect(screen.getByText('日期: 2025/01/01')).toBeInTheDocument();
    expect(screen.getByText('有效期: 2025/01/31')).toBeInTheDocument();
  });
});
