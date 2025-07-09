import { renderWithIntl } from './test-utils';
import { screen } from '@testing-library/react';
import QuotationNotes from '@/components/QuotationPreview/QuotationNotes';
describe('QuotationNotes', () => {
  it('renders notes list', () => {
    renderWithIntl(<QuotationNotes />);
    expect(screen.getByText(/額外支援和維護/)).toBeInTheDocument();
  });
});
