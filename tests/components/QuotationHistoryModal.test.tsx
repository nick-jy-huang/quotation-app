import { renderWithIntl } from '@/tests/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuotationHistoryModal from '@/components/QuotationHistoryList/Modal';
describe('QuotationHistoryModal', () => {
  it('renders children when open', () => {
    renderWithIntl(
      <QuotationHistoryModal open={true} onClose={() => {}}>
        <div>modal content</div>
      </QuotationHistoryModal>,
    );
    expect(screen.getByText('modal content')).toBeInTheDocument();
  });
  it('renders nothing when closed', () => {
    renderWithIntl(
      <QuotationHistoryModal open={false} onClose={() => {}}>
        <div>modal content</div>
      </QuotationHistoryModal>,
    );
    expect(screen.queryByText('modal content')).toBeNull();
  });
  it('calls onClose when ESC is pressed', async () => {
    const onClose = vi.fn();
    renderWithIntl(
      <QuotationHistoryModal open={true} onClose={onClose}>
        <button>focus me</button>
      </QuotationHistoryModal>,
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
  it('calls onClose when clicking backdrop', () => {
    const onClose = vi.fn();
    const { container } = renderWithIntl(
      <QuotationHistoryModal open={true} onClose={onClose}>
        <div>modal content</div>
      </QuotationHistoryModal>,
    );
    const backdrop = container.firstChild;
    if (backdrop) {
      fireEvent.mouseDown(backdrop);
      fireEvent.mouseUp(backdrop);
      fireEvent.click(backdrop);
    }
    expect(onClose).toHaveBeenCalled();
  });
  it('traps focus within modal when tabbing', async () => {
    renderWithIntl(
      <QuotationHistoryModal open={true} onClose={() => {}}>
        <button>first</button>
        <button>second</button>
      </QuotationHistoryModal>,
    );
    const [first, second] = screen.getAllByRole('button');
    first.focus();
    await userEvent.tab();
    expect(document.activeElement).toBe(second);
    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(first);
  });
});
