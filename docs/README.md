## 功能介绍 ##

### 匹配style标签 ###  
支持解析和匹配 `style` 标签中的样式，支持以下选择器
  
| 选择器 | 举例 | 匹配 |
|----|----|----|
| .class | .demo | &lt;element class="demo"&gt; |
| #id | #demo | &lt;element id="demo"&gt; |
| element | div | &lt;div&gt; |

示例：  
``` wxml
<parser html="{{html}}" />
```
``` javascript
data:{
  html:'<style>.a{font-style:italic}#b{font-weight:bold}p{text-align:center}</style>'
	+'<p><span class="a">Hello </span><span id="b">World!</span></p>'
}
```
<p style="text-align:center"><span style="font-style:italic;">Hello </span><span style="font-weight:bold;">World!</span></p>  

>支持通过逗号分隔的多个相同的选择器，例如 `.a,.b,div{}`  

>`uni-app` 包编译到 `H5` 平台时支持所有浏览器支持的选择器  

!>不支持的选择器将被忽略，包括伪类、后代选择器、通配符等<br>如需支持更多选择器，请使用 [CssHandler](#CssHandler) 补丁包  


### 设置默认的标签样式 ###
支持给各个标签设置默认的效果  
示例（给表格设置默认的边框）：
```wxml
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

### 多媒体多资源加载 ###
支持在 `video` 和 `audio` 标签中设置多个 `source` 标签，本插件将按顺序进行加载，若前面的链接无法播放，将自动切换下一个链接进行加载和播放，直到最后一个链接；可用于解决平台差异，最大程度避免无法播放
```wxml
<video controls>
  <source src="demo1.mov" />
  <source src="demo2.webm" />
</video>
```

### 懒加载 ###
- 图片  
  通过设置 `lazy-load` 属性，可以实现图片懒加载，在图片进入当前可视范围上下 `1000px` 范围内时再进行加载
- 视频  
  当视频数量超过三个时，将仅加载前三个视频，其他的用图片代替，避免一次加载过多视频导致卡死  
  另外通过设置 `autopause` 可以实现播放一个视频时自动暂停其他所有视频

### 自动设置标题 ###
若存在 `title` 标签，将自动把其内容设置到页面标题上（可通过 `autosetTitle` 属性控制）  
并将在 `parser`（解析完成）回调中返回，可用于转发设置

### 设置加载提示 ###
可以在 `parser` 标签内添加加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏  
```wxml
<parser html="{{html}}">加载中...</parser>
```

### 动画显示效果 ###  
通过设置 `show-with-animation` 属性可以实现内容加载完成后渐显的动画效果  
```wxml
<parser html="{{html}}" show-with-animation animation-duration="500" />
```

### 长按复制 ###
通过设置`selectable`属性可以实现长按复制任意内容  

?>百度小程序的 `rich-text` 本身支持 `selectable` 属性（需要百度 `APP 11.10` 以上）；但微信小程序不支持；本插件**均可实现**支持复制（且**没有版本要求**）  

### 实体编码支持 ###
支持各类 `html` 实体编码

!>微信小程序 / `QQ` 小程序等支持所有 `html` 实体编码；百度小程序等仅支持一些常用的实体编码，如 `&nbsp;`、`&lt;`、`&quot;` 等

### 智能压缩 ###  
支持自动通过以下方式对解析结果进行压缩，可以有效提升性能：
- 将一些只有一个子节点的标签进行合并，以实现减小深度的效果，根据内容不同，可以减少 `15%~60%` 的深度  
- 在非 `pre` 标签且没有 `white-space:pre` 属性时自动去除没用的空白符  

### 支持丰富的标签 ###
支持以下标签：   

| 标签 | 属性 |
|:---:|:---:|
| a | href |
| abbr |  |
| address |  |
| ad | unit-id / appid, apid, type |
| article |  |
| aside |  |
| audio | author, autoplay, controls, loop, name, poster, src |
| b |  |
| big |  |
| blockquote |  |
| body |  |
| br |  |
| center |  |
| cite |  |
| code |  |
| col | span, width |
| colgroup | span, width |
| dd |  |
| del |  |
| div | align |
| dl |  |
| dt |  |
| em |  |
| fieldset |  |
| font | color, face, size |
| footer |  |
| h1 |  |
| h2 |  |
| h3 |  |
| h4 |  |
| h5 |  |
| h6 |  |
| header |  |
| hr |  |
| html |  |
| i |  |
| img | alt, src, height, ignore, width |
| ins |  |
| label |  |
| legend |  |
| li |  |
| mark |  |
| nav |  |
| ol | start, type |
| p | align |
| pre |  |
| q |  |
| s |  |
| section |  |
| small |  |
| source | src |
| span |  |
| strong |  |
| style |  |
| sub |  |
| sup |  |
| table | border, cellpadding, cellspacing, width |
| tbody |  |
| td | colspan, height, rowspan, width |
| tfoot |   |
| th | colspan, height, rowspan, width |
| thead |  |
| tr | colspan, height, rowspan, width |
| tt |  |
| u |  |
| ul |  |
| video | autoplay, controls, height, loop, muted, src, unit-id, width |

以下标签仅微信小程序基础库 `2.7.1` 以上可用：  

| 标签 | 属性 |
|:---:|:---:|
| bdi |   |
| bdo | dir |
| caption |   |
| rp | 高版本不显示，可用于兼容 |
| rt |   |
| ruby |   |

>支持图片点击（可自动预览）、链接点击事件（可自动复制链接），不支持其他事件（如 `onclick` 等）  

>全局支持 `id`、`style`、`class` 属性，`class` 可以匹配 `style` 标签中的样式和 `trees.wxss` 中的样式；其他不支持的属性将被移除  

>不在此列表中的标签，除个别将被直接移除（如 `script` 等），都会被转为一个行内标签，因此可以使用更多语义化标签  

>`uni-app` 包编译到 `H5` 平台时支持所有浏览器支持的标签  

!>`ad`（广告）标签仅微信 / `QQ` 小程序、百度小程序支持，且使用后会大大增加渲染时间

### 性能指标 ###
没有层数限制，解析速度快，轻量化，容错性强，稳定性高，不需要网络请求  
以下情况都可以正常解析：
``` html
<!--冒号不匹配-->
<div style="font-family:"宋体";text-align:center;">Hello</div>
<!--标签首尾不匹配-->
<div> World</label>
<!--异形标签-->
<o:p></o:p>
<!--缺少尾标签-->
<div>!
```  

## 使用方法 ##
### 插件包说明 ###

| 名称 | 大小 | 使用 |
|:---:|:---:|:---:|
| [Parser](https://github.com/jin-yufeng/Parser/tree/master/Parser) | 40.7KB | 微信小程序插件包 |
| [Parser.min](https://github.com/jin-yufeng/Parser/tree/master/Parser.min) | 29.3KB | 微信小程序插件包压缩版（功能相同） |
| [Parser.bd](https://github.com/jin-yufeng/Parser/tree/master/Parser.bd) | 37.9KB | 百度小程序插件包 |
| [Parser.bd.min](https://github.com/jin-yufeng/Parser/tree/master/Parser.bd.min) | 27.7KB | 百度小程序插件包压缩版（功能相同） |
| [Parser.uni](https://github.com/jin-yufeng/Parser/tree/master/Parser.uni) | 54.2KB | `uni-app` 插件包（可以编译到所有平台） |

各平台差异：
1. 仅微信小程序、`QQ`小程序、`APP` 支持 `lazy-load` 属性
2. 仅微信小程序、`QQ`小程序、百度小程序支持 `ad` 组件
3. 微信小程序、`QQ`小程序、`H5`、`APP` 支持所有实体编码
4. 支付宝小程序、`H5`、`APP` 没有 `versionHigherThan` 的 `api`
5. 支付宝小程序不支持 `autopause` 属性
6. 仅微信小程序支持 `ruby`、`bdi`、`bdo` 标签及 `audio` 标签的 `autoplay` 属性

!>`uni-app` 包为解决平台差异使用了较多条件编译的内容，编译到各平台后会变小  
需要使用 `HBuilderX 2.2.5-alpha` 及以上版本编译，且必须使用自定义组件模式

!>表格和列表由于较难通过模板循环的方式显示，将直接通过 `rich-text` 进行渲染，因此请尽量避免在列表和表格中加入图片或链接，否则将无法预览或点击（但可以正常显示）  
列表引入 [list 补丁包](#List) 后可以解决这个问题    

!> 若需要自定义链接受到点击时的效果，可对 `Parser/trees` 文件夹下的 `trees.wxss` 中的 `navigator-hover` 进行修改（默认下划线+半透明）

以下统称为 `Parser`  

### 在原生框架中使用 ###
1. 下载 [Parser](#插件包说明) 文件夹至小程序目录  
2. 在需要引用的页面的 `json` 文件中添加（百度小程序中组件名一定要**小写**）
   ``` json
   {
     "usingComponents": {
       "parser":"/Parser/index"
     }
   }
   ```
3. 在需要引用的页面的 `wxml` 文件中添加  
   ``` wxml
   <parser html="{{html}}" />
   ```
4. 在需要引用的页面的 `js` 文件中添加  
   ``` javascript
   data: {
     html:"<div>Hello World!</div>"
   }
   ```

>[demo/wx](https://github.com/jin-yufeng/Parser/tree/master/demo/wx) 文件夹下的是微信小程序 [富文本插件](#立即体验) 示例程序的源码，可供参考  

### 在uni-app中使用 ###
- 使用 `uni-app` 包（可以编译到所有小程序平台）  
  1. 下载 [Parser](#插件包说明) 文件夹到 `components` 目录下（更名为 `Parser`）  
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
  
  >可以直接通过插件市场引入：[插件市场](https://ext.dcloud.net.cn/plugin?id=805)
  
  > [demo/uni-app](https://github.com/jin-yufeng/Parser/tree/master/demo/uni-app) 文件夹下是一个示例程序，可供参考 
 
- 使用原生包  
  参考 [官网-小程序组件支持](https://uniapp.dcloud.io/frame?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e7%bb%84%e4%bb%b6%e6%94%af%e6%8c%81)

### 在mpVue中使用 ###
1. 下载 [Parser](#插件包说明) 文件夹至 `static` 目录下
2. 在 `src` 目录下需要使用本插件的页面文件夹下添加 `json` 文件
   ```json
   {
       "usingComponents": {
           "parser": "../../static/Parser/index"
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

!>`mpVue` 无专用包，需要编译到哪个平台就引入哪个平台的原生包  
`vue` 中组件名必须小写
 
### 在wepy中使用 ###
测试版本：`V1.7.3`
1. 将 [Parser](插件包说明) 文件夹复制到 `/src/components` 目录下  
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
         'parser': '/components/Parser/index'
       }
     }
     data = {
       html: '<div>Hello World!</div>',
     }
   }
   </script>
   ```
3. 通过 `wepy build --watch` 命令进行编译  

!>`wepy` 无专用包，需要编译到哪个平台就引入哪个平台的原生包  
如果出现 `Components not found` 错误，则用 `wepy build --no-cache --watch` 命令清理缓存，重新编译  

### 在taro中使用 ###
由 [@xPixv](https://github.com/xPixv) 提供，请参考：  
[Github链接](https://github.com/xPixv/Taro-ParserRichText)  
[Taro物料市场](https://taro-ext.jd.com/plugin/view/5d35903e9b6a1d4027780154)

### 组件属性 ###  

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|:----:|:----:|:----:|:----:|----|
| html | String/Object/Array | | 是 | 要显示的富文本数据，具体格式见下方说明 |
| tag-style | Object | {} | 否 | 设置标签的默认样式 |
| autocopy | Boolean | true | 否 | 是否允许链接受到点击时自动复制链接（仅限 http 开头的网络链接）|
| autopause | Boolean | true | 否 | 是否允许播放视频时自动暂停其他视频 |
| autopreview | Boolean | true | 否 | 是否允许点击图片时自动预览 |
| autosetTitle | Boolean | true | 否 | 是否自动将 title 标签的内容设置到页面标题上 |
| img-mode | String | default | 否 | 图片显示模式 |
| lazy-load | Boolean | false | 否 | 是否开启图片懒加载 |
| selectable | Boolean | false | 否 | 是否允许长按复制内容 |
| show-with-animation | Boolean | false | 否 | 是否使用渐显动画 |
| animation-duration | Number | 400 | 否 | 动画持续时间 |
  
- `html` 格式：
  1. `String` 类型：一个 `html` 字符串，例如：`<div>Hello World!</div>`
  2. `Object` 类型：一个结构体构体；其中 `nodes` 属性为一个数组，格式基本同 [rich-text](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)，对于该节点下有 `img`，`video`，`a` 标签的，需要将 `continue` 属性设置为 `true`，否则将直接使用 `rich-text` 组件渲染，可能导致图片无法预览，链接无法点击等问题；`imgList` 属性是其中所有图片地址的数组；`title` 属性是页面的标题（不必要，传入将会设置到页面的标题上）；回调函数 `bindparser` 的返回值就是这样的结构体
  3. `Array` 类型：格式要求同上（用此格式传入预览图片时，将 `不能` 通过左右滑动查看所有图片）  
  
  !> `html` 传入 `Object` 或 `Array` 可以节省解析的时间，提高性能

- 关于 `img-mode`  
  默认 `default`，在没有设置宽高时，按图片原大小显示；设置了宽或高时，按比例进行缩放；同时设置了宽高时，按设置的宽高进行缩放。在同时设置了宽高的情况下，宽度可能因为 `max-width:100%` 的限制而缩短导致图片变形，此时可将模式设置为 `widthFix`，即保持宽度不变，高度自动变化（会导致设置的高度无效）

- 关于 `tag-style`  
  可以设置标签的默认样式，形如 `{标签名：样式}` 的结构体，例如 `{ body:"margin:5px" }` 表示给`body`标签设置默认的边距效果

  !>仅传入的 `html` 为 `String` 类型时有效（在解析过程中设置）  

### 回调函数 ###

| 名称 | 功能 | 说明 |
|:----:|----|----|
| bindparser | 在解析完成时调用（仅传入的 html 类型为 String 时调用） | 返回一个 object，其中 nodes 为解析后的节点数组，imgList 为图片列表，title 是页面标题，该 object 可以在下次调用直接作为 html 属性的值，节省解析的时间 |
| bindready | 渲染完成时调用 | 返回整个组件的 NodesRef 结构体，包含宽度、高度、位置等信息（每次 html 修改后都会触发） |
| binderror | 出错时调用 | 返回一个 object，其中 source 是错误来源（ad 广告出错、video 视频加载出错、audio 音频加载出错、parse 解析过程中出错），errMsg 为错误信息，errCode 是错误代码（仅ad），target 包含出错标签的具体信息 |
| bindimgtap | 在图片受到点击时调用 | 返回一个形如 {src: ...} 的结构体（src 是图片链接），可用于阻挡 onShow 的调用 |
| bindlinkpress | 在链接受到点击时调用 | 返回一个形如 {href: ...} 的结构体（href 是链接地址），开发者可以在该回调中进行进一步操作，如下载文档和打开等 |  
  
!>所有回调函数的返回值从 `e.detail` 中获取  

!>`uni-app` 包的回调函数以 `@` 开头，如 `@ready`  

### 使用外部样式 ###
如果需要使用一些固定的样式，可以通过 `wxss` / `css` 文件引入  
在 `/Parser/trees/trees.wxss(css)` 中通过 `@import` 引入自定义的样式文件即可  
```css
/*
* Parser/trees/trees.wxss(css)
* 在这里引入您的自定义样式
*/
@import "external.wxss(css)";
```

!>由于只有自定义组件内的样式在组件内能生效且 `rich-text` 在组件内使用时也只能匹配组件内的样式，所以必须在 `trees` 组件的 `wxss`/`css` 文件中引入需要的样式，在页面中写的样式无效  

!>组件内只能使用 `class` 选择器（支持后代选择器），不支持 `id` 选择器、属性选择器、标签名选择器等（更多可见 [官网说明](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html)）  

!>通过这种方式引入的样式会对所有 `parser` 标签生效，如果是对单个 `parser` 使用的样式，请使用 `style` 标签  

### 基础库要求 ###
微信小程序：
  
| 版本 | 功能 | 覆盖率 |
|:---:|:---:|:---:|
| >=2.2.5 | 全部正常 | 99.19% |
| 1.9.3-2.2.4 | 不支持部分 html 实体 | 0.68% |
| 1.6.3-1.9.2 | 不支持部分 html 实体<br>不支持 lazy-load 属性 | 0.05% |
| <1.6.6 | 无法使用 | 0.05% |

!>使用 `uni-app` 包编译到微信小程序时要求基础库 `2.3.0` 及以上  

!>百度小程序基础库版本 `3.60`（客户端版本 `11.9`）以下的可能无法正常显示  

### Api ### 
- `html2nodes`  
  功能：解析 `html` 字符串  
  参数：`html`（要解析的字符串）, `tagStyle`（默认的标签样式）  
  返回值：同 `bindparse`，可作为 `html` 属性的参数  
  ```javascript
  const Api=require("path/Parser/api.js");
  Api.html2nodes("<div>Hello World!</div>").then(res=>{
    console.log(res);
  })
  ```   
- `css2object`  
  功能：解析 `css` 字符串  
  参数：`style`（要解析的字符串）, `tagStyle`（已有的样式）  
  返回值：一个形如{key: value}的结构体，可作为 `tag-style` 属性的值  
  ```javascript
  const Api=require("path/Parser/api.js");
  console.log(Api.css2object(".demo{text-align:center;}"));
  //{.demo:"text-align:center;"}
  ```
- `versionHigherThan`  
  功能：判断当前设备的基础库版本是否高于或等于输入的版本  
  参数：`version`（要比较的基础库版本号）  
  返回值：若当前设备的基础库版本高于或等于输入的版本，返回 `true`，否则返回 `false`  
  ```javascript
  const Api=require("path/Parser/api.js");
  console.log(Api.versionHigherThan("2.7.1"));
  ```
- `String.splice`  
  功能：对字符串的指定位置进行删改（类似于数组的 `splice` 方法）  
  参数：`start`（开始修改的位置，为负数时表示倒数第几个）, `deleteCount`（要删除的字符个数）, `addStr`（要添加的字符串）  
  返回值：修改后的字符串（该方法不改变原字符串，不需要引入文件）  
  ```javascript
  var Str="Hello world!";
  Str=Str.splice(6,1,'W');
  console.log(Str);
  //Hello World
  ```

## 补丁包 ##
[patches](https://github.com/jin-yufeng/Parser/tree/master/patches) 文件夹中准备了一些补丁包，可根据需要选用，可以实现更加丰富的功能  

### emoji ###  
- 功能  
  将形如 `[笑脸]` 的文本解析为 `emoji` 小表情  
- 大小  
  `4.70KB`（`min` 版本 `3.61KB`）  
- 使用方法  
  将 `emoji.js` 复制到 `Parser` 文件夹下即可（若使用 `min` 版本也要改名为 `emoji.js`）  
  
  !>在 uni-app 中使用时需要将 Domhandler.js 首行改为 const emoji = require('./emoji.js');  
  
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
  `4.66KB`（`min` 版本 `3.61KB`）  
- 使用方法  
  将 `document.js` 复制到 `Parser` 文件夹下即可（若使用 `min` 版本也要改名为 `document.js`）  
  
  !>在 uni-app 中使用时需要将 index.vue 中的 27 行修改为 const Document = require('./document.js');  
  
document 类：  
获取方式：可通过 `this.selectComponent("#id").document` 获取  
`Api` 列表:   

| 名称 | 输入值 | 返回值 | 功能 |
|:---:|:---:|:---:|:---:|
| getElementById | id | element | 按照 id 查找 element |
| getChildren | i | element | 获取根节点的第 i 个子节点的 element 实例 | 
   
element 类：  
属性名：

| 名称 | 功能 |
|:---:|---|
| id | 该节点的id值 |
| nodes | 该节点的结构体，可以直接对这个结构体进行修改（修改后需要调用 update 方法同步到 UI，修改时要注意格式，更建议使用下方的 api 方法进行修改） |

`Api` 列表：

| 名称 | 输入值 | 返回值 | 功能 |
|:---:|:---:|:---:|:---:|
| getText |   | text | 获取文本内容（仅直接包含文本的标签可用） |
| setText | text |   | 修改文本内容（仅直接包含文本的标签可用） |
| addChildren | nodes, i |   | 在第 i 个位置添加子节点，nodes 为一个结构体，格式同 rich-text |
| removeChildren | i |   | 移除第 i 个子节点 |
| getChildren | i |   | 获取第 i 个子节点的 element 实例 |
| getAttr | key | attr | 获取某个属性值 |
| setAttr | key, value |   | 设置某个属性值 |
| getElementById | id | element | 在子节点中按照 id 查找 element |
| update |   |   | 若修改了 element.nodes 需要调用此方法同步到 UI |

返回格式：  
若执行成功，返回 `{ok:true, data:...}`；若不成功，返回 `{ok:false, errCode:..., errMsg:...}`  
错误码

| 错误码 | 含义 |
|:---:|:---:|
| 1 | 对没有直接包含`text`的标签执行`getText`或`setText` |
| 2 | 输入值类型不正确 |
| 3 | 输入值超出范围 |
| 4 | 无法找到对应`id`的节点 |

  
!>所有方法必须在 `html` 被 `setData` 完成后才能调用  

!>每次执行除了 `get` 以外的方法都需要进行一次局部的 `setData` 更新，请不要过于频繁的调用，否则可能影响性能

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
  if(e.detail.source == "ad"){
    // 获取document
    var document = this.selectComponent("#article").document;
    // 查找广告框容器
    var res = document.getElementById("adContainer");
    if (res.ok)
      res.data.setAttr("style","display:none"); // 隐藏广告容器
    else
      console.error(res.errMsg); // 查找失败
  }
}
```

### List ### 
- 背景  
  在原插件中，由于列表较难通过模拟实现，是直接使用 `rich-text` 来显示列表，这导致列表中的图片无法预览，链接无法点击，此补丁包可以解决这个问题  
- 功能  
  模拟 `ol`、`ul`、`li` 标签  
  `ol` 标签支持 `start` 和 `type` 属性；`ul` 标签会自动根据层级显示不同的样式  
- 大小  
  `4.50KB`  

!>此补丁包**仅能**在微信小程序中使用  

- 使用方法  
  1. 将 `list` 文件夹复制到 `Parser` 文件夹下  
  2. 将 `trees.li.wxml` 中的内容复制到 `Parser/trees/trees.wxml` 中 `name` 为 `element` 的 `template` 中的任意位置
  3. 在 `Parser/trees/handler.wxs` 中的 `isContinue` 函数中进行如下修改  
     ```javascript
     // else if(item.name=='a')
     else if(item.name=='a'||item.name=='li'||item.name=='ol'||item.name=='ul')
     ```
  4. 在 `Parser/trees/trees.json` 中添加
     ```json
     "usingComponents": {
       "trees": "./trees",
       "ol": "../list/ol",
       "ul": "../list/ul",
       "li": "../list/li"
     }
     ```  
  5. 将 `Parser/DomHandler.js` 中 `trustTag` 结构体的 `ol`、`ul`、`li` 属性值改为 `1`  
  - 可参考 `demo` 文件夹中的 [Parser](https://github.com/jin-yufeng/Parser/tree/master/demo/wx/Parser)（已装载此补丁包）  
  
- 在其他页面中使用  
  该包将列表封装成自定义组件，可以直接在其他页面上使用  
  1. 在需要使用的页面的 `json` 文件中添加
     ```json
     {
       "usingComponents": {
         "ol": "/Parser/list/ol",
         "ul": "/Parser/list/ul",
         "li": "/Parser/list/li"
       }
     }
     ```
  2. 可以直接使用 `ol`、`ul`、`li` 标签来显示列表  
     ```html
     <ol>
       <li>类型1-1</li>
       <li>类型1-2</li>
     </ol>
     <ol type="A" start="3" style="margin-top:5px;">
       <li>类型2-3</li>
       <li>类型2-4</li>
     </ol>
     <ol type="I" start="5" style="margin-top:5px;">
       <li>类型3-5</li>
       <li>类型3-6</li>
     </ol>
     <ul style="margin-top:10px">
       <li>层级1
         <ul>
           <li>层级2
             <ul><li>层级3</li></ul>
           </li>
         </ul>
       </li>
     </ul>
     ```
    
### CssHandler ###
- 功能：支持更多的 `css` 选择器  
  
使用本补丁包后**增加**支持的选择器（原包支持的选择器可见 [链接](#匹配style标签)）：

| 选择器 | 举例 | 匹配 |
|:---:|:---:|:---:|
| * | * | 所有 |
| .class .class | .demo1 .demo2 | &lt;element class="demo1"&gt;<br />...<br />&ensp;&ensp;&ensp;&ensp;&lt;element class="demo2"&gt; |
| .class>.class | .demo1>.demo2 | &lt;element class="demo1"&gt;<br />&ensp;&ensp;&ensp;&ensp;&lt;element class="demo2"&gt; |

- 大小（与原大小相比增加）  
  `3.04KB`（`min` 版本：`1.71KB`）  
- 使用方法  
  用 `CssHandler` 文件夹下的 `CssHandler.js`（若使用 `min` 版本也要改名为 `CssHandler.js`）替换原插件包下的 `CssHandler.js` 即可

!>使用该补丁包后会一定程度上减慢解析速度，如非必要不建议使用  

## 立即体验 ##
![体验小程序](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md5.jpg?sign=911a1fd62af2666f9c8dfa367b22479c&t=1574499374)  
更多案例可见（欢迎添加）：[链接](https://github.com/jin-yufeng/Parser/issues/27)  

## 后端解析 ##
&emsp;&emsp;本插件提供了一个配套的后端 `node.js` 支持包，可以提供更加强大的功能，如匹配多层的 `style`，代码高亮，直接打开网址，解析 `markdown` 等，其返回值可以直接作为本组件的 `html` 属性的值；且在后端提前完成解析后可以节省解析时间，提高性能。  

!>注意：该包需要node.js v7.6.0以上运行环境，无法直接在小程序前端使用，建议部署在服务器或云函数上  

!>在百度小程序和头条小程序中使用时需要将 `options` 中的 `setContain` 设置为 `true`    

安装方法：
```cmd
npm install parser-wxapp
```
使用方法：
```javascript
const parser=require('parser-wxapp');
var html="<div>Hello World!</div>";
parser(html).then(function(res){
  console.log(res);
})
```
详细文档参考： [npm链接](https://www.npmjs.com/package/parser-wxapp)

## 原理简介 ##
&emsp;&emsp;该插件对 `rich-text` 组件进行了二次封装，对于节点下有 `img`, `video`, `a` 标签的，使用自定义组件递归的方式显示，否则直接通过 `rich-text` 组件显示，这样既解决了 `WxParse` 中过多的标签数（`rich-text` 可以节省大量的标签），层数容易不够（自定义组件递归可以显示无限层级），无法解析表格，一些组件显示格式不正确（`rich-text` 可以解析出更好的效果）等缺点；也弥补了 `rich-text` 图片无法预览，无法显示视频，无法复制链接，部分标签不支持（在解析过程中进行替换）等缺点，另外该解析脚本还减小了包的大小，提高了解析效率，通过包装成一个自定义组件，简单易用且功能强大。  
更多可见：[《小程序富文本能力的深入研究与应用》](https://developers.weixin.qq.com/community/develop/article/doc/0006e05c1e8dd80b78a8d49f356413)

## 许可与支持 ##
您可以随意的使用和分享本插件  
![支持](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md6.png?sign=24395ad7572c19464db67d8997e3b2d2&t=1574502139)  

## 问题反馈 ##
### 常见问题 ###
1. 图片变形问题  
   图片变形一般是由于对 `img` 标签同时设置了 `width` 和 `height`，由于 `max-width:100%` 的限制，宽度被缩小但高度不变导致了变形  
   *解决方案：* 将 `img-mode` 属性设置成 `widthFix`，图片会根据设置的宽度，高度自适应，可解决图片的变形问题，但设置的高度会失效  

2. 禁止横向滚动问题  
   默认情况下，当内容超出屏幕宽度时可以横向滚动；如果要禁用滚动，请在 `parser` 标签的 `style` 属性中加上 `overflow: hidden`（如果通过 `class` 设置还要加上 `!important`）  
   *解决方案：*  
   ```wxml
   <parser style="overflow:hidden" html="{{html}}"></parser>
   ```

3. 关于换行符  
   `html` 中换行只能使用 `br` 标签，其他的包括 `↵`, `\n` 等都是无效的，只会原样显示  
   *解决方案：*可自行通过正则替换  
   ```javascript
   // 以↵为例
   html = html.replace(/↵/g,""); // 移除所有↵
   html = html.replace(/↵/g,"<br />") // 全部替换为 br 标签
   ```

4. 关于编辑器  
   本插件没有专门配套的富文本编辑器，一般来说，能够导出 `html` 的富文本编辑器都是支持的；另外本插件仅支持显示富文本，没有编辑功能  
  
5. 部分 `style` 标签中的样式无法被匹配  
   本插件并不是支持所有的选择器，请留意支持的选择器类型，如果用了不支持的选择器，该样式将被忽略  
  
6. 不能正确显示一些网站的问题  
   很多网站的内容是在 `js` 脚本中动态加载的，这些内容在本插件解析中将被直接忽略；本插件并不能替代 `web-view` 的功能，仅建议用于富文本编辑器编辑的富文本或简单的静态网页  

### 反馈问题 ###
在反馈问题前，请先通过以下方式尝试解决：  
1. 在 [常见问题](#常见问题) 中查找是否有此问题
2. 在 [issues](https://github.com/jin-yufeng/Parser/issues) 中查找是否有相同问题
3. 使用 [示例项目](https://github.com/jin-yufeng/Parser/tree/master/demo) 或微信小程序 [富文本插件](#立即体验) 中的自定义测试尝试是否也会出现相同的问题  
4. 在下框中输入 `html` 字符串进行测试（即直接用浏览器进行渲染，若也存在问题，请检查样式）  
  <textarea id="input" style="width:100%;height:200px" placeholder="请输入字符串"></textarea>
  <button onclick="parse()">解析</button>
  <button onclick="reset()" style="margin-left:10px">清空</button>
  <iframe id="frame" style="height:200px"></iframe>  

如果以上方式无法解决问题，可通过以下方式反馈  
1. 在 `Github` 上 [提出 issue](https://github.com/jin-yufeng/Parser/issues/new/choose)，请注意按照模板要求详细描述问题  
2. 在微信小程序 [富文本插件](#立即体验) 中的疑问解答 - 联系客服中联系我，请**直接发送相关问题**，发送无意义内容将不会回复  

!>由于客服平台不能发送文件，可将有问题的 `html` 代码贴到 [链接](https://paste.ubuntu.com/)  

## 更新日志 ##
- 2019.11.28:
  1. `U` `table` 标签支持了 `border`, `cellpadding`, `cellspacing` 属性 [详细](https://github.com/jin-yufeng/Parser/issues/49)  
  2. `U` 重构了 `uni-app` 包编译到 `H5` 时的显示方式，采用 `html` 原生的标签渲染，实现了以下优化（仅针对 `H5` 平台，其他**不变**）：
     - 支持所有浏览器支持的标签和属性  
     - `style` 标签支持所有浏览器支持的选择器
     - `error` 回调增加支持 `img`，且返回组件的 `DOM` 实例，修改属性后可以直接对页面生效  
     另外，通过一些转换，原来的属性和事件依然全部支持（不再有 `parser` 回调，因为不进行解析）  
- 2019.11.9:
  1. `F` 修复了 `uni-app` 包编译到 `H5` 时 `html` 的初值为空时报 `Cannot read property 'name' of undefined` 的错误的问题  
- 2019.11.5:
  1. `F` 修复了 `uni-app` 包编译到 `APP` 时多个连续实体空格失效的问题  
- 2019.11.3:
  1. `F` 修复了 `uni-app` 包编译到 `H5` 时多个行内标签并列会被错误换行的问题 [详细](https://github.com/jin-yufeng/Parser/issues/43)  
- 2019.11.1:
  1. `U` 优化了多张相同图片的预览方式  
- 2019.10.29:
  1. `F` 修复了部分行内标签被错误换行的问题  
- 2019.10.27:
  1. `F` 修复了部分情况下多张相同的图片仅第一张可显示的问题  
- 2019.10.24:
  1. `U` `uni-app` 包支持在 `APP` 端使用  
- 2019.10.17:
  1. `A` 增加了 `CssHandler` 补丁包（可支持多层的 `css` 选择器）[详细](#CssHandler)  
  2. `U` `uni-app` 包支持在 `H5` 端使用  
- 2019.9.28:
  1. `A` 增加了 `lazy-load` 属性（可用于图片懒加载）[详细](https://github.com/jin-yufeng/Parser/issues/30)  
- 2019.9.25:
  1. `A` 增加了 `uni-app` 插件包（可以编译到所有小程序平台）[详细](#插件包说明)    
  2. `F` 修复了部分情况下样式显示错误的问题 [详细](https://github.com/jin-yufeng/Parser/issues/31)  
- 2019.9.22:
  1. `U` 支持引入`wxss` / `css`文件中的外部样式[详细](#使用外部样式)  
- 2019.9.21:
  1. `A` 增加了百度小程序插件包 [详细](#插件包说明)
  2. `U` 为与百度小程序包统一，所有事件的返回值改为 `object` 类型（影响 `bindimgtap` 和 `bindlinkpress`）[详细](#回调函数)
  3. `U` 优化了补丁包的引入方式
  4. `F` 修复了 `autopause` 属性在某些情况下会失效的问题  
- 2019.9.18:
  1. `A` 增加了在 `wepy` 中的使用方法 [详细](#在wepy中使用)  
  2. `F` 修复了部分情况下 `style` 标签解析时由于缺少 `;` 导致错误样式匹配失败的问题
  2. `F` 修复了 `0917` 版本中 `a` 标签失效的问题[详细](https://github.com/jin-yufeng/Parser/issues/28)  
- 2019.9.17:
  1. `A` 增加了 `list` 补丁包（可用于模拟列表）[详细](#List)  
  2. `A` `video` 组件增加支持 `unit-id` 属性（前插视频广告）  
  3. `F` 修复了部分情况下图片会被 `text-indent` 错误缩进的问题  
- 2019.9.15:
  1. `A` 增加了 `document` 补丁包（可用于动态操作 `DOM`）[详细](#document)  
  2. `A` 增加支持小程序广告 `ad` 组件（可显示文中广告）  
- 2019.9.13:
  1. `A` 增加了 `emoji` 补丁包（可用于解析小表情）[详细](#emoji)
  2. `A` 增加了 `autopreview` 属性（可用于控制点击图片时是否自动预览，默认 `true`）和 `imgtap` 事件（图片被点击时触发）[详细](https://github.com/jin-yufeng/Parser/issues/23)
  3. `U` 缩小了节点深度（约 `15%~35%`，主要是通过合并一些只有一个子节点的标签以及优化排版方式），优化了性能 [详细](#智能压缩)
  4. `U` 缩小了解析结果的大小（约 `3%~5%`）[详细](#智能压缩)
  5. `F` 修复了解析完成后传入的 `tagStyle` 会被修改的问题
  6. `F` 修复了存在多张相同 `url` 图片时，进行预览会出现定位错误的问题 [详细](https://github.com/jin-yufeng/Parser/issues/21)
  7. `F` 修复了部分情况下 `html` 中的换行符会被显示的问题
- 2019.8.22：
  1. `U` 支持了 `font` 标签的 `size` 属性
- 2019.8.21:
  1. `F` 修复了部分情况下实体编码内容无法显示的问题 [详细](https://github.com/jin-yufeng/Parser/issues/19)
- 2019.8.17:
  2. `F` 修复了形如 `class="a b"`（多个 `class`）时样式匹配失效的问题
- 2019.8.10:
  1. `U` 优化了 `a` 标签的点击态效果
  2. `F` 修复了部分情况下 `span` 标签样式出错的问题
- 2019.8.2:
  1. `F` 修复了部分情况下 `display:flex` 显示出错的问题
- 2019.7.24:
  1. `A` 增加了 `autosetTitle` 属性，可设置是否自动将 `title` 标签的值设置到页面标题上（默认 `true`）[详细](#自动设置标题)
  2. `F` 修复了 `margin:auto` 失效的问题
- 2019.6.15:
  1. `F` 修复了部分情况下 `br` 标签换行格式不正确的问题
- 2019.6.10：
  1. `A` 适配了`rich-text`组件在2.7.1基础库新增加的标签，其中`big`、`small`、`mark`、`cite`、`s`等标签在低版本都可以兼容；`bdi`、`bdo`、`caption`、`rt`、`ruby` 标签必须基础库2.7.1及以上才能正常显示，低版本会被转为`span` [详细](支持丰富的标签)
  2. `A` 增加了 `html2nodes`（解析`html`）、`css2object`（解析`css`）、`versionHigherThan`（比较和判断基础库版本）、`String.splice`（对字符串指定位置进行删改）等 `api` 函数 [详细](#Api)
  3. `A` 增加了 `img-mode` 属性，可以设置为 `default` 或 `widthFix`，设置为 `widthFix` 时，宽度不变，高度自动变化，可用于解决部分情况下图片变形的问题（但设置的高度会失效）[详细](#组件属性)
  4. `U` 优化了样式匹配的优先级：`tag-style` &lt; `style` 标签 &lt; 内联 `style`样式
  5. `F` 修复了 `style` 标签中`,`前后有空格时导致该样式被忽略的问题
- 2019.6.3:
  1. `A` 增加了 `autocopy` 属性，用于控制是否允许 `a` 标签受到点击时自动复制链接（仅限 `http` 开头的网址链接；默认 `true`；接近于原 `selectable` 属性的功能）[详细](#组件属性)
  2. `U` 可以通过设置 `selectable` 属性控制是否允许长按复制任意内容（默认 `false`)[详细](#组件属性)
  3. `F` 修复了 `style` 标签内容过长时安卓机可能出现栈溢出的问题
- 2019.6.1:
  1. `F` 修复了部分情况下 `width` 设置为百分比时失效的问题
- 2019.5.24:
  1. `U` 通过以自定义组件递归的方式替代了模板循环，精简包的大小至`28.1KB`，且不再受层数限制
  2. `D` 删除了 `html-class` 和 `html-style` 属性，支持直接对 `Parser` 标签设置 `class` 和 `style`，默认的 `display` 是 `block`
  3. `F` 修复了部分情况下节点的 `display` 和 `float` 可能不生效的问题
  4. `F` 修复了背景音乐无法播放的问题（设置 `autoplay`），并支持对多个 `audio` 设置 `autoplay`
- 2019.5.22:
  1. `U` `bindready` 回调将返回整个组件的 `NodeRef` 结构体，包含了宽度、高度、位置等信息 [详细](#回调函数)
  2. `U` 提高了传入的 `html` 类型为 `Array` 或 `Object` 时的渲染速度（约10%）
  3. `U` 解析时若存在 `video` 或 `audio` 组件既没有 `controls` 属性也没有 `autoplay` 属性，会向控制台打印“可能不能播放”的警告
- 2019.5.20:
  1. `A` 增加支持 `source` 标签（仅限用于 `audio` 和 `video` 标签中），设置多个 `source` 的，会按顺序进行加载，加载失败的，自动加载下一条链接 [详细](#多媒体多资源加载)
  2. `U` `video` 标签增加支持 `autoplay` 和 `muted` 属性
  3. `U` `audio` 标签增加支持 `autoplay` 属性（仅允许自动播放一首音乐，若设置多首将仅自动播放第一首）
  4. `F` 修复了视频数量超过三个时，后面的视频无法播放的问题
- 2019.5.19: 
  1. `A` 增加了 `html-style` 属性，可以对整个富文本容器设置 `style` 样式，可通过 `wxml` 的数据绑定实现动态修改（直接在 `style` 中设置可能不生效） *附：0524版本中被删除*
  2. `A` 增加了 `show-with-animation` 和 `animation-duration` 属性，支持在显示时使用渐显动画 [详细](#动画显示效果)
- 2019.5.17:
  1. `A` 增加了 `bindready` 回调，渲染完成时调用 [详细](#回调函数)
  2. `A` 增加了 `binderror` 回调，解析错误或加载多媒体资源出错时调用 [详细](#回调函数)
- 2019.5.15:
  1. `F` 修复了一个页面内存在多个 `Parser` 组件时，`imgList` 被覆盖而导致预览失效的问题 [详细](https://github.com/jin-yufeng/Parser/issues/4)
  2. `F` 修复了图片设置 `float` 属性无效的问题
- 2019.5.14:
  1. `A` 增加了 `html-class` 属性，可以对整个富文本容器设置样式，包括 `display`、`margin`、`padding` 等 *附：0524版本中被删除*
  2. `D` 删除了 `scroll` 属性，默认内容宽度超出页面时允许横向滚动，如要禁止滚动可在 `html-class` 中设置 `overflow:hidden !important`
  3. `F` 修复了实体编码的空格 `&nbsb;` 在部分情况下失效的问题 [详细](https://github.com/jin-yufeng/Parser/issues/2)
- 2019.5.10:
  1. `A` 增加了 `autopause` 属性，支持选择是否允许在播放视频时自动暂停其他视频播放 [详细](#组件属性)
  2. `U` 在视频数量超过三个时，仅加载前三个，其他的由图片取代，在受到点击时再进行加载和播放，避免页面卡死 [详细](#懒加载)
  3. `U` 在完成样式匹配后移除了节点的 `class` 和 `id` 属性，减小了 `nodes` 数组的大小，加快渲染速度
- 2019.5.6:
  1. `A` 发布了后端 `node.js` 支持包 [详细](https://www.npmjs.com/package/parser-wxapp) 
  2. `U` 支持在 `Parser` 组件内加入加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏 [详细](#设置加载提示)
- 2019.4.29:
  1. `A` 增加支持将 `title` 标签中的内容设置到页面标题上，并在 `bindparse` 回调中返回（可用于转发分享）[详细](#自动设置标题)
  2. `A` 增加`scroll`属性，可以选择是否允许页面横向滚动 *附：0514版本中被删除*
  3. `U` `style` 标签中的样式支持更多匹配模式（多个并列 `.demo1,.demo2` 等，另外对于伪类、多层的以及含有@或*的将直接忽略）[详细](#匹配style标签)
  4. `F` 修复了已知 `bug`
- 2019.4.28:
  1. `U` 优化图片显示效果，对没有设置宽高的图片，按原大小显示（最大不超过100%）；设置了宽度或高度之一的，按比例进行缩放；同时设置了宽度和高度的，按设置的值进行拉伸；图片无法显示时，可以显示 `alt` 属性中的文本；但由于这些特性需要通过 `rich-text` 显示，因此取消了 `lazyload` 属性 *附：0928版本重新添加（实现方式不同）*
  2. `U` 优化了 `a` 标签的内联效果
- 2019.4.26:
  1. `A` 增加支持 `pre`, `u`, `center`, `source` 等标签 [详细](#支持丰富的标签)
  2. `A` 增加 `bindlinkpress` 回调函数，在链接受到点击时触发，开发者可以在此回调中进行进一步操作（如下载和打开文档等）[详细](#回调函数)
  3. `U` 对于不在支持列表中的标签，除个别直接移除外，都会被转为 `div` 标签，因此可以使用一些语义化标签，如 `article`, `address` 等 *附：0610版本后不在列表中的标签会被转为行内标签*
  4. `U` 提高了解析效率和渲染效率（约 `10%`）
  5. `D` 删除了 `preview` 属性，默认允许图片预览 *附：0913版本重新添加，更名为autopreview*
  6. `D` 删除了 `space` 属性，由于设置连续空格会使得标签间的空格都被显示，导致错误的效果，因此取消了这一属性；如需要显示连续空格，请使用实体编码的空格或设置 `white-space` 属性
  7. `F` 修复了已知 `bug`
- 2019.4.21：
  1. `A` 增加了 `tagStyle` 属性，支持对标签设置自定义样式 [详细](#设置默认的标签样式)
  2. `A` 发布了 `demo` 小程序 [详细](#立即体验)
  3. `U` 降低了最低基础库的要求 [详细](#基础库要求)  
  4. `F` 修复了已知 `bug`
- 2019.4.18：  
  1. `A` 增加支持 `audio` 标签 [详细](#支持丰富的标签)
  2. `A` 增加支持图片懒加载（`lazyload` 属性）*附：0428版本中被删除，0928版本重新添加*
  3. `U` 优化 `a`，`code`，`blockquote` 等标签显示效果
  4. `F` 修复了已知 `bug`
- 2019.4.16：
  1. `U` 精简插件包的大小
  2. `F` 修复已知 `bug`
- 2019.4.14：
  1. `U` `style` 标签中的样式支持按标签名匹配，如 `body{ Object }` [详细](#匹配style标签)
