import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CookbookLink from './CookbookLink';
import Footer from '.';
import HomeLink from './HomeLink';
import SocialLinks from './SocialLinks';
import ArticlesLink from './ArticlesLink';

describe('Footer component tests', () => {
  it('renders accesible social media links', () => {
    render(
      <Footer>
        <SocialLinks />
        <HomeLink />
        <CookbookLink />
        <ArticlesLink />
      </Footer>,
    );

    expect(
      screen.getByRole('link', { name: 'Reach out to me on Discord' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Watch some of my videos' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: 'Add me as a friend on Playstation Network so we can play games together',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Return home' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Return to cookbook' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Return to the list of articles' }),
    ).toBeInTheDocument();
  });
});
