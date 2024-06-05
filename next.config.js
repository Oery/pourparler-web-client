/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./app/env.js");

/** @type {import("next").NextConfig} */
const config = {
    bundlePagesRouterDependencies: true,
    experimental: {
        reactCompiler: true,
    },
};

export default config;
