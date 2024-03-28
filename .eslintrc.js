// ESLint 检查 .vue 文件需要单独配置编辑器：
// https://eslint.vuejs.org/user-guide/#editor-integrations
module.exports = {
    "root": true,
    "extends": [
        "taro/vue3",
        "@vue/typescript",
        "eslint:recommended",
        "plugin:vue/vue3-essential",
    ],
    "parserOptions": {
        "parser": "@typescript-eslint/parser"
    }
}