import { createFileRoute } from '@tanstack/react-router';

import Blog from './index.mdx';

function RouteComponent() {
  return <Blog />;
}

export const Route = createFileRoute('/blog/')({
  component: RouteComponent,
});
