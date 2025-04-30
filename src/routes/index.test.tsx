import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import IndexPage from '.';

describe('home page unit tests', () => {
  it('renders links to my hobbies', () => {
    render(<IndexPage />);
    expect(
      screen.getByRole('link', {
        name: 'Navigate to the archived wedding website',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'follow my journey on Printables' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'peak at my decks here' }),
    ).toBeInTheDocument();
  });
});
