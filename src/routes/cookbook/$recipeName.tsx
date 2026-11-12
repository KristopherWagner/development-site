import { createFileRoute } from '@tanstack/react-router';

import Recipe from '../../components/pages/cookbook/recipe';

function Component() {
  const { recipeName } = Route.useParams();

  return <Recipe recipeName={recipeName} />;
}

export const Route = createFileRoute('/cookbook/$recipeName')({
  component: Component,
});
