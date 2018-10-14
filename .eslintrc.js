module.exports = {
  extends: [
    'standard',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard'
  ],
  plugins: ['prettier',
    'import',
    'react',
    'standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    'ecmaVersion': 8,
    'ecmaFeatures': {
      'impliedStrict': true,
      'classes': true,
      'jsx': true
    }
  },
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  rules: {
    'no-var': 2,
    'no-unused-vars': [1, { 'argsIgnorePattern': 'res|next|^err|reject' }],
    'no-tabs': 2,
    'no-param-reassign': [2, { 'props': false }],
    // 'newline-per-chained-call': 2,
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
      'trailingComma': 'none',
      'singleQuote': true,
      'semi': false,
      'tabWidth': 2,
      'printWidth': 100,
      'bracketSpacing': true,
      'jsxBracketSameLine': true,
      'arrowParens': 'avoid'
    }]
  }

  // overrides: [{
  //   'files': [ '**/*.js', '**/*.jsx' ],
  //   'excludedFiles': '*.test.js',
  //   'rules': {
  //     // 'standard/computed-property-even-spacing': [2, 'even']
  //     'space-before-function-paren': [2, {
  //       'named': 'always',
  //       'anonymous': 'always',
  //       'asyncArrow': 'always'
  //     }],
  //   }
  // }]
}