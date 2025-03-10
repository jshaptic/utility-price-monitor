import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { denyImports, envOnlyMacros } from "vite-env-only";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    envOnlyMacros(),
    denyImports({
      client: {
        specifiers: ["fs-extra", /^node:/, "@prisma/*"],
        files: ["**/.server/*", "**/*.server.*"],
      },
      server: {
        specifiers: ["jquery"],
      },
    }),
    tsconfigPaths(),
  ],
  server:{
    port: 4000
  }
});
