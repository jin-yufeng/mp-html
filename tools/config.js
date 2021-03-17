/**
 * @fileoverview 配置文件
 */
module.exports = {
  /**
   * @description 需要的插件列表
   */
  plugins: [
    // 按需打开注释即可
    // 'audio',     // 音乐播放器
    // 'editable',  // 内容编辑
    // 'emoji',     // 小表情
    // 'highlight', // 代码高亮
    // 'markdown',  // 解析 md
    // 'search',    // 关键词搜索
    // 'style',     // 解析 style 标签
    // 'txv-video'  // 使用腾讯视频
  ],

  /**
   * @description 是否需要使用广告标签（ad）
   */
  ad: false,

  /**
   * @description 要引入到组件中的外部样式（css）
   * 仅支持标签名和 class 选择器
   */
  externStyle: ``,

  /**
   * @description babel 配置（es6 转 es5）
   * @tutorial https://babeljs.io/docs/usage/options/
   */
  babel: {
    presets: ['@babel/env']
  },

  /**
   * @description js 压缩配置
   * @tutorial https://www.npmjs.com/package/uglify-js#minify-options
   */
  uglify: {
    mangle: {
      toplevel: true
    },
    output: {
      comments: /^!/
    }
  },

  /**
   * @description html 压缩配置
   * @tutorial https://github.com/kangax/html-minifier#options-quick-reference
   */
  htmlmin: {
    caseSensitive: true,
    collapseWhitespace: true,
    removeComments: true,
    keepClosingSlash: true
  },

  /**
   * @description css 压缩配置
   * @tutorial https://github.com/jakubpawlowicz/clean-css#constructor-options
   */
  cleanCss: {

  }
}
