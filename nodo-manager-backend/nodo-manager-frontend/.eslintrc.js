module.exports = {
  env: {
    browser: true,
    es2021: true,
    "cypress/globals": true

  },
  extends: [
    'plugin:react/recommended',
    'plugin:cypress/globals'
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
    indent: [
      "error",
      2
    ],
    "no-underscore-dangle": 0,

    "linebreak-style": [
        "error",
        "windows"
    ],
    "quotes": [
        "error",
        "single"
    ],
    "jsx-quotes": [
        "error",
        "prefer-single"
    ],
    "semi": [
        "error",
        "never"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
        "error", "always"
    ],
    "arrow-spacing": [
        "error", { "before": true, "after": true }
    ],
    "no-console": 0,
    "react/prop-types": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    'react/jsx-filename-extension': [1, {'extensions': ['.js', '.jsx'] }],
  },
};
