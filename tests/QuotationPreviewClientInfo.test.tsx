import { render, screen } from '@testing-library/react';
import ClientInfo from '@/components/QuotationPreview/ClientInfo';
describe('QuotationPreview/ClientInfo', () => {
  it('renders client info', () => {
    render(
      <ClientInfo
        customerName="客戶A"
        customerPhone="0912345678"
        customerEmail="client@example.com"
        customerAddress="台北市"
      />,
    );
    expect(screen.getByText('客戶資訊')).toBeInTheDocument();
    expect(screen.getByText('客戶A')).toBeInTheDocument();
    expect(screen.getByText('0912345678')).toBeInTheDocument();
    expect(screen.getByText('client@example.com')).toBeInTheDocument();
    expect(screen.getByText('台北市')).toBeInTheDocument();
  });
});
