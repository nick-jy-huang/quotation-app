import { render, screen } from '@testing-library/react';
import QuotationNotes from '@/components/QuotationPreview/QuotationNotes';
describe('QuotationNotes', () => {
  it('renders notes list', () => {
    render(<QuotationNotes />);
    expect(screen.getByText(/額外支援和維護/)).toBeInTheDocument();
  });
});
