import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Loader from '.';

describe('Loader unit tests', () => {
  it('renders an accesible loader', () => {
    render(<Loader />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Loading...' }),
    ).toBeInTheDocument();
  });
});
