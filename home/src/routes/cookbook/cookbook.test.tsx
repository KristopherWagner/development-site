import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Cookbook from '.';
import Recipe, { Route } from './$recipeName';

describe('cookbook page unit tests', () => {
  it('renders a list of recipes', () => {
    render(<Cookbook />);
    expect(
      screen.getByRole('link', { name: 'Walnut Pasta' }),
    ).toBeInTheDocument();
  });
});

describe('recipe page unit tests', () => {
  it('renders a not found page', () => {
    render(<Recipe />);
    expect(
      screen.getByRole('link', { name: 'return to the cookbook' }),
    ).toBeInTheDocument();
  });

  it('renders a recipe', () => {
    (Route.useParams as any).mockImplementation(() => ({
      recipeName: 'walnut-pasta',
    }));
    render(<Recipe />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Walnut Pasta' }),
    ).toBeInTheDocument();
  });
});
