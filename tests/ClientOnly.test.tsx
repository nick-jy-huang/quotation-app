import { render, screen } from '@testing-library/react';
import ClientOnly from '@/components/ClientOnly';

describe('ClientOnly', () => {
  it('renders children after mount', async () => {
    render(<ClientOnly>內容</ClientOnly>);
    expect(await screen.findByText('內容')).toBeInTheDocument();
  });
});
