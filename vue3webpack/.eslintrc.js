module.exports = {
  // 指定解析器为 @babel/eslint-parser
  parser: "@babel/eslint-parser",
  // 针对 Vue 文件，使用 vue-eslint-parser（需同时保留主解析器）
  overrides: [
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@babel/eslint-parser",
      },
    },
  ],
  // 启用插件
  plugins: ["vue", "import"],
  // 扩展推荐规则
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",  // Vue 3 规则
    "plugin:import/recommended"
  ],
  // 其他自定义规则...
};