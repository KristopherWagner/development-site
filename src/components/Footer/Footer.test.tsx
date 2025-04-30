import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Footer from '.';

describe('Footer component tests', () => {
  it('renders accesible social media links', () => {
    render(<Footer />);
    expect(
      screen.getByRole('link', { name: 'Reach out to me on Discord' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Watch some of my videos' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: 'Add me as a friend on Playstation Network so we can play games together',
      }),
    ).toBeInTheDocument();
  });
});
