/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    v2_meta: true,
    v2_routeConvention: true,
  },
  // publicPath: "/build/",
  // serverMainFields: ["main", "module"],
  // serverModuleFormat: "cjs",
  // serverPlatform: "node",
  // serverMinify: false,
  serverDependenciesToBundle: ["marked"],
};
