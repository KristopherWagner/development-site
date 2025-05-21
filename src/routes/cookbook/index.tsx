import { createFileRoute, Link } from '@tanstack/react-router';

import Seo from '../../components/SEO';

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
            <Link to="/cookbook/recipes/walnut-pasta">Walnut Pasta</Link>
          </li>
        </ul>
      </main>
    </>
  );
}

export const Route = createFileRoute('/cookbook/')({
  component: Cookbook,
});
