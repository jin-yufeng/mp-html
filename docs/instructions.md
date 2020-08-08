## 使用方法 {docsify-ignore} ##
### 插件包说明 ###

| 名称 | 大小 | 使用 |
|:---:|:---:|:---:|
| [parser](https://github.com/jin-yufeng/Parser/tree/master/parser) | 40.3KB | 微信小程序插件包 |
| [parser.min](https://github.com/jin-yufeng/Parser/tree/master/parser.min) | 25.6KB | 微信小程序插件包压缩版（功能相同） |
| [parser.qq](https://github.com/jin-yufeng/Parser/tree/master/parser.qq) | 39.8KB | QQ 小程序插件包 |
| [parser.bd](https://github.com/jin-yufeng/Parser/tree/master/parser.bd) | 38.2KB | 百度小程序插件包 |
| [parser.my](https://github.com/jin-yufeng/Parser/tree/master/parser.my) | 38.5KB | 支付宝小程序插件包 |
| [parser.tt](https://github.com/jin-yufeng/Parser/tree/master/parser.tt) | 39.1KB | 头条小程序插件包 |
| [parser.uni](https://github.com/jin-yufeng/Parser/tree/master/parser.uni) | 57.4KB | `uni-app` 插件包（可以编译到所有平台） |

说明：  
除原生和 `uni-app` 框架外，其他框架暂无专用包，但也可以引入原生包使用（仅限相应端使用），具体方法见 [在其他框架使用](#在其他框架使用)  
版本分为 [发布版](https://github.com/jin-yufeng/Parser)（较为稳定）和 [开发版](https://github.com/jin-yufeng/Parser/tree/develop)（可以尝鲜）  

关于 `uni-app` 包的相关说明：  
1. 为解决平台差异使用了较多条件编译的内容，编译到各平台后会变小  
2. 需要使用 `HBuilderX 2.2.5` 及以上版本编译，且必须使用自定义组件模式（或 `v3`）  
3. 由于 `ad` 标签的特殊性，若需要使用文中广告，需自行到 `trees.vue` 中打开注释  
4. 在 `NVUE` 页面使用时，如果配置里设置了 `flex-direction` 为 `row` 可能导致异常  

编译到各平台后差异：

| 平台 | 差异 |
|:---:|---|
| 微信小程序 | 基础库 2.7.1 及以上支持 ruby、bdi、bdo 标签，支持图片长按弹出菜单 |
| 头条小程序 | 不支持 audio 标签<br>imgtap 和 linkpress 事件的返回值中没有 ignore 方法（需使用 [global.Parser.onxxx](#关于-ignore-方法)） |
| H5<br>360 小程序 | 支持所有浏览器支持的标签<br>不支持 loading-img 属性<br>不支持写在 trees.vue 中的自定义标签和样式（需要直接使用 style 标签）<br>[配置项](#配置项) 中除 errorImg、userAgentStyles 外均无效 |
| App | v3 不支持 audio 标签<br>v3 支持 iframe 标签 |
| NVUE | 支持所有浏览器支持的标签<br>不支持 lazy-load、loading-img 属性<br>不支持 getVideoContext 的 api<br>不支持写在 trees.vue 中的样式（需要直接使用 style 标签）<br>[配置项](#配置项) 中除 errorImg、userAgentStyles 外均无效 |
| 华为快应用 | 不支持锚点跳转 |

关于 `a` 标签：  
`H5`、`App（含 NVUE）` 外链可以直接打开，小程序端将自动复制链接  
小程序端 `a` 标签设置 `app-id` 后可以跳转到其他小程序  

关于 `document` 对象：  
[组件实例](#获取实例的方法) 中提供了一个 `document` 对象，可以更加灵活的操作和调整富文本内容，不同平台的表现如下：  
- `H5` 和 `360` 小程序  
  `document` 为富文本所在 `div` 的实例，可以直接调用 `dom` 的各类方法  
- 小程序和 `App`  
  若使用了 [document](#document) 扩展包，则指向一个虚拟的 `dom` 对象（否则为 `undefined`），具体方法见文档  
- `NVUE`  
  `document` 为所在 `webview` 的实例，可以通过 `evalJs` （注意不是 `evalJS`）方法修改 `dom`  

以下统称为 `parser`  

### 在原生框架中使用 ###
#### 源码引入 ####
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

#### npm 引入（仅限微信） ####
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

!> npm 引入需要基础库 `2.2.1` 以上（更多信息参考 [官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)）  

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
     import jyfParser from "@/components/jyf-parser/jyf-parser";
     export default {
       // HBuilderX 2.5.5+ 可以通过 easycom 自动引入
       components: {
         jyfParser
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
1. 将 [parser](#插件包说明) 文件夹复制到 `/src/components` 目录下  
2. 使用的页面中参考此配置  
   ```javascript
   import Taro, { Component } from '@tarojs/taro'
   import { View } from '@tarojs/components'

   export default class Index extends Component {
     config = {
       usingComponents: {
         'parser': '../../components/parser/parser' // 引入插件包
       }
     }

     constructor (props) {
       super(props)
       this.state = {
         html: '<div>Hello World!</div>'
       }
     }

     render () {
       return (
         <View>
           <parser html={html} />
         </View>
       )
     }
   }
   ```

更多信息参考：[官网说明](https://nervjs.github.io/taro/docs/mini-third-party.html)  
组件方式引入可参考 [Taro-ParserRichText](https://github.com/xPixv/Taro-ParserRichText)（由 [@xPixv](https://github.com/xPixv) 提供）  

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
1. 将 [parser](#插件包说明) 文件夹复制到 `/src/components` 目录下  
2. 在需要使用的页面的 `wpy` 文件中添加  
   ##### v1.x #####
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
   ##### v2.x #####
      ```wpy
   <template>
     <div>
       <parser html="{{html}}" />
     </div>
   </template>
   <script>
     import wepy from '@wepy/core'
     wepy.page({
       data: {
         html: '<div>Hello World!</div>'
       }
     });
   </script>
   <config>
   {
       usingComponents: {
         'parser': '../components/parser/parser'
       }
   }
   </config>
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

!> 低版本的 `mpVue` 可能不会自动将 `src` 目录下页面中的 `json` 文件拷贝到 `dist` 中，需要自行直接添加到 `dist` 目录下  

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

| 属性 | 类型 | 默认值 | 说明 | 添加日期 |
|:----:|:----:|:----:|----|:---:|
| html | String |  | 要显示的 html 字符串 | - |
| autopause | Boolean | true | 是否允许播放视频时自动暂停其他视频 | [20190510](/changelog#_20190510) |
| autoscroll | Boolean | false | 是否自动给 table 加一个滚动层（使表格可以单独滚动） | [20200513](/changelog#_20200513) |
| autosetTitle | Boolean | true | 是否自动将 title 标签的内容设置到页面标题 | [20190724](/changelog#_20190724) |
| compress | Number | 0 | 压缩等级，可以选择是否移除 id 和 class | [20200312](/changelog#_20200312) |
| domain | String |  | 主域名，设置后将给链接自动拼接上主域名或协议名 | [20191202](/changelog#_20191202) |
| lazy-load | Boolean | false | 是否开启图片懒加载 | [20190928](/changelog#_20190928) |
| loading-img | String |  | 图片加载完成前的占位图，详见 [占位图](/#设置占位图) | [20200524](/changelog#_20200524) |
| selectable | Boolean | false | 是否允许长按复制内容 | [20190603](/changelog#_20190603) |
| show-with-animation | Boolean | false | 是否使用渐显动画 | [20190519](/changelog#_20190519) |
| tag-style | Object | {} | 设置标签的默认样式 | [20190421](/changelog#_20190421) |
| use-anchor | Boolean | false | 是否使用页面内锚点 | [20191202](/changelog#_20191202) |
| use-cache | Boolean | false | 是否使用缓存，设置后多次打开不用重复解析 | [20191215](/changelog#_20191215) |
  
##### autoscroll #####
表格一般宽度较大，在移动端容易超出屏幕宽度，可能无法显示超出部分或导致所有内容跟随表格一起滚动，设置该属性后，会给所有表格外套一个设置了 `overflow:scroll` 的 `div`，使其可以单独滚动  
不过在由于套了一个 `div`，个别情况下可能导致样式异常（如果有用到行内表格请勿使用）  

##### compress #####
可以按需选择压缩等级，减小解析结果的大小，提高性能（若需进行更复杂的自定义压缩，可以通过 [filter](#filter) 函数）  

| 等级 | 效果 |
|:---:|:---:|
| 0 | 仅进行一些不影响功能的压缩（默认）|
| 1 | 移除所有 `id` 属性（将无法使用锚点）|
| 2 | 移除所有 `class` 属性（将无法匹配 `wxss` 中的样式）|
| 3 | 移除所有 `id` 和 `class` 属性 |

附：移除 `id` 和 `class` 都不影响匹配 `style` 标签中的样式（将在匹配完成后再移除）  

##### tag-style #####
可以设置标签的默认样式，形如 `{标签名：样式}` 的结构体，例如 `{ img: "display:block" }` 表示给 `img` 标签设置默认的块级标签效果  

##### use-anchor #####
设置为 `true` 后将把所有设置了 `id` 的标签都通过节点递归的方式显示（否则无法知晓锚点位置），会一定程度上减慢渲染速度，非必要不建议开启  
  
##### use-cache #####
设置为 `true` 时将对解析结果进行缓存，在一个应用生命周期内多次打开，不需要重复解析，可以节省时间，建议对较长的内容且可能多次打开的内容设置缓存  

### 事件 ###

| 名称 | 触发 | 说明 |
|:----:|:----:|----|
| bindparse | 解析完成时触发 | 返回解析结果，可以对该结果进行自定义修改，将在渲染时生效 |
| bindload | dom 加载完成时触发 | 所有节点被添加到节点树中时触发，无返回值，可以调用 api |
| bindready | 渲染完成时触发 | 返回 boundingClientRect 的查询结果（包含宽高、位置等信息），所有图片（除懒加载）加载完成时才会触发，图片较大时可能 **延时较长** |
| binderror | 出错时触发 | 返回一个 object，其中 source 是错误来源，errMsg 为错误信息，target 包含出错标签的具体信息 |
| bindimgtap | 图片被点击时触发 | 返回一个 object，其中 src 是图片链接，ignore 是一个函数，在事件中调用将不进行预览；可用于阻挡 onShow 的调用 |
| bindlinkpress | 在链接被点击时触发 | 返回一个 object，其中包含了被点击的 a 标签的所有属性，ignore 是一个函数，在事件中调用后将不自动跳转/复制；可在该事件中进行下载文档等进一步操作 |  

##### 关于 ignore 方法 #####  
类似于 `a` 标签 `onclick` 事件返回 `false` 将不跳转一样，由于 `event` 无法获取返回值，故增加此函数，若在事件函数中执行，则不自动进行预览/跳转/复制链接操作，可执行自定义操作（这两个事件函数应尽量简短）  

```javascript
linkpress(e) {
 if(e.detail.href == "xxx")
    e.detail.ignore(); // 此链接不进行自动跳转/复制
  // 自定义操作
}
```

针对头条小程序事件中无法传递函数的问题，可以用以下方式接收  

```javascript
// 全局唯一的监听器
global.Parser.onImgtap = function(e) {
  console.log(e);
}
global.Parser.onLinkpress = function(e) {
  if(e.href == "xxx")
    e.ignore();
}
// 用完需要设置为 null
```

##### 关于 error 事件 #####  
当图片出错时，也会返回 `context`，其中包含一个方法—— `setSrc`，输入值为 `string`，可以重设 `src`（如设置成出错时的占位图，必须在 `error` 事件处理函数中调用，否则无效）  

```javascript
error(e) {
  if(e.detail.source=='img')
    e.detail.context.setSrc('https://xxx.com/xxx.png')
}
```

##### 关于写法 #####  

|  | 写法 | 举例 | 返回值 |
|:---:|:---:|:---:|:---:|
| 支付宝原生包 | on + 事件名（首字母大写） | onImgtap | 直接获取 |
| 其他原生包 | bind/catch + 事件名 | bindimgtap | 从 detail 中获取 |
| uni-app | @ + 事件名 | @imgtap | 直接获取 |

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

!> `uni-app` 包编译到 `H5` 和 `NVUE` 时这种样式无效，请使用 `style` 标签  

### 配置项 ###

| 配置项 | 作用 |
|:---:|:---:|
| errorImg | 图片加载出错时的占位图 |
| entities | 实体编码列表 |
| blockTags | 块级标签列表 |
| ignoreTags | 移除的标签列表 |
| selfClosingTags | 自闭合的标签列表 |
| trustTags | 信任的标签列表 |
| userAgentStyles | 默认的样式 |
| filter | 过滤器 |
| highlight | 代码高亮处理器 |
| onText | 文本处理器 |

?> 配置项在 `/libs/config.js` 中配置，对所有 `parser` 标签生效  

?> 实体列表不代表所有支持的实体编码，但发现有不支持的实体时可以在这里添加  

!> 不在信任的标签列表中的标签，除被移除的标签外，块级标签列表中的标签将被转为 `div` 标签，其他被转为 `span` 标签

关于几个自定义处理器：  

#### filter ####  

!> 该方法在 [20200312](/changelog#_20200312) 版本中添加  

自定义过滤器，解析到一个标签时触发  
输入值：`node` 为节点结构体（`name` 为标签名，`attrs` 为属性值，`children` 为子节点），对其进行修改将在渲染时生效；`context` 是解析器实例  
返回值：若返回 `false`，将移除此节点（及其所有子节点）  
解析器实例常用方法：  
`bubble()`：若该节点不能被 `rich-text` 包含则需要调用，将给其所有祖先节点冒泡设置标记，一般用于自定义标签  
`parent()`：获取该标签的父节点  
`siblings()`：获取该标签的兄弟节点（自闭合标签（如 `img`）不包含本身，非自闭合标签（如 `div`）包含本身）  
`domain`：设置的主域名  
示例：  
```javascript
filter(node, cxt) {
  if(node.name == "xxx") return false; // 移除某个标签
  if(node.name == "yyy") cxt.bubble(); // 使这个标签不被 rich-text 包含，一般用于自定义标签
  node.attrs.zzz = "aaa"; // 给标签添加某个属性
}
```

!> 若通过此方法设置 `node.attrs` 中的值，必须设置成 **字符串** 类型，否则在渲染时可能报错  

应用举例：  
1. 处理自定义标签：[链接](#添加一个自定义标签)  
2. 让表格能够单独横向滚动：[链接](/question#表格无法单独滚动)  
3. 给表格添加默认边框：[链接](/question#表格没有边框)

#### highlight ####  
代码高亮处理器  
输入值：`content` 是 `pre` 标签的内容，`attrs` 是 `pre` 标签的属性列表  
返回值：高亮处理后的 `html` 内容  
示例（以 [prism](https://prismjs.com/) 为例）：  
1. 下载需要的 `prism.js` 和 `prism.css` 至 `utils` 目录（`css` 更名为 `wxss`）  
2. 在 `config.js` 中实现 `highlight` 函数  
   ```javascript
   const Prism = require('/utils/prism.js');
   ...
   highlight(content, attrs) {
     content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/quot;/g, '"').replace(/&amp;/g, '&'); // 替换实体编码
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
   @import 'utils/prism.wxss';
   ```
4. 其中不支持的标签名选择器可以通过 [tag-style](/features#设置默认的标签样式) 属性引入  

!> 传入的 `content` 未对实体编码进行译码，如果直接交给 `Prism` 处理会导致实体编码原样显示，因此在传入前需要自行对需要的实体进行替换

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
4. 如果 `pre` 在 `config.js` 中的 `blockTags` 里，则需要去掉（一些平台的 `rich-text` 不支持 `pre`，为避免无法显示会被转为 `div`，这样 `2` 中就无法匹配到 `pre`）  

可以参考：[示例小程序](https://github.com/jin-yufeng/Parser/tree/master/demo/wx)  
`uni-app` 中使用可以参考此示例项目：[highlight](https://6874-html-foe72-1259071903.tcb.qcloud.la/highlight.zip?sign=c15980dfa79aaf1688db7059b23d05a7&t=1584685357)（部分 `HBuilder X` 版本可能因为这个 [bug](https://ask.dcloud.net.cn/question/102899) 导致 `App` 上的高亮样式不生效）  
*相关 issue：*[#83](https://github.com/jin-yufeng/Parser/issues/83)、[#158](https://github.com/jin-yufeng/Parser/issues/158)  

#### onText ####  

!> 该方法在 [20200312](/changelog#_20200312) 版本中添加  

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

应用举例：  
1. 替换无效的换行符：[链接](/question#换行符无效)  
2. 显示数学公式：[链接](https://github.com/jin-yufeng/Parser/issues/90)  

### 基础库要求 ###
微信小程序：
  
| 版本 | 功能 | 占比 |
|:---:|:---:|:---:|
| < 2.7.1 | 不支持图片长按菜单（识别小程序码）<br>不支持 bdi bdo ruby 标签 | 1.18% |
| < 2.4.4 | 不支持 a 标签 visited 效果 | 0.19% |
| < 2.2.5 | 不支持部分实体编码（形如 &amp;copy;） | 0.08% |
| < 1.6.3 | 无法使用 | < 0.01% |

!> 使用 `uni-app` 包编译到微信小程序时要求基础库 `2.3.0` 及以上  

!> 百度小程序基础库版本 `3.60`（客户端版本 `11.9`）以下的可能无法正常显示  

### Api ### 

本插件的组件实例中提供了一些 `api` 函数  

#### 获取实例的方法 ####
  
- 原生框架  
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
输入值：一个 `object`，`id` 为锚点的 `id`（为空时将跳转到组件顶部），`offset` 为偏移量，`success` 和 `fail` 是成功和失败的回调（需要配合 `use-anchor` 属性使用）  
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

#### in ####
功能：将锚点跳转的范围限定在一个 `scroll-view` 内  
说明：默认情况下，锚点跳转是通过控制页面的滚动实现的，但如果 `parser` 标签被放置在一个 `scroll-view` 内，通过页面的跳转就无法到达该锚点的位置，而组件内又无法直接控制 `scroll-view` 的滚动，因此设置这样一个方法传入必要信息  
输入值：一个 `object`，`selector` 为该 `scroll-view` 的选择器，`page` 为 `scroll-view` 所在页面或组件的实例（一般为 `this`），`scrollTop` 为 `scroll-view` 标签 `scroll-top` 属性绑定的变量名，这三者 **缺一不可**，另外 `scroll-view` 需要限制高度并开启 `scroll-y` 属性  
使用方法：  
```wxml
<scroll-view id="scroll" scroll-y scroll-top="{{top}}" scroll-with-animation style="height:300px">
  <parser id="article" html="{{html}}" use-anchor />
</scroll-view>
```

```javascript
Page({
  onLoad() {
    this.selectComponent("#article").in({
      page: this,
      selector: '#scroll',
      scrollTop: 'top'
    })
    // 之后内部的锚点跳转或手动调用 navigateTo 方法都会在这个 scroll-view 内部滚动
  }
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
功能：解析并渲染 `html` 内容  
说明：功能上同通过 `setData` 设置 `html` 属性；理论上可以避免将不用于渲染的 `html` 字符串传入视图层（实测耗时上无明显差别，其他方面未知）；在尾部追加时，该方法具有更好的性能  
输入值：`html` 为富文本字符串，`append` 表示是否在尾部追加（可用于加载更多）  

使用方法：
```wxml
<parser id="article"></parser>
```
```javascript
var html = "<div>Hello World!</div>";
this.selectComponent("#article").setContent(html);
```

!> 在 `load` 或 `ready` 事件中调用可能陷入死循环

## 扩展包 ##
[patches](https://github.com/jin-yufeng/Parser/tree/master/patches) 文件夹中准备了一些扩展包，根据需要选用，可以实现更加丰富的功能  

!> 扩展包需与插件包同步更新，否则可能出现不兼容的情况  

### 打包工具 ###
本插件提供了一个打包工具（`pack.jar` 是可执行文件，`pack.java` 是源代码），可以按需生成需要的插件包（便于添加扩展包）  

![打包工具](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md7.png?sign=0e1d048ea91f4154a0a53ab55b45e4ca&t=1579784564)

### emoji ###  
- 功能  
  将形如 `[笑脸]` 的文本解析为 `emoji` 小表情  
- 大小  
  `4.21KB`（`min` 版本 `3.12KB`）  
- 使用方法  
  1. 将 [emoji.js](https://github.com/jin-yufeng/Parser/blob/master/patches/emoji/emoji.js) 复制到 `libs` 文件夹下（[emoji.min.js](https://github.com/jin-yufeng/Parser/blob/master/patches/emoji/emoji.min.js) 是压缩版本，功能相同，使用时也需要更名为 `emoji.js`）  
  2. 将 `libs/MpHtmlParser.js` 中的 `var emoji` 修改为 `var emoji = require('./emoji.js')`
  
  默认配置中支持 `177` 个常用的 `emoji` 小表情  
  支持两种形式的 `emoji`，一是 `emoji` 字符（不同设备上显示的样子可能不同），或者是网络图片（将按照 `16px` × `16px` 的大小显示，且不可放大预览），默认配置中都是 `emoji` 字符，可使用以下 `api` 获取或修改：  
  ```javascript
  const parserEmoji = require("components/parser/libs/emoji.js");
  console.log(parserEmoji.getEmoji("笑脸")); //笑脸的emoji字符
  parserEmoji.removeEmoji("笑脸"); //移除笑脸emoji
  parserEmoji.setEmoji("哈哈","https://example.png"); //设置emoji，支持emoji字符或网络图片
  ```  

### document ###  
- 功能  
  实现类似于 `web` 中的 `document` 对象，可以动态操作 `DOM`  
- 大小  
  `7.41KB`（`min` 版本 `5.17KB`，`uni-app` 版本 `6.32KB`）  
- 使用方法  
  1. 将 [document.js](https://github.com/jin-yufeng/Parser/blob/master/patches/document/document.js) 复制到 `libs` 文件夹下（[document.min.js](https://github.com/jin-yufeng/Parser/blob/master/patches/document/document.min.js) 是压缩版本，功能相同；在 `uni-app` 中使用时需用 [document.uni.js](https://github.com/jin-yufeng/Parser/blob/master/patches/document/document.uni.js)；使用时也需要更名为 `document.js`）  
  2. 将 `parser.js`（`uni-app` 中是 `jyf-parser.vue`）中的 `var dom` 修改为 `var dom = require('./libs/document.js')`
  
- `document` 类：  
  获取方式：可通过 `this.selectComponent("#id").document` 获取  
  `Api` 列表:   

  | 名称 | 输入值 | 返回值 | 功能 |
  |:---:|:---:|:---:|:---:|
  | body |  | element | 返回根 body 节点 |
  | getElementById | id | element | 按照 id 查找 element |
  | getElementsByClassName | className | element [] | 按照 class 查找 element |
  | getElementsByTagName | name | element [] | 按照 标签名 查找 element |
  | createElement | name | element | 创建标签名为 name 的标签 |
  | write | html |  | 写入 html 内容，将覆盖原内容 |
   
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
  | outerHTML | 包含该节点的 html 内容，**仅支持** 获取 |
  
  `Api` 列表：

  | 名称 | 输入值 | 返回值 | 功能 |
  |:---:|:---:|:---:|:---:|
  | appendChild | element |  | 在子节点的末尾添加节点 |
  | removeChild | element |  | 移除某个子节点 |
  | replaceChild | newVal, oldVal（element） |  | 替换某个子节点 |
  | getAttribute | key | value | 获取某个属性值 |
  | setAttribute | key, value |  | 设置某个属性的值 |
  | getStyle | key | value | 获取某个样式的值 |
  | setStyle | key, value |  | 设置某个样式的值 |
  | getElementById | id | element | 按照 id 查找 element |
  | getElementsByClassName | className | element [] | 按照 class 查找 element |
  | getElementsByTagName | name | element [] | 按照 标签名 查找 element |

1. 对于没有标注返回值的方法，设置成功则返回 `true`，否则返回 `false`  
2. 所有 `set` 类的方法，在一个同步流结束后刷新到视图，请不要过于频繁的调用
3. 部分标签名在解析过程中会被转换（具体见 [配置项](#配置项)），通过标签名可能无法获取

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
  支持匹配 `style` 标签中更多的 `css` 选择器  
  
使用本扩展包后 **增加** 支持的选择器（原包支持的选择器可见 [链接](/features#匹配-style-标签)）：

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
1. 属性选择器仅支持 `[hidden]`（存在 `hidden` 属性即可）和 `[name="123"]`（`name` 属性的值等于 `123`）两种形式  
2. `before` 和 `after` 伪类中的 `content` 支持 `attr()` 函数（替换为某个属性的值）以及形如 `\200b` 的字符  
3. `@media` 查询仅支持 `min-width` 和 `max-width`，单位仅支持 `px`，且无法响应屏幕大小变化
  
- 大小（与原大小相比增加）  
  `4.52KB`（`min` 版本：`1.62KB`）  
- 使用方法  
  用 [CssHandler.js](https://github.com/jin-yufeng/Parser/blob/master/patches/CssHandler/CssHandler.js)（[CssHandler.min.js](https://github.com/jin-yufeng/Parser/blob/master/patches/CssHandler/CssHandler.min.js) 是压缩版本，功能相同，使用时也需要更名为 `CssHandler.js`）替换原插件包下的 `CssHandler.js` 即可

!> 使用该扩展包后会一定程度上减慢解析速度，如非必要不建议使用  

### parser-group ###
!> 该包仅支持 微信、qq、头条 原生包 使用，暂不支持通过 [打包工具](#打包工具) 打包  

- 功能  
  有时一个页面会用到多个 `parser` 标签，默认情况下，不同的 `parser` 标签之间是相互独立的，用 `parser-group` 标签包裹起来可以组合成一个整体，实现：  
  1. 图片预览时可以通过左右滑动查看该 `group` 内所有图片  
  2. 一个 `parser` 标签内的 `a` 标签可以跳转到另一个 `parser` 标签内的锚点（优先跳转同一个 `parser` 内的锚点，不存在再按照顺序查找，都需要开启 `use-anchor` 属性）  
  3. 一个 `parser` 标签内的视频播放时，将自动暂停该 `group` 内所有 `parser` 标签内的视频（前提是 `autopause` 属性的值为 `true`）  
- 大小  
  `2.20KB`  
- 使用方法  
  1. 将 [parser-group](https://github.com/jin-yufeng/Parser/tree/master/patches/parser-group) 文件夹拷贝到 `components` 目录下即可（必须与 `parser` 文件夹同级）  
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
!> 百度、支付宝小程序原生包暂不支持使用  

- 功能  
  音乐播放器  
  功能上同原生的 `audio` 组件，由于微信原生的 `audio` 和 `wx.createAudioContext` 均已被废弃，一些平台直接不支持 `audio` 组件，因此设置这样一个组件代替，与原生的 `audio` 相比，所做的改进有：  
  1. 其大小会根据屏幕宽度自动调整（原生 `audio` 大小不可变）  
  2. 支持 `autoplay` 属性  
  3. 增加了一个可以拖动的进度条  
  4. `autopause` 属性可以控制到音频（即播放一个音频时，若再播放一个视频或音频，将自动暂停此音频）
  
  `error` 事件中会返回 `context` 对象（也可以通过 [getVideoContext](#getVideoContext) 方法获取），包含 `setSrc`、`play`、`pause`、`seek` 方法  
  封装成自定义组件，可以直接在页面上使用（属性和事件基本同 `audio`）  
- 大小  
  `4.26KB`（`uni-app` 版 `4.66KB`）  
- 使用方法  

  ?> 建议通过 [打包工具](#打包工具) 打包  

  原生包：  
  1. 将 [audio](https://github.com/jin-yufeng/Parser/tree/master/patches/audio/audio) 文件夹拷贝到 `parser` 文件夹下  
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
  3. 将 `trees/trees.wxml` `template` 中的 `audio` 修改为 `myAudio`  
  
  uni-app：  
  1. 将 [audio.vue](https://github.com/jin-yufeng/Parser/tree/master/patches/audio/audio.vue) 拷贝到 `libs` 文件夹下  
  2. 在 `trees.vue` 中引入  
     ```javascript
    import myAudio from './audio'
    ...
    components: {
      myAudio,
      trees
    } 
    ```
  3. 将 `trees.vue` 中的 `audio` 修改为 `myAudio`

### search ###
!> `uni-app` 包暂不支持使用  

- 功能  
  关键词搜索  
- 大小  
  `2.87KB`（`min` 版本 `1.41KB`）  
- 使用方法  
  1. 将 [search.js](https://github.com/jin-yufeng/Parser/blob/master/patches/search/search.js) 复制到 `libs` 文件夹下（[search.min.js](https://github.com/jin-yufeng/Parser/blob/master/patches/search/search.min.js) 是压缩版本，功能相同，使用时也需要更名为 `search.js`）  
  2. 将 `parser.js` 中的 `var search` 改为 `var search = require('./libs/search.js')`  
  
  引入后会在组件实例上添加一个 `search` 方法  
  
  输入值：  
  一个 `object`，其中：  
  `key`：要搜索的关键词（支持字符串和正则表达式）  
  `style`：给搜索结果设置的样式，默认为 `background-color:yellow`  
  `anchor`：是否将搜索结果设置为锚点  
  `success`：成功回调  
  
  效果：将搜索到的结果设置为 `style` 样式  
  
  返回值：  
  一个 `object`，其中：  
  `num`：搜索结果个数  
  `highlight`：单独高亮一个结果的方法，接受两个输入值，`i` 为需要高亮第几个结果（有效值为 `1` - `num`），`style` 为高亮的样式（默认为 `background-color:#FF9632`）  
  `jump`：跳转到一个结果的方法，将 `anchor` 设置为 `true` 才有，接受两个输入值，`i` 为要跳转到第几个结果（有效值为 `1` - `num`），`offset` 为偏移量  

  注意事项：  
  1. 不传入 `key`（或为空）时即可 **取消搜索**，取消所有的高亮，还原到原来的效果  
  2. 进行新的搜索时旧的搜索结果将被还原，旧的结果中的 `highlight` 等方法 **不再可用**，否则可能带来不可预期的结果  
  3. 调用 `highlight` 方法高亮一个结果时，之前被高亮的结果会被还原，即始终只有 **一个** 结果被高亮  
  4. `key` 传入字符串时 **大小写敏感**，如果要忽略大小写可以用正则的 `i`（字符串搜索效率高于正则）  
  5. 设置 `anchor` 为 `true` 会一定程度上 **降低效率**，非必要不要开启  
  6. 暂 **不支持** 跨标签搜索，即只有一个文本节点内包含整个关键词才能被搜索到  
  7. 一般来说，此方法比起修改 `html` 字符串后重新设置效率要高，也能实现更多功能  
  
  示例程序：  
  ```javascript
  Page({
    onLoad() {
      this.context = this.selectComponent('#article'); // 获取实例
    },
    // 搜索
    search(key) {
      this.context.search({
        key: key,
        anchor: true,
        success: res => {
          this.res = res;
          this.i = 1;
          this.highlight(1);
        }
      })
    },
    // 高亮
    highlight(i) {
      this.res.highlight(i); // 高亮第 i 个  
      this.res.jump(i, -50); // 跳转到第 i 个结果
      this.setData({
        state: i + '/' + this.res.num // 设置个数
      })
    },
    // 下一个
    next() {
      if(this.i < this.res.num)
        this.highlight(++this.i);
    },
    // 上一个
    before() {
      if(this.i > 1)
        this.highlight(--this.i);
    },
    // 取消搜索
    cancel() {
      this.context.search();
    }
  })
  ```


## 插件原理 ##

### 原理简介 ###  
本插件对于节点下有 图片 链接 视频 等特殊标签的，通过 `trees` 组件递归显示，否则直接通过 `rich-text` 组件显示，通过这样的方式，既可以充分利用 `rich-text` 渲染效果好，效率高的优点，也解决了 `rich-text` 屏蔽所有事件的问题，同时通过一些特殊处理，可以实现更加丰富的功能。  
详细可见：[小程序富文本能力的深入研究与应用](https://developers.weixin.qq.com/community/develop/article/doc/0006e05c1e8dd80b78a8d49f356413)  

### 图片处理 ###
由于小程序中的 `image` 和 `html` 中的 `img` 表现有很大不同（`html` 中的 `img` 在没有设置宽高时按原大小显示，设置了宽或高时按比例缩放，同时设置宽高时按设置值显示；小程序中的 `image` 必须设置宽高，否则将按照默认大小（`300×225`）显示），因此在小程序上模拟实现 `img` 将成为一个难题，插件的处理如下：  

- `v1`  
  往常的富文本组件中往往是通过 `image` 组件来显示图片，然后在 `load` 事件中将图片设置为原大小  
  缺陷：  
  1. 每张图片需要一次 `setData`，如果还没有进行组件封装，性能影响较大  
  2. 无法自定义图片大小或按比例缩放，只能按原大小或比例显示  
  3. 图片加载完成后大小才会突然从 `0` 闪现到原大小，加载时间长时效果不佳  

  本插件未采用此方案  
  
- `v2`  
  通过 `rich-text` 中的 `img` 显示图片  

  优点：  
  与 `html` 中的 `img` 表现基本一致  
  缺陷：  
  1. 不支持 `image` 的一些原生能力，包括：  
     1. 懒加载，`20190928` 版本后通过 `IntersectionObserver` 实现，但效果依然不如原生  
     2. 云文件 `ID`（`2.3.0+`）  
     3. 长按菜单（`2.7.0+`，能够识别小程序码）  
     4. `webp` 图片（`2.9.0+`）  
  2. `img` 外套了一层 `rich-text`，会在一些情况下导致样式错误  

  `20200317` 版本前采用  

- `v3`  
  对 `image` 进行如下处理后显示图片：  
  1. 若只设置了宽度，则设置 `mode` 为 `widthFix`  
  2. 若只设置了高度，则设置 `mode` 为 `heightFix`（`2.10.3` 以上支持，低基础库可能存在问题）  
  3. 若同时设置了宽高度，则设置 `mode` 为 `scaleToFill`  
  4. 若既没有设置宽度，也没有设置高度，则给这张图设置一个标记，在 `load` 事件中，将宽度设置为原大小  
  
  优点：  
  支持所有 `image` 的原生能力  
  缺点：  
  1. 对于上述最后一种情况，在图片加载完成时会突然从默认大小变成原大小，一些情况下较影响体验  
  2. 在 `inline-block` 的容器中，`img` 能够撑开容器，但 `image` 不能，一些情况下会导致错误，需要额外处理  
  2. 增加了处理复杂度，需要计算各类情况下的 `mode` 和设置宽度等  
  
  `20200317`版本 - `20200425` 版本采用  

- `v4`  
  结合 `rich-text` 和 `image`，`rich-text` 由于控制图片大小，`image` 覆盖其上，设置为透明，用于控制懒加载和长按菜单  
  优点：  
  1. 与 `html` 中的 `img` 表现基本一致  
  2. 部分利用了 `image` 的原生能力（懒加载和长按菜单）  
  
  此方案最大程度上结合了 `2`，`3` 两种方案的优点（只是还不能支持云文件 `ID` 和 `webp`，因为这两种情况下 `rich-text` 无法显示，要控制 `image` 的大小则又会带来 `v3` 中的问题）  

  - `v4.1`  
    通过将 `rich-text` 和 `image` 置于一个 `view` 内，父组件的 `position` 设置为 `relative`，`image` 的 `position` 设置为 `absolute` 并铺满父级，实现 `image` 覆盖在 `rich-text` 上的效果  
    优点：  
    确保 `image` 能够完全覆盖住 `rich-text`  
    缺陷：  
    1. 设置 `position` 为 `relative` 会让图片的层次高于一般标签，使得其无法被覆盖  
    2. `absolute` 布局效率和性能较低  
    
    `20200425` 版本 - `20200719` 版本采用  

  - `v4.2`  
    通过给 `image` 预设一个高度，然后将 `margin-top` 设置为负值，缩进相同的高度，父组件设置 `overflow:hidden` 隐藏溢出的部分，通过这样的方式实现覆盖  
    优点：  
    解决了 `v4.1` 中的问题  
    缺陷：  
    如果图片高度超过了预设的高度（目前为 `360px`，可自行在 `trees.wxss` 中的 `._image` 中进行修改），长按图片的上半部分将无法弹出菜单（其他不受影响）  
    
    `20200719` 版本后采用  
    
## 二次开发 ##

### 添加一个自定义标签 ###  
1. 在 `config.js` 中的 `trustTags` 中添加该标签名（否则将被转为 `span`，如果是自闭合标签还需要添加到 `selfClosingTags` 中）  
2. 在 `config.js` 中的 [filter](#filter) 中添加  
   ```javascript
   filter(node, cxt) {
     if (node.name == 'element') {
       cxt.bubble(); // 对该标签所有祖先节点添加一个标记，使得该标签不被 rich-text 包含，而是通过 trees 组件递归显示其祖先节点  
       // 如果还需要自定义处理某些属性也可以在这里添加
     }
   }
   ```  
3. 在 `trees.wxml` 中添加该组件  
   ```wxml
   <element wx:elif="{{n.name=='element'}}" xxx="{{n.attrs.xxx}}">
     <!--如果该标签内部还有其他节点还需要在这里添加一个 trees 标签-->
   </element>
   ```
4. 如果有使用自定义组件或插件需要在 `trees.json` 中声明（可选）  

一些例子：  
1. 使用 腾讯视频 插件：[#103](https://github.com/jin-yufeng/Parser/issues/103)  
2. 使用 `details` 和 `summary` 标签：[#104](https://github.com/jin-yufeng/Parser/issues/104)  
     
### 添加自定义属性 ###
- 功能性属性
  像 `video`、`ad` 等标签有非常多属性，全写在模板里会增加一定的大小，因此默认只添加了一些常用属性，如果需要使用更多属性，可在 `trees.wxml` 中的该标签中加上 `xxx="{{n.attrs['xxx']}}"`  

- 样式性属性  
  像 `bgcolor` 等样式性的属性（小程序中只支持 `style`），解析过程中并没有把所有这类样式都转换到 `style` 属性中，如果用到一些不支持的样式属性，可参考以下方法：  
  将 `config.js` 中的 `filter` 方法设置为：  
  ```javascript
  filter(node) {
    if(node.attrs.bgcolor) // 以 bgcolor 属性为例
      node.attrs.style += ";background-color:" + node.attrs.bgcolor;
  }
  ```

### 添加自定义事件 ### 
为节省大小，默认情况下仅支持 `img` 和 `a` 标签的点击事件，如果还需要其他事件，可以自行在 `trees.wxml` 中绑定和处理  

!> 如果给除 `img`、`a`、`video`、`audio` 外的标签添加事件，还需要在 `config.js` 中的 [filter](#filter) 中添加  
```javascript
filter(node, cxt) {
  if (node.name == 'element') {
    cxt.bubble(); // 使其不被 rich-text 包含  
  }
}
```

一些例子：  
`div` 点击事件：[#113](https://github.com/jin-yufeng/Parser/issues/113)  

### 使用 markdown ###
由于 `markdown` 使用量相对较少，解析脚本较大且 `markdown` 的美观性很大程度上依赖于内置样式，不同场景下需求差异较大，因此默认不支持 `markdown`，如果需要可以先借助其他库将 `markdown` 转为 `html`，并通过 `tag-style` 和 `filter` 等工具进行美化，可参考以下方案：  
```wxml
<parser html="{{content}}" tag-style="{{tagStyle}}" />
```
```javascript
const marked = require('marked');
Page({
  data: {
    // 默认样式
    tagStyle: {
      // 代码块
      pre: 'padding:1em 1em 0 1em;margin:.5em 0;border-radius:0.3em;background:#2d2d2d;color:#ccc;line-height: 1.5;font-family:Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace',
      code: 'background-color:#f0f0f0;font-size:85%;margin:0 3px;padding:2px 5px 2px 5px;border-radius:2px;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
      // 表格添加边框
      table: 'width:100%;margin:10px 0;font-size:14px;border-collapse:collapse;border-top:1px solid #dfe2e5;border-left:1px solid #dfe2e5',
      th: 'padding:5px;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5',
      td: 'padding:5px;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5'
    }
  },
  onLoad() {
    var markdown = '## 标题';
    this.setData({
      content: marked(markdown)
    })
  }
})
```

如果需要实现表格间隔的背景色，可以在 `config.js` 中的 `filter` 中进行处理  
```javascript
filter(node, cxt) {
  if(node.name == 'table') {
    var arr = node.children[1].children;
    for(var i = 1; i < arr.length; i += 2)
      arr[i].attrs.style = 'background-color:#f6f8fa';
  }
}
```

代码高亮的处理方式见：[highlight](#highlight)  
[示例小程序](https://github.com/jin-yufeng/Parser/tree/master/demo/wx) 中的文档页面都是由 `markdown` 生成，可供参考  

## 许可与支持 ##
- 许可  
  您可以随意的使用和分享本插件 [MIT License](https://github.com/jin-yufeng/Parser/blob/master/LICENSE)  

  !> 不可用于任何违法用途  
在用于生产环境前务必经过充分测试，由插件 `bug` 带来的损失概不负责（可以自行修改源码）  

- 支持  
  ![支持](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md6.png?sign=24395ad7572c19464db67d8997e3b2d2&t=1574502139)  
