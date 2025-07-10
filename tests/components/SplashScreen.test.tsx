import { render, screen, waitFor } from '@testing-library/react';
import SplashScreen from '@/components/SplashScreen';
import React from 'react';

describe('SplashScreen', () => {
  it('renders splash content initially', () => {
    render(<SplashScreen />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  it('disappears immediately when delay and duration are 0', async () => {
    render(<SplashScreen delay={0} duration={0} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await Promise.resolve();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });
});
