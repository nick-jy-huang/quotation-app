import { renderWithIntl } from '@/tests/test-utils';
import { screen } from '@testing-library/react';
import ItemTable from '@/components/QuotationPreview/ItemTable';
describe('ItemTable', () => {
  const items = [
    { id: '1', name: '項目A', hourlyRate: 100, hours: 2 },
    { id: '2', name: '項目B', hourlyRate: 200, hours: 1 },
  ];
  it('renders table and items', () => {
    renderWithIntl(<ItemTable items={items} />);
    expect(screen.getByText('項目')).toBeInTheDocument();
    expect(screen.getByText('小計')).toBeInTheDocument();
    expect(screen.getByText('項目A')).toBeInTheDocument();
    expect(screen.getByText('項目B')).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
  });
});
