module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        vue: 'never',
      },
    ],
    'no-console': 0,
    'no-debugger': 0,
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
  },
};
