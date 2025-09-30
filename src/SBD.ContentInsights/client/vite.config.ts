import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/manifests.ts", // Bundle registers one or more manifests
            formats: ["es"],
            fileName: "content-insights-bundle",
        },
        outDir: "../wwwroot/App_Plugins/ContentInsights", // all compiled files will be placed here
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/], // ignore the Umbraco Backoffice package in the build
        },
    },
    base: "/App_Plugins/ContentInsights/", // the base path of the app in the browser (used for assets)
});
