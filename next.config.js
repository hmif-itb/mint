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
    nimJsonUrl: 'https://mint-content.hmif.tech/nim/nim.json',
    usageLoggingBaseUrl: 'http://localhost:5000/mint-tech/us-central1/api',
    recaptchaSiteKey: '6Lf_-NAUAAAAAIMZ2PllxUTXCl_dVWpy_FgglbXO'
  }
});
