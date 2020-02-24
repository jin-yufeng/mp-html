# Parser
小程序富文本插件（本文档动态更新，建议 `star` 收藏）  

>新版文档链接：[Parser 插件文档](https://jin-yufeng.github.io/Parser)  

## 功能简介 ##
- 支持解析 `style` 标签中的全局样式  
  支持解析和匹配 `style` 标签中的样式 
  ``` html
  <parser html="{{html}}" />
  ```
  ``` javascript
  Page({
    data:{
      html:'<style>.a{font-style:italic}#b{font-weight:bold}p{text-align:center}</style>'
  	    +'<p><span class="a">Hello </span><span id="b">World!</span></p>'
    }
  })
  ```

- 支持自定义默认的标签样式  
  支持给各个标签设置默认的效果  
  示例（给表格设置默认的边框）：
  ```html
  <parser html="{{html}}" tag-style="{{tagStyle}}" />
  ```
  ```javascript
  Page({
    data:{
      tagStyle:{
        table: 'border-collapse:collapse;border-top:1px solid gray;border-left:1px solid gray;',
        th: 'border-right:1px solid gray;border-bottom:1px solid gray;',
        td: 'border-right:1px solid gray;border-bottom:1px solid gray;'
      }
    }
  })
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
| parser | 46.7KB | 微信小程序插件包 |
| parser.min | 30.9KB | 微信小程序插件包压缩版（功能相同） |
| parser.uni | 59.1KB | `uni-app` 插件包（可以编译到所有平台） |

百度版从 `20191215` 起不再维护，可从过去版本中获取（`Parser.bd`）

### 在原生框架中使用 ###
1. 复制 `parser` 文件夹至 `components` 目录  
2. 在需要使用页面的 `json` 文件中添加  
   
   ```json
   {
     "usingComponents": {
       "parser":"/components/parser/parser"
     }
   }
   ```
3. 在需要使用页面的 `wxml` 文件中添加  
   
   ```html
   <parser html="{{html}}" />
   ```
4. 在需要使用页面的`js`文件中添加  
   
   ``` javascript
   data: {
     html:"<div>Hello World!</div>"
   }
   ```
- `demo/wx` 文件夹下的是微信小程序 `富文本插件` 示例程序的源码，可供参考  

### 在uni-app中使用 ###
1. 复制 `parser.uni` 包到 `components` 目录下（更名为 `jyf-parser`）  
2. 在需要使用页面的 `vue` 文件中添加  
   
   ```vue
   <template>
     <view>
       <jyf-parser :html="html"></jyf-parser>
     </view>
   </template>
   <script>
   import parser from "@/components/jyf-parser/jyf-parser"; // HBuilderX 2.5.5 及以上可以不需要引入
   export default {
     // HBuilderX 2.5.5 及以上可以不需要引入
     components: {
       "jyf-parser": parser
     },
     data() {
       return {
         html: '<div>Hello World!</div>'
       }
     }
   </script>
   ```
- 可以直接通过 [插件市场](https://ext.dcloud.net.cn/plugin?id=805) 引入
- `demo/uni-app` 文件夹下是一个示例程序，可供参考  

其他框架中使用可见：[在其他框架中使用](https://jin-yufeng.github.io/Parser/#/instructions?id=在其他框架中使用)

### 组件属性 ###  

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|:----:|:----:|:----:|:----:|----|
| html | String/Array | | 是 | 要显示的富文本数据，格式同 rich-text |
| autopause | Boolean | true | 否 | 是否允许播放视频时自动暂停其他视频 |
| autosetTitle | Boolean | true | 否 | 是否自动将 title 标签的内容设置到页面标题 |
| domain | String |  | 否 | 主域名，设置后将给链接自动拼接主域名或协议名 |
| lazy-load | Boolean | false | 否 | 是否开启图片懒加载 |
| selectable | Boolean | false | 否 | 是否允许长按复制内容 |
| show-with-animation | Boolean | false | 否 | 是否使用渐显动画 |
| tag-style | Object | | 否 | 设置标签的默认样式 |
| use-anchor | Boolean | false | 否 | 是否使用页面内锚点 |
| use-cache | Boolean | false | 否 | 是否使用缓存，设置后多次打开不用重复解析 |
  
详细可见：[组件属性](https://jin-yufeng.github.io/Parser/#/instructions?id=组件属性)

### 事件 ###

| 名称 | 功能 | 说明 |
|:----:|----|----|
| bindparse | 解析完成时触发 | 返回解析结果（一个 nodes 数组，仅传入的 html 类型为 String 时会触发），可以对该结果进行自定义修改，将在渲染时生效 |
| bindready | 渲染完成时触发 | 返回 boundingClientRect 的查询结果（包含宽高、位置等信息） |
| binderror | 出错时触发 | 返回一个 object，其中 source 是错误来源，errMsg 为错误信息，errCode 是错误代码（仅ad），target 包含出错标签的具体信息，context 是视频的 context 对象 |
| bindimgtap | 图片被点击时触发 | 返回一个 object，其中 src 是图片链接，ignore 是一个函数，在回调函数中调用将不进行预览 |
| bindimglongtap | 图片被长按时触发 | 返回一个 object，其中 src 是图片链接 |
| bindlinkpress | 链接被点击时触发 | 返回一个 object，其中 href 是链接地址，ignore 是一个函数，在回调中调用将不自动跳转/复制 |  

详细可见：[回调函数](https://jin-yufeng.github.io/Parser/#/instructions?id=回调函数)
  
### 使用外部样式 ###
如果需要使用一些固定的样式，可以通过 `wxss` / `css` 文件引入  
在 `parser/trees/trees.wxss(css)` 中通过 `@import` 引入自定义的样式文件即可  
```css
/*
* parser/trees/trees.wxss(css)
* 在这里引入您的自定义样式
*/
@import "external.wxss(css)";
```

更多信息可见：[使用方法](https://jin-yufeng.github.io/Parser/#/instructions)

## 补丁包 ##
`patches` 文件夹中准备了一些补丁包，可根据需要选用，可以实现更加丰富的功能  
具体信息见：[补丁包](https://jin-yufeng.github.io/Parser/#/instructions?id=补丁包)

## 案例体验 ##

| [富文本插件](https://github.com/jin-yufeng/Parser/tree/master/demo/wx) | 多么生活 | [SteamCN 蒸汽动力论坛](https://github.com/xPixv/SteamCN-Mini-Program) | 飞马港 |
|:---:|:---:|:---:|:---:|
| <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md5.jpg?sign=911a1fd62af2666f9c8dfa367b22479c&t=1574499374" width="200" /> | <img src="https://user-images.githubusercontent.com/16403746/69929565-665d6e00-14fa-11ea-807a-8d9050caf342.jpg" width="200" /> | <img src="https://github.com/xPixv/SteamCN-Mini-Program/raw/master/resources/qrcode.jpg" width="200" /> | <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/%E9%A3%9E%E9%A9%AC%E6%B8%AF.jpg?sign=56fe7d5a1244e72e6925468f87d4aecf&t=1579423657" width="200"> |

| 恋爱宝典xcx | 恋爱宝典（QQ） | [程序员技术之旅](https://github.com/fendoudebb/z-blog-wx) | 古典文学名著阅读 |
|:---:|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/22900470/70421652-2de30480-1aa5-11ea-93b0-180352d4c397.jpg" width="200"> | <img src="https://user-images.githubusercontent.com/22900470/70422223-5ae3e700-1aa6-11ea-97ce-fec96d17408f.png" width="200"> | <img src="https://user-images.githubusercontent.com/16144460/74083526-0528bc80-4aa0-11ea-841f-a974c5f9131d.jpg" width="200"> | <img src="https://camo.githubusercontent.com/bb2aa4562a8b4912c82129f10ff15d1eb4ce0d08/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f6a7065672f3432383733322f313537353830303731333133312d36326639663836362d366233362d343766312d396234302d6132633964373839616633362e6a706567" width="200"> |

欢迎添加：[链接](https://github.com/jin-yufeng/Parser/issues/27)  

## 许可与支持 ##
- 许可  
  您可以随意的使用和分享本插件 [MIT License](https://github.com/jin-yufeng/Parser/blob/master/LICENSE)  
- 支持  
  ![支持](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md6.png?sign=24395ad7572c19464db67d8997e3b2d2&t=1574502139)   


## 更新日志 ##
- 2020.2.23
  1. `U` 支持自动压缩 `style` 属性，移除重复的样式，可以减少解析结果大小  
  2. `U` 支持预览 `base64` 图片（通过暂存到本地实现）  
  3. `U` `CssHandler` 补丁包支持属性选择器和 `@media`，伪类中的 `content` 支持 `attr()` [详细](https://jin-yufeng.github.io/Parser/#/instructions?id=csshandler)  
  4. `U` 精简了部分代码  
  5. `U` `uni-app` 包 `APP` 端支持 `iframe` 标签  

- 2020.2.17
  1. `A` 增加了 `imglongtap` 事件，图片被长按时触发，可用于显示自定义菜单 [详细](https://jin-yufeng.github.io/Parser/#/instructions#事件)  
  2. `U` 优化了双击缩放的效果  
  3. `U` 图片设置的宽度超出屏幕宽度时自动将高度设置为 `auto`，避免变形（同时移除了 `img-mode` 属性）  
  4. `U` 修改了部分文件和文件夹的命名（**引入路径有变化**）[详细](https://jin-yufeng.github.io/Parser/#/instructions#在原生框架中使用)  
  5. `D` 移除了 `autocopy` 和 `autopreview` 属性，如果需要禁用自动预览/复制链接，请使用  `linkpress` 和 `imgtap` 事件中的 `ignore` 函数  
  6. `D` 移除了 `versionHigherThan`、`parseHtml`、`parseCss` 的 `api`  
  7. `D` 废弃了后端加强包  

  *此版本移除了部分冗余功能，与之前版本存在部分不兼容情况，请注意*

- 2020.2.12
  1. `A` 增加了 `gesture-zoom` 属性，可以设置双击缩放（默认 `false`）  
  2. `U` `uni-app` 包修改命名使得符合 `easycom` 规则（`HBuilder X 2.5.5` 以上可以直接使用，无需引入；**之前版本的引入路径有变化**）[详细](https://github.com/jin-yufeng/Parser/issues/79)  

- 2020.1.23
  1. `A` 添加了一个打包工具 [详细](https://jin-yufeng.github.io/Parser/#/instructions?id=打包工具)  
  2. `U` 支持 `rpx` 单位  

更多可见：[更新日志](https://jin-yufeng.github.io/Parser/#/changelog)
