import type { Rspack } from "@rsbuild/core";

import { dependencies } from "./package.json";

export const mfConfig: Rspack.ModuleFederationPluginOptions = {
  name: "wedding",
  exposes: {
    "./Wedding": "./src/wedding.tsx",
  },
  filename: "remoteEntry.js",
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
};
