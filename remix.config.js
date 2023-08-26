/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    v2_meta: true,
    v2_routeConvention: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_dev: true,
    v2_headers: true,
  },
  tailwind: true,
  postcss: true,
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: ["marked"],
};
