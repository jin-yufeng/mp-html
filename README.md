# Parser
> 小程序富文本插件，详见 [文档](https://jin-yufeng.github.io/Parser)  

![star](https://badgen.net/github/stars/jin-yufeng/Parser)
![forks](https://badgen.net/github/forks/jin-yufeng/Parser)
![last-commit](https://badgen.net/github/last-commit/jin-yufeng/Parser)
![license](https://badgen.net/github/license/jin-yufeng/Parser)  

## 功能简介 ##
- 支持匹配 `style` 中的样式  
- 支持 `svg`  
- 支持锚点跳转  
- 支持设置占位图  
- 支持长按复制内容  
- 支持给多媒体标签设置多个源  
- 支持自动给链接填充主域名  
- 支持几乎所有的 `html` 标签  
- 支持丰富的事件和效果  
- 轻量化、效率高、容错性强  
- 支持多平台（微信、QQ、百度、支付宝、头条、uni-app 等）  
...

更多功能可见：[功能介绍](https://jin-yufeng.github.io/Parser/#/)

## 使用方法 ##
### 插件包说明 ##

| 名称 | 大小 | 使用 |
|:---:|:---:|:---:|
| parser | 40.3KB | 微信小程序插件包 |
| parser.min | 25.6KB | 微信小程序插件包压缩版（功能相同） |
| parser.qq | 39.8KB | QQ 小程序插件包 |
| parser.bd | 38.2KB | 百度小程序插件包 |
| parser.my | 38.5KB | 支付宝小程序插件包 |
| parser.tt | 39.1KB | 头条小程序插件包 |
| parser.uni | 57.4KB | `uni-app` 插件包（可以编译到所有平台） |

### 在原生框架中使用 ###
- 源码引入  
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
  4. 在需要使用页面的 `js` 文件中添加  
     
     ``` javascript
     data: {
       html:"<div>Hello World!</div>"
     }
     ```
- `npm` 引入（仅限微信，需要基础库 `2.1.1` 以上）  
  1. 在小程序目录下执行  
     
     ```bash
     npm install parser-wx
     ```
  2. 勾选使用 `npm` 模块，并点击工具-构建 `npm`  
  3. 在需要使用页面的 `json` 文件中添加  
     
     ```json
     {
       "usingComponents": {
         "parser":"parser-wx"
       }
     }
     ```
     后续步骤同上  

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

| 属性 | 类型 | 默认值 | 说明 |
|:----:|:----:|:----:|----|
| html | String |  | 要显示的 html 字符串 |
| autopause | Boolean | true | 是否允许播放视频时自动暂停其他视频 |
| autoscroll | Boolean | false | 是否自动给 table 加一个滚动层（使表格可以单独滚动） |
| autosetTitle | Boolean | true | 是否自动将 title 标签的内容设置到页面标题 |
| compress | Number | 0 | 压缩等级，可以选择是否移除 id 和 class |
| domain | String |  | 主域名，设置后将给链接自动拼接主域名或协议名 |
| lazy-load | Boolean | false | 是否开启图片懒加载 |
| loading-img | String |  | 图片加载完成前的占位图，详见 [占位图](https://jin-yufeng.github.io/Parser/#/#设置占位图) |
| selectable | Boolean | false | 是否允许长按复制内容 |
| show-with-animation | Boolean | false | 是否使用渐显动画 |
| tag-style | Object |  | 设置标签的默认样式 |
| use-anchor | Boolean | false | 是否使用页面内锚点 |
| use-cache | Boolean | false | 是否使用缓存，设置后多次打开不用重复解析 |
  
详细可见：[组件属性](https://jin-yufeng.github.io/Parser/#/instructions?id=组件属性)

### 事件 ###

| 名称 | 功能 | 说明 |
|:----:|----|----|
| bindparse | 解析完成时触发 | 返回解析结果，可以对该结果进行自定义修改，将在渲染时生效 |
| bindload | dom 加载完成时触发 | 所有节点被添加到节点树中时触发，无返回值，可以调用 api |
| bindready | 渲染完成时触发 | 返回 boundingClientRect 的查询结果（包含宽高、位置等信息），所有图片（除懒加载）加载完成时才会触发，图片较大时可能 **延时较长** |
| binderror | 出错时触发 | 返回一个 object，其中 source 是错误来源，errMsg 为错误信息，target 包含出错标签的具体信息 |
| bindimgtap | 图片被点击时触发 | 返回一个 object，其中 src 是图片链接，ignore 是一个函数，在回调函数中调用将不进行预览 |
| bindlinkpress | 链接被点击时触发 | 返回一个 object，其中 href 是链接地址，ignore 是一个函数，在回调中调用将不自动跳转/复制 |  

详细可见：[事件](https://jin-yufeng.github.io/Parser/#/instructions?id=事件)
  
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

## 扩展包 ##
`patches` 文件夹中准备了一些扩展包，可根据需要选用，可以实现更加丰富的功能  
具体信息见：[扩展包](https://jin-yufeng.github.io/Parser/#/instructions?id=扩展包)

## 案例体验 ##

| [富文本插件](https://github.com/jin-yufeng/Parser/tree/master/demo/wx) | [程序员技术之旅](https://github.com/fendoudebb/z-blog-wx) | [极客时代](https://github.com/GeekEra/GBlog-wx) | APP 比比 | 全品作业小助手 | 多么生活 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md5.jpg?sign=911a1fd62af2666f9c8dfa367b22479c&t=1574499374" width="200" alt="富文本插件"> | <img src="https://user-images.githubusercontent.com/16144460/74083526-0528bc80-4aa0-11ea-841f-a974c5f9131d.jpg" width="200" alt="程序员技术之旅"> | <img src="https://camo.githubusercontent.com/f15b6b8854ae6d7fc4ceea552b79e326d5036978/68747470733a2f2f63646e2e66757a75692e6e65742f626c6f672f7172636f64655f313539323230383033333536372e6a7067" width="200" alt="极客时代"> | <img src="https://user-images.githubusercontent.com/5304020/80313264-70229d80-881c-11ea-8d8f-aed45719aed5.jpg" width="200" alt="APP 比比"> | <img src="https://user-images.githubusercontent.com/21222276/80563130-b3e3f580-8a1c-11ea-9a07-7671ea5aa320.jpg" width="200" alt="全品作业小助手"> | <img src="https://user-images.githubusercontent.com/16403746/69929565-665d6e00-14fa-11ea-807a-8d9050caf342.jpg" width="200" alt="多么生活"> |

| 欢喜商城 | 古典文学名著阅读 | 典典博客 | 咚咚阅读 | 源创智造 |  |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/13982274/89155296-1e1bb180-d59b-11ea-8fe7-8ae2c298d736.png" width="200" alt="欢喜商城"> | <img src="https://camo.githubusercontent.com/bb2aa4562a8b4912c82129f10ff15d1eb4ce0d08/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f6a7065672f3432383733322f313537353830303731333133312d36326639663836362d366233362d343766312d396234302d6132633964373839616633362e6a706567" width="200" alt="古典文学名著阅读"> | <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/%E5%85%B8%E5%85%B8%E5%8D%9A%E5%AE%A2.jpg?sign=5b2d371a4bd840c14c8d3740c35ee07f&t=1586360436" width="200" alt="典典博客"> | <img src="https://user-images.githubusercontent.com/7794149/84689281-575c7b80-af73-11ea-9035-6b3fcb3a3e5b.png " width="200" alt="咚咚阅读"> | <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/%E6%BA%90%E5%88%9B%E6%99%BA%E9%80%A0.png?sign=71b39d28c444259a7204bc14a8091135&t=1593401495" width="200" alt="源创智造"> | <img width="200"> |

以上排名不分先后，更多可见：[链接](https://github.com/jin-yufeng/Parser/issues/27)（欢迎添加）  

相关项目：  
[EastWorld/wechat-app-mall](https://github.com/EastWorld/wechat-app-mall)  
[YanxinNet/uView](https://github.com/YanxinNet/uView)  
[zhangdaren/miniprogram-to-uniapp](https://github.com/zhangdaren/miniprogram-to-uniapp)  
[woniudiancang/bee](https://gitee.com/woniudiancang/bee)  

## 许可与支持 ##
- 许可  
  您可以随意的使用和分享本插件 [MIT License](https://github.com/jin-yufeng/Parser/blob/master/LICENSE)  
  不可用于任何违法用途  
  在用于生产环境前务必经过充分测试，由插件 `bug` 带来的损失概不负责（可以自行修改源码）  

- 支持  
  ![支持](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md6.png?sign=24395ad7572c19464db67d8997e3b2d2&t=1574502139)   


## 更新日志 ##
- 2020.7.28  
  1. `A` 增加了 `search` 的扩展包，可以进行关键词搜索并高亮显示 [详细](https://jin-yufeng.github.io/Parser/#/instructions#search)  
  2. `U` 优化了解析过程，含有换行的空字符串将被去除以减小大小    
  3. `U` 优化了 `uni-app` 包 `config.js` 的写法，避免格式化后可能报错的问题  
  4. `F` 修复了 `getText` 方法可能无法使用的问题  
  5. `F` 修复了 `ul` 中的 `li` 的黑块可能被复制的问题  
  6. `F` 修复了通过 `document` 扩展包进行修改时设置了懒加载的图片可能闪一下的问题  
  7. `F` 修复了 `uni-app` 包从一个文本节点变为元素节点时可能不显示的问题  
  8. `F` 修复了 `uni-app` 包 `NVUE` 页面编译到小程序时列表可能显示不正常的问题  

- 2020.7.19  
  1. `A` 发布了微信端的 `npm` 包 [详细](https://www.npmjs.com/package/parser-wx)  
  2. `U` `uni-app` 包 `H5` 端图片设置的宽度超出屏幕宽度时自动将高度设置为 `auto`，避免变形  
  3. `U` 优化了 `uni-app` 包支付宝端的处理方式，减少了层级  
  4. `F` 修复了 `svg` 的 `viewBox` 属性小写不生效的问题 [详细](https://github.com/jin-yufeng/Parser/issues/171)  
  5. `F` 修复了图片层级过高，无法被遮盖的问题  
  6. `F` 修复了 `uni-app` 包 `NVUE` 端多次设置数据可能闪烁的问题  

- 2020.7.12  
  1. `A` 增加了 `in` 的 `api`，可以将锚点跳转的范围限定在一个 `scroll-view` 内 [详细](https://jin-yufeng.github.io/Parser/#/instructions#in)  
  2. `U` 支持识别 `xml` 声明（`<?xml`）  
  3. `U` 优化了 `uni-app` 包 `NVUE` 端的显示模式（避免显示不全和内部滚动）  
  4. `F` 修复了 `audio` 扩展包设置 `autoplay` 时状态不正确的问题  
  5. `F` 修复了微信和 `QQ` 端 `sub` 和 `sup` 标签可能被错误换行的问题  
  6. `F` 修复了 `uni-app` 包 `NVUE` 端无法触发 `click` 事件的问题  

- 2020.6.30  
  1. `F` 修复了个别情况下图片样式异常的问题 [详细](https://github.com/jin-yufeng/Parser/issues/163)  
  2. `F` 修复了个别情况下会出现多余的换行的问题  

更多可见：[更新日志](https://jin-yufeng.github.io/Parser/#/changelog)
