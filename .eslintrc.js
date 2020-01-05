// module.exports = {
//   extends: ['plugin:@typescript-eslint/recommended'],
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint'],
//   settings: {
//     'import/parsers': {
//       '@typescript-eslint/parser': ['.ts', '.tsx'],
//     },
//     'import/resolver': {
//       typescript: {},
//     },
//   },
//   rules: {
//     "import/extensions": [2, "never"],
//     "react/prefer-stateless-function": [0],
//     'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
//     'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
//     '@typescript-eslint/indent': [2, 4],
//     "eqeqeq": 2,
//     "no-self-compare": 2,
//     "no-useless-concat": 2,
//     "array-bracket-spacing": [2, "never"],
//     "block-spacing": [2, "always"],
//     "comma-spacing": [2, {before: false, after: true}],
//     "camelcase": [2, {"properties": "always"}],
//     "brace-style": [2, "stroustrup", { "allowSingleLine": true }],
//     "comma-style": [2, "last"],
//     "no-var": 2,
//     "consistent-return": 2,
//     "key-spacing": [2, {"beforeColon": false, "afterColon": true}],
//     "semi-spacing": [2, {"before": false, "after": true}],
//     "keyword-spacing": 2,
//     "space-before-function-paren": [2, "never"],
//     "semi": ["error", "always"],
//     "react/jsx-indent": [2, 4, {indentLogicalExpressions: true}]
//   }
// };

module.exports = {
  root: true,
  extends: ['airbnb-typescript', 'prettier', 'prettier/@typescript-eslint', 'prettier/react'],
  rules: {
        "import/extensions": [2, "never"],
        "react/prefer-stateless-function": [0],
        "prefer-template": [0]
  }
};
