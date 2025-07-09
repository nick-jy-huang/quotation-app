import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '@/components/prototype/Input';

describe('Input', () => {
  it('renders label and helperText', () => {
    render(<Input label="姓名" helperText="請輸入姓名" />);
    expect(screen.getByLabelText('姓名')).toBeInTheDocument();
    expect(screen.getByText('請輸入姓名')).toBeInTheDocument();
  });

  it('calls onChange immediately when debounce=0', async () => {
    const handleChange = vi.fn();
    function ControlledInputTest() {
      const [value, setValue] = React.useState('10');
      return (
        <Input
          label="年齡"
          value={value}
          debounce={0}
          onChange={(v) => {
            setValue(String(v));
            handleChange(v);
          }}
          type="number"
        />
      );
    }
    render(<ControlledInputTest />);
    const input = screen.getByLabelText('年齡');
    await userEvent.clear(input);
    await userEvent.type(input, '25');
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onChange after debounce delay (debounce=300)', async () => {
    const handleChange = vi.fn();
    function ControlledInputTest() {
      const [value, setValue] = React.useState('10');
      return (
        <Input
          label="年齡"
          value={value}
          debounce={300}
          onChange={(v) => {
            setValue(String(v));
            handleChange(v);
          }}
          type="number"
        />
      );
    }
    render(<ControlledInputTest />);
    const input = screen.getByLabelText('年齡');
    await userEvent.clear(input);
    await userEvent.type(input, '25');
    await act(async () => {
      await new Promise((r) => setTimeout(r, 350));
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error message', () => {
    render(<Input debounce={0} label="信箱" error="格式錯誤" />);
    expect(screen.getByText('格式錯誤')).toBeInTheDocument();
  });

  it('applies size and className', () => {
    render(<Input debounce={0} label="電話" size="lg" className="test-class" />);
    const input = screen.getByLabelText('電話');
    expect(input).toHaveClass('test-class');
  });
});
