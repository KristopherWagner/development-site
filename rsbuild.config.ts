import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';

export default defineConfig({
  html: {
    template: './static/index.html',
  },
  plugins: [pluginReact(), pluginTypedCSSModules()],
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
