module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true

  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react', 'cypress', 'react-hooks'
  ],
  rules: {
    'no-console': 0,
    'react/jsx-filename-extension': [1, {'extensions': ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'quotes': [2, 'single', { 'avoidEscape': true }]
  },
};
