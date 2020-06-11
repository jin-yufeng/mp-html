> 新版文档链接：[Parser 插件文档](https://jin-yufeng.github.io/Parser)  

## 功能简介 ##
- 支持匹配 `style` 标签中的样式  
- 支持 `svg`  
- 支持锚点跳转  
- 支持设置占位图  
- 支持长按复制内容  
- 支持实体编码  
- 支持给多媒体标签设置多个源  
- 支持自动给链接填充主域名  
- 支持几乎所有的 `html` 标签  
- 支持丰富的事件和效果  
- 轻量化、效率高、容错性强  
- 全端支持（含 `v3、NVUE`）  
...

更多功能可见：[功能介绍](https://jin-yufeng.github.io/Parser/#/)

## 使用方法 ##
```html
<jyf-parser :html="html" ref="article"></jyf-parser>
```
```javascript
import jyfParser from "@/components/jyf-parser/jyf-parser";
export default{
  // HBuilderX 2.5.5+ 可以通过 easycom 自动引入
  components: {
    jyfParser
  },
  data() {
    return {
      html: ''
    }
  },
  onReady() {
    // 方式 1
    this.html = '<div>Hello World!</div>';
    // 方式 2
    this.$refs.article.setContent('<div>Hello World!</div>');
  }
}
```

- 组件属性  

  | 属性 | 类型 | 默认值 | 说明 |
  |:----:|:----:|:----:|----|
  | html | String/Array |  | 要显示的富文本数据，格式同 rich-text |
  | autopause | Boolean | true | 是否允许播放视频时自动暂停其他视频 |
  | autoscroll | Boolean | false | 是否自动给 table 加一个滚动层（使表格可以单独滚动） |
  | autosetTitle | Boolean | true | 是否自动将 title 标签的内容设置到页面标题上 |
  | compress | Number | 0 | 压缩等级，可以选择是否移除 id 和 class |
  | domain | String |  | 主域名，设置后将对于图片地址将自动拼接主域名或协议名 |
  | lazy-load | Boolean | false | 是否开启图片懒加载 |
  | loading-img | String |  | 图片加载完成前的占位图，详见 [占位图](https://jin-yufeng.github.io/Parser/#/#设置占位图) |
  | selectable | Boolean | false | 是否允许长按复制内容 |
  | show-with-animation | Boolean | false | 是否使用渐显动画 |
  | tag-style | Object |  | 设置标签的默认样式 |
  | use-anchor | Boolean | false | 是否使用页面内锚点 |
  | use-cache | Boolean | false | 是否使用缓存，设置后将会把解析结果进行缓存，下次打开不用重复解析 |

- 事件  

  | 名称 | 触发 | 说明 |
  |:----:|----|----|
  | @parse | 解析完成时触发 | 返回解析结果（一个 nodes 数组，仅传入的 html 类型为 String 时会触发），可以对该结果进行自定义修改，将在渲染时生效 |
  | @load | dom 加载完成时触发 | 所有节点被添加到节点树中时触发，无返回值，可以调用 api |
  | @ready | 渲染完成时触发 | 返回 boundingClientRect 的查询结果（包含宽高、位置等信息），所有图片（除懒加载）加载完成时才会触发，图片较大时可能 **延时较长** |
  | @error | 出错时触发 | 返回一个 object，其中 source 是错误来源，errMsg 为错误信息，target 包含出错标签的具体信息 |
  | @imgtap | 图片被点击时触发 | 返回一个 object，其中 src 是图片链接，ignore 是一个函数，在回调函数中调用将不进行预览；可用于阻挡 onShow 的调用 |
  | @linkpress | 链接被点击时触发 | 返回一个 object，其中 href 是链接地址，ignore 是一个函数，在回调中调用将不自动跳转/复制；开发者可以在该回调中进行进一步操作，如下载文档和打开等 | 

- 立即体验  
  ![富文本插件](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md5.jpg?sign=9e6729ea9ccb15da6f3d301cd31a4f08&t=1572768042)   

更多信息可见：  
[文档地址](https://jin-yufeng.github.io/Parser)  
[Github 链接](https://github.com/jin-yufeng/Parser)（好用的话，点个 `star` 吧）  

## 注意事项 ##
1. 本插件需要使用 `HBuilderX 2.2.5` 及以上版本进行编译  
2. 本插件通过组件递归的方式显示节点树，因此必须使用自定义组件模式编译（或 `v3`）  
3. 由于 `ad` 标签的特殊性，若需要使用文中广告，需自行到 `trees.vue` 中打开对应的注释  
4. 使用了 `colspan` 和 `rowspan` 的表格由于无法通过 `css` 模拟，将直接使用 `rich-text` 显示，其中的图片链接无法点击  
5. 从 `2.3.0（20200212）` 以下版本进行升级时需注意引入路径发生了变化（为适配 `easycom` 规则）  

平台差异：

| 平台 | 差异 |
|:---:|---|
| 微信小程序 | 基础库 2.7.1 及以上支持 ruby、bdi、bdo 标签，支持图片长按弹出菜单 |
| 头条小程序 | 不支持 audio 标签<br>imgtap 和 linkpress 事件的返回值中没有 ignore 方法（需使用 [global.Parser.onxxx](https://jin-yufeng.github.io/Parser/#/instructions?id=关于-ignore-方法)） |
| H5<br>360 小程序 | 支持所有浏览器支持的标签<br>不支持 loading-img 属性<br>不支持写在 trees.vue 中的样式（需要直接使用 style 标签）<br>[配置项](https://jin-yufeng.github.io/Parser/#/instructions?id=配置项) 中除 errorImg、userAgentStyles 外均无效 |
| App | v3 不支持 audio 标签<br>v3 支持 iframe 标签 |
| NVUE | 支持所有浏览器支持的标签<br>不支持 lazy-load、loading-img 属性<br>不支持 getVideoContext 的 api<br>不支持写在 trees.vue 中的样式（需要直接使用 style 标签）<br>[配置项](https://jin-yufeng.github.io/Parser/#/instructions?id=配置项) 中除 errorImg、userAgentStyles 外均无效 |
| 华为快应用 | 不支持锚点跳转 |

关于 `a` 标签：  
`H5`、`App（含 NVUE）` 外链可以直接打开，小程序端将自动复制链接  
小程序端 `a` 标签设置 `app-id` 后可以跳转到其他小程序  

关于 `document` 对象：  
[组件实例](https://jin-yufeng.github.io/Parser/#/instructions?id=获取实例的方法) 中提供了一个 `document` 对象，可以更加灵活的操作和调整富文本内容，不同平台的表现如下：  
- `H5` 和 `360` 小程序  
  `document` 为富文本所在 `div` 的实例，可以直接调用 `dom` 的各类方法  
- 小程序和 `App`  
  若使用了 [document](https://jin-yufeng.github.io/Parser/#/instructions?id=document) 补丁包，则指向一个虚拟的 `dom` 对象（否则为 `undefined`），具体方法见文档  
- `NVUE`  
  `document` 为所在 `webview` 的实例，可以通过 `evalJs` （注意不是 `evalJS`）方法修改 `dom`  

关于 `audio` 标签：  
针对一些平台不支持 `audio` 标签的问题，可以引入 [audio](https://jin-yufeng.github.io/Parser/#/instructions?id=audio) 扩展包解决  