module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': ['warn', {
        singleQuote: true,
        bracketSpacing: false,
        semi: false,
        printWidth: 120
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
