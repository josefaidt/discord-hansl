module.exports = {
  extends: [
    'standard',
    'prettier',
    'prettier/standard'
  ],
  plugins: [
    'prettier',
    'react',
    'standard',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    'ecmaVersion': 8,
    'ecmaFeatures': {
      'impliedStrict': false,
      'classes': true,
      'jsx': false
    }
  },
  env: {
    'browser': false,
    'node': true,
    'es6': true
  },
  rules: {
    'strict': 0,
    'no-console': 0,
    'no-debugger': 0,
    'no-alert': 1,
    'no-await-in-loop': 1,
    'no-return-assign': 0,
    'no-var': 2,
    'no-unused-vars': [1, { 'argsIgnorePattern': 'res|next|^err|reject' }],
    'no-tabs': 2,
    'no-param-reassign': [2, { 'props': false }],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],

    'no-const-assign': 2,
    'prefer-const': [2, { 'destructuring': 'all' }],
    'prefer-template': 2,
    'prefer-rest-params': 2,
    'sort-imports': [0, { ignoreCase: true }],
    'no-duplicate-imports': 2,
    'no-useless-rename': 2,
    'no-this-before-super': 2,
    'no-useless-constructor': 2,
    'prefer-destructuring': [2, { 
      array: false,
      object: true
    }],
    'constructor-super': 1,
    'require-yield': 2,

    'import/order': [2, {
      'groups': ['builtin', 'external', 'parent', 'sibling', 'index'], 
      'newlines-between': 'never'
    }],

    // standard plugin - options
    // 'standard/object-curly-even-spacing': [2, 'either'],
    // 'standard/array-bracket-even-spacing': [2, 'either'],
    // 'standard/computed-property-even-spacing': [2, 'even'],
    'standard/no-callback-literal': [2, ['cb', 'callback']],

    // Node.js and CommonJS
    'global-require': 2,
    
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
}