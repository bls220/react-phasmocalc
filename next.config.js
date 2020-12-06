module.exports = {
  sassOptions: {
    includePaths: ["styles"],
    prependData:
      '@import "styles/variables.scss"; @import "bootstrap-scss/mixins.scss";',
  },
  basePath: process.env.BASE_PATH || "",
  assetPrefix: process.env.BASE_PATH || "",
};
