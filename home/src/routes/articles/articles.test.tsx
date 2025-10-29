import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Articles from '.';
import HowMoneyCanBuyHappiness from './how-money-can-buy-happiness';
import SustainabilityOfShipping from './sustainability-of-shipping';

describe('articles page unit tests', () => {
  it('renders a list of articles', () => {
    render(<Articles />);
    expect(
      screen.getByRole('link', {
        name: 'Explained: Sustainability of Shipping',
      }),
    ).toBeInTheDocument();
  });

  it('renders the BITE article', () => {
    render(<SustainabilityOfShipping />);
    expect(
      screen.getByRole('heading', {
        name: 'Explained: The Sustainability Of Shipping',
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it('renders the YNAB article', () => {
    render(<HowMoneyCanBuyHappiness />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'How Money Can Buy Happiness',
      }),
    ).toBeInTheDocument();
  });
});
