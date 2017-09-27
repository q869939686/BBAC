// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        'comma-dangle': ["error", "never"],
        // 关闭　必须末尾新起一行
        'eol-last': ["off", "always"],
        // allow async-await
        'generator-star-spacing': 0,
        indent: ['error', 4],
        'space-before-function-paren': ["off", "always"],
        // 关闭禁止分号
        semi: 0,
        // 函数前的空格
        // 'space-before-function-paren': ['never'],
        'no-unused-vars': ["warn"],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
