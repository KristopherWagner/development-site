import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import WeddingPage from '.';

jest.mock('@fontsource/montserrat', () => jest.fn());
jest.mock('@fontsource/roboto', () => jest.fn());

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
    expect(
      screen.queryByRole('heading', { name: heading }),
    ).toBeInTheDocument();
  });
});
