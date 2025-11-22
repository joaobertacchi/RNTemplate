module.exports = {
  root: true,
  extends: ['@react-native'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
  },
  env: {
    jest: true,
  },
};
