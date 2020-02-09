# Parser
小程序富文本插件（本文档动态更新，建议加星收藏）  
>新版文档链接：[Parser插件文档](https://jin-yufeng.github.io/Parser)  

## 功能简介 ##
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
| Parser | 47.1KB | 微信小程序插件包 |
| Parser.min | 31.6KB | 微信小程序插件包压缩版（功能相同） |
| Parser.uni | 62.0KB | `uni-app` 插件包（可以编译到所有平台） |

百度版从 `20191215` 起不再维护，可从过去版本中获取（`Parser.bd`）

### 在原生框架中使用 ###
1. 下载 `Parser` 文件夹至小程序目录  
2. 在需要引用的页面的 `json` 文件中添加（百度小程序中组件名一定要**小写**）
   ``` json
   {
     "usingComponents": {
       "parser":"/Parser/index"
     }
   }
   ```
3. 在需要引用的页面的 `wxml` 文件中添加  
   ``` html
   <parser html="{{html}}" />
   ```
4. 在需要引用的页面的`js`文件中添加  
   ``` javascript
   data: {
     html:"<div>Hello World!</div>"
   }
   ```
- `demo/wx` 文件夹下的是微信小程序 `富文本插件` 示例程序的源码，可供参考  

### 在uni-app中使用 ###
- 使用 `uni-app` 包（可以编译到所有小程序平台）  
  1. 下载 `Parser.uni` 包到 `components` 目录下（更名为 `Parser`）  
  2. 在需要使用页面的 `vue` 文件中添加  
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
  - `demo/uni-app` 文件夹下是一个示例程序，可供参考  

其他框架中使用可见：[在其他框架中使用](https://jin-yufeng.github.io/Parser/#/instructions?id=在其他框架中使用)

### 组件属性 ###  

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|:----:|:----:|:----:|:----:|----|
| html | String/Array | | 是 | 要显示的富文本数据，格式同 rich-text |
| tag-style | Object | | 否 | 设置标签的默认样式 |
| autocopy | Boolean | true | 否 | 是否允许链接受到点击时自动复制链接（仅限 http 开头的网络链接）|
| autopause | Boolean | true | 否 | 是否允许播放视频时自动暂停其他视频 |
| autopreview | Boolean | true | 否 | 是否允许点击图片时自动预览 |
| autosetTitle | Boolean | true | 否 | 是否自动将 title 标签的内容设置到页面标题上 |
| domain | String |  | 否 | 主域名，设置后将对于图片地址将自动拼接主域名或协议名 |
| img-mode | String | default | 否 | 图片显示模式 |
| lazy-load | Boolean | false | 否 | 是否开启图片懒加载 |
| selectable | Boolean | false | 否 | 是否允许长按复制内容 |
| show-with-animation | Boolean | false | 否 | 是否使用渐显动画 |
| use-anchor | Boolean | false | 否 | 是否使用页面内锚点 |
| use-cache | Boolean | false | 否 | 是否使用缓存，设置后将会把解析结果进行缓存，下次打开不用重复解析 |
  
详细可见：[组件属性](https://jin-yufeng.github.io/Parser/#/instructions?id=组件属性)

### 回调函数 ###

| 名称 | 功能 | 说明 |
|:----:|----|----|
| bindparse | 在解析完成时调用 | 返回解析结果（一个 nodes 数组，仅传入的 html 类型为 String 时会触发），可以对该结果进行自定义修改，将在渲染时生效 |
| bindready | 渲染完成时调用 | 返回 boundingClientRect 的查询结果（包含宽高、位置等信息） |
| binderror | 出错时调用 | 返回一个 object，其中 source 是错误来源，errMsg 为错误信息，errCode 是错误代码（仅ad），target 包含出错标签的具体信息，context 是视频的 context 对象 |
| bindimgtap | 在图片受到点击时调用 | 返回一个 object，其中 src 是图片链接，ignore 是一个函数，在回调函数中调用将不进行预览；可用于阻挡 onShow 的调用 |
| bindlinkpress | 在链接受到点击时调用 | 返回一个 object，其中 href 是链接地址，ignore 是一个函数，在回调中调用将不自动跳转/复制；开发者可以在该回调中进行进一步操作，如下载文档和打开等 |  

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

| 恋爱宝典xcx | 飞马港 | [程序员技术之旅](https://github.com/fendoudebb/z-blog-wx) |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/22900470/70421652-2de30480-1aa5-11ea-93b0-180352d4c397.jpg" width="200"> | <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/%E9%A3%9E%E9%A9%AC%E6%B8%AF.jpg?sign=56fe7d5a1244e72e6925468f87d4aecf&t=1579423657" width="200"> | <img src="https://user-images.githubusercontent.com/16144460/74083526-0528bc80-4aa0-11ea-841f-a974c5f9131d.jpg" width="200"> |

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
- 2020.1.23
  1. `A` 添加了一个打包工具 [详细](https://jin-yufeng.github.io/Parser/#/instructions?id=打包工具)  
  2. `U` 支持 `rpx` 单位  
- 2020.1.19
  1. `U` `video` 标签增加支持 `poster` 属性  
  2. `F` 修复了部分情况下表格处理出错的问题 [详细](https://github.com/jin-yufeng/Parser/issues/77)  
  3. `F` 修复了使用单独的 `</p>` 出错的问题  
  4. `F` 修复了 `uni-app` 包 `width` 属性处理出错的问题  
- 2020.1.18
  1. `U` `domain` 属性支持自动填充所有 `src` 属性的值（包括视频、音频、图片；协议名默认 `http`）  
  2. `U` 优化了实体的处理（支持所有形如 `&#123;` 的实体编码）  
  3. `F` 修复了图片一开始裂开之后又好了的问题
- 2019.1.7
  1. `U` 支持模拟显示 `li`, `ol`, `ul` 标签（即可以在其中放图片、链接、视频等，支持 `ol` 的 `type` 属性，支持多层 `ul`，暂不支持 `list-style` 的 `css` 样式）
  2. `D` 删除了 `List` 补丁包（在主包中已经默认支持）  
  3. `F` 修复了传入的 `html` 为数组时预览图片会出现预览顺序颠倒的问题
- 2020.1.5
  1. `U` `uni-app` 支持 `APP` 的 `v3` 模式编译  
  2. `U` 精简和优化了部分代码  
- 2019.12.30  
  1. `A` 增加支持 `svg` 系列标签（通过转换为 `img` 实现，不可预览，不可响应点击事件） [详细](https://jin-yufeng.github.io/Parser/#/features#svg-支持)  
  2. `U` 减小了解析结果的大小（去除了一些不必要的内容，约减小 `3%`），减小了包的大小  
  3. `U` `h1-6` 标签支持通过组件递归显示（即可以在其中使用图片、链接等）  
  4. `U` 解决了 `Audits` 测评中 `a` 标签可点击元素的响应区域过小的问题  
  5. `F` 修复了一个样式优先级的错误（属性样式的优先级应该最低）[详细](https://github.com/jin-yufeng/Parser/issues/67)  

更多可见：[更新日志](https://jin-yufeng.github.io/Parser/#/changelog)
