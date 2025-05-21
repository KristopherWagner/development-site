import { createFileRoute, Link } from '@tanstack/react-router';

import Footer from '../../components/Footer';
import Seo from '../../components/SEO';

import { Route as homeRoute } from '../index';

import { Route as walnutPastaRoute } from './recipes/walnut-pasta';

export default function Cookbook() {
  return (
    <>
      <Seo
        description="A repository of our favorite recipes"
        imageUrl=""
        title="Wagner Family Cookbook"
        url="https://kwagner.dev/cookbook"
      />
      <main className="main">
        <h1>Cookbook</h1>
        <p>
          This page will slowly aggregate our favorite recipes. I'll (hopefully)
          add some fun features to the page over time as well.
        </p>
        <ul>
          <li>
            <Link to={walnutPastaRoute.to}>Walnut Pasta</Link>
          </li>
        </ul>
      </main>
      <Footer>
        <Link aria-label="Return home" preload="intent" to={homeRoute.to}>
          <i className="fa-duotone fa-house fa-2x" />
        </Link>
      </Footer>
    </>
  );
}

export const Route = createFileRoute('/cookbook/')({
  component: Cookbook,
});
