import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { createRouter, RouterProvider } from '@tanstack/react-router';
import { AuthProvider } from 'react-oidc-context';

import { routeTree } from './routeTree.gen';
import './colors.css';
import './theme.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const cognitoAuthConfig = {
  authority: import.meta.env.PUBLIC_COGNITO_AUTHORITY,
  client_id: import.meta.env.PUBLIC_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.PUBLIC_COGNITO_REDIRECT_URI,
  response_type: 'code',
  scope: 'email',
};

const root = ReactDOM.createRoot(
  document.getElementById('kwagner') as HTMLElement,
);

root.render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
