import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import renderWithProvider from '../../testUtils';

import Cookbook from '.';
import Recipe, { Route } from './$recipeName';

describe('cookbook page unit tests', () => {
  it('renders a list of recipes', async () => {
    renderWithProvider(<Cookbook />);
    expect(
      await screen.findByRole('link', { name: 'Walnut Pasta' }),
    ).toBeInTheDocument();
  });
});

describe('recipe page unit tests', () => {
  it('renders a not found page', async () => {
    renderWithProvider(<Recipe />);
    expect(
      await screen.findByRole('link', { name: 'return to the cookbook' }),
    ).toBeInTheDocument();
  });

  it('renders a recipe', async () => {
    Route.useParams = jest
      .fn()
      .mockImplementation(() => ({ recipeName: 'walnut-pasta' }));
    renderWithProvider(<Recipe />);
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Walnut Pasta' }),
    ).toBeInTheDocument();
  });
});
