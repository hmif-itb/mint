module.exports = {
  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/confirm': { page: '/confirm' },
      '/interview': { page: '/interview' },
    };
  }
};
