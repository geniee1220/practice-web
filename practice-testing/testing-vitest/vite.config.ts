import { defineConfig, UserConfig } from "vite";
import type { InlineConfig } from "vitest";
import react from "@vitejs/plugin-react";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ["__test__/*.{test,spec}.{js,jsx,ts,tsx}"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["setting/setupTests.ts"],
  },
} as VitestConfigExport);
