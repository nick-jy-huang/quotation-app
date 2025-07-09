import { renderWithIntl } from './test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuotationForm from '@/components/QuotationForm';

describe('QuotationForm', () => {
  it('renders main sections and title', () => {
    renderWithIntl(<QuotationForm />);
    expect(screen.getByText('編輯報價單')).toBeInTheDocument();
    expect(screen.getByText('報價單信息')).toBeInTheDocument();
    expect(screen.getByText('接案人資訊')).toBeInTheDocument();
    expect(screen.getByText('客戶資訊')).toBeInTheDocument();
    expect(screen.getByText('工作內容')).toBeInTheDocument();
    expect(screen.getByText('小計：')).toBeInTheDocument();
    expect(screen.getByText('總計：')).toBeInTheDocument();
  });

  it('can add and remove item', async () => {
    renderWithIntl(<QuotationForm />);

    const addBtn = screen.getByRole('button', { name: '新增' });
    await userEvent.click(addBtn);

    const removeBtns = screen.getAllByLabelText('刪除');
    expect(removeBtns.length).toBe(2);

    await userEvent.click(removeBtns[0]);

    expect(screen.queryByLabelText('刪除')).toBeNull();
  });

  it('can update customer name', async () => {
    renderWithIntl(<QuotationForm />);
    const input = screen.getByLabelText('名稱');
    await userEvent.clear(input);
    await userEvent.type(input, '小明');
    expect(input).toHaveValue('小明');
  });
});
