module.exports = {
  extends: ['standard', 'prettier', 'prettier/standard'],
  plugins: ['react', 'import', 'standard', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    'ecmaVersion': 8,
    'ecmaFeatures': {
      'impliedStrict': true,
      'classes': true
    }
  },
  'env': {
    'browser': true,
    'node': true
  },
  rules: {
    'no-var': 2,
    'no-unused-vars': [1, { 'argsIgnorePattern': 'res|next|^err' }],
    'no-param-reassign': [2, { 'props': false }],
    // 'arrow-spacing': [2, { 'before': true, 'after': true }],
    // 'indent': [2, 2],
    // 'comma-dangle': [2, {
    //   'objects': 'only-multiline',
    //   'arrays': 'only-multiline',
    //   'imports': 'never',
    //   'exports': 'never',
    //   'functions': 'never'
    // }],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],

    'prefer-const': [2, { 'destructuring': 'all' }],

    // options to emulate prettier setup
    // 'semi': [2, 'never'],
    // 'max-len': [2, { 'code': 80 }],
    // 'template-curly-spacing': [2, 'always'],
    // 'arrow-parens': [2, 'as-needed'],

    // standard.js
    // 'space-before-function-paren': [2, {
    //   'named': 'always',
    //   'anonymous': 'always',
    //   'asyncArrow': 'always'
    // }],

    // standard plugin - options
    // 'standard/object-curly-even-spacing': [2, 'either'],
    // 'standard/array-bracket-even-spacing': [2, 'either'],
    // 'standard/computed-property-even-spacing': [2, 'even'],
    'standard/no-callback-literal': [2, ['cb', 'callback']],

    // react plugin - options
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,

    // prettier
    'prettier/prettier': [2, {
      'singleQuote': true,
      'semi': false,
      'tabWidth': 2,
      'printWidth': 80,
      'bracketSpacing': true,
      'jsxBracketSameLine': true,
      'arrowParens': 'avoid'
    }]
  }
}