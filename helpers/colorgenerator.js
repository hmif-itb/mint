const ColorScheme = require('color-scheme');
const randomcolor = require('randomcolor');

const scheme = new ColorScheme();
scheme
  .from_hue(190)
  .scheme('analogic')
  .variation('pastel');

const colors = scheme.colors().map((color) => {
  return `#${color}`;
});

module.exports = function(count) {
  if (count <= colors.length) {
    return colors.slice(0, count);
  } else {
    const additionalColors = randomcolor({ count: count - colors.length });
    return [...colors, ...additionalColors];
  }
};
