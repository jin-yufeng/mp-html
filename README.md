# Parser
小程序富文本插件（本文档动态更新，建议加星收藏）  
>新版文档链接：[Parser插件文档](https://jin-yufeng.github.io/Parser/)  

## 功能介绍 ##
- 支持解析 `style` 标签中的全局样式  
  支持解析和匹配 `style` 标签中的样式 
  ``` html
  <parser html="{{html}}" />
  ```
  ``` javascript
  data:{
    html:'<style>.a{font-style:italic}#b{font-weight:bold}p{text-align:center}</style>'
  	  +'<p><span class="a">Hello </span><span id="b">World!</span></p>'
  }
  ```

- 支持自定义默认的标签样式  
  支持给各个标签设置默认的效果  
  示例（给表格设置默认的边框）：
  ```html
  <parser html="{{html}}" tag-style="{{tagStyle}}" />
  ```
  ```javascript
  data:{
    tagStyle:{
      table: 'border-collapse:collapse;border-top:1px solid gray;border-left:1px solid gray;',
      th: 'border-right:1px solid gray;border-bottom:1px solid gray;',
      td: 'border-right:1px solid gray;border-bottom:1px solid gray;'
    }
  }
  ```

- 支持多资源加载  
  支持在 `video` 和 `audio` 标签中设置多个 `source` 标签，本插件将按顺序进行加载，若前面的链接无法播放，将自动切换下一个链接进行加载和播放，直到最后一个链接；可用于解决平台差异，最大程度避免无法播放
  ```html
  <video controls>
    <source src="demo1.mov" />
    <source src="demo2.webm" />
  </video>
  ```
  
更多功能可见：[功能介绍](https://jin-yufeng.github.io/Parser/#/)

## 使用方法 ##
### 插件包说明 ##

| 名称 | 大小 | 使用 |
|:---:|:---:|:---:|
| Parser | 44.1KB | 微信小程序插件包 |
| Parser.min | 30.7KB | 微信小程序插件包压缩版（功能相同） |
| Parser.bd | 42.4KB | 百度小程序插件包 |
| Parser.bd.min | 28.8KB | 百度小程序插件包压缩版（功能相同） |
| Parser.uni | 55.5KB | `uni-app` 插件包（可以编译到所有平台） |


### 在原生框架中使用 ###
1. 下载`Parser`文件夹至小程序目录  
2. 在需要引用的页面的`json`文件中添加（百度小程序中组件名一定要**小写**）
   ``` json
   {
     "usingComponents": {
       "parser":"/Parser/index"
     }
   }
   ```
3. 在需要引用的页面的`wxml`文件中添加  
   ``` html
   <parser html="{{html}}" />
   ```
4. 在需要引用的页面的`js`文件中添加  
   ``` javascript
   data: {
     html:"<div>Hello World!</div>"
   }
   ```
- `demo/wx`文件夹下的是微信小程序 `富文本插件` 示例程序的源码，可供参考  

### 在uni-app中使用 ###
- 使用`uni-app`包（可以编译到所有小程序平台）  
  1. 下载`Parser.uni`包到`components`目录下（更名为`Parser`）  
  2. 在需要使用页面的`vue`文件中添加  
     ```vue
     <template>
       <view>
         <parser :html="html"></parser>
       </view>
     </template>
     <script>
     import parser from "@/components/Parser/index"
     export default{
       components: {
         parser
       },
       data() {
         return {
           html: '<div>Hello World!</div>'
         }
       }
     </script>
     ```
  - 可以直接通过插件市场引入：[插件市场](https://ext.dcloud.net.cn/plugin?id=805)
  - `demo/uni-app`文件夹下是一个示例程序，可供参考  

其他框架中使用可见：[在其他框架中使用](https://jin-yufeng.github.io/Parser/#/instructions?id=在其他框架中使用)

### 组件属性 ###  

  | 属性 | 类型 | 默认值 | 必填 | 说明 |
  |:----:|:----:|:----:|:----:|----|
  | html | String/Object/Array | | 是 | 要显示的富文本数据 |
  | tag-style | Object | | 否 | 设置标签的默认样式 |
  | autocopy | Boolean | true | 否 | 是否允许链接受到点击时自动复制链接（仅限http开头的网络链接）|
  | autopause | Boolean | true | 否 | 是否允许播放视频时自动暂停其他视频 |
  | autopreview | Boolean | true | 否 | 是否允许点击图片时自动预览 |
  | autosetTitle | Boolean | true | 否 | 是否自动将title标签的内容设置到页面标题上 |
  | cache-id | String |  | 否 | 缓存的 id，设置后一次解析完成后将自动保存到 globalData 中，下次直接读取 |
  | domain | String |  | 否 | 主域名，设置后将对于图片地址将自动拼接主域名或协议名 |
  | img-mode | String | default | 否 | 图片显示模式 |
  | lazy-load | Boolean | false | 否 | 是否开启图片懒加载 |
  | selectable | Boolean | false | 否 | 是否允许长按复制内容 |
  | show-with-animation | Boolean | false | 否 | 是否使用渐显动画 |
  | animation-duration | Number | 400 | 否 | 动画持续时间 |
  | use-anchor | Boolean | false | 否 | 是否使用页面内锚点 |
  
详细可见：[组件属性](https://jin-yufeng.github.io/Parser/#/instructions?id=组件属性)

### 回调函数 ###

| 名称 | 功能 | 说明 |
|:----:|----|----|
| bindparse | 在解析完成时调用（仅传入的 html 类型为 String 时触发） | 返回一个 object，其中 nodes 为解析后的节点数组，imgList 为图片列表，title 是页面标题，该 object 可以在下次调用直接作为 html 属性的值，节省解析的时间 |
| bindready | 渲染完成时调用 | 返回整个组件的 NodesRef 结构体，包含宽度、高度、位置等信息（每次 html 修改后都会触发） |
| binderror | 出错时调用 | 返回一个 object，其中 source 是错误来源（ad 广告出错、video 视频加载出错、audio 音频加载出错、parse 解析过程中出错），errMsg 为错误信息，errCode 是错误代码（仅ad），target 包含出错标签的具体信息，context 是视频的 context 对象，可以设置新的源 |
| bindimgtap | 在图片受到点击时调用 | 返回一个 object，其中 src 是图片链接，ignore 是一个函数，在回调函数中调用将不进行预览；可用于阻挡 onShow 的调用 |
| bindlinkpress | 在链接受到点击时调用 | 返回一个object，其中 href 是链接地址，ignore 是一个函数，在回调中调用将不自动跳转/复制；开发者可以在该回调中进行进一步操作，如下载文档和打开等 |  

详细可见：[回调函数](https://jin-yufeng.github.io/Parser/#/instructions?id=回调函数)
  
### 使用外部样式 ###
如果需要使用一些固定的样式，可以通过`wxss` / `css`文件引入  
在`/Parser/trees/trees.wxss(css)`中通过`@import`引入自定义的样式文件即可  
```css
/*
* Parser/trees/trees.wxss(css)
* 在这里引入您的自定义样式
*/
@import "external.wxss(css)";
```

更多信息可见：[使用方法](https://jin-yufeng.github.io/Parser/#/instructions)

## 补丁包 ##
`patches`文件夹中准备了一些补丁包，可根据需要选用，可以实现更加丰富的功能  
具体信息见：[补丁包](https://jin-yufeng.github.io/Parser/#/instructions?id=补丁包)

## 案例体验 ##

| [富文本插件](https://github.com/jin-yufeng/Parser/tree/master/demo/wx) | 多么生活 | [SteamCN 蒸汽动力论坛](https://github.com/xPixv/SteamCN-Mini-Program) |
|:---:|:---:|:---:|
| <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md5.jpg?sign=911a1fd62af2666f9c8dfa367b22479c&t=1574499374" width="200" /> | <img src="https://user-images.githubusercontent.com/16403746/69929565-665d6e00-14fa-11ea-807a-8d9050caf342.jpg" width="200" /> | <img src="https://github.com/xPixv/SteamCN-Mini-Program/raw/master/resources/qrcode.jpg" width="200" /> | 

| 恋爱宝典xcx | 恋爱宝典（QQ） |
|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/22900470/70421652-2de30480-1aa5-11ea-93b0-180352d4c397.jpg" width="200"> | <img src="https://user-images.githubusercontent.com/22900470/70422223-5ae3e700-1aa6-11ea-97ce-fec96d17408f.png" width="200"> |

欢迎添加：[链接](https://github.com/jin-yufeng/Parser/issues/27)  

## 后端解析 ##
&emsp;&emsp;本插件提供了一个配套的后端`node.js`支持包，可以提供更加强大的功能，如匹配多层的`style`，代码高亮，直接打开网址，解析`markdown`等，其返回值可以直接作为本组件的`html`属性的值；且在后端提前完成解析后可以节省解析时间，提高性能。  
**注意：该包需要node.js v7.6.0以上运行环境，无法直接在小程序前端使用，建议部署在服务器或云函数上**  

详细文档参考： [npm链接](https://www.npmjs.com/package/parser-wxapp)

## 许可与支持 ##
- 许可  
  您可以随意的使用和分享本插件 [MIT License](https://github.com/jin-yufeng/Parser/blob/master/LICENSE)  
- 支持  
  ![支持](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md6.png?sign=24395ad7572c19464db67d8997e3b2d2&t=1574502139)   


## 更新日志 ##
- 2019.12.10:
  1. `A` 增加了 `cache-id` 属性，可以将解析结果缓存到 `globalData` 中，多次打开不用重复解析 [详细](https://jin-yufeng.github.io/Parser/#/instructions#组件属性)  
  2. `A` 增加了 `getText` 的 `api`，可以获取到一个富文本中的所有文本内容 [详细](https://jin-yufeng.github.io/Parser/#/instructions#getText)  
  3. `A` 增加了 `getVideoContext` 的 `api`，可以获取到视频的 `context` 对象，用于操作播放状态 [详细](https://jin-yufeng.github.io/Parser/#/instructions#getVideoContext)  
  4. `A` 增加了 `highlight` 代码高亮处理接口 [详细](https://jin-yufeng.github.io/Parser/#/instructions#配置项)  
  5. `A` 增加了长内容的解决方案 [详细](https://jin-yufeng.github.io/Parser/#/instructions#长内容处理)  
  6. `U` 重构了解析脚本，提高了解析速度，减小了包的大小  
  7. `U` 解决了微信最新版开发者工具会报 `wx:key="" does not look like a valid key name` 的警告的问题  
  8. `U` `error` 回调将返回该视频的 `context` 对象，可以修改播放源 [详细](https://jin-yufeng.github.io/Parser/#/instructions#回调函数)  
  9. `F` 修复了 `uni-app` 包编译到 `H5` 时在微信内置浏览器中无法显示、存在多个 `parser` 标签时相互覆盖等问题 [详细](https://github.com/jin-yufeng/Parser/issues/59)  
  
  *此版本较之前版本在 `api` 和补丁包的引入方式上有不兼容的地方，请注意*

- 2019.12.3:
  1. `A` 增加了 `domain` 属性，可以设置主域名，设置后对于图片链接将自动拼接上主域名或协议名 [详细](https://github.com/jin-yufeng/Parser/issues/56)
  2. `A` 增加了 `use-anchor` 属性，可以设置页面内锚点 [详细](https://github.com/jin-yufeng/Parser/issues/55)
  3. `U` `CssHandler` 补丁包增加支持 `before` 和 `after` 伪类
- 2019.11.29:
  1. `U` `linkpress`, `imgtap` 回调中增加一个 `ignore` 函数，在回调中调用此函数将不自动进行链接跳转/图片预览操作，可以屏蔽指定的链接/图片或进行自定义操作 [详细](https://github.com/jin-yufeng/Parser/issues/51)  
- 2019.11.28:
  1. `U` `table` 标签支持了 `border`, `cellpadding`, `cellspacing` 属性 [详细](https://github.com/jin-yufeng/Parser/issues/49)  
  2. `U` 重构了 `uni-app` 包编译到 `H5` 时的显示方式，采用 `html` 原生的标签渲染，实现了以下优化（仅针对 `H5` 平台，其他**不变**）：
     - 支持所有浏览器支持的标签和属性  
     - `style` 标签支持所有浏览器支持的选择器
     - `error` 回调增加支持 `img`，且返回组件的 `DOM` 实例，修改属性后可以直接对页面生效  
     另外，通过一些转换，原来的属性和事件依然全部支持（不再有 `parser` 回调，因为不进行解析）  

更多可见：[更新日志](https://jin-yufeng.github.io/Parser/#/changelog)
