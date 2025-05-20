import { createFileRoute } from '@tanstack/react-router';
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
      <h1>Cookbook</h1>
      <p>
        This page will slowly aggregate our favorite recipes. I'll (hopefully)
        add some fun features to the page over time as well.
      </p>
    </>
  );
}

export const Route = createFileRoute('/cookbook/')({
  component: Cookbook,
});
