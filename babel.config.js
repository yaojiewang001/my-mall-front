/* 项目发布阶段需要用到的bable插件 */
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}


module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset",
    ["@babel/preset-env",{"modules": "commonjs"}]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    /* 发布产品时的插件数组 */
    ...prodPlugins,
    /* 懒加载插件 */
    '@babel/plugin-syntax-dynamic-import'
  ]
  
}