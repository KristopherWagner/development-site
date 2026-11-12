import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Header from './index';

describe('Header component tests', () => {
  it('renders the header with a headshot image', () => {
    render(<Header />);

    expect(
      screen.getByAltText(/Kristopher Wagner headshot/),
    ).toBeInTheDocument();
  });

  it('renders the h1 heading element', () => {
    render(<Header />);

    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
  });

  it('passes children content to the h1 element', () => {
    render(<Header>Kristopher Wagner</Header>);

    expect(screen.getByText(/Kristopher Wagner/i)).toBeInTheDocument();
  });

  it('passes children content with emoji to the h1 element', () => {
    render(<Header>Welcome! :wave:</Header>);

    expect(screen.getByText(/Welcome!/i)).toBeInTheDocument();
    const heading = screen.getByRole('heading');
    expect(heading.textContent).toContain(':wave:');
  });

  it('renders within a styled header element', () => {
    const { container } = render(<Header />);
    const headerElement = container.querySelector('header');

    // Verify the header element is rendered and contains children
    expect(headerElement).not.toBeNull();
  });

  it('renders with a React element child (JSX fragment)', () => {
    // This simulates having a JSX fragment or other children passed
    render(<Header>{<span className="custom-child">Test</span>}</Header>);

    // The content should still be present in the h1
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('sets image loading attribute to lazy', () => {
    const { container } = render(<Header />);
    const imgElement = container.querySelector('img') as HTMLImageElement;

    expect(imgElement.getAttribute('loading')).toBe('lazy');
  });

  it('has correct src on image element from constants', () => {
    const { container } = render(<Header />);
    const imgElement = container.querySelector('img') as HTMLImageElement;

    expect(imgElement.src).toContain('/images/Kristopher.webp');
  });

  it('sets tabIndex to -1 on the h1 heading for keyboard accessibility', () => {
    const { container } = render(<Header />);
    const headingElement = container.querySelector('h1');

    expect(headingElement?.getAttribute('tabIndex')).toBe('-1');
  });

  it('handles text-only children without JSX', () => {
    render(<Header>Hello World</Header>);

    expect(screen.getByRole('heading')).toHaveTextContent('Hello World');
  });

  it('handles multiline text children', () => {
    const multilineText = 'Line 1\nLine 2\nLine 3';
    render(<Header>{multilineText}</Header>);

    expect(screen.getByRole('heading')).toHaveTextContent('Line 1');
    expect(screen.getByRole('heading')).toHaveTextContent('Line 2');
    expect(screen.getByRole('heading')).toHaveTextContent('Line 3');
  });

  it('handles special characters and nested elements in children', () => {
    render(<Header>Special: <span>Hello</span></Header>);

    // Should render safely with nested elements
    expect(screen.getByRole('heading')).toHaveTextContent('Hello');
  });
});
