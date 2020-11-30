module.exports = {
  sassOptions: {
    includePaths: ["styles"],
    prependData:
      '@import "styles/variables.scss"; @import "bootstrap-scss/mixins.scss";',
  },
};
