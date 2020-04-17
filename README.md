# Parser
> 小程序富文本插件，详见 [文档](https://jin-yufeng.github.io/Parser)  
> 功能使用调查问卷：[填写](https://www.wjx.cn/jq/67585702.aspx)  

![star](https://badgen.net/github/stars/jin-yufeng/Parser)
![forks](https://badgen.net/github/forks/jin-yufeng/Parser)
![last-commit](https://badgen.net/github/last-commit/jin-yufeng/Parser)
![license](https://badgen.net/github/license/jin-yufeng/Parser)  

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
  支持在 `picture` 标签中使用 `source` 标签，通过设置 `media` 属性可以给不同大小屏幕的设备设置不同的图片链接
  ```html
  <picture>
    <source media="(min-width:400px)" src="high-quality.jpg">
    <source media="(min-width:250px)" src="middle-quality.jpg">
    <img src="low-quality.jpg" />
  </picture>
  ```
更多功能可见：[功能介绍](https://jin-yufeng.github.io/Parser/#/)

## 使用方法 ##
### 插件包说明 ##

| 名称 | 大小 | 使用 |
|:---:|:---:|:---:|
| parser | 44.5KB | 微信小程序插件包 |
| parser.min | 30.0KB | 微信小程序插件包压缩版（功能相同） |
| parser.qq | 43.7KB | QQ 小程序插件包 |
| parser.tt | 43.0KB | 头条小程序插件包 |
| parser.uni | 61.6KB | `uni-app` 插件包（可以编译到所有平台） |

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

### 在 uni-app 中使用 ###
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
| compress | Number | 0 | 否 | 压缩等级，可以选择是否移除 id 和 class |
| domain | String |  | 否 | 主域名，设置后将给链接自动拼接主域名或协议名 |
| lazy-load | Boolean | false | 否 | 是否开启图片懒加载 |
| selectable | Boolean | false | 否 | 是否允许长按复制内容 |
| show-with-animation | Boolean | false | 否 | 是否使用渐显动画 |
| tag-style | Object | | 否 | 设置标签的默认样式 |
| use-anchor | Boolean | false | 否 | 是否使用页面内锚点 |
| use-cache | Boolean | false | 否 | 是否使用缓存，设置后多次打开不用重复解析 |
| xml | Boolean | false | 否 | 是否使用 xml 方式解析 |
  
详细可见：[组件属性](https://jin-yufeng.github.io/Parser/#/instructions?id=组件属性)

### 事件 ###

| 名称 | 功能 | 说明 |
|:----:|----|----|
| bindparse | 解析完成时触发 | 返回解析结果（一个 nodes 数组，仅传入的 html 类型为 String 时会触发），可以对该结果进行自定义修改，将在渲染时生效 |
| bindload | dom 加载完成时触发 | 所有节点被添加到节点树中时触发，无返回值，可以调用 api |
| bindready | 渲染完成时触发 | 返回 boundingClientRect 的查询结果（包含宽高、位置等信息），所有图片（除懒加载）加载完成时才会触发，图片较大时可能 **延时较长** |
| binderror | 出错时触发 | 返回一个 object，其中 source 是错误来源，errMsg 为错误信息，errCode 是错误代码（仅ad），target 包含出错标签的具体信息，context 是视频的 context 对象 |
| bindimgtap | 图片被点击时触发 | 返回一个 object，其中 src 是图片链接，ignore 是一个函数，在回调函数中调用将不进行预览 |
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

| [富文本插件](https://github.com/jin-yufeng/Parser/tree/master/demo/wx) | 多么生活 | [SteamCN 蒸汽动力论坛](https://github.com/xPixv/SteamCN-Mini-Program) | 典典博客 |
|:---:|:---:|:---:|:---:|
| <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md5.jpg?sign=911a1fd62af2666f9c8dfa367b22479c&t=1574499374" width="200" /> | <img src="https://user-images.githubusercontent.com/16403746/69929565-665d6e00-14fa-11ea-807a-8d9050caf342.jpg" width="200" /> | <img src="https://github.com/xPixv/SteamCN-Mini-Program/raw/master/resources/qrcode.jpg" width="200" /> | <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/%E5%85%B8%E5%85%B8%E5%8D%9A%E5%AE%A2.jpg?sign=5b2d371a4bd840c14c8d3740c35ee07f&t=1586360436" width="200"> |

| 恋爱宝典xcx | 恋爱宝典（QQ） | [程序员技术之旅](https://github.com/fendoudebb/z-blog-wx) | 古典文学名著阅读 |
|:---:|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/22900470/70421652-2de30480-1aa5-11ea-93b0-180352d4c397.jpg" width="200"> | <img src="https://user-images.githubusercontent.com/22900470/70422223-5ae3e700-1aa6-11ea-97ce-fec96d17408f.png" width="200"> | <img src="https://user-images.githubusercontent.com/16144460/74083526-0528bc80-4aa0-11ea-841f-a974c5f9131d.jpg" width="200"> | <img src="https://camo.githubusercontent.com/bb2aa4562a8b4912c82129f10ff15d1eb4ce0d08/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f6a7065672f3432383733322f313537353830303731333133312d36326639663836362d366233362d343766312d396234302d6132633964373839616633362e6a706567" width="200"> |

欢迎添加：[链接](https://github.com/jin-yufeng/Parser/issues/27)  

## 许可与支持 ##
- 许可  
  您可以随意的使用和分享本插件 [MIT License](https://github.com/jin-yufeng/Parser/blob/master/LICENSE)  
  不可用于任何违法用途  
  在用于生产环境前务必经过充分测试，由插件 `bug` 带来的损失概不负责（可以自行修改源码）  

- 支持  
  ![支持](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md6.png?sign=24395ad7572c19464db67d8997e3b2d2&t=1574502139)   


## 更新日志 ##
- 2020.4.17  
  1. `F` 修复了 `uni-app` 包 `NVUE` 端打包到安卓后可能白屏的问题（另外由于不再通过本地文件中转，显示速度应该更快）  

- 2020.4.16  
  1. `U` `uni-app` 包用通过 `image`（经过一些处理后）来显示图片（替代 `rich-text`），可以实现以下优化：
     1. 百度、支付宝（1.9.0）、头条小程序支持 `lazy-load`，微信和 `App` 也采用 `image` 自带的 `lazy-load`，可能性能更好  
     2. `img` 出错时也会触发 `error` 事件，且可以通过 `context` 重设 `src` [详细](https://jin-yufeng.github.io/Parser/#/instructions#关于-error-事件)  
     3. 微信端还可以支持云文件 `ID`（2.3.0），长按弹出菜单（2.7.0），支持 `webp` 图片（2.9.0）  
  2. `F` `uni-app` 包修复了 `NVUE` 中使用可能空白的问题  

- 2020.4.14  
  1. `A` 增加 `QQ` 小程序原生包 [详细](https://jin-yufeng.github.io/Parser/#/instructions#插件包说明)  
  2. `U` 头条小程序包优化实体编码处理  
  3. `U` `uni-app` 包 `nvue` 端实现了 `navigateTo` 和 `preLoad` 的 `api`  

- 2020.4.13  
  1. `A` 增加头条小程序原生包 [详细](https://jin-yufeng.github.io/Parser/#/instructions#插件包说明)  
  2. `U` 针对头条小程序事件无法传递函数的问题，提供一种新的接收方式（`global.Parser.onxxx`）[详细](https://jin-yufeng.github.io/Parser/#/instructions#事件)  
  3. `F` 修复了自动移除空 `div` 导致换行失效的问题 [详细](https://github.com/jin-yufeng/Parser/issues/111)  
  4. `F` 修复了使用多个并列 `rpx` 时可能失效的问题 [详细](https://github.com/jin-yufeng/Parser/issues/112)  
  5. `F` 修复了 `uni-app` 包 `getText` 方法出错的问题 [详细](https://github.com/jin-yufeng/Parser/issues/110)  
  6. `F` 修复了 `audio` 补丁包音乐名太长会导致样式错乱的问题  

- 2020.4.12  
  一周年撒花 🎉🎉  
  1. `U` `uni-app` 包支持 `NVUE` 端 [详细](https://jin-yufeng.github.io/Parser/#/changelog?id=_20200412)  
  2. `U` `uni-app` 包 `App` 端支持直接通过 `plus` 打开外链  

- 2020.3.28
  1. `F` 修复了 `uni-app` 包 `App(v3)` 端 `iframe` 标签无法使用的问题  

- 2020.3.26  
  1. `A` 增加了 `xml` 属性，可以以 `xml` 方式解析 [详细](https://jin-yufeng.github.io/Parser/#/instructions#xml)  
  2. `F` 修复了使用自闭合 `svg` 标签会导致死循环的问题 [详细](https://github.com/jin-yufeng/Parser/issues/94)  
  3. `F` 修复了设置 `domain` 属性时 `data:image` 和 `cloud://` 的链接会被错误填充的问题  
  
- 2020.3.23  
  1. `A` 增加了 `audio` 的补丁包（替代被废弃的原生 `audio`）[详细](https://jin-yufeng.github.io/Parser/#/instructions#audio)  
  2. `U` 通过 `eslint` 检查规范和修复了一些问题  
  
- 2020.3.21  
  1. `U` 没有使用 `colspan` 和 `rowspan` 的表格里的链接可以点击  

- 2020.3.20
  1. `U` 所有标签支持 `align` 属性  
  2. `U` 微信包将不用于渲染的属性声明为 [纯数据字段](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/pure-data.html)，可以提升性能  
  3. `F` 修复了设置 `domain` 时背景图片的链接会被错误填充的问题  
  4. `F` `uni-app` 包修复了一个样式错误 [详细](https://github.com/jin-yufeng/Parser/issues/92)  
  5. `F` `uni-app` 包修复了 `video` 中使用 `source` 可能无法播放的问题 [详细](https://github.com/jin-yufeng/Parser/issues/93)  

更多可见：[更新日志](https://jin-yufeng.github.io/Parser/#/changelog)
