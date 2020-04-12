## 使用方法 {docsify-ignore} ##
### 插件包说明 ###

| 名称 | 大小 | 使用 |
|:---:|:---:|:---:|
| [parser](https://github.com/jin-yufeng/Parser/tree/master/parser) | 44.5KB | 微信小程序插件包 |
| [parser.min](https://github.com/jin-yufeng/Parser/tree/master/parser.min) | 30.0KB | 微信小程序插件包压缩版（功能相同） |
| [parser.uni](https://github.com/jin-yufeng/Parser/tree/master/parser.uni) | 63.3KB | `uni-app` 插件包（可以编译到所有平台） |

说明：  
1. 百度原生插件包可以从过去的版本中获取（`20191215` 后不再维护）  
2. 理论上微信原生包也可以直接用于 `QQ` 小程序，个别不兼容的地方可以自行调整  
3. 除原生和 `uni-app` 框架外，其他框架暂无专用包，但也可以引入原生包使用（仅限相应端使用），具体方法见 [在其他框架使用](#在其他框架使用)  

关于 `uni-app` 包的相关说明：  
1. 为解决平台差异使用了较多条件编译的内容，编译到各平台后会变小  
2. 需要使用 `HBuilderX 2.2.5` 及以上版本编译，且必须使用自定义组件模式（或 `v3`）  
3. 由于 `ad` 标签的特殊性，若需要使用文中广告，需自行到 `trees.vue` 中打开注释  

编译到各平台后差异：

| 平台 | 差异 |
|:---:|---|
| 微信小程序 | 基础库 2.7.1 及以上支持 ruby、bdi、bdo 标签 |
| 百度小程序 | 不支持 gesture-zoom、lazy-load 属性 |
| 支付宝小程序 | 不支持 autopause、gesture-zoom、lazy-load 属性 |
| 头条小程序 | 不支持 lazy-load 属性<br>imgtap 和 linkpress 事件的返回值中没有 ignore 方法 |
| H5 | 支持所有浏览器支持的标签<br>不支持写在 trees.vue 中的样式（需要直接使用 style 标签）<br>[配置项](#配置项) 中除 userAgentStyles 外均无效 |
| App | v3 支持 iframe 和 embed 标签<br>不支持 gesture-zoom 属性 |
| NVUE | 支持所有浏览器支持的标签<br>不支持 gesture-zoom、lazy-load 属性<br>不支持 navigateTo、getVideoContext、preLoad 的 api<br>不支持写在 trees.vue 中的样式（需要直接使用 style 标签）<br>[配置项](#配置项) 中除 userAgentStyles 外均无效 |

关于 `a` 标签：  
`H5`、`App（含 NVUE）` 外链可以直接打开，小程序端将自动复制链接  
小程序端 `a` 标签设置 `app-id` 后可以跳转到其他小程序  

以下统称为 `parser`  

### 在原生框架中使用 ###
1. 复制 [parser](#插件包说明) 文件夹至 `components` 目录  
2. 在需要使用页面的 `json` 文件中添加  
   ``` json
   {
     "usingComponents": {
       "parser": "components/parser/parser"
     }
   }
   ```
3. 在需要使用页面的 `wxml` 文件中添加  
   ``` wxml
   <parser html="{{html}}" />
   ```
4. 在需要使用页面的 `js` 文件中添加  
   ``` javascript
   Page({
     data: {
       html:"<div>Hello World!</div>"
     }
   })
   ```

?> [demo/wx](https://github.com/jin-yufeng/Parser/tree/master/demo/wx) 文件夹下的是微信小程序 [富文本插件](#立即体验) 示例程序的源码，可供参考  

### 在 uni-app 中使用 ###
- 使用 `uni-app` 包（可以编译到所有小程序平台）  
  1. 复制 [parser](#插件包说明) 文件夹到 `components` 目录下（更名为 `jyf-parser`）  
  2. 在需要使用页面的`vue`文件中添加  
     ```vue
     <template>
       <view>
         <jyf-parser :html="html"></jyf-parser>
       </view>
     </template>
     <script>
     import parser from "@/components/jyf-parser/jyf-parser"; // HbuilderX 2.5.5 及以上可以不需要
     export default {
       // HbuilderX 2.5.5 及以上可以不需要
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
  
  ?> 可以直接通过插件市场引入：[插件市场](https://ext.dcloud.net.cn/plugin?id=805)  
     [demo/uni-app](https://github.com/jin-yufeng/Parser/tree/master/demo/uni-app) 文件夹下是一个示例程序，可供参考 
 
- 使用原生包  
  参考 [官网-小程序组件支持](https://uniapp.dcloud.io/frame?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e7%bb%84%e4%bb%b6%e6%94%af%e6%8c%81)（若仅开发微信端，更建议使用原生包）  

### 在其他框架中使用 ###
在其他框架中 **没有专用包**，但也可以引入原生包使用  

#### 在 taro 中使用 ####
由 [@xPixv](https://github.com/xPixv) 提供，请参考：  
[Github链接](https://github.com/xPixv/Taro-ParserRichText)  
[Taro物料市场](https://taro-ext.jd.com/plugin/view/5d35903e9b6a1d4027780154)

#### 在 kbone 中使用 ####
以 [vue 模板](https://github.com/wechat-miniprogram/kbone-template-vue) 开发为例
1. 将 [parser](#插件包说明) 文件夹复制到 `/src/components` 目录下  
2. 在 `/build/miniprogram.config.js` 中的 `generate` 字段中添加  
   ```javascript
   generate: {
     wxCustomComponent: {
       root: path.join(__dirname, '../src/components'), // 需要 var path = require('path') 引入
       usingComponents: {
         'parser': {
           path: 'parser/parser',
           props: ['html', 'autopause', 'autosetTitle', 'compress', 'domain', 'gesture-zoom', 'lazy-load', 'selectable', 'show-with-animation', 'tag-style', 'use-anchor', 'use-cache', 'xml'],
           events: ['parse', 'load', 'ready', 'error', 'imgtap', 'linkpress']
         }
       }
     }
   }
   ```
3. 直接在页面上使用即可  
   ```vue
   <parser :html="html"></parser>
   ```

!> 编辑完 `webpack` 配置后需要重新构建，否则可能不生效  
更多信息参考：[官网说明](https://wechat-miniprogram.github.io/kbone/docs/guide/advanced.html#%E4%BD%BF%E7%94%A8%E5%B0%8F%E7%A8%8B%E5%BA%8F%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6)

#### 在 wepy 中使用 ####
测试版本：`V1.7.3`
1. 将 [parser](#插件包说明) 文件夹复制到 `/src/components` 目录下  
   （也可以直接复制到 `/dist/components` 目录下，这样 `wepy` 不会对插件包进行编译和压缩）    
2. 在需要使用的页面的 `wpy` 文件中添加
   ```wpy
   <template>
     <view class="container">
       <parser html="{{html}}"></parser>
     </view>
   </template>
   <script>
   import wepy from 'wepy'
   export default class Index extends wepy.page {
     config = {
       usingComponents: {
         'parser': '/components/parser/parser'
       }
     }
     data = {
       html: '<div>Hello World!</div>',
     }
   }
   </script>
   ```
3. 通过 `wepy build --watch` 命令进行编译  

!> 如果出现 `Components not found` 错误，则用 `wepy build --no-cache --watch` 命令清理缓存，重新编译  

#### 在 mpVue 中使用 ####
1. 下载 [parser](#插件包说明) 文件夹至 `static` 目录下
2. 在 `src` 目录下需要使用本插件的页面文件夹下添加 `json` 文件
   ```json
   {
       "usingComponents": {
           "parser": "../../static/parser/parser"
       }
   }
   ```
3. 在需要使用的页面的 `vue` 文件中添加
   ```vue
   <template>
     <div class="container">
       <parser :html="html"></parser>
     </div>
   </template>
   <script>
   export default {
     data: {
       html: '<div>Hello World!</div>'
     }
   }
   </script>
   ```

#### 在 chameleon 中使用 ####
1. 将 [parser](#插件包说明) 文件夹复制到 `components` 目录下  
2. 在需要使用页面的 `wx.cml` 文件中添加  
   ```vue
   <template>
     <parser html="{{html}}"></parser>
   </template>
   ...
   <script cml-type="json">
   {
     "base": {
       "usingComponents": {
         "parser": "/components/parser/parser"
       }
     }
   }
   </script>
   ```

更多信息可见：[官网说明](https://cml.js.org/docs/io.html#%E6%80%8E%E4%B9%88%E5%BC%95%E5%85%A5%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6)  

### 组件属性 ###  

| 属性 | 类型 | 默认值 | 必填 | 说明 | 添加日期 |
|:----:|:----:|:----:|:----:|----|:---:|
| html | String/Array |  | 是 | 要显示的富文本数据，格式同 [rich-text](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html) | - |
| autopause | Boolean | true | 否 | 是否允许播放视频时自动暂停其他视频 | [20190510](/changelog#_20190510) |
| autosetTitle | Boolean | true | 否 | 是否自动将 title 标签的内容设置到页面标题 | [20190724](/changelog#_20190724) |
| compress | Number | 0 | 否 | 压缩等级，可以选择是否移除 id 和 class | [20200312](/changelog#_20200312) |
| domain | String |  | 否 | 主域名，设置后将给链接自动拼接上主域名或协议名 | [20191202](/changelog#_20191202) |
| gesture-zoom | Boolean | false | 否 | 是否开启双击缩放 | [20200212](/changelog#_20200212) |
| lazy-load | Boolean | false | 否 | 是否开启图片懒加载 | [20190928](/changelog#_20190928) |
| selectable | Boolean | false | 否 | 是否允许长按复制内容 | [20190603](/changelog#_20190603) |
| show-with-animation | Boolean | false | 否 | 是否使用渐显动画 | [20190519](/changelog#_20190519) |
| tag-style | Object | {} | 否 | 设置标签的默认样式 | [20190421](/changelog#_20190421) |
| use-anchor | Boolean | false | 否 | 是否使用页面内锚点 | [20191202](/changelog#_20191202) |
| use-cache | Boolean | false | 否 | 是否使用缓存，设置后多次打开不用重复解析 | [20191215](/changelog#_20191215) |
| xml | Boolean | false | 否 | 是否使用 xml 方式解析 | [20200326](/changelog#_20200326) |
  
##### html #####
- 推荐通过 [setContent](#setContent) 方法传入，可以提高性能  
- 传入的格式为 `array` 时，不需要进行解析，理论上可以提高性能，但是解析时间一般很短（约 `10~20` ms），且通常数组的大小比字符串大（传输时间更长），部分在解析过程中进行的处理也无法生效，不一定有明显的优化  
- 本插件在解析的过程中会进行一些转换和设置一些标识，使得能够正确的渲染和使用；若传入非本插件产生的数组（区分方式是查看 `html[0].PoweredBy` 是否等于 `Parser`），插件会自动进行设置，并同时处理 `tag-style`、`domain`、`use-anchor` 等一些属性的效果，但会产生额外的性能开销   

##### compress #####
可以按需选择压缩等级，减小解析结果的大小，提高性能（若需进行更复杂的自定义压缩，可以通过 [filter](#filter) 函数）  

| 等级 | 效果 |
|:---:|:---:|
| 0 | 仅进行一些不影响功能的压缩（默认）|
| 1 | 移除所有 `id` 属性（将无法使用锚点）|
| 2 | 移除所有 `class` 属性（将无法匹配 `wxss` 中的样式）|
| 3 | 移除所有 `id` 和 `class` 属性 |

附：移除 `id` 和 `class` 都不影响匹配 `style` 标签中的样式（将在匹配完成后再移除）  

##### gesture-zoom #####
目前仅支持双击缩放不支持双指缩放  
已知问题：  
1. 若限定了 `parser` 标签的宽高度可能表现的不正常  
2. 放大后在竖直方向可能无法滑到底部  

若需要解决这些问题可以参考 [链接](https://ask.dcloud.net.cn/question/93080?item_id=119920&rf=false)（感谢 [leno.zhou@qq.com](https://ask.dcloud.net.cn/people/leno.zhou%40qq.com)）

##### tag-style #####
可以设置标签的默认样式，形如 `{标签名：样式}` 的结构体，例如 `{ img: "display:block" }` 表示给 `img` 标签设置默认的块级标签效果  

##### use-anchor #####
设置为 `true` 后将把所有设置了 `id` 的标签都通过节点递归的方式显示（否则无法知晓锚点位置），会一定程度上减慢渲染速度，非必要不建议开启  
  
##### use-cache #####
设置为 `true` 时将对解析结果进行缓存，在一个应用生命周期内多次打开，不需要重复解析，可以节省时间，建议对较长的内容且可能多次打开的内容设置缓存  

##### xml #####
开启后，解析方式将发生以下变化：  
1. 标签名和属性名区分大小写（如 `style` 和 `Style` 是不同的属性）  
2. 可以通过 `/` 结束任何标签（如 `<div />`，`html` 中非自闭合标签无法被这样关闭）  

但存在未闭合的标签也不会报错（为保证容错性）

### 事件 ###

| 名称 | 触发 | 说明 |
|:----:|:----:|----|
| bindparse | 解析完成时触发 | 返回解析结果（一个 nodes 数组，仅传入的 html 类型为 String 时会触发），可以对该结果进行自定义修改，将在渲染时生效 |
| bindload | dom 加载完成时触发 | 所有节点被添加到节点树中时触发，无返回值，可以调用 api |
| bindready | 渲染完成时触发 | 返回 boundingClientRect 的查询结果（包含宽高、位置等信息），所有图片（除懒加载）加载完成时才会触发，图片较大时可能 **延时较长** |
| binderror | 出错时触发 | 返回一个 object，其中 source 是错误来源，errMsg 为错误信息，errCode 是错误代码，target 包含出错标签的具体信息，context 是多媒体的 context 对象，可以设置新的源 |
| bindimgtap | 图片被点击时触发 | 返回一个 object，其中 src 是图片链接，ignore 是一个函数，在事件中调用将不进行预览；可用于阻挡 onShow 的调用 |
| bindlinkpress | 在链接被点击时触发 | 返回一个 object，其中包含了被点击的 a 标签的所有属性，ignore 是一个函数，在事件中调用后将不自动跳转/复制；可在该事件中进行下载文档等进一步操作 |  

说明：  
- 关于 `ignore` 方法  
  类似于 `a` 标签 `onclick` 事件返回 `false` 将不跳转一样，由于 `event` 无法获取返回值，故增加此函数，若在事件函数中执行，则不自动进行预览/跳转/复制链接操作，可执行自定义操作（这两个事件函数应尽量简短）  

  ```javascript
  linkpress(e) {
   if(e.detail.href == "xxx")
      e.detail.ignore(); // 此链接不进行自动跳转/复制
    // 自定义操作
  }
  ```

- 关于 `error` 事件  
  当图片出错时，也会返回 `context`，其中包含一个方法—— `setSrc`，输入值为 `string`，可以重设 `src`（如设置成出错时的占位图，必须在 `error` 事件处理函数中调用，否则无效）  

- 关于写法  
  原生包事件以 `bind` 或 `catch` 开头，返回值从 `e.detail` 中获取  
  `uni-app` 包的事件以 `@` 开头，返回值直接从 `e` 获取  

### 使用外部样式 ###
如果需要使用一些固定的样式，可以通过 `wxss` / `css` 文件引入  
在 `/parser/trees/trees.wxss(css)` 中通过 `@import` 引入自定义的样式文件即可  
```css
/*
* Parser/trees/trees.wxss(css)
* 在这里引入您的自定义样式
*/
@import "external.wxss(css)";
```

!> 由于只有自定义组件内的样式在组件内能生效且 `rich-text` 在组件内使用时也只能匹配组件内的样式，所以必须在 `trees` 组件的 `wxss`/`css` 文件中引入需要的样式，在页面中写的样式无效  

!> 组件内只能使用 `class` 选择器（支持后代选择器），不支持 `id` 选择器、属性选择器、标签名选择器等（更多可见 [官网说明](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html)）  

!> 通过这种方式引入的样式会对所有 `parser` 标签生效，如果是对单个 `parser` 使用的样式，请使用 `style` 标签；另外，这种方式引入的样式优先级最低  

!> `uni-app` 包编译到 `H5` 时这种样式无效，请使用 `style` 标签  

### 配置项 ###

| 配置项 | 作用 |
|:---:|:---:|
| blockTags | 块级标签列表 |
| ignoreTags | 移除的标签列表 |
| selfClosingTags | 自闭合的标签列表 |
| trustTags | 信任的标签列表 |
| trustAttrs | 信任的属性 |
| userAgentStyles | 默认的样式 |
| filter | 过滤器 |
| highlight | 代码高亮处理器 |
| onText | 文本处理器 |

?> 配置项在 `/libs/config.js` 中配置，对所有 `parser` 标签生效

!> 不在信任的属性列表中的属性将被移除  
不在信任的标签列表中的标签，除被移除的标签外，块级标签列表中的标签将被转为 `div` 标签，其他被转为 `span` 标签

关于几个自定义处理器：  
#### filter ####  
自定义过滤器，解析到一个标签时触发  
输入值：`node` 为节点结构体（`name` 为标签名，`attrs` 为属性值，`children` 为子节点），对其进行修改将在渲染时生效；`context` 是解析器示例，可以使用一些解析设置（如 `domain` 等）和方法（主要是 `bubble`，若该节点不能被 `rich-text` 包含则需要调用，将给其所有祖先节点冒泡设置标记，一般用于自定义标签）  
返回值：若返回 `false`，将移除此节点（及其所有子节点）  
示例：  
```javascript
filter(node, cxt) {
  if(node.name == "xxx") return false; // 移除某个标签
  if(node.name == "yyy") cxt.bubble(); // 使这个标签不被 rich-text 包含，一般用于自定义标签
  node.attrs.zzz = "aaa"; // 给标签添加某个属性
}
```

#### highlight ####  
代码高亮处理器  
输入值：`content` 是 `pre` 标签的内容，`attrs` 是 `pre` 标签的属性列表  
返回值：高亮处理后的 `html` 内容  
示例（以 [prism](https://prismjs.com/) 为例）：  
1. 下载需要的 `prism.js` 和 `prism.css` 至 `libs` 目录（`css` 更名为 `wxss`）  
2. 在 `config.js` 中实现 `highlight` 函数  
   ```javascript
   const Prism = require('./prism.js');
   ...
   highlight(content, attrs) {
     attrs["data-content"] = content; // 记录原始文本，可用于长按复制等操作
     switch (attrs[lan]) {
       case "javascript":
       case "js":
         return Prism.highlight(content, Prism.languages.javascript, "javascript");
       case "html":
         return Prism.highlight(content, Prism.languages.html, "html");
       case "css":
         return Prism.highlight(content, Prism.languages.css, "css");
       default:
         return content;
     }
   }  
   ```
3. 在 `trees.wxss` 中引入样式
   ```css
   /* trees/trees.wxss */
   @import '../libs/prism.wxss';
   ```
4. 其中不支持的标签名选择器可以通过 [tag-style](/features#设置默认的标签样式) 属性引入  

按以下操作还可以实现长按复制：  
1. 在 `config.js` 的 `filter` 函数中添加：
   ```javascript
   filter(node, ctx) {
     if(node.name == "pre")
       ctx.bubble(); // 使其不被 rich-text 包含
   }
   ```
2. 在 `trees.wxml` 中添加  
   ```wxml
   <rich-text wx:elif="{{item.name=='pre'}}" nodes="{{[item]}}" data-content="{{item.attrs['data-content']}}" bindlongpress="copyCode" />
   ```
3. 在 `trees.js` 中添加  
   ```javascript
   copyCode(e) {
    wx.showActionSheet({
      itemList: ["复制代码"],
      success: () =>
        wx.setClipboardData({
          data: e.target.dataset.content
        })
    })
   }
   ```

可以参考：[示例小程序](https://github.com/jin-yufeng/Parser/tree/master/demo/wx)  
`uni-app` 中使用可以参考此示例项目：[highlight](https://6874-html-foe72-1259071903.tcb.qcloud.la/highlight.zip?sign=c15980dfa79aaf1688db7059b23d05a7&t=1584685357)  
*相关 issue：*[#83](https://github.com/jin-yufeng/Parser/issues/83)

#### onText ####  
文本处理器，可以替换文本中的一些内容  
输入值：`text` 为解析到的文本内容，`hasTag` 是一个函数，若设置的值中有 `html` 标签（如替换为图片）需要调用，将重新解析这段文本（若替换值中仍有关键词可能引发 **死循环** ）  
返回值：若返回值不为空，将把这段文本设置成返回值的内容  
示例：  
```javascript
onText(text, hasTag) {
  if(text.includes("$xxx$")) {
    // 将某公式符号替换为图片
    hasTag();
    return text.replace("$xxx$", "<img src='xxxx'>");
  }
}
```
*相关 issue：*[#90](https://github.com/jin-yufeng/Parser/issues/90)

### 基础库要求 ###
微信小程序：
  
| 版本 | 功能 | 占比 |
|:---:|:---:|:---:|
| < 2.9.0 | 不支持 webp 图片 | 5.51% |
| < 2.7.1 | 不支持图片长按菜单（识别小程序码）<br>不支持 bdi bdo ruby 标签 | 2.31% |
| < 2.4.4 | 不支持 a 标签 visited 效果 | 0.42% |
| < 2.3.0 | 不支持云文件 ID | 0.34% |
| < 2.2.5 | 不支持部分实体编码（形如 &amp;copy;） | 0.20% |
| < 1.6.3 | 无法使用 | < 0.01% |

!> 使用 `uni-app` 包编译到微信小程序时要求基础库 `2.3.0` 及以上  

!> 百度小程序基础库版本 `3.60`（客户端版本 `11.9`）以下的可能无法正常显示  

### Api ### 

本插件的组件实例中提供了一些 `api` 函数，获取实例的方法：  
- 微信原生框架  
  ```wxml
  <parser id="article" html="{{html}}" bindload="load"></parser>
  ```
  ```javascript
  Page({
    load() {
      var context = this.selectComponent("#article");
      // 通过 context 调用 api 函数
    }
  })
  ```
- uni-app  
  ```vue
  <template>
    <view>
      <parser ref="article" @load="load"></parser>
    </view>
  </template>
  <script>
  export default {
    method: {
      load() {
        var context = this.$refs.article;
        // 通过 context 调用 api 函数
      }
    }
  }
  </script>
  ```

!> 以下 `api` 必须在 `load` 事件中或之后才能调用  

#### getText ####
功能：获取富文本中的所有文本内容    
使用方法：
```javascript
// context 为组件实例
var text = context.getText();
console.log(text);
```

#### navigateTo ####
功能：跳转到指定的锚点  
输入值：一个 `object`，`id` 为锚点的 `id`（为空时将跳转到组件顶部），`success` 和 `fail` 是成功和失败的回调（需要配合 `use-anchor` 属性使用）  
为确保跳转位置准确，建议在 `ready` 事件中或之后使用  
使用方法：  
```javascript
// context 为组件实例
context.navigateTo({
  id: "anchor",
  success: console.log,
  fail: console.error
})
```

#### getVideoContext ####
功能：获取组件中视频的 `context` 对象，可以操控视频的播放  
输入值：`video` 标签的 `id`（没有设置 `id` 时会被自动设置为 `video + i`，不输入返回一个包含所有视频的数组）  
使用方法：
```javascript
// context 为组件实例
var video = context.getVideoContext("the-id"); // 返回 id 为 the-id 的 video 的 context
var videos = context.getVideoContext(); // 返回所有视频的数组
```

#### imgList ####
功能：获取所有图片数组，可用于转发图的封面等（这是一个 **属性** ）  
另外，该数组提供了一个 `each` 方法，功能与数组的 `forEach` 基本相同，但可以通过 `return` 改变数组中的值  
该数组用于图片的预览，因此可以在 `img` 的 `src` 中使用缩略图，再将此数组中的地址改为原图，即可实现预览时查看大图的效果  
设置时若与数组中已存在的元素重复，将自动通过改变域名大小写的方式去重，避免在预览时出现定位错误；若设置 `base64` 图片，将自动暂存到本地，避免无法预览（若需要修改单个图片，可以通过 `setItem(i, src)` 的方法，也可以进行同样处理）  
  
使用方法：
```javascript
// context 为组件实例
var imgList = this.selectComponent("#article").imgList;
var cover = imgList[0]; // 将第一张图作为转发用的封面
imgList.each((src, i, arr)=>{
  console.log(src);
  /* 通过 return 可以修改原数组，没有 return 时不修改
     可以将缩略图的链接修改为原图的链接，在预览时会自动使用 */
  return src.replace("thumb","");
})
```

#### rect ####
功能：获取富文本内容的大小和位置（这是一个 **属性** ）  
应在 `ready` 事件后获取，否则可能无法获取或不准确  
使用方法：  
```javascript
var rect = context.rect;
console.log(rect.width); // 宽度
console.log(rect.height); // 高度
```

!> 以下 `api` 可以立即执行  

#### setContent ####
功能：解析并渲染 `html` 内容（功能上同 `html` 属性）  
说明：当 `html` 为字符串类型时，该字符串并不能直接在视图层进行渲染，而是在插件内部完成解析后再次 `setData` 并进行渲染的，因此，对字符串类型的 `html` 进行 `setData` 是没有必要的，会带来不必要的性能开销  
输入值：`html` 为富文本字符串，`append` 表示是否在尾部追加（可用于加载更多）  

使用方法：
```wxml
<parser id="article"></parser>
```
```javascript
var html = "<div>Hello World!</div>";
/* 以下代码等价于
this.setData({
  html
})
但通过 setData 会带来不必要的性能开销 */
this.selectComponent("#article").setContent(html);
```

!> 在 `load` 或 `ready` 事件中调用可能陷入死循环

#### preLoad ####
功能：预加载富文本中的图片  
说明：若某段富文本图片较多或内容较长，可以在其他页面或当前页面未进行显示时进行预加载（不会在视图上显示）  
1. 预加载主要针对图片；同时若传入的字符串，还将缓存解析结果（使用时通过 `use-cache` 属性即可读取）  
2. 为避免短时间内发起过多图片请求，最多同时加载 `15` 张图片  
3. 可以同时预加载多段内容，也可以在显示内容的同时预加载其他内容  
4. 在解析过程中使用的属性必须加在预加载的标签上，加在显示的标签上无效  

输入值：`html`（`String` / `Array`），`num`（最大图片数量，不输入将预加载所有图片）  
使用方法：
```wxml
<parser id="preLoad" />
```
```javascript
// 预加载完毕后在其他页面或当前页面使用这段富文本时就可以不用加载图片
this.selectComponent("#preLoad").preLoad(html);
```

### 打包工具 ###
本插件提供了一个打包工具（`pack.jar` 是可执行文件，`pack.java` 是源代码），可以按需生成需要的插件包（便于添加补丁包）  

![打包工具](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md7.png?sign=0e1d048ea91f4154a0a53ab55b45e4ca&t=1579784564)

## 补丁包 ##
[patches](https://github.com/jin-yufeng/Parser/tree/master/patches) 文件夹中准备了一些补丁包，可根据需要选用，可以实现更加丰富的功能  

?> 可以通过 [打包工具](#打包工具) 打包需要的插件包  

### emoji ###  
- 功能  
  将形如 `[笑脸]` 的文本解析为 `emoji` 小表情  
- 大小  
  `4.25KB`（`min` 版本 `3.16KB`）  
- 使用方法  
  将 `emoji.js` 复制到 `libs` 文件夹下即可（若使用 `min` 版本也要改名为 `emoji.js`）  
  
  !> 在 `uni-app` 中使用时需要将 `libs/MpHtmlParser.js` 第 47 行改为 `const emoji = require('./emoji.js');`  
  
  默认配置中支持 `177` 个常用的 `emoji` 小表情  
  支持两种形式的 `emoji`，一是 `emoji` 字符（不同设备上显示的样子可能不同），或者是网络图片（将按照 `16px` × `16px` 的大小显示，且不可放大预览），默认配置中都是 `emoji` 字符，可使用以下 `api` 获取或修改：  
  ```javascript
  const parserEmoji = require("path/Parser/emoji.js");
  console.log(parserEmoji.getEmoji("笑脸")); //笑脸的emoji字符
  parserEmoji.removeEmoji("笑脸"); //移除笑脸emoji
  parserEmoji.setEmoji("哈哈","https://example.png"); //设置emoji，支持emoji字符或网络图片
  ```  

### document ###  
- 功能  
  实现类似于 `web` 中的 `document` 对象，可以动态操作 `DOM`  
- 大小  
  `6.84KB`（`min` 版本 `5.20KB`）  
- 使用方法  
  将 `document.js` 复制到 `libs` 文件夹下即可（若使用 `min` 版本也要改名为 `document.js`）  
  
  !> 在 `uni-app` 中使用时需要将 `jyf-parser.vue` 中的 40 行修改为 `const document = require('./libs/document.js');`  
  
- `document` 类：  
  获取方式：可通过 `this.selectComponent("#id").document` 获取  
  `Api` 列表:   

  | 名称 | 输入值 | 返回值 | 功能 |
  |:---:|:---:|:---:|:---:|
  | getElementById | id | element | 按照 id 查找 element |
  | getElementsByClassName | className | element [] | 按照 class 查找 element |
  | getElementsByTagName | name | element [] | 按照 标签名 查找 element |
  | createElement | name | element | 创建标签名为 name 的标签 |
  | write | html（String / Array） |  | 写入 html 内容 |
   
- `element` 类：  
  属性名：

  | 名称 | 功能 |
  |:---:|---|
  | nodeName | 该标签的标签名 |
  | id | 该节点的 id 值 |
  | attributes | 该节点的属性列表，修改需要调用 setAttribute |
  | style | 该属性的样式列表，修改需要调用 setStyle |
  | childNodes | 该节点下的子节点，修改需要调用 child 相关 api |
  | innerText | 该节点下的文本内容，支持获取和 **设置** |
  | innerHTML | 该节点下的 html 内容，支持获取和 **设置** |
  
  `Api` 列表：

  | 名称 | 输入值 | 返回值 | 功能 |
  |:---:|:---:|:---:|:---:|
  | appendChild | element |  | 在子节点的末尾添加节点 |
  | removeChild | element |  | 移除某个子节点 |
  | replaceChild | oldVal, newVal（element） |  | 替换某个子节点 |
  | getAttribute | key | value | 获取某个属性值 |
  | setAttribute | key, value |  | 设置某个属性的值 |
  | getStyle | key | value | 获取某个样式的值 |
  | setStyle | key, value |  | 设置某个样式的值 |
  | getElementById | id | element | 按照 id 查找 element |
  | getElementsByClassName | className | element [] | 按照 class 查找 element |
  | getElementsByTagName | name | element [] | 按照 标签名 查找 element |

1. 对于没有标注返回值的方法，设置成功则返回 `true`，否则返回 `false`  
2. 所有方法需要在 `html` 被 `setData` 完成后调用
3. 所有 `set` 类的方法，在一个同步流结束后刷新到 `ui`，请不要过于频繁的调用

综合示例：  
```wxml
<Parser id="article" html="{{html}}" binderror="error" />
```
``` javascript
data:{
  html:'...<div id="adContainer"><ad unit-id="..."></ad></div>...'
},
error(e){
  // 广告组件加载出错
  if (e.detail.source == "ad") {
    var document = this.selectComponent("#article").document;
    document.getElementById("adContainer").setStyle("display", "none");
  }
}
```
    
### CssHandler ###
- 功能  
  支持更多的 `css` 选择器  
  
使用本补丁包后**增加**支持的选择器（原包支持的选择器可见 [链接](#匹配style标签)）：

| 名称 | 示例 |
|:---:|:---:|
| 通配符 | * |
| 后代选择器 | .the-class1 .the-class2 |
| 子选择器 | .the-class1>.the-class2 |
| 属性选择器 | [name="123"] |
| before 伪类 | .the-class::before |
| after 伪类 | .the-class::after |
| @media 查询 | @media (min-width:300px){} |

附加说明：  
1. 属性选择器仅支持选择 [配置项](#配置项) 中添加到 `trustAttrs` 的属性，如有需要先要添加到列表  
2. 属性选择器仅支持 `[hidden]`（存在 `hidden` 属性即可）和 `[name="123"]`（`name` 属性的值等于 `123`）两种形式  
3. `before` 和 `after` 伪类中的 `content` 支持 `attr()` 函数（替换为某个属性的值，同样需要添加到`trustAttrs`）以及形如 `\200b` 的字符  
4. `@media` 查询仅支持 `min-width` 和 `max-width`，单位仅支持 `px`，且无法响应屏幕大小变化
  
- 大小（与原大小相比增加）  
  `4.80KB`（`min` 版本：`1.50KB`）  
- 使用方法  
  用 `CssHandler` 文件夹下的 `CssHandler.js`（若使用 `min` 版本也要改名为 `CssHandler.js`）替换原插件包下的 `CssHandler.js` 即可

!> 使用该补丁包后会一定程度上减慢解析速度，如非必要不建议使用  

### parser-group ###
!> 该包仅支持 微信端 使用，暂不支持通过 [打包工具](#打包工具) 打包  

- 功能  
  有时一个页面会用到多个 `parser` 标签，默认情况下，不同的 `parser` 标签之间是相互独立的，用 `parser-group` 标签包裹起来可以组合成一个整体，实现：  
  1. 图片预览时可以通过左右滑动查看该 `group` 内所有图片  
  2. 一个 `parser` 标签内的 `a` 标签可以跳转到另一个 `parser` 标签内的锚点（优先跳转同一个 `parser` 内的锚点，不存在再按照顺序查找，都需要开启 `use-anchor` 属性）  
  3. 一个 `parser` 标签内的视频播放时，将自动暂停该 `group` 内所有 `parser` 标签内的视频（前提是 `autopause` 属性的值为 `true`）  
- 大小  
  `2.24KB`  
- 使用方法  
  1. 将 `parser-group` 文件夹拷贝到 `components` 目录下即可（必须与 `parser` 文件夹同级）  
  2. 在需要使用页面的 `json` 文件中添加  
     ```json
     {
       "usingComponents": {
         "parser-group": "/components/parser-group/parser-group",
         "parser": "/components/parser/parser"
       }
     }
     ```
  3. 在需要使用页面的 `wxml` 文件中将需要组合成一个 `group` 的 `parser` 标签包裹在 `parser-group` 中即可  
     ```wxml
     <parser-group>
       <parser html="{{html1}}" />
       <view>...</view>
       <parser html="{{html2}}" />
     </parser-group>
     ```

### audio ###
!> 该包仅支持 微信端 使用  

- 功能  
  音乐播放器  
  功能上同原生的 `audio` 组件，由于微信原生的 `audio` 和 `wx.createAudioContext` 均已被废弃，因此设置这样一个组件代替，与原生的 `audio` 相比，所做的改进有：  
  1. 其大小会根据屏幕宽度自动调整（原生 `audio` 大小不可变）  
  2. 支持 `autoplay` 属性  
  3. 增加了一个可以拖动的进度条  
  4. `autopause` 属性可以控制到音频（即播放一个音频时，若再播放一个视频或音频，将自动暂停此音频）
  
  `error` 事件中会返回 `context` 对象（也可以通过 [getVideoContext](#getVideoContext) 方法获取），包含 `setSrc`、`play`、`pause`、`seek` 方法  
  封装成自定义组件，可以直接在页面上使用（属性和事件基本同 `audio`）  
- 大小  
  `3.95KB`  
- 使用方法  
  1. 将 `audio` 文件夹拷贝到 `parser` 文件夹下  
  2. 在 `trees/trees.json` 文件修改为  
     ```json
     {
       "component": true,
       "usingComponents": {
         "trees": "./trees",
         "myAudio": "../audio/audio"
       }
     }
     ```
  3. 将 `trees/trees.wxml` 中的 `audio` 修改为 `myAudio`  

## 原理和二次开发 ##

### 原理简介 ###  
本插件对于节点下有 图片 链接 视频 等特殊标签的，通过 `trees` 组件递归显示，否则直接通过 `rich-text` 组件显示，通过这样的方式，既可以充分利用 `rich-text` 渲染效果好，效率高的优点，也解决了 `rich-text` 屏蔽所有事件的问题，同时通过一些特殊处理，可以实现更加丰富的功能。  
详细可见：[小程序富文本能力的深入研究与应用](https://developers.weixin.qq.com/community/develop/article/doc/0006e05c1e8dd80b78a8d49f356413)  

### 添加一个自定义标签 ###  
1. 在 `config.js` 中的 `trustAttrs` 中添加需要用到的属性（否则将被移除）  
2. 在 `config.js` 中的 `trustTags` 中添加该标签名（否则将被转为 `span`，如果是自闭合标签还需要添加到 `selfClosingTags` 中）  
3. 在 `config.js` 中的 `filter` 中添加  
   ```javascript
   filter(node, cxt) {
     if (node.name == 'element') {
       cxt.bubble(); // 对该标签所有祖先节点添加一个标记，使得该标签不被 rich-text 包含，而是通过 trees 组件递归显示其祖先节点  
       // 如果还需要自定义处理某些属性也可以在这里添加
     }
   }
   ```  
4. 在 `trees.wxml` 中添加该组件  
   ```wxml
   <element wx:elif="{{n.name=='element'}}" xxx="{{n.attrs.xxx}}">
     <!--如果该标签内部还有其他节点还需要在这里添加一个 trees 标签-->
   </element>
   ```
5. 如果有使用自定义组件或插件需要在 `trees.json` 中声明（可选）  

一些例子：  
1. 使用 `embed` 标签：[#99](https://github.com/jin-yufeng/Parser/issues/99)  
2. 使用 腾讯视频 插件：[#103](https://github.com/jin-yufeng/Parser/issues/103)  
3. 使用 `details` 和 `summary` 标签：[#104](https://github.com/jin-yufeng/Parser/issues/104)  
     
### 添加自定义事件 ### 
为节省大小，默认情况下仅支持 `img` 和 `a` 标签的点击事件，如果还需要其他事件，可以自行在 `trees.wxml` 中绑定和处理  

!> 如果给除 `img`、`a`、`video`、`audio` 外的标签添加事件，还需要在 `config.js` 中的 `filter` 中添加  
```javascript
filter(node, cxt) {
  if (node.name == 'element') {
    cxt.bubble(); // 使其不被 rich-text 包含  
  }
}
```

## 许可与支持 ##
- 许可  
  您可以随意的使用和分享本插件 [MIT License](https://github.com/jin-yufeng/Parser/blob/master/LICENSE)  
- 支持  
  ![支持](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md6.png?sign=24395ad7572c19464db67d8997e3b2d2&t=1574502139)  

## 问题反馈 ##
### 问卷调查 ###
<iframe src='https://www.wjx.cn/jq/67585702,i,t.aspx?width=760&source=iframe' width='799' height='800' frameborder='0' style='overflow:auto'></iframe>

### 常见问题 ###

#### 图片间隙问题 ####
多张图片连续排列时，由于 `img` 的默认 `display` 是 `inline-block`，每张图片的底部会有空隙，如果不需要，可以对该 `img` 设置 `display:block`  
  
*解决方案：*  
1. 直接设置行内样式  
   在需要的 `img` 的 `style` 属性中添加  
2. 通过 `style` 标签添加
   ```html
   <style>
   /* 对所有图片生效 */
   img {
     display:block;
   }
   /* 对特定 class 的图片生效 */
   .xximg {
     display:block;
   }
   </style>
   <img class="xximg" src="xxxx" />
   ```
3. 通过 `tag-style` 属性添加（将对所有图片生效）  
   ```wxml
   <parser html="{{html}}" tag-style="{{tagStyle}}"></parser>
   ```
   ```javascript
   data: {
     tagStyle: {
       img: "display:block"
     }
   }
   ```
4. 通过 `wxss` 设置  
   将 `trees.wxss` 中的 `._img` 增加
   ```css
   ._img {
     ...
     font-size: 0;
     display: block;
   }
   ```  
  
*相关 issue：*[#25](https://github.com/jin-yufeng/Parser/issues/25)、[#65](https://github.com/jin-yufeng/Parser/issues/65)、[#74](https://github.com/jin-yufeng/Parser/issues/74)

#### 显示公众号网页 ####  
如需显示公众号的文章，可参考以下步骤（*仅供交流学习，请勿显示侵权内容* ）  
1. 使用 [CssHandler](#CssHandler) 补丁包（网页中有后代选择器等复杂的选择器）  
2. 获取网页的源代码（以 `node.js` 为例）  
   ```javascript
   const https = require("https");
   function getContent(url){
     return new Promise(function(reslove,reject) {
       var html = "";
       https.get(url, (res) => {
         if(res.statusCode != 200)
           reject("请求失败，状态码：" + res.statusCode);
         res.on('data', (d) => {
           html += d.toString();
         });
         res.on('end', () => {
           html = "<style>#js_content{visibility:visible !important}</style>" + html; // 原网页的内容是隐藏的，设置显示
           html = html.replace(/<script[\s\S]+?<\/script>/g, ""); // 移除 script 标签，减小大小
           reslove(html);
         })
       }).on('error', (e) => {
         reject("请求失败，" + e.message);
       })
     })
   }
   // 云函数
   exports.main = async(event, context) => {
     // 将这个结果送给 parser 组件的 html 属性即可
     return await getContent(event.url);
   }
   ```
3. 如遇样式异常可进行微调  

#### 显示 editor 编辑的内容 ####
通过 `editor` 组件编辑的 `html`，要正确显示，理论上需要维护 `<ql-container><ql-editor></ql-editor></ql-container>` 的结构，并引入对应的 `css`，另外，由于组件中仅支持 `class` 选择器，还需要将标签名选择器等转为 `class` 选择器，详见 [官网说明](https://developers.weixin.qq.com/miniprogram/dev/component/editor.html)  
不过大部分情况下，只需要在 `config.js` 的 `filter` 函数中添加以下内容即可（个别情况自行调整）：
```javascript
filter(node) {
  if ((node.attrs.class || '').includes('ql')) {
    node.attrs.class = node.attrs.class.replace(/ql-align-(\S+)/, ($, $1) => {
      node.attrs.style += ';text-align:' + $1;
    }).replace(/ql-indent-([1-9])/, ($, $1) => {
      node.attrs.style += ';padding-left:' + (parseInt($1) * 2) + 'em';
    })
  }
}
```

#### 横向滚动的问题 ####  
从其他网站或编辑器中移植富文本时可能因为手机屏幕宽度小而导致内容超出宽度出现滚动条  
  
*解决方案：*  
1. 禁用滚动  
   在 `parser` 标签的 `style` 属性中加上 `overflow: hidden`（如果通过 `class` 设置还要加上 `!important`）即可禁用横向滚动  
   ```wxml
   <parser style="overflow:hidden" html="{{html}}"></parser>
   ```  
2. 通过 `tag-style` 设置 `max-width:100%`  
   ```wxml
   <parser html="{{html}}" tag-style="{{tagStyle}}"></parser>
   ```
   ```javascript
   data: {
     tagStyle: {
       p: "max-width:100%",
       div: "max-width:100%",
       section: "max-width:100%"
     }
   }
   ```  
3. 通过 [filter](#filter) 方法个别调整样式  
  
*相关 issue：*[#6](https://github.com/jin-yufeng/Parser/issues/6)、[#44](https://github.com/jin-yufeng/Parser/issues/44)、[#50](https://github.com/jin-yufeng/Parser/issues/50)、[#66](https://github.com/jin-yufeng/Parser/issues/66)

#### 禁用自动预览 / 跳转 ####
默认情况下，图片受到点击时会自动禁用预览，链接受到点击时会自动进行跳转/复制链接，若需要禁用这些功能，可参考以下方法：  
禁用自动预览：  
1. 给 `img` 标签增加 `ignore` 属性（如 `<img src="xxx" ignore>`），通过这种方法，点击无法预览，且其他图片预览时 **无法通过左右滑动** 看到这张图片（也无法从 [imgList](#imgList) 中获取）  
2. 在 `imgtap` 事件中调用 `ignore` 函数，通过这种方法将不会自动预览，但其他图片预览时 **仍可以** 通过左右滑动看到这张图片  

禁用自动跳转/复制链接：  
在 `linkpress` 事件中调用 `ignore` 函数，即可禁用自动跳转  

关于事件返回值中的 `ignore` 函数的更多信息可见 [事件](#事件) 中的相关说明；目前已知的问题是 `uni-app` 包编译到头条小程序时事件的返回值中没有这个 `ignore` 函数，需要另行处理  

#### 长内容处理 ####
有些时候富文本内容特别长，会导致节点数过多渲染缓慢甚至卡死，可考虑以下方案：
1. 分页处理  
   自行进行分页，每页显示适当长度的内容  
2. 通过 [recycle-view](https://developers.weixin.qq.com/miniprogram/dev/extended/component-plus/recycle-view.html)  
   将内容拆分成多个章节（需要提供每个章节的高度），每个章节用一个 `parser` 标签显示，还可以通过 [parser-group](#parser-group) 将所有章节的 `parser` 组合在一起  
   ```wxml
   <parser-group>
     <recycle-view batch="{{batchSetRecycleData}}" id="recycleId">
       <recycle-item wx:for="{{recycleList}}" wx:key="id">
         <parser html="{{item.content}}" />
       </recycle-item>
     </recycle-view>
   </parser-group>
   ```

为什么没有采用异步渲染：  
如果只是在初始时分批次 `setData` 设置数据（不加延时）：
1. 可能导致短时间内发起过多的 `setData`  
2. 这样虽然可以先显示一部分出来，但此时由于仍在进行 `setData`，可能导致卡顿，影响体验  

如果先显示一部分，剩余的延迟渲染（如根据滑动位置）：
1. 难以确定初次渲染的范围（未渲染前无法知晓元素的高度，若渲染过多则没有意义，若渲染过少则可能影响体验）  
2. 滑动的时候难以直观看到整体高度（因为只渲染了一部分，也无法知晓总高度）  

另外，异步渲染还存在增加处理难度、无法解决过长内容节点数过多等问题  

#### 关于换行符 ####  
`html` 中换行只能使用 `br` 标签，其他的包括 `↵`, `\n` 等都是无效的，只会原样显示  
*解决方案：*
1. 通过正则替换（传入前）  
   ```javascript
   // 以 ↵ 为例
   html = html.replace(/↵/g,''); // 移除所有 ↵
   html = html.replace(/↵/g,'<br>'); // 全部替换为 br 标签
   ```
2. 通过 [onText](#onText) 方法处理  
   ```javascript
   onText(text) {
     if(text.includes('↵'))
       return text.replace(/↵/g,''); // 移除所有 ↵
   }
   ```

#### 其他问题 ####

##### 关于 markdown #####  
插件默认不支持 `markdown`（因为 `markdown` 库较大，且用到的人不多），如果需要可先自行通过 `markdown` 库转为 `html` 后再进行解析和显示，其中一些标签的默认样式可以放在 `tag-style` 属性中  
可以参考：[示例小程序](https://github.com/jin-yufeng/Parser/tree/master/demo/wx)

##### 关于编辑器 #####    
本插件没有专门配套的富文本编辑器，一般来说，能够导出 `html` 的富文本编辑器都是支持的；另外本插件仅支持显示富文本，没有编辑功能  
*相关 issue：*[#10](https://github.com/jin-yufeng/Parser/issues/10)
  
##### 部分 style 标签中的样式无法被匹配 #####  
本插件并不是支持所有的选择器，请留意支持的选择器类型，如果用了不支持的选择器，该样式将被忽略  
  
##### 不能正确显示一些网站的问题 #####  
很多网站的内容是在 `js` 脚本中动态加载的，这些内容在本插件解析中将被直接忽略（包括 `iframe` 视频）；本插件并不能替代 `web-view` 的功能，仅建议用于富文本编辑器编辑的富文本或简单的静态网页  

### 反馈问题 ###
在反馈问题前，请先通过以下方式尝试解决：  
1. 检查是否使用的是最新版的插件包  
2. 在 [常见问题](#常见问题) 中查找是否有此问题  
3. 在 [issues](https://github.com/jin-yufeng/Parser/issues) 中查找是否有相同问题  
4. 使用 [示例项目](https://github.com/jin-yufeng/Parser/tree/master/demo) 或微信小程序 [富文本插件](/features#案例体验) 中的自定义测试尝试是否也会出现相同的问题  
5. 在下框中输入 `html` 字符串进行测试（即直接用浏览器进行渲染，若也存在问题，请检查样式） 
 
  <textarea id="input" style="font-family:Consolas;height:200px;margin-bottom:.8em;padding:5px;width:100%" placeholder="请输入字符串"></textarea>
  <button onclick="parse()">解析</button>
  <button onclick="reset()" style="margin-left:10px">清空</button>
  <iframe id="frame" style="height:200px;margin-top:0"></iframe>  

如果以上方式无法解决问题，可通过以下方式反馈  
1. 在 `Github` 上 [提出 issue](https://github.com/jin-yufeng/Parser/issues/new/choose)，请注意按照模板要求详细描述问题  
2. 在微信小程序 [富文本插件](#立即体验) 中的疑问解答 - 联系客服中联系我，请 **直接发送相关问题**，发送无意义内容将不会回复  
