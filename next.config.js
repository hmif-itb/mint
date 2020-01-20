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
    usageLoggingBaseUrl: 'https://us-central1-mint-tech.cloudfunctions.net/api',
    recaptchaSiteKey: '6Lf_-NAUAAAAAIMZ2PllxUTXCl_dVWpy_FgglbXO'
  }
});
