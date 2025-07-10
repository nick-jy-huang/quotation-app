import { renderWithIntl } from '@/tests/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BaseInfo from '@/components/QuotationForm/BaseInfo';
import React from 'react';

describe('BaseInfo', () => {
  const baseQuotation = {
    id: 'Q-001',
    date: '2025-01-01',
    validUntil: '2025-01-31',
  };
  it('renders all input fields', () => {
    renderWithIntl(<BaseInfo quotation={baseQuotation} updateQuotation={vi.fn()} />);
    expect(screen.getByLabelText('報價單編號')).toBeInTheDocument();
    expect(screen.getByLabelText('報價日期')).toBeInTheDocument();
    expect(screen.getByLabelText('有效期至')).toBeInTheDocument();
  });

  it('calls updateQuotation when input changes', async () => {
    const updateQuotation = vi.fn();
    renderWithIntl(<BaseInfo quotation={baseQuotation} updateQuotation={updateQuotation} />);
    const idInput = screen.getByLabelText('報價單編號');
    await userEvent.clear(idInput);
    await userEvent.type(idInput, 'Q-002');
    await new Promise((r) => setTimeout(r, 350));
    expect(updateQuotation).toHaveBeenCalledWith('id', 'Q-002');
  });
});
