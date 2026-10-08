import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { createRouter, RouterProvider } from '@tanstack/react-router';
import { AuthProvider } from 'react-oidc-context';

import { routeTree } from './routeTree.gen';
import './colors.css';
import './theme.css';
import { COGNITO_CONFIG } from './config';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const cognitoAuthConfig = {
  authority: COGNITO_CONFIG.authority,
  client_id: COGNITO_CONFIG.clientId,
  redirect_uri: COGNITO_CONFIG.redirectUri,
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
