module.exports = {
  extends: 'airbnb',

  parser: 'babel-eslint',

  rules: {
    'valid-jsdoc': [2, {
      'requireReturn': false,
      'requireReturnDescription': false,
      'prefer': {
        'returns': 'return',
      },
    }],
    'func-names': 0,
    'jsx-quotes': [2, 'prefer-single'],
    'no-underscore-dangle': [2, {
      'allowAfterThis': true
    }],
  },

  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      'alias': [
        ['@/*', './src/*'],
      ],
    },
  },

  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        'react/jsx-filename-extension': [1, {
          extensions: ['.jsx', '.tsx'],
        }],
        'import/default': 0,
        'import/named': 0,
        'jsx-quotes': [2, 'prefer-single'],
        'react/jsx-props-no-spreading': 0,
        'react/prop-types': 0,
        'react/state-in-constructor': 0,
        'react/static-property-placement': 0,
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
    }
  ],
}
