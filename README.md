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
- 支持长按复制内容  
- 支持给多媒体标签设置多个源  
- 支持自动给链接填充主域名  
- 支持几乎所有的 `html` 标签  
- 支持丰富的事件和效果  
- 轻量化、效率高、容错性强  
- 支持多平台（微信、QQ、百度、头条、uni-app 等）  
...

更多功能可见：[功能介绍](https://jin-yufeng.github.io/Parser/#/)

## 使用方法 ##
### 插件包说明 ##

| 名称 | 大小 | 使用 |
|:---:|:---:|:---:|
| parser | 41.1KB | 微信小程序插件包 |
| parser.min | 27.7KB | 微信小程序插件包压缩版（功能相同） |
| parser.qq | 40.7KB | QQ 小程序插件包 |
| parser.bd | 39.4KB | 百度小程序插件包 |
| parser.tt | 39.9KB | 头条小程序插件包 |
| parser.uni | 58.3KB | `uni-app` 插件包（可以编译到所有平台） |

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
4. 在需要使用页面的 `js` 文件中添加  
   
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

| 属性 | 类型 | 默认值 | 说明 |
|:----:|:----:|:----:|----|
| html | String/Array |  | 要显示的富文本数据，格式同 rich-text |
| autopause | Boolean | true | 是否允许播放视频时自动暂停其他视频 |
| autoscroll | Boolean | false | 是否自动给 table 加一个滚动层（使表格可以单独滚动） |
| autosetTitle | Boolean | true | 是否自动将 title 标签的内容设置到页面标题 |
| compress | Number | 0 | 压缩等级，可以选择是否移除 id 和 class |
| domain | String |  | 主域名，设置后将给链接自动拼接主域名或协议名 |
| lazy-load | Boolean | false | 是否开启图片懒加载 |
| selectable | Boolean | false | 是否允许长按复制内容 |
| show-with-animation | Boolean | false | 是否使用渐显动画 |
| tag-style | Object |  | 设置标签的默认样式 |
| use-anchor | Boolean | false | 是否使用页面内锚点 |
| use-cache | Boolean | false | 是否使用缓存，设置后多次打开不用重复解析 |
  
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

| [富文本插件](https://github.com/jin-yufeng/Parser/tree/master/demo/wx) | [程序员技术之旅](https://github.com/fendoudebb/z-blog-wx) | APP 比比 | 全品作业小助手 |
|:---:|:---:|:---:|:---:|
| <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md5.jpg?sign=911a1fd62af2666f9c8dfa367b22479c&t=1574499374" width="200" alt="富文本插件"> | <img src="https://user-images.githubusercontent.com/16144460/74083526-0528bc80-4aa0-11ea-841f-a974c5f9131d.jpg" width="200" alt="程序员技术之旅"> | <img src="https://user-images.githubusercontent.com/5304020/80313264-70229d80-881c-11ea-8d8f-aed45719aed5.jpg" width="200" alt="APP 比比"> | <img src="https://user-images.githubusercontent.com/21222276/80563130-b3e3f580-8a1c-11ea-9a07-7671ea5aa320.jpg" width="200" alt="全品作业小助手"> |

| 多么生活 | 恋爱宝典 xcx | 古典文学名著阅读 | 典典博客 |
|:---:|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/16403746/69929565-665d6e00-14fa-11ea-807a-8d9050caf342.jpg" width="200" alt="多么生活"> | <img src="https://user-images.githubusercontent.com/22900470/70421652-2de30480-1aa5-11ea-93b0-180352d4c397.jpg" width="200" alt="恋爱宝典 xcx"> | <img src="https://camo.githubusercontent.com/bb2aa4562a8b4912c82129f10ff15d1eb4ce0d08/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f6a7065672f3432383733322f313537353830303731333133312d36326639663836362d366233362d343766312d396234302d6132633964373839616633362e6a706567" width="200" alt="古典文学名著阅读"> | <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/%E5%85%B8%E5%85%B8%E5%8D%9A%E5%AE%A2.jpg?sign=5b2d371a4bd840c14c8d3740c35ee07f&t=1586360436" width="200" alt="典典博客"> |

以上排名不分先后，更多可见：[链接](https://github.com/jin-yufeng/Parser/issues/27)（欢迎添加）  

## 许可与支持 ##
- 许可  
  您可以随意的使用和分享本插件 [MIT License](https://github.com/jin-yufeng/Parser/blob/master/LICENSE)  
  不可用于任何违法用途  
  在用于生产环境前务必经过充分测试，由插件 `bug` 带来的损失概不负责（可以自行修改源码）  

- 支持  
  ![支持](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md6.png?sign=24395ad7572c19464db67d8997e3b2d2&t=1574502139)   


## 更新日志 ##
- 2020.5.13
  1. `A` 添加了 `autoscroll` 属性，可以给所有表格添加一个滚动层 [详细](https://jin-yufeng.github.io/Parser/#/instructions#autoscroll)  
  2. `U` `a` 标签可以跳转到 `tabbar` 页面  
  3. `U` 通过 `stylelint` 规范 `css` 写法  
  4. `U` 为避免在一些框架中使用出现文件不存在的错误，扩展包不再默认引入（原来是在 `try` 中 `require`）  
  5. `U` `uni-app` 包编译到百度小程序中实现了 `autopause` 属性  
  6. `U` `uni-app` 包添加了组件文档注释，输入时可以有提示  
  7. `D` 移除了 `gesture-zoom` 属性  
  8. `D` 移除了 `preLoad` 的 `api`

- 2020.5.11  
  1. `A` 增加百度小程序原生包 [详细](https://jin-yufeng.github.io/Parser/#/instructions#插件包说明)  
  2. `F` 修复了微信小程序电脑端 `rpx` 可能换算不正确的问题  
  3. `F` 修复了上一版本个别情况下可能出现 `Cannot read property 'name' of undefined` 的问题  
  4. `F` 修复了 `uni-app` 包编译到百度小程序时 `br` 标签可能不生效的问题  

- 2020.5.8  
  1. `F` 修复了个别情况下空格被错误过滤的问题 [详细](https://github.com/jin-yufeng/Parser/issues/135)  
  2. `D` 移除了 `xml` 属性（`svg` 标签默认按 `xml` 方式解析，可以以 `<svg />` 方式结束）  
  3. `D` 取消对 `picture` 标签的支持  

- 2020.5.6
  1. `F` 修复了头条小程序真机图片可能无法显示的问题 [详细](https://github.com/jin-yufeng/Parser/issues/133)  
  2. `F` 修复了 [CssHandler 扩展包](https://jin-yufeng.github.io/Parser/#/instructions#csshandler) 后代选择器优先级低于 `id` 选择器的问题 [详细](https://github.com/jin-yufeng/Parser/issues/125)  

- 2020.4.26  
  1. `F` 修复了个别情况下图片表现不正常的问题  

- 2020.4.25  
  1. `U` 优化了图片的显示方式（可解决加载完毕时大小突变的问题，但不再支持云文件 `ID` 和 `webp` 图片）[详细](https://jin-yufeng.github.io/Parser/#/instructions#图片处理)  
  2. `U` 支持在链接中使用实体编码  
  3. `U` 模拟实现的列表（内含图片链接）支持 `list-style:none`  
  4. `U` `navigateTo` 的 `api` 增加一个 `offset` 参数，可设置偏移量  
  5. `U` `uni-app` 包支持使用 `audio` 扩展包  
  6. `F` 修复了个别情况下图片宽度过宽的问题  
  7. `F` 修复了 [CssHandler](https://jin-yufeng.github.io/Parser/#/instructions#csshandler) 扩展包 `class` 匹配错误的问题 [详细](https://github.com/jin-yufeng/Parser/issues/122)  
  8. `F` 修复了 `uni-app` 包编译到 `NVUE` 时在 `ready` 前设置数据可能无法显示的问题  
  9. `F` 修复了 `uni-app` 包编译到 `App` 时视频可能无法显示的问题  
  10. `F` 修复了 `uni-app` 包编译到 `H5` 时 `tag-style` 中的 `rpx` 失效的问题  

- 2020.4.19  
  1. `F` 修复了 原生包 部分情况下 `table` 中在 `td` 外有文本节点会导致解析错误的问题  
  2. `F` 修复了 `uni-app` 包无法使用 [document 扩展包](https://jin-yufeng.github.io/Parser/#/instructions#document) 的问题（并增加了一些方法） [详细](https://github.com/jin-yufeng/Parser/issues/119)  

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

更多可见：[更新日志](https://jin-yufeng.github.io/Parser/#/changelog)
