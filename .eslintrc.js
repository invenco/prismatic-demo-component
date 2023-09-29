module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier', 'plugin:prettier/recommended'],
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
    sourceType: 'module',
    ecmaVersion: 2019,
  },
  rules: {
    'import/no-import-module-exports': [
      'error',
      { exceptions: ['**/__mocks__/**'] },
    ],
    'import/prefer-default-export': 'off'
  },
};
