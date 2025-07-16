import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WeddingPage from '.';

describe('wedding page tests', () => {
  it.each([
    'Our Wedding Day',
    'Travel and Accommodations',
    'COVID-19',
    'The Wedding Party',
    'Schedule of Events',
    'Frequently Asked Questions',
  ])('should render the heading %s', (heading) => {
    render(<WeddingPage />);
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
  });

  it('opens the navigation menu', async () => {
    const user = userEvent.setup();
    render(<WeddingPage />);
    await user.click(screen.getByRole('button', { name: 'Open navigation' }));
    expect(
      screen.getByRole('button', { name: 'Close navigation' }),
    ).toBeInTheDocument();
  });
});
