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
    'react/prop-types': 0
  },
};
