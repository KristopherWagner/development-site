import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { mfConfig } from "./module-federation.config";

export default defineConfig({
  html: {
    template: "./static/index.html",
  },
  plugins: [
    pluginReact({
      splitChunks: { react: false, router: false },
    }),
  ],
  server: {
    port: 3002,
  },
  moduleFederation: {
    options: mfConfig,
  },
});
