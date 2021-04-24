/**
 * @description 插件构建文件模板
 */

module.exports = {
  /**
   * @description 入口文件
   * @type {String}
   * @default 'index.js'
   */
  main: 'index.js',
  /**
   * @description 支持的平台
   * @type {String[]}
   * @default ['mp-weixin','mp-qq','mp-baidu','mp-alipay','mp-toutiao','uni-app']
   */
  platform: ['mp-weixin', 'mp-qq', 'mp-baidu', 'mp-alipay', 'mp-toutiao', 'uni-app'],
  /**
   * @description 要被添加到模板文件中的标签（将被添加到 src/node/node.wxml）
   * 必须要有 wx:if 表明什么情况下使用该标签
   * n 表示标签结构体，<node> 标签用于递归显示子节点（可参考源文件中的写法）
   * @type {String}
   */
  template: '',
  /**
   * @description 用于处理模板中事件的方法（将被添加到 src/node/node.js）
   * 需要触发顶层组件的事件请使用 this.root.triggerEvent
   * @type {Object}
   */
  methods: {

  },
  /**
   * @description 用于模板文件的 css 样式（将被添加到 src/node/node.wxss）
   * @type {String}
   */
  style: '',
  /**
   * @description 要被引入到模板文件的 css 文件路径（将被添加到 src/node/node.wxss）
   * @type {String|String[]}
   */
  import: [],
  /**
   * @description 在模板中需要使用的组件或插件列表（将被添加到 src/node/node.json）
   * @type {Object}
   */
  usingComponents: {

  },
  /**
   * @description 自定义文件处理器
   * 如果上述处理还无法满足要求，可以在此方法中进行处理
   * 所有 src 目录下的文件和本插件目录下的文件都会经过此方法的处理
   * @param {Vinyl} file 关于该文件对象的格式可参考 https://github.com/gulpjs/vinyl#instance-methods
   * @param {String} platform 平台
   */
  handler (file, platform) {
    let content = file.contents.toString()
    // 进行处理
    if (platform === 'xxx') {
      content = content.replace('aaa', 'bbb')
    }
    file.contents = Buffer.from(content)
  }
}
