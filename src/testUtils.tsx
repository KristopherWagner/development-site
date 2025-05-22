import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render } from '@testing-library/react';

export default function renderWithProvider(component: React.ReactNode) {
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => component,
  });
  const routeTree = rootRoute.addChildren([indexRoute]);
  const router = createRouter({ routeTree });

  return render(<RouterProvider router={router} />);
}
