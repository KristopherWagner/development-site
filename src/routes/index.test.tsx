import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import renderWithProvider from '../testUtils';
import IndexPage from '.';

describe('home page unit tests', () => {
  it('renders links to my hobbies', async () => {
    renderWithProvider(<IndexPage />);
    expect(
      await screen.findByRole('link', {
        name: 'Navigate to the archived wedding website',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'follow my journey on Printables' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'peak at my decks on dreamborn.ink' }),
    ).toBeInTheDocument();
  });
});
