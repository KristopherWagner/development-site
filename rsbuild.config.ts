import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';

export default defineConfig({
  html: {
    template: './static/index.html',
  },
  plugins: [pluginReact()],
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
});
