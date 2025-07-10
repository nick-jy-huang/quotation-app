import { renderWithIntl } from '@/tests/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CompanyInfo from '@/components/QuotationForm/CompanyInfo';
import React from 'react';

describe('CompanyInfo', () => {
  const baseQuotation = {
    freelancer: '小明',
    companyEmail: 'test@example.com',
  };
  it('renders all input fields', () => {
    renderWithIntl(<CompanyInfo quotation={baseQuotation} updateQuotation={vi.fn()} />);
    expect(screen.getByLabelText('接案人')).toBeInTheDocument();
    expect(screen.getByLabelText('信箱')).toBeInTheDocument();
  });

  it('calls updateQuotation when input changes', async () => {
    const updateQuotation = vi.fn();
    renderWithIntl(<CompanyInfo quotation={baseQuotation} updateQuotation={updateQuotation} />);
    const nameInput = screen.getByLabelText('接案人');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, '小王');
    await new Promise((r) => setTimeout(r, 350));
    expect(updateQuotation).toHaveBeenCalledWith('freelancer', '小王');
  });
});
