import '@fontsource/montserrat';
import '@fontsource/roboto';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import './global.css';

export const Route = createRootRoute({
  component: () => (
    <html lang="en-US">
      <Outlet />
    </html>
  ),
  notFoundComponent: () => <h1>404: Not Found</h1>,
});
