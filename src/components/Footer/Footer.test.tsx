import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import renderWithProvider from '../../testUtils';

import CookbookLink from './CookbookLink';
import Footer from '.';
import HomeLink from './HomeLink';
import SocialLinks from './SocialLinks';

describe('Footer component tests', () => {
  it('renders accesible social media links', async () => {
    renderWithProvider(
      <Footer>
        <SocialLinks />
        <HomeLink />
        <CookbookLink />
      </Footer>,
    );
    expect(
      await screen.findByRole('link', { name: 'Reach out to me on Discord' }),
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
  });
});
