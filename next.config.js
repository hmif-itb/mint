const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  exportTrailingSlash: true,
  exportPathMap() {
    return {
      '/': { page: '/' }
    };
  },
  env: {
    contentBaseUrl: 'https://mint-content.hmif.tech',
    nimJsonUrl: 'https://mint-content.hmif.tech/nim/nim.json'
  }
});
