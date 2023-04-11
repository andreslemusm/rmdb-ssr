/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    v2_meta: true,
    v2_routeConvention: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
  },
  publicPath: "/build/",
  serverMainFields: ["main", "module"],
  serverModuleFormat: "cjs",
  serverPlatform: "node",
  serverMinify: false,
  serverDependenciesToBundle: ["marked"],
};
