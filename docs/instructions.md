## 使用方法 {docsify-ignore} ##
### 插件包说明 ###

| 名称 | 大小 | 使用 |
|:---:|:---:|:---:|
| [Parser](https://github.com/jin-yufeng/Parser/tree/master/Parser) | 48.4KB | 微信小程序插件包 |
| [Parser.min](https://github.com/jin-yufeng/Parser/tree/master/Parser.min) | 32.5KB | 微信小程序插件包压缩版（功能相同） |
| [Parser.uni](https://github.com/jin-yufeng/Parser/tree/master/Parser.uni) | 62.9KB | `uni-app` 插件包（可以编译到所有平台） |

各平台差异（主要指 `uni-app` 包）：
1. `a` 标签 `autocopy` 属性的表现效果：`H5` 中将直接跳转对应网页；小程序和 `APP` 中将复制链接；`APP` 中建议在 `@linkpress` 回调中跳转到 `web-view` 页面（可参考示例项目）  
2. 仅微信小程序、`QQ` 小程序、`APP`、`H5` 支持 `lazy-load` 属性  
3. 百度、支付宝小程序不支持 `gesture-zoom` 属性  
4. `ad` 标签的 `id` 属性在 `app` 中是 `adpid`，微信、头条、`QQ` 小程序中是 `unit-id`，百度小程序中是 `apid`    
5. 支付宝小程序、`H5`、`APP` 没有 `versionHigherThan` 的 `api`  
6. 支付宝小程序不支持 `autopause` 属性  
7. 仅微信小程序支持 `ruby`、`bdi`、`bdo` 标签及 `audio` 标签的 `autoplay` 属性  

!>百度原生插件包可以从过去的版本中获取（`20191215` 后不再维护）  

!>`uni-app` 包为解决平台差异使用了较多条件编译的内容，编译到各平台后会变小  
需要使用 `HBuilderX 2.2.5` 及以上版本编译，且必须使用自定义组件模式

!>表格由于较难通过模板循环的方式显示，将直接通过 `rich-text` 进行渲染，因此请尽量避免在表格中加入图片或链接，否则将无法预览或点击（但可以正常显示）  

> 若需要自定义链接受到点击时的效果，可对 `Parser/trees` 文件夹下的 `trees.wxss` 中的 `navigator-hover` 进行修改（默认下划线+半透明）

以下统称为 `Parser`  

### 打包工具 ###
本插件提供了一个打包工具（`pack.jar` 是可执行文件，`pack.java` 是源代码），可以按需生成需要的插件包  
![打包工具](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md7.png?sign=0e1d048ea91f4154a0a53ab55b45e4ca&t=1579784564)

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
  1. 下载 [Parser](#插件包说明) 文件夹到 `components` 目录下（更名为 `jyf-parser`）  
  2. 在需要使用页面的`vue`文件中添加  
     ```vue
     <template>
       <view>
         <jyf-parser :html="html"></jyf-parser>
       </view>
     </template>
     <script>
     import parser from "@/components/jyf-parser/jyf-parser"; // HbuilderX 2.5.5 及以上可以不需要
     export default{
       // HbuilderX 2.5.5 及以上可以不需要
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
  
  >可以直接通过插件市场引入：[插件市场](https://ext.dcloud.net.cn/plugin?id=805)
  
  > [demo/uni-app](https://github.com/jin-yufeng/Parser/tree/master/demo/uni-app) 文件夹下是一个示例程序，可供参考 
 
- 使用原生包  
  参考 [官网-小程序组件支持](https://uniapp.dcloud.io/frame?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e7%bb%84%e4%bb%b6%e6%94%af%e6%8c%81)

### 在其他框架中使用 ###
在 `mpVue`、`wepy` 等框架中**没有专用包**，但也可以引入原生包使用  

#### 在mpVue中使用 ####
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
 
#### 在wepy中使用 ####
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

!>如果出现 `Components not found` 错误，则用 `wepy build --no-cache --watch` 命令清理缓存，重新编译  

#### 在taro中使用 ####
由 [@xPixv](https://github.com/xPixv) 提供，请参考：  
[Github链接](https://github.com/xPixv/Taro-ParserRichText)  
[Taro物料市场](https://taro-ext.jd.com/plugin/view/5d35903e9b6a1d4027780154)

### 组件属性 ###  

| 属性 | 类型 | 默认值 | 必填 | 说明 | 添加日期 |
|:----:|:----:|:----:|:----:|----|:---:|
| html | String/Array | | 是 | 要显示的富文本数据，格式同 [rich-text](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html) | - |
| tag-style | Object | {} | 否 | 设置标签的默认样式 | [20190421](/changelog#_20190421) |
| autocopy | Boolean | true | 否 | 是否允许链接受到点击时自动复制链接（仅限 http 开头的网络链接）| [20190603](/changelog#_20190603) |
| autopause | Boolean | true | 否 | 是否允许播放视频时自动暂停其他视频 | [20190510](/changelog#_20190510) |
| autopreview | Boolean | true | 否 | 是否允许点击图片时自动预览 | [20190913](/changelog#_20190913) |
| autosetTitle | Boolean | true | 否 | 是否自动将 title 标签的内容设置到页面标题上 | [20190724](/changelog#_20190724) |
| domain | String |  | 否 | 主域名，设置后将给图片地址自动拼接上主域名或协议名 | [20191202](/changelog#_20191202) |
| gesture-zoom | Boolean | false | 否 | 是否开启双击缩放 | [20200212](/changelog#_20200212) |
| img-mode | String | default | 否 | 图片显示模式 | [20190610](/changelog#_20190610) |
| lazy-load | Boolean | false | 否 | 是否开启图片懒加载 | [20190928](/changelog#_20190928) |
| selectable | Boolean | false | 否 | 是否允许长按复制内容 | [20190603](/changelog#_20190603) |
| show-with-animation | Boolean | false | 否 | 是否使用渐显动画 | [20190519](/changelog#_20190519) |
| use-anchor | Boolean | false | 否 | 是否使用页面内锚点 | [20191202](/changelog#_20191202) |
| use-cache | Boolean | false | 否 | 是否使用缓存，设置后将对解析结果进行缓存，下次打开不用重复解析 | [20191215](/changelog#_20191215) |
  
说明：  
- 关于 `html`  
  - 传入的格式为 `array` 时，与 `rich-text` 唯一不同的地方在于对于该节点下有图片、视频等需要通过组件递归方式显示的标签时，需要将该标签的 `c(continue)` 属性设置为 `1`，否则将直接使用 `rich-text` 显示，可能导致图片链接无法点击、视频无法显示等问题  
    
  - 如果传入没有设置 `continue` 的数组（区分方式是查看 `html[0].PoweredBy` 是否等于 `Parser`），插件也会自动进行设置，并同时处理 `tag-style`、`domain`、`use-anchor` 等一些属性的效果。因此可以传入和 `rich-text` 完全相同的数组，但会产生额外的性能开销  
    
  - 传入 `array` 比 `string` 的效率高，因为不需要进行解析  

- 关于 `tag-style`  
  可以设置标签的默认样式，形如 `{标签名：样式}` 的结构体，例如 `{ img: "display:block" }` 表示给`img` 标签设置默认的块级标签效果  

- 关于 `img-mode`  
  默认 `default`，在没有设置宽高时，按图片原大小显示；设置了宽或高时，按比例进行缩放；同时设置了宽高时，按设置的宽高进行缩放。在同时设置了宽高的情况下，宽度可能因为 `max-width:100%` 的限制而缩短导致图片变形，此时可将模式设置为 `widthFix`，即保持宽度不变，高度自动变化（会导致设置的高度无效）

- 关于 `use-anchor` 和锚点  
  设置锚点：给标签加上 `id` 属性即可（部分标签可能不支持，如遇，请弃用）  
  跳转锚点：  
  1. 通过 `a` 标签跳转  
     `a` 标签的 `href` 属性设置为 `#id` 即可，在按下时将自动跳转到锚点所在位置，`href` 设置为 `#` 时将跳转到**插件**的顶部（自动跳转的前提是锚点存在且 `use-anchor` 属性设置为 `true`）  
  2. 通过获取组件实例手动跳转  
     此方法没有设置 `use-anchor` 时也可以使用，但**只能**跳转到通过组件递归显示的节点（如图片等，其他被 `rich-text` 显示的节点是找不到的），具体见 [navigateTo](#navigateTo)  
  
  示例代码可见 [设置锚点](/features#设置锚点)

  !>将 `use-anchor` 设置成 `true` 会把所有设置了 `id` 的标签都通过组件递归的方式暴露出来而不是直接通过 `rich-text` 显示，这将一定程度上增加标签数，减慢渲染速度，如非必要，不建议使用  

- 关于 `use-cache`  
  设置为 `true` 时将对解析结果进行缓存，在一个应用生命周期内多次打开，不需要重复解析，可以节省时间，建议对可能多次打开的内容设置缓存（有极低概率可能发生 `hash` 碰撞，即修改内容后没有重新解析，依然读取旧的缓存，如遇，请弃用；可以通过 `getApp().parserCache` 管理缓存）  

### 回调函数 ###

| 名称 | 触发时间 | 说明 |
|:----:|:----:|----|
| parse | 在解析完成时触发 | 返回解析结果（一个 nodes 数组，仅传入的 html 类型为 String 时会触发），可以对该结果进行自定义修改，将在渲染时生效 |
| ready | 渲染完成时触发 | 返回 boundingClientRect 的查询结果（包含宽高、位置等信息） |
| error | 出错时触发 | 返回一个 object，其中 source 是错误来源，errMsg 为错误信息，errCode 是错误代码，target 包含出错标签的具体信息，context 是视频的 context 对象，可以设置新的源 |
| imgtap | 在图片受到点击时触发 | 返回一个 object，其中 src 是图片链接，ignore 是一个函数，在回调函数中调用将不进行预览；可用于阻挡 onShow 的调用 |
| linkpress | 在链接受到点击时触发 | 返回一个 object，其中包含了被点击的 a 标签的所有属性，ignore 是一个函数，在回调函数中调用后将不自动跳转/复制；可在该回调中进行下载文档等进一步操作 |  
  
>关于图片和链接被点击返回的 `ignore` 函数的解释：类似于 `a` 标签 `onclick` 回调返回 `false` 将不跳转一样，由于 `event` 无法获取返回值，故增加此函数，若在回调函数中执行，则不自动进行预览/跳转/复制链接操作，可执行自定义操作（这两个回调函数应尽量简短）  

```javascript
linkpress(e){
  if(e.detail.href == "xxx")
    e.detail.ignore(); // 此链接不进行自动跳转/复制
  // 自定义操作
}
```

!>原生包所有回调函数的返回值从 `e.detail` 中获取  

!>原生包的回调函数以 `bind` 或 `catch` 开头，如 `bindready`；`uni-app` 包的回调函数以 `@` 开头，如 `@ready`  

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

!>通过这种方式引入的样式会对所有 `parser` 标签生效，如果是对单个 `parser` 使用的样式，请使用 `style` 标签；另外，这种方式引入的样式优先级最低  

!>`uni-app` 包编译到 `H5` 时这种样式无效，请使用 `style` 标签  

### 配置项 ###

| 配置项 | 作用 |
|:---:|:---:|
| trustTags | 信任的标签列表 |
| blockTags | 块级标签列表 |
| ignoreTags | 移除的标签列表 |
| selfClosingTags | 自闭合的标签列表 |
| userAgentStyles | 默认的样式 |
| highlight | [高亮处理函数](#处理代码高亮) |
| LabelAttrsHandler | 标签属性处理函数 |
| trustAttrs | 信任的属性 |

?>配置项在 `/libs/config.js` 中配置，对所有 `parser` 标签生效

!>不在信任的属性列表中的属性将被移除  
不在信任的标签列表中的标签，除被移除的标签外，块级标签列表中的标签将被转为 `div` 标签，其他被转为 `span` 标签

### 长内容处理 ###
如果富文本内容特别长，通过 `setData` 无法设置或者有超出 `1000` 个标签，可以采用微信官方提供的 [长列表组件](https://developers.weixin.qq.com/miniprogram/dev/extended/component-plus/recycle-view.html) 进行处理（需要将内容拆分成多个章节，且需要提供每个章节的高度），这里提供一个简单的示例  
```wxml
<recycle-view batch="{{batchSetRecycleData}}" id="recycleId">
  <recycle-item wx:for="{{recycleList}}" wx:key="id">
      <parser html="{{item.content}}" />
  </recycle-item>
</recycle-view>
```
```javascript
const createRecycleContext = require('miniprogram-recycle-view')
Page({
  onReady: function() {
    this.ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: this.itemSizeFunc
    })
    // 这里设置了 100 个章节，每个章节高度为 500px
    var longarray = [];
    for (var i = 1; i <= 100; i++) {
      longarray.push({
        id: "section" + i,
        content: "<div style='width:100vw;height:500px;display:flex;justify-content:center;align-items:center'>section" + i + "</div>"
      })
    }
    this.ctx.append(longarray)
  },
  itemSizeFunc: function(item, idx) {
    // 可以给不同章节设置不同的高度
    return {
      width: this.ctx.transformRpx(750),
      height: 500
    }
  }
})
```
```json
{
  "usingComponents": {
    "recycle-view": "/miniprogram_npm/miniprogram-recycle-view/recycle-view",
    "recycle-item": "/miniprogram_npm/miniprogram-recycle-view/recycle-item",
    "parser": "/Parser/index"
  }
}
```

>大段文本可以先通过 [parseHtml](#parseHtml) 解析成数组再进行拆分  

!>拆分成多个 `parser` 标签后预览时不能直接通过左右滑动查看所有图片，如果需要可以获取组件实例并修改 `component.data.imgList`

### 基础库要求 ###
微信小程序：
  
| 版本 | 功能 | 覆盖率 |
|:---:|:---:|:---:|
| >=2.2.5 | 全部正常 | 99.19% |
| 1.9.3-2.2.4 | 不支持个别 html 实体 | 0.68% |
| 1.6.3-1.9.2 | 不支持个别 html 实体<br>不支持 lazy-load 属性 | 0.05% |
| <1.6.6 | 无法使用 | 0.05% |

!>使用 `uni-app` 包编译到微信小程序时要求基础库 `2.3.0` 及以上  

!>百度小程序基础库版本 `3.60`（客户端版本 `11.9`）以下的可能无法正常显示  

### Api ### 

#### getText ####
功能：获取富文本中的所有文本内容  
输入值：`whiteSpace`，设置成 `true` 时遇到块级标签会自动添加一个换行符，增强可读性（默认 `true`）  
使用方法：
```wxml
<parser id="article" html="{{html}}" bindready="ready"></parser>
```
```javascript
ready(e){
  console.log(this.selectComponent("#article").getText());
}
```

#### navigateTo ####
功能：跳转到指定的锚点  
输入值：一个 `object`，`id` 为锚点的 `id`（为空时将跳转到组件顶部），`success` 和 `fail` 是成功和失败的回调（需要配合 `use-anchor` 属性使用）  
使用方法：  
```wxml
<parser id="article" html="{{html}}" use-anchor bindready="ready"></parser>
```
```javascript
data:{
  html: "<div id='test'></div>"
},
ready(e){
  this.selectComponent("#article").navigateTo({
    id: "test",
    success: console.log,
    fail: console.error
  })
}
```

#### getVideoContext ####
功能：获取组件中视频的 `context` 对象，可以操控视频的播放  
输入值：`video` 标签的 `id`（没有设置 `id` 时会被自动设置为 `video + i`，不输入返回一个包含所有视频的数组）  
使用方法：
```wxml
<parser id="article" html="{{html}}" bindready="ready"></parser>
```
```javascript
ready(e){
  // 返回 id=test 的 video 标签的 context，不存在则返回 null
  console.log(this.selectComponent("#article").getVideoContext("test"))
}
```

#### imgList ####
功能：获取所有图片数组，可用于转发图的封面等（注意：这是一个**属性**，不是一个函数）  
另外，该数组提供了一个 `each` 方法，功能与数组的 `forEach` 基本相同，但可以通过 `return` 改变数组中的值；该数组用于图片的预览，因此可以在 `img` 的 `src` 中使用缩略图，再将此数组中的地址改为原图，即可实现预览时查看大图的效果（设置时若与数组中已存在的元素重复，将自动通过改变域名大小写的方式去重，避免在预览时出现定位错误）  
使用方法：
```wxml
<parser id="article" html="{{html}}" bindready="ready"></parser>
```
```javascript
ready(e){
  var imgList = this.selectComponent("#article").imgList;
  var cover = imgList[0]; // 将第一张图作为转发用的封面
  imgList.each((src, i, arr)=>{
    console.log(src);
    /* 通过 return 可以修改原数组，没有 return 时不修改
       可以将缩略图的链接修改为原图的链接，在预览时会自动使用 */
    return src.replace("thumb","");
  })
}
```

#### setContent ####
功能：解析并渲染 `html` 内容（功能上同 `html` 属性）  
说明：当 `html` 为字符串类型时，该字符串并不能直接在视图层进行渲染，而是在插件内部完成解析后再次 `setData` 并进行渲染的，因此，对字符串类型的 `html` 进行 `setData` 是没有必要的，会带来不必要的性能开销  
输入值：`html` 为具体的字符串，`options` 可以设置其他的属性（可选）  

使用方法：
```wxml
<parser id="article"></parser>
```
```javascript
var html = "<div>Hello World!</div>";
var tagStyle = {
  div: "text-align: justify"
};
/* 以下代码等价于
this.setData({
  html,
  tagStyle
})
但通过 setData 会带来不必要的性能开销 */
this.selectComponent("#article").setContent(html, {
  tagStyle
})
```

!>以上 `api` 都需要获取组件实例来调用，可以通过 `this.selectComponent` 获取（在 `uni-app` 中可以通过 `ref` 获取），但必须在 `ready` 回调之后使用（除了 `setContent`）  

```vue
<!--vue中获取组件实例的示例-->
<template>
  <view>
    <parser ref="article" @ready="ready"></parser>
  </view>
</template>
<script>
export default {
  method:{
    ready(){
      console.log(this.$refs.article.getText());
    }
  }
}
</script>
```

#### parseHtml ####  
功能：解析 `html` 字符串  
输入值：第一个参数为 `html` 字符串；第二个参数为 `options`（包括 `tagStyle`, `domain`, `useAnchor`)  
返回值：一个 `nodes` 数组，可以作为 `html` 属性的值或 `rich-text` 组件 `nodes` 属性的值  
```javascript
const MpHtmlParser = require("/Parser/libs/MpHtmlParser.js");
// 异步方法
MpHtmlParser.parseHtml("<div>Hello World!</div>").then(res=>{
  console.log(res);
});
// 同步方法
console.log(MpHtmlParser.parseHtmlSync("<div>Hello World!</div>"));
```

#### parseCss ####  
功能：解析 `css` 字符串  
输入值：一个 `css` 字符串  
返回值：一个形如 `{key: value}` 的结构体，可以作为 `tag-style` 属性的值  
```javascript
const CssHandler = require("/Parser/libs/CssHandler.js");
console.log(new CssHandler().parseCss(".test{text-align:center}")); //{".demo":"text-align:center"}
```

#### versionHigherThan ####  
功能：比较当前基础库版本是否高于输入版本  
输入值：一个基础库版本  
返回值：若当前基础库版本高于或等于输入值，返回 `true`；否则，返回 `false`  
```javascript
const versionHigherThan = require("/Parser/libs/config.js").versionHigherThan;
console.log(versionHigherThan("2.7.1"));
```

## 补丁包 ##
[patches](https://github.com/jin-yufeng/Parser/tree/master/patches) 文件夹中准备了一些补丁包，可根据需要选用，可以实现更加丰富的功能  
> 可以通过 [打包工具](#打包工具) 打包需要的插件包  

### emoji ###  
- 功能  
  将形如 `[笑脸]` 的文本解析为 `emoji` 小表情  
- 大小  
  `4.35KB`（`min` 版本 `3.22KB`）  
- 使用方法  
  将 `emoji.js` 复制到 `libs` 文件夹下即可（若使用 `min` 版本也要改名为 `emoji.js`）  
  
  !>在 uni-app 中使用时需要将 libs/MpHtmlParser.js 首行改为 const emoji = require('./emoji.js');  
  
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
  `4.78KB`（`min` 版本 `3.74KB`）  
- 使用方法  
  将 `document.js` 复制到 `libs` 文件夹下即可（若使用 `min` 版本也要改名为 `document.js`）  
  
  !>在 uni-app 中使用时需要将 index.vue 中的 33 行修改为 const Document = require('./libs/document.js');  
  
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
| getStyle | key | style | 获取某个样式的值 |
| setStyle | key, value | 设置某个样式的值 |
| getElementById | id | element | 在子节点中按照 id 查找 element |
| update |   |   | 若修改了 element.nodes 需要调用此方法同步到 UI |

返回格式：  
对于 `get` 类的方法，获取成功则返回获取到的值，否则返回 `null`；对于 `set` 类的方法，设置成功返回 `true`，否则返回 `false`  
  
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
  if (e.detail.source == "ad") {
    var document = this.selectComponent("#article").document;
    var adContainer = document.getElementById("adContainer");
    if (adContainer)
      adContainer.setStyle("display", "none");
  }
}
```
    
### CssHandler ###
- 功能：支持更多的 `css` 选择器  
  
使用本补丁包后**增加**支持的选择器（原包支持的选择器可见 [链接](#匹配style标签)）：

| 选择器 | 举例 | 匹配 |
|:---:|:---:|:---:|
| * | * | 所有 |
| .class .class | .demo1 .demo2 | &lt;element class="demo1"&gt;<br />...<br />&ensp;&ensp;&ensp;&ensp;&lt;element class="demo2"&gt; |
| .class>.class | .demo1>.demo2 | &lt;element class="demo1"&gt;<br />&ensp;&ensp;&ensp;&ensp;&lt;element class="demo2"&gt; |
| .class::before | .demo::before | &lt;element class="demo" ::before&gt; |
| .class::after | .demo::after | &lt;element class="demo" ::after&gt; |

- 大小（与原大小相比增加）  
  `4.65KB`（`min` 版本：`3.08KB`）  
- 使用方法  
  用 `CssHandler` 文件夹下的 `CssHandler.js`（若使用 `min` 版本也要改名为 `CssHandler.js`）替换原插件包下的 `CssHandler.js` 即可

!>使用该补丁包后会一定程度上减慢解析速度，如非必要不建议使用  


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

## 原理和二次开发 ##

### 原理简介 ###  
本插件对于节点下有 图片 链接 视频 等特殊标签的，通过 `trees` 组件递归显示，否则直接通过 `rich-text` 组件显示，通过这样的方式，既可以充分利用 `rich-text` 渲染效果好，效率高的优点，也解决了 `rich-text` 屏蔽所有事件的问题，同时通过一些特殊处理，可以实现更加丰富的功能。  
详细可见：[小程序富文本能力的深入研究与应用](https://developers.weixin.qq.com/community/develop/article/doc/0006e05c1e8dd80b78a8d49f356413)  

### 流程图 ###
- 解析过程流程图  
  ![解析流程图](https://6874-html-foe72-1259071903.tcb.qcloud.la/%E8%A7%A3%E6%9E%90%E6%B5%81%E7%A8%8B%E5%9B%BE.jpg?sign=e56509c626c1466e4fc61128f784acbc&t=1575800648)  
  
- 渲染过程流程图  
  ![渲染流程图](https://6874-html-foe72-1259071903.tcb.qcloud.la/%E6%B8%B2%E6%9F%93%E6%B5%81%E7%A8%8B%E5%9B%BE.jpg?sign=3a3b10fe783bc068ad5f6800badf4f14&t=1575800687)  

### 添加一个自定义标签 ###  
1. 在 `config.js` 中的 `trustAttrs` 中添加需要用到的属性（否则将被移除）  
2. 在 `config.js` 中的 `trustTags` 中添加该标签名（否则将被转为 `span`）  
3. 在 `config.js` 中的 `LabelAttrHandler` 中添加  
   ```javascript
   case "element":     // 标签名
     bubbling(Parser); // 对该标签所有祖先节点添加一个标记，使得该标签不被 rich-text 包含，而是通过 trees 组件递归显示其祖先节点
     // 如果还需要自定义处理某些属性也可以在这里添加
     break;
   ```  
4. 在 `trees.wxml` 中添加该组件  
   ```wxml
   <element wx:elif="{{item.name=='element'}}" xxx="{{item.attrs.xxx}}">
     <!--如果该标签内部还有其他节点还需要在这里添加一个 trees 标签-->
   </element>
   ```
5. 如果有使用自定义组件或插件需要在 `trees.json` 中声明（可选）  
  
### 添加自定义事件 ### 
为节省大小，默认情况下仅支持 `img` 和 `a` 标签的点击事件，如果还需要其他事件，可以自行在 `trees.wxml` 中绑定和处理  

!> 如果给除 `img`、`a`、`video`、`audio` 外的标签添加事件，还需要在 `config.js` 中的 `LabelAttrHandler` 中添加  
```javascript
case "element":     // 标签名
  bubbling(Parser); // 对该标签所有祖先节点添加一个标记，使得该标签不被 rich-text 包含，而是通过 trees 组件递归显示其祖先节点
  break;
```

### 处理代码高亮 ###  
本插件给代码高亮留有一个接口，在 `config.js` 的 `highlight` 函数，默认为 `null`，如有需要可自行实现此函数。高亮处理函数的输入值有两个，第一个是 `pre` 标签的内容，第二个是该 `pre` 标签的属性列表（可以记录语言信息等），返回值是高亮处理后的 `html` 文本  
示例（以 [prismjs](https://prismjs.com/) 为例）：

```html
<pre lan="c">int a;
a = 3;</pre>
```

1. 下载需要的 `prism.js` 和 `prism.css` 至 `libs` 目录（`css` 更名为 `wxss`）  
2. 在 `config.js` 的 `trustAttrs` 中添加 `lan`（标记语言信息）
3. 在 `config.js` 中实现 `highlight` 函数
   ```javascript
   // config.js
   const Prism = require('./prism.js');
   module.exports = {
     // 高亮处理函数
     highlight(content, attrs) {
       var lan = attrs.match(/lan\s*=\s*["'](.*?)["']/);
       if (!lan)
         return content; // 没有设置语言
       lan = lan[1];
       switch (lan) {
         case "javascript":
         case "js":
           return Prism.highlight(content, Prism.languages.javascript, "javascript");
         case "html":
           return Prism.highlight(content, Prism.languages.html, "html");
         case "css":
           return Prism.highlight(content, Prism.languages.css, "css");
         case "c":
         case "cpp":
           return Prism.highlight(content, Prism.languages.clike, "clike");
         default:
           return content;
       }
     },
     ...
   }
   ```
4. 在 `trees.wxss` 中引入样式
   ```css
   /* trees/trees.wxss */
   @import '../libs/prism.wxss';
   ```
5. 其中部分不支持的选择器（标签名选择器）可以通过 [tag-style](/features#设置默认的标签样式) 属性引入  
  
最终效果：  
![高亮效果](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md8.png?sign=e613714b597ceb1fa6d5b802a54fd246&t=1581226152)

## 许可与支持 ##
- 许可  
  您可以随意的使用和分享本插件 [MIT License](https://github.com/jin-yufeng/Parser/blob/master/LICENSE)  
- 支持  
  ![支持](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md6.png?sign=24395ad7572c19464db67d8997e3b2d2&t=1574502139)  

## 问题反馈 ##
### 常见问题 ###

#### 图片变形问题 ####  
图片变形一般是由于对 `img` 标签同时设置了 `width` 和 `height`，由于 `max-width:100%` 的限制，宽度被缩小但高度不变导致了变形  
  
*解决方案：* 将 `img-mode` 属性设置成 `widthFix`，图片会根据设置的宽度，高度自适应，可解决图片的变形问题，但设置的高度会失效  
  
*相关 issue：*[#7](https://github.com/jin-yufeng/Parser/issues/7)

#### 图片间隙问题 ####
多张图片连续排列时，由于 `img` 的默认 `display` 是 `inline-block`，每张图片的底部会有空隙，如果不需要，可以对该 `img` 设置 `display:block` 或者 `float:left`  
  
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
   通过以下方法可以对所有图片生效（所有 `parser` 组件中的图片），必须写在 `trees.wxss` 中，其他写法可能均不能生效（不推荐）
   ```css
   ._img {
     font-size:0;
     display:block !important;
   }
   ```  
  
*相关 issue：*[#25](https://github.com/jin-yufeng/Parser/issues/25)、[#65](https://github.com/jin-yufeng/Parser/issues/65)、[#74](https://github.com/jin-yufeng/Parser/issues/74)

#### 图片懒加载问题 ####  
部分情况下，可能出现懒加载无效的问题，可以检查是否存在以下问题  
1. 懒加载的属性名是 `lazy-load` 或 `lazyLoad` 而不是 `lazyload`  
2. 图片懒加载仅对当前视图以下 `1000px` 以外的图片才有效，请确认文章是否有这么长  
3. 文章全是图片或有很多图片  
   图片开始加载的时候，高度会变为 0，然后逐步增加到原大小，这时后面的图片就会进入懒加载的范围而被加载，直到前面图片加载完的部分高度超过懒加载的阈值范围后才会停止加载，因此如果图片很多或全是图片可能一次加载过多图片。这时可以给 `img` 设置一个 `min-height`（可以设置为所有图片高度的最小值），可以一定程度上解决这个问题。
   ```css
   /* trees.wxss
      也可以通过 style 标签或 tag-style 属性设置
   */
   ._img {
     min-height: 225px;
   }
   ```  
4. 所有图片或很多图片都在一个 `div` 内  
   为节省 `setData` 的次数，懒加载以一个 `div` 为单位，即一个 `div` 内所有图片一次性加载，而不是每张图片都需要进行一次 `setData`，因此如果一个 `div` 里有过多 `img` 也会一次性加载，如果需要单独加载需要给 `img` 套上一个 `div`  

#### 云文件 ID 问题 ####  
默认情况下不支持云文件 ID 链接（`cloud://`）
    
*解决方案：*  
如果需要使用，可以通过以下代码进行转换（会一定程度上增加解析时间）
```javascript
// 假设 html 为需要进行解析的字符串
var cloudUrls = html.match(/cloud:\/\/[^'">\)\s]*/g);
wx.cloud.getTempFileURL({
  fileList: cloudUrls,
  success: (res) => {
    for(var i = 0; i < cloudUrls.length; i++) {
      if (res.fileList[i].tempFileURL)
        html = html.replace(cloudUrls[i], res.fileList[i].tempFileURL);
    }
    // 将 html 传给本插件
    this.setData({
      html
    })
  },
  fail: (err) => {
    console.error(err)
    this.setData({
      html
    })
  }
})
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
  
*相关 issue：*[#6](https://github.com/jin-yufeng/Parser/issues/6)、[#44](https://github.com/jin-yufeng/Parser/issues/44)、[#50](https://github.com/jin-yufeng/Parser/issues/50)、[#66](https://github.com/jin-yufeng/Parser/issues/66)

#### 其他问题 ####
1. 关于换行符  
   `html` 中换行只能使用 `br` 标签，其他的包括 `↵`, `\n` 等都是无效的，只会原样显示  
   *解决方案：*可自行通过正则替换  
   ```javascript
   // 以↵为例
   html = html.replace(/↵/g,""); // 移除所有↵
   html = html.replace(/↵/g,"<br />") // 全部替换为 br 标签
   ```
2. 表格的图片/链接无法点击  
   表格由于 `colspan` 和 `rowspan` 无法模拟，目前只有 `rich-text` 能够有最佳的显示效果；请尽量避免在其中使用图片或链接，否则将无法点击  

3. 关于 `img`  
   本插件用 `rich-text` 中的 `img` 显示图片而不是用 `image` 组件，原因在于 `img` 更贴近于 `html` 中图片的显示模式：在没有设置宽高时，自动按原大小显示；设置了宽或高时，按比例进行缩放；同时设置了宽高时，按设置的值显示。若用 `image` 组件实现这样的效果需要较为复杂的处理，且需要多次 `setData`，影响性能。  
   但也因此会存在一些问题，如 `img` 加载失败时没有 `error` 回调、无法使用 `lazy-load`（目前已通过其他方式实现）、无法使用微信小程序中的 `show-menu-by-longpress`（长按识别小程序码，但在预览时可以）等

4. 关于 `markdown`  
   插件本身不支持 `markdown`，如果需要可先自行通过 `markdown` 库转为 `html` 后再进行解析和显示，其中一些标签的默认样式可以放在 `tag-style` 属性中  

5. 关于编辑器  
   本插件没有专门配套的富文本编辑器，一般来说，能够导出 `html` 的富文本编辑器都是支持的；另外本插件仅支持显示富文本，没有编辑功能  
   *相关 issue：*[#10](https://github.com/jin-yufeng/Parser/issues/10)
  
6. 部分 `style` 标签中的样式无法被匹配  
   本插件并不是支持所有的选择器，请留意支持的选择器类型，如果用了不支持的选择器，该样式将被忽略  
  
7. 不能正确显示一些网站的问题  
   很多网站的内容是在 `js` 脚本中动态加载的，这些内容在本插件解析中将被直接忽略（包括 `iframe` 视频）；本插件并不能替代 `web-view` 的功能，仅建议用于富文本编辑器编辑的富文本或简单的静态网页  

### 反馈问题 ###
在反馈问题前，请先通过以下方式尝试解决：  
1. 检查是否使用的是最新版的插件包  
2. 在 [常见问题](#常见问题) 中查找是否有此问题  
3. 在 [issues](https://github.com/jin-yufeng/Parser/issues) 中查找是否有相同问题  
4. 使用 [示例项目](https://github.com/jin-yufeng/Parser/tree/master/demo) 或微信小程序 [富文本插件](/features#案例体验) 中的自定义测试尝试是否也会出现相同的问题  
5. 在下框中输入 `html` 字符串进行测试（即直接用浏览器进行渲染，若也存在问题，请检查样式）  
  <textarea id="input" style="width:100%;height:200px" placeholder="请输入字符串"></textarea>
  <button onclick="parse()">解析</button>
  <button onclick="reset()" style="margin-left:10px">清空</button>
  <iframe id="frame" style="height:200px"></iframe>  

如果以上方式无法解决问题，可通过以下方式反馈  
1. 在 `Github` 上 [提出 issue](https://github.com/jin-yufeng/Parser/issues/new/choose)，请注意按照模板要求详细描述问题  
2. 在微信小程序 [富文本插件](#立即体验) 中的疑问解答 - 联系客服中联系我，请**直接发送相关问题**，发送无意义内容将不会回复  

!>由于客服平台不能发送文件，可将有问题的 `html` 代码贴到 [链接](https://paste.ubuntu.com/)  

