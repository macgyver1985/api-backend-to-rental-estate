module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:eslint-comments/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "jest",
    "promise",
  ],
  rules: {
    'linebreak-style': 0,
  },
};
