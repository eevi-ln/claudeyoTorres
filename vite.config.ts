import {defineConfig} from "vite";

export default defineConfig({
    root: ".",
    publicDir: "public",
    server: {
        open: "/view/index.html",
    },
    build: {
        outDir: "dist",
        rolloutOptions: {
            input: "view/index.html"
        },
    },
});
