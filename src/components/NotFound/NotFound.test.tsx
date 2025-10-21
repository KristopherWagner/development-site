import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import NotFound from '.';

describe('404 page unit tests', () => {
  it('renders some cool crow facts', () => {
    render(<NotFound />);
    expect(
      screen.getByRole('heading', { name: 'Page not found', level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Return home' }),
    ).toBeInTheDocument();
  });
});
