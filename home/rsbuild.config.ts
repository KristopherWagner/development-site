import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
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
