const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/confirm': { page: '/confirm' },
      '/interview': { page: '/interview' },
    };
  }
});
