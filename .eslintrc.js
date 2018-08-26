// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        es6: true,
        commonjs: true,
        browser: true,
    },
    extends: [
        // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
        'standard',
        // https://github.com/feross/eslint-config-standard-react
        'standard-react'
    ],
    // https://github.com/yannickcr/eslint-plugin-react
    plugins: [
        'react',
        'babel',
        'promise'
    ],
    // add your custom rules here
    'rules': {
      'standard/object-curly-even-spacing': [2, "either"],
    'standard/array-bracket-even-spacing': [2, "either"],
      'standard/computed-property-even-spacing': [2, "even"],
    'standard/no-callback-literal': [2, ["cb", "callback"]],
    'no-throw-literal':0,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        'no-unused-vars': 1,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
