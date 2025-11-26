module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': 'error',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    // option disableScc set to workaround a parsing bug
    // See: https://github.com/import-js/eslint-plugin-import/issues/3165#issuecomment-2834588613
    'import/no-cycle': [
      'error',
      { maxDepth: 1, ignoreExternal: true, disableScc: true },
    ],
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          'parent',
          ['sibling', 'index'],
        ],
        'newlines-between': 'always-and-inside-groups',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
  env: {
    jest: true,
  },
};
