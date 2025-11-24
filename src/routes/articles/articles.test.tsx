import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Articles from '.';

describe('articles page unit tests', () => {
  it('renders a list of articles', () => {
    render(<Articles />);
    expect(
      screen.getByRole('link', {
        name: 'Visit the external article Explained: The Sustainability Of Shipping',
      }),
    ).toBeInTheDocument();
  });
});
