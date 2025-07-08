import { render } from '@testing-library/react';
import DragHandle from '@/components/QuotationForm/ItemList/DragHandle';
describe('DragHandle', () => {
  it('renders without crashing', () => {
    render(<DragHandle listeners={{}} />);
  });
});
