## 使用方法 {docsify-ignore}##
### 插件包说明 ###

| 名称 | 大小 | 使用 |
|:---:|:---:|:---:|
| [Parser](https://github.com/jin-yufeng/Parser/tree/master/Parser) | 42.3KB | 微信小程序插件包 |
| [Parser.min](https://github.com/jin-yufeng/Parser/tree/master/Parser.min) | 30.3KB | 微信小程序插件包压缩版（功能相同） |
| [Parser.bd](https://github.com/jin-yufeng/Parser/tree/master/Parser.bd) | 40.1KB | 百度小程序插件包 |
| [Parser.bd.min](https://github.com/jin-yufeng/Parser/tree/master/Parser.bd.min) | 29.0KB | 百度小程序插件包压缩版（功能相同） |
| [Parser.uni](https://github.com/jin-yufeng/Parser/tree/master/Parser.uni) | 56.8KB | `uni-app` 插件包（可以编译到所有平台） |

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
| html | String/Object/Array | | 是 | 要显示的富文本数据，具体格式见下方说明 | - |
| tag-style | Object | {} | 否 | 设置标签的默认样式 | [20190421](/changelog#v20190421) |
| autocopy | Boolean | true | 否 | 是否允许链接受到点击时自动复制链接（仅限 http 开头的网络链接）| [20190603](/changelog#v20190603) |
| autopause | Boolean | true | 否 | 是否允许播放视频时自动暂停其他视频 | [20190510](/changelog#v20190510) |
| autopreview | Boolean | true | 否 | 是否允许点击图片时自动预览 | [20190913](/changelog#v20190913) |
| autosetTitle | Boolean | true | 否 | 是否自动将 title 标签的内容设置到页面标题上 | [20190724](/changelog#v20190724) |
| domain | String |  | 否 | 主域名，设置后将给图片地址自动拼接上主域名或协议名 | [20191202](/changelog#v20191202) |
| img-mode | String | default | 否 | 图片显示模式 | [20190610](/changelog#v20190610) |
| lazy-load | Boolean | false | 否 | 是否开启图片懒加载 | [20190928](/changelog#v20190928) |
| selectable | Boolean | false | 否 | 是否允许长按复制内容 | [20190603](/changelog#v20190603) |
| show-with-animation | Boolean | false | 否 | 是否使用渐显动画 | [20190519](/changelog#v20190519) |
| animation-duration | Number | 400 | 否 | 动画持续时间 | [20190519](/changelog#v20190519) |
| use-anchor | Boolean | false | 否 | 是否使用页面内锚点 | [20191202](/changelog#v20191202) |
  
- `html` 格式：
  1. `String` 类型：一个 `html` 字符串，例如：`<div>Hello World!</div>`
  2. `Object` 类型：一个结构体构体；其中 `nodes` 属性为一个数组，格式基本同 [rich-text](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)，对于该节点下有 `img`，`video`，`a` 标签的，需要将 `continue` 属性设置为 `true`，否则将直接使用 `rich-text` 组件渲染，可能导致图片无法预览，链接无法点击等问题；`imgList` 属性是其中所有图片地址的数组；`title` 属性是页面的标题（不必要，传入将会设置到页面的标题上）；回调函数 `bindparser` 的返回值就是这样的结构体
  3. `Array` 类型：格式要求同上（用此格式传入预览图片时，将 `不能` 通过左右滑动查看所有图片）  
  
  ?> `html` 传入 `Object` 或 `Array` 可以节省解析的时间，提高性能

- 关于 `img-mode`  
  默认 `default`，在没有设置宽高时，按图片原大小显示；设置了宽或高时，按比例进行缩放；同时设置了宽高时，按设置的宽高进行缩放。在同时设置了宽高的情况下，宽度可能因为 `max-width:100%` 的限制而缩短导致图片变形，此时可将模式设置为 `widthFix`，即保持宽度不变，高度自动变化（会导致设置的高度无效）

- 关于 `tag-style`  
  可以设置标签的默认样式，形如 `{标签名：样式}` 的结构体，例如 `{ body:"margin:5px" }` 表示给`body`标签设置默认的边距效果

- 关于 `use-anchor` 和锚点  
  设置锚点：给标签加上 `id` 属性即可（部分标签可能不支持，如遇，请弃用）  
  跳转锚点：  
  1. 通过 `a` 标签跳转  
     `a` 标签的 `href` 属性设置为 `#id` 即可，在按下时将自动跳转到锚点所在位置，`href` 设置为 `#` 时将跳转到**插件**的顶部（自动跳转的前提是锚点存在且 `use-anchor` 属性设置为 `true`）  
  2. 通过获取组件实例手动跳转  
     可在页面中通过 `this.selectComponent("#id").navigateTo({id, success, fail})` 实现手动跳转，`id` 是要跳转的锚点的 `id`（不加 `#`，为空时将跳转到插件顶部），`success` 和 `fail` 为成功和失败回调。此函数**必须在** `ready` 回调及以后才能使用；此函数没有设置 `use-anchor` 时也可以使用，但**只能**跳转到通过组件递归显示的节点（如图片等，其他被 `rich-text` 显示的节点是找不到的）  
  
  示例代码可见 [设置锚点](/features#设置锚点)

  !>将 `use-anchor` 设置成 `true` 会把所有设置了 `id` 的标签都通过组件递归的方式暴露出来而不是直接通过 `rich-text` 显示，这将一定程度上增加标签数，减慢渲染速度，如非必要，不建议使用  

!>`tag-style`、`domain` 和 `use-anchor` 属性仅传入的 `html` 为 `String` 类型时有效（在解析过程中设置）；`uni-app` 包编译到 `H5` 时 `domain` 属性无效（浏览器自动获取 `domain`） 

### 回调函数 ###

| 名称 | 功能 | 说明 |
|:----:|----|----|
| bindparser | 在解析完成时调用（仅传入的 html 类型为 String 时调用） | 返回一个 object，其中 nodes 为解析后的节点数组，imgList 为图片列表，title 是页面标题，该 object 可以在下次调用直接作为 html 属性的值，节省解析的时间 |
| bindready | 渲染完成时调用 | 返回整个组件的 NodesRef 结构体，包含宽度、高度、位置等信息（每次 html 修改后都会触发） |
| binderror | 出错时调用 | 返回一个 object，其中 source 是错误来源（ad 广告出错、video 视频加载出错、audio 音频加载出错、parse 解析过程中出错），errMsg 为错误信息，errCode 是错误代码（仅ad），target 包含出错标签的具体信息 |
| bindimgtap | 在图片受到点击时调用 | 返回一个形如 {id, src, ignore} 的结构体，src 是图片链接；在回调函数中调用 ignore 函数将不进行预览；可用于阻挡 onShow 的调用 |
| bindlinkpress | 在链接受到点击时调用 | 返回一个形如 {href, ignore} 的结构体（href 是链接地址），开发者可以在该回调中进行进一步操作，如下载文档和打开等；在回调函数中调用 ignore 将不自动跳转/复制 |  
  
>关于图片和链接被点击返回的 `ignore` 函数的解释：类似于 `a` 标签 `onclick` 回调返回 `false` 将不跳转一样，由于 `event` 无法获取返回值，故增加此函数，若在回调函数中执行，则不自动进行预览/跳转/复制链接操作，可执行自定义操作（这两个回调函数应尽量简短）  

```javascript
linkpress(e){
  if(e.detail.href == "xxx")
    e.detail.ignore(); // 此链接不进行自动跳转/复制
  // 自定义操作
}
```

!>原生包所有回调函数的返回值从 `e.detail` 中获取  

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

!>通过这种方式引入的样式会对所有 `parser` 标签生效，如果是对单个 `parser` 使用的样式，请使用 `style` 标签；另外，这种方式引入的样式优先级最低  

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
  `4.79KB`  

!>此补丁包**仅能**在微信小程序中使用  

- 使用方法  
  1. 将 `list` 文件夹复制到 `Parser` 文件夹下  
  2. 将 `trees.li.wxml` 中的内容复制到 `Parser/trees/trees.wxml` 中 `wx:if="{{Handler.notContinue(item)}}"` 的 `block` 中的任意位置
  3. 在 `Parser/trees/handler.wxs` 中的 `notContinue` 函数中进行如下修改  
     ```javascript
     // if(item.name=='a')
     if(item.name=='a'||item.name=='li'||item.name=='ol'||item.name=='ul')
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
  
>对于 `ol` 标签，`type` 为阿拉伯数字（默认）时没有数量限制；为字母时最多包含26个子项；为罗马数字时最多包含20个子项

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
| .class::before | .demo::before | &lt;element class="demo" ::before&gt; |
| .class::after | .demo::after | &lt;element class="demo" ::after&gt; |

- 大小（与原大小相比增加）  
  `3.75KB`（`min` 版本：`2.14KB`）  
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

## 原理简介 ##
&emsp;&emsp;本插件对 `rich-text` 组件进行了二次封装，对于节点下有 `img`, `video`, `a` 标签的，使用自定义组件递归的方式显示，否则直接通过 `rich-text` 组件显示，这样既解决了 `WxParse` 中过多的标签数（`rich-text` 可以节省大量的标签），层数容易不够（自定义组件递归可以显示无限层级），无法解析表格，一些组件显示格式不正确（`rich-text` 可以解析出更好的效果）等缺点；也弥补了 `rich-text` 图片无法预览，无法显示视频，无法复制链接，部分标签不支持（在解析过程中进行替换）等缺点，另外该解析脚本还减小了包的大小，提高了解析效率，通过包装成一个自定义组件，简单易用且功能强大。  
更多可见：[《小程序富文本能力的深入研究与应用》](https://developers.weixin.qq.com/community/develop/article/doc/0006e05c1e8dd80b78a8d49f356413)

## 许可与支持 ##
- 许可  
  您可以随意的使用和分享本插件 [MIT License](https://github.com/jin-yufeng/Parser/blob/master/LICENSE)  
- 支持  
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
4. 表格和列表中的图片/链接无法点击  
   由于表格和列表较难模拟，将直接通过 `rich-text` 显示，因此其中的图片和链接将无法点击  
   *解决方案：*列表可以通过引入 [List补丁包](#List) 解决（仅能用于微信原生包）；表格由于 `colspan` 和 `rowspan` 无法模拟，目前只有 `rich-text` 能够有最佳的显示效果；请尽量避免在其中使用图片或链接，否则将无法点击  

5. 关于 `img`  
   本插件用 `rich-text` 中的 `img` 显示图片而不是用 `image` 组件，原因在于 `img` 更贴近于 `html` 中图片的显示模式：在没有设置宽高时，自动按原大小显示；设置了宽或高时，按比例进行缩放；同时设置了宽高时，按设置的值显示。若用 `image` 组件实现这样的效果需要较为复杂的处理，且需要多次 `setData`，影响性能。  
   但也因此会存在一些问题，如 `img` 加载失败时没有 `error` 回调、无法使用 `lazy-load`（目前已通过其他方式实现）、无法使用微信小程序中的 `show-menu-by-longpress`（长按识别小程序码，但在预览时可以）等

6. 关于编辑器  
   本插件没有专门配套的富文本编辑器，一般来说，能够导出 `html` 的富文本编辑器都是支持的；另外本插件仅支持显示富文本，没有编辑功能  
  
7. 部分 `style` 标签中的样式无法被匹配  
   本插件并不是支持所有的选择器，请留意支持的选择器类型，如果用了不支持的选择器，该样式将被忽略  
  
8. 不能正确显示一些网站的问题  
   很多网站的内容是在 `js` 脚本中动态加载的，这些内容在本插件解析中将被直接忽略；本插件并不能替代 `web-view` 的功能，仅建议用于富文本编辑器编辑的富文本或简单的静态网页  

### 反馈问题 ###
在反馈问题前，请先通过以下方式尝试解决：  
1. 在 [常见问题](#常见问题) 中查找是否有此问题
2. 在 [issues](https://github.com/jin-yufeng/Parser/issues) 中查找是否有相同问题
3. 使用 [示例项目](https://github.com/jin-yufeng/Parser/tree/master/demo) 或微信小程序 [富文本插件](/features#案例体验) 中的自定义测试尝试是否也会出现相同的问题  
4. 在下框中输入 `html` 字符串进行测试（即直接用浏览器进行渲染，若也存在问题，请检查样式）  
  <textarea id="input" style="width:100%;height:200px" placeholder="请输入字符串"></textarea>
  <button onclick="parse()">解析</button>
  <button onclick="reset()" style="margin-left:10px">清空</button>
  <iframe id="frame" style="height:200px"></iframe>  

如果以上方式无法解决问题，可通过以下方式反馈  
1. 在 `Github` 上 [提出 issue](https://github.com/jin-yufeng/Parser/issues/new/choose)，请注意按照模板要求详细描述问题  
2. 在微信小程序 [富文本插件](#立即体验) 中的疑问解答 - 联系客服中联系我，请**直接发送相关问题**，发送无意义内容将不会回复  

!>由于客服平台不能发送文件，可将有问题的 `html` 代码贴到 [链接](https://paste.ubuntu.com/)  

