import { renderWithIntl } from '@/tests/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClientInfo from '@/components/QuotationForm/ClientInfo';
import React from 'react';

describe('ClientInfo', () => {
  const baseQuotation = {
    customerName: '客戶A',
    customerPhone: '0912345678',
    customerEmail: 'client@example.com',
    customerAddress: '台北市',
  };
  it('renders all input fields', () => {
    renderWithIntl(<ClientInfo quotation={baseQuotation} updateQuotation={vi.fn()} />);
    expect(screen.getByLabelText('名稱')).toBeInTheDocument();
    expect(screen.getByLabelText('電話')).toBeInTheDocument();
    expect(screen.getByLabelText('信箱')).toBeInTheDocument();
    expect(screen.getByLabelText('地址')).toBeInTheDocument();
  });

  it('calls updateQuotation when input changes', async () => {
    const updateQuotation = vi.fn();
    renderWithIntl(<ClientInfo quotation={baseQuotation} updateQuotation={updateQuotation} />);
    const nameInput = screen.getByLabelText('名稱');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, '客戶B');
    await new Promise((r) => setTimeout(r, 350));
    expect(updateQuotation).toHaveBeenCalledWith('customerName', '客戶B');
  });
});
