import '@fontsource/montserrat';
import '@fontsource/roboto';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <h1>404: Not Found</h1>,
});
