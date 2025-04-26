import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const root = ReactDOM.createRoot(
  document.getElementsByTagName('html')[0] as HTMLElement,
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
