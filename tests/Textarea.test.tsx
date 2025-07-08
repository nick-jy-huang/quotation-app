import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textarea from '@/components/prototype/Textarea';

describe('Textarea', () => {
  it('renders label and helperText', () => {
    render(<Textarea label="備註" helperText="請輸入備註" />);
    expect(screen.getByLabelText('備註')).toBeInTheDocument();
    expect(screen.getByText('請輸入備註')).toBeInTheDocument();
  });

  it('calls onChange immediately when debounce=0', async () => {
    const handleChange = vi.fn();
    function ControlledTextareaTest() {
      const [value, setValue] = React.useState('');
      return (
        <Textarea
          label="內容"
          value={value}
          debounce={0}
          onChange={(v) => {
            setValue(String(v));
            handleChange(v);
          }}
        />
      );
    }
    render(<ControlledTextareaTest />);
    const textarea = screen.getByLabelText('內容');
    await userEvent.type(textarea, 'Hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onChange after debounce delay (debounce=300)', async () => {
    const handleChange = vi.fn();
    function ControlledTextareaTest() {
      const [value, setValue] = React.useState('');
      return (
        <Textarea
          label="內容"
          value={value}
          debounce={300}
          onChange={(v) => {
            setValue(String(v));
            handleChange(v);
          }}
        />
      );
    }
    render(<ControlledTextareaTest />);
    const textarea = screen.getByLabelText('內容');
    await userEvent.type(textarea, 'Hello');
    await act(async () => {
      await new Promise((r) => setTimeout(r, 350));
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error message', () => {
    render(<Textarea debounce={0} label="內容" error="必填" />);
    expect(screen.getByText('必填')).toBeInTheDocument();
  });

  it('applies className', () => {
    render(<Textarea debounce={0} label="內容" className="test-class" />);
    const textarea = screen.getByLabelText('內容');
    expect(textarea).toHaveClass('test-class');
  });
});
