import { renderWithIntl } from './test-utils';
import { screen } from '@testing-library/react';
import DragHandle from '@/components/QuotationForm/ItemList/DragHandle';
describe('DragHandle', () => {
  it('renders without crashing', () => {
    renderWithIntl(<DragHandle listeners={{}} />);
  });
});
