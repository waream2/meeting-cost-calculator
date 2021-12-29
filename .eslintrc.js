module.exports = {
  extends: ['airbnb'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: 'babel-eslint',
  rules: {
    camelcase: 0,
    'no-tabs': 0,
    indent: [1, 'tab'],
    'jsx-a11y/href-no-hash': ['off'],
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'react/jsx-indent': [1, 'tab'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-indent-props': [1, 'tab'],
    'react/no-unescaped-entities': 0,
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'max-len': [
      'warn',
      {
        code: 120,
        tabWidth: 2,
        comments: 80,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  globals: {
    window: true,
    document: true,
  },
};