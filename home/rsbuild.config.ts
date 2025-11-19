import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';
import { mfConfig } from './module-federation.config';

export default defineConfig({
  html: {
    template: './static/index.html',
  },
  plugins: [
    pluginReact({
      splitChunks: { react: false, router: false },
    }),
    pluginTypedCSSModules(),
  ],
  server: {
    port: 3000,
  },
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack({
          routeFileIgnorePattern: '(.css)|(.test.tsx)',
          target: 'react',
          autoCodeSplitting: true,
        }),
      ],
    },
  },
  moduleFederation: {
    options: mfConfig,
  },
});
