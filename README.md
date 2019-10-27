# Parser
小程序富文本插件（本文档动态更新，建议加星收藏）
## 目录 ##
- [功能介绍](#功能介绍)
- [使用方法](#使用方法)
  - [插件包说明](#插件包说明)
  - [在原生框架中使用](#在原生框架中使用)
  - [在uni-app中使用](#在uni-app中使用)
  - [在mpVue中使用](#在mpVue中使用)
  - [在taro中使用](https://github.com/xPixv/Taro-ParserRichText)
  - [在wepy中使用](#在wepy中使用)
  - [组件属性](#组件属性)
  - [回调函数](#回调函数)
  - [使用外部样式](#使用外部样式)
- [补丁包](#补丁包)
  - [emoji](#emoji)
  - [document](#document)
  - [List](#List)
  - [CssHandler](#CssHandler)
- [立即体验](#立即体验)
- [后端解析](#后端解析)
- [二次开发](./docs/DevelopmentGuide.md)
- [原理简介](#原理简介)
- [许可与支持](#许可与支持)
- [更新日志](#更新日志)
## 功能介绍 ##
- 支持解析`style`标签中的全局样式  
  可以把`style`标签里的样式匹配到各标签的`style`中  
- 支持自定义默认的标签样式  
  可以在`tag-style`属性中设置各标签的默认效果  
- 支持自动设置标题  
  若存在`title`标签，将自动把`title`标签的内容设置到页面的标题上  
- 支持添加加载提示  
  可以在`Parser`标签内添加加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏
- 支持动画显示效果  
  通过设置`show-with-animation`属性可以实现内容加载完成后渐显的动画效果  
- 支持多资源加载  
  可以在`video`和`audio`中设置多个`source`标签，组件将按顺序进行加载，若前面的链接无法播放，将自动切换下一个链接进行加载和播放，直到最后一个链接；可用于解决平台差异，最大程度避免无法播放
- 支持长按复制内容  
  通过设置`selectable`属性可以实现长按复制任意内容  
- 智能压缩  
  可以智能对解析结果进行压缩，包括减小深度、去除无用的空白符等，可以有效提高性能  
- 支持丰富的标签  
  在`rich-text`组件的基础上，增加支持大量标签，基本覆盖所有常用标签  
- 图片显示效果  
  支持自动按原大小显示，点击图片可以预览（预览时通过左右滑动可以查看所有图片）；对于一些装饰性的图片，可以对其设置`ignore`属性，设置后将无法预览  
- 链接点击效果  
  点击`a`标签，若`href`为小程序内部页面路径，将直接跳转；若是网页链接，则可以自动复制链接；链接被点击时会触发`bindlinkpress`事件，可以在该回调中进行下载附件等更多操作  
- 视频效果  
  支持视频自动懒加载（当视频数量超过`3`个时，仅先加载前`3`个，避免页面卡死）；支持播放一个视频时自动暂停其他视频  
- 支持解析各类列表  
  可以显示各类复杂的列表结构  
- 性能指标  
  容错性强，稳定性高，不需要网络请求，支持无限层级，解析速度快，轻量化  
  
详细可见：[功能介绍](./docs/Introduction.md)
## 使用方法 ##
### 插件包说明 ##

| 名称 | 大小 | 使用 |
|:---:|:---:|:---:|
| Parser | 39.7KB | 微信小程序插件包 |
| Parser.min | 28.3KB | 微信小程序插件包压缩版（功能相同） |
| Parser.bd | 36.5KB | 百度小程序插件包 |
| Parser.bd.min | 26.5KB | 百度小程序插件包压缩版（功能相同） |
| Parser.uni | 46.4KB | `uni-app` 插件包（可以编译到所有平台） |

- 关于百度版与微信版的差别，可见[百度版与微信版的差别](./docs/Usage.md#百度版与微信版的差别)  
- `uni-app`版因为各平台`rich-text`和自定义组件表现有所不同，有较多条件编译的内容，编译后大小会缩小，关于各平台间的差别和与原生包的差别，可见[`uni-app`包说明](./docs/Usage.md#uni-app包说明)  
- 可根据需要选用，使用时建议统一更名为`Parser`，以下**统称**为`Parser`  

### 在原生框架中使用 ###
1. 下载`Parser`文件夹至小程序目录  
2. 在需要引用的页面的`json`文件中添加（百度小程序中组件名一定要**小写**）
   ``` json
   {
     "usingComponents": {
       "parser":"/Parser/index"
     }
   }
   ```
3. 在需要引用的页面的`wxml`文件中添加  
   ``` html
   <parser html="{{html}}" />
   ```
4. 在需要引用的页面的`js`文件中添加  
   ``` javascript
   data: {
     html:"<div>Hello World!</div>"
   }
   ```
- `demo/wx`文件夹下的是微信小程序 `富文本插件` 示例程序的源码，可供参考  
### 在uni-app中使用 ###
- 使用`uni-app`包（可以编译到所有小程序平台）  
  1. 下载`Parser.uni`包到`components`目录下（更名为`Parser`）  
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
  - 可以直接通过插件市场引入：[插件市场](https://ext.dcloud.net.cn/plugin?id=805)
  - `demo/uni-app`文件夹下是一个示例程序，可供参考  
- 使用原生包  
  参考[官网-小程序组件支持](https://uniapp.dcloud.io/frame?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e7%bb%84%e4%bb%b6%e6%94%af%e6%8c%81)
### 在mpVue中使用 ###
1. 下载`Parser`文件夹至`static`目录下
2. 在`src`目录下需要使用本插件的页面文件夹下添加`json`文件
   ```json
   {
       "usingComponents": {
           "parser": "../../static/Parser/index"
       }
   }
   ```
3. 在需要使用的页面的`vue`文件中添加
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
- **注意：** 在`mpvue`和`uni-app`中使用时组件名必须**小写** 
 
### 在wepy中使用 ###
测试版本：V1.7.3
1. 将`Parser`文件夹复制到`/src/components`目录下  
   （也可以直接复制到`/dist/components`目录下，这样`wepy`不会对插件包进行编译和压缩）    
2. 在需要使用的页面的`wpy`文件中添加
   ```vue
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
3. 通过`wepy build --watch`命令进行编译  
- 如果出现`Components not found`错误，则用`wepy build --no-cache --watch`命令清理缓存，重新编译  
  

### 组件属性 ###  

  | 属性 | 类型 | 默认值 | 必填 | 说明 |
  |:----:|:----:|:----:|:----:|----|
  | html | String/Object/Array | | 是 | 要显示的富文本数据，具体格式见下方说明 |
  | tag-style | Object | | 否 | 设置标签的默认样式 |
  | autocopy | Boolean | true | 否 | 是否允许链接受到点击时自动复制链接（仅限http开头的网络链接）|
  | autopause | Boolean | true | 否 | 是否允许播放视频时自动暂停其他视频 |
  | autopreview | Boolean | true | 否 | 是否允许点击图片时自动预览 |
  | autosetTitle | Boolean | true | 否 | 是否自动将title标签的内容设置到页面标题上 |
  | img-mode | String | default | 否 | 图片显示模式 |
  | lazy-load | Boolean | false | 否 | 是否开启图片懒加载 |
  | selectable | Boolean | false | 否 | 是否允许长按复制内容 |
  | show-with-animation | Boolean | false | 否 | 是否使用渐显动画 |
  | animation-duration | Number | 400 | 否 | 动画持续时间 |
  
  - html格式：
    1. `string`类型：一个`html`字符串，例如：`<div>Hello World!</div>`
    2. `object`类型：一个形如`{nodes: [Array], imgList: [Array], title: "String"}`的结构体，其中`nodes`数组的格式基本同[rich-text](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)，对于该节点下有`img`，`video`，`a`标签的，需要将`continue`属性设置为`true`，否则将直接使用`rich-text`组件渲染，可能导致图片无法预览，链接无法点击等问题，`imgList`为其中所有图片地址的数组，`title`是页面的标题（不必要，传入将会设置到页面的标题上），回调函数`bindparser`的返回值就是这样的结构体
    3. `array`类型：格式要求同上（用此格式传入预览图片时，将`不能`通过左右滑动查看所有图片）  
    4. 使用b, c方法可以节省解析的时间，提高性能
  - 关于img-mode  
    默认`default`，在没有设置宽高时，按图片原大小显示；设置了宽或高时，按比例进行缩放；同时设置了宽高时，按设置的宽高进行缩放。在同时设置了宽高的情况下，宽度可能因为`max-width:100%`的限制而缩短导致图片变形，此时可将模式设置为`widthFix`，即保持宽度不变，高度自动变化（会导致设置的高度无效）
  - 关于tag-style  
    可以设置标签的默认样式，如`{ body:"margin:5px" }`；仅传入的`html`为`String`类型时有效（在解析过程中设置）  

### 回调函数 ###

| 名称 | 功能 | 说明 |
|:----:|----|----|
| bindparser | 在解析完成时调用（仅当传入的`html`为`String`时会调用） | 返回一个`object`，其中`nodes`为解析后的节点数组，`imgList`为图片列表，`title`是页面标题，该`object`可以在下次调用直接作为`html`属性的值，节省解析的时间 |
| bindready | 渲染完成时调用 | 返回整个组件的`NodesRef`结构体，包含宽度、高度、位置等信息（每次`html`修改后都会触发） |
| binderror | 出错时调用 | 返回一个`object`，其中`source`是错误来源（`ad`广告出错、`video`视频加载出错、`audio`音频加载出错、`parse`解析过程中出错），`errMsg`为错误信息，`errCode`是错误代码（仅`ad`），`target`包含出错标签的具体信息 |
| bindimgtap | 在图片受到点击时调用 | 返回一个形如`{src:...}`的结构体（`src`是图片链接），可用于阻挡`onShow`的调用 |
| bindlinkpress | 在链接受到点击时调用 | 返回一个形如`{href:...}`的结构体（`href`是链接地址），开发者可以在该回调中进行进一步操作，如下载文档和打开等 |  
  
更多信息可见：[使用方法](./docs/Usage.md)

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
注意事项：  
1. 由于只有自定义组件内的样式在组件内能生效且`rich-text`在组件内使用时也只能匹配组件内的样式，所以必须在`trees`组件的`wxss`/`css`文件中引入需要的样式，在页面中写的样式无效  
2. 组件内只能使用`class`选择器（支持后代选择器），不支持`id`选择器、属性选择器、标签名选择器等（更多可见[官网说明](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html)）  
3. 通过这种方式引入的样式会对所有`parser`标签生效，如果是对单个`parser`使用的样式，请使用`style`标签  

## 补丁包 ##
`patches`文件夹中准备了一些补丁包，可根据需要选用，可以实现更加丰富的功能  

### emoji ###  
- 功能  
  将形如`[笑脸]`的文本解析为`emoji`小表情  
- 大小  
  `4.70KB`（`min`版本`3.61KB`）  
- 使用方法  
  将`emoji.js`复制到`Parser`文件夹下即可（若使用`min`版本也要改名为`emoji.js`）  
  默认配置中支持`177`个常用的`emoji`小表情  
  支持两种形式的`emoji`，一是`emoji`字符（不同设备上显示的样子可能不同），或者是网络图片（将按照`16px` × `16px`的大小显示，且不可放大预览），默认配置中都是`emoji`字符，可使用以下`api`获取或修改：  
  ```javascript
  const parserEmoji = require("path/Parser/emoji.js");
  console.log(parserEmoji.getEmoji("笑脸")); //笑脸的emoji字符
  parserEmoji.removeEmoji("笑脸"); //移除笑脸emoji
  parserEmoji.setEmoji("哈哈","https://example.png"); //设置emoji，支持emoji字符或网络图片
  ```  
  ![emoji演示](https://i.imgur.com/Uc2ZHoH.png)  
### document ###  
- 功能  
  实现类似于`web`中的`document`对象，可以动态操作`DOM`  
- 大小  
  `4.66KB`（`min`版本`3.61KB`）  
- 使用方法  
  将`document.js`复制到`Parser`文件夹下即可（若使用`min`版本也要改名为`document.js`）  
  - `document` 类  
    获取方式：可通过 `this.selectComponent("#id").document` 获取  
    `Api`列表:   

    | 名称 | 输入值 | 返回值 | 功能 |
    |:---:|:---:|:---:|:---:|
    | getElementById | id | element | 按照`id`查找`element` |
    | getChildren | i | element | 获取根节点的第`i`个子节点的`element`实例 | 
  - `element` 类  
    属性名：

    | 名称 | 功能 |
    |:---:|---|
    | id | 该节点的id值 |
    | nodes | 该节点的结构体，可以直接对这个结构体进行修改（修改后需要调用`update`方法同步到`UI`，修改时要注意格式，更建议使用下方的`api`方法进行修改） |

    `Api`列表：

    | 名称 | 输入值 | 返回值 | 功能 |
    |:---:|:---:|:---:|:---:|
    | getText |   | text | 获取文本内容（仅直接包含文本的标签可用） |
    | setText | text |   | 修改文本内容（仅直接包含文本的标签可用） |
    | addChildren | nodes, i |   | 在第`i`个位置添加子节点，`nodes`为一个结构体，格式同`rich-text` |
    | removeChildren | i |   | 移除第`i`个子节点 |
    | getChildren | i |   | 获取第`i`个子节点的`element`示例 |
    | getAttr | key | attr | 获取某个属性值 |
    | setAttr | key, value |   | 设置某个属性值 |
    | getElementById | id | element | 在子节点中按照`id`查找`element` |
    | update |   |   | 若修改了`element.nodes`需要调用此方法同步到`UI` |

  - 返回格式  
    若执行成功，返回`{ok:true, data:...}`；若不成功，返回`{ok:false, errCode:..., errMsg:...}`  
    错误码

    | 错误码 | 含义 |
    |:---:|:---:|
    | 1 | 对没有直接包含`text`的标签执行`getText`或`setText` |
    | 2 | 输入值类型不正确 |
    | 3 | 输入值超出范围 |
    | 4 | 无法找到对应`id`的节点 |

- 注意事项  
  所有方法必须在`html`被`setData`完成后才能调用  
  每次执行除了`get`以外的方法都需要进行一次局部的`setData`更新，请不要过于频繁的调用，否则可能影响性能。
- 综合示例  
  ```html
  <Parser id="article" html="{{html}}" binderror="error" />
  ```
  ``` javascript
  data:{
    html:'...<div id="adContainer"><ad unit-id="..."></ad></div>...'
  }
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
  在原插件中，由于列表较难通过模拟实现，是直接使用`rich-text`来显示列表，这导致列表中的图片无法预览，链接无法点击，此补丁包可以解决这个问题  
- 功能  
  模拟`ol`、`ul`、`li`标签  
  `ol`标签支持`start`和`type`属性；`ul`标签会自动根据层级显示不同的样式  
- 大小  
  `4.50KB`  
- 此补丁包**仅能**在微信小程序中使用  
- 使用方法  
  1. 将`list`文件夹复制到`Parser`文件夹下  
  2. 将`trees.li.wxml`中的内容复制到`Parser/trees/trees.wxml`中`name`为`element`的`template`中的任意位置
  3. 在`Parser/trees/handler.wxs`中的`isContinue`函数中进行如下修改  
     ```javascript
     // else if(item.name=='a')
     else if(item.name=='a'||item.name=='li'||item.name=='ol'||item.name=='ul')
     ```
  4. 在`Parser/trees/trees.json`中添加
     ```json
     "usingComponents": {
       "trees": "./trees",
       "ol": "../list/ol",
       "ul": "../list/ul",
       "li": "../list/li"
     }
     ```  
  5. 将`Parser/DomHandler.js`中`trustTag`结构体的`ol`、`ul`、`li`属性值改为`1`  
  - 可参考`demo`文件夹中的`Parser`（已装载此补丁包）  
- 在其他页面中使用  
  该包将列表封装成自定义组件，可以直接在其他页面上使用  
  1. 在需要使用的页面的`json`文件中添加
     ```json
     {
       "usingComponents": {
         "ol": "/Parser/list/ol",
         "ul": "/Parser/list/ul",
         "li": "/Parser/list/li"
       }
     }
     ```
  2. 可以直接使用`ol`、`ul`、`li`标签来显示列表  
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
     ![列表演示](https://i.imgur.com/xgCAdzj.png)
### CssHandler ###
- 功能：支持更多的`css`选择器  
  原插件包支持的选择器：

  | 模式 | 举例 | 匹配 |
  |:----:|:----:|:----:|
  | 按class名匹配 | .demo | &lt;element class="demo"&gt; |
  | 按id名匹配 | #demo | &lt;element id="demo"&gt; |
  | 按标签名匹配 | body | &lt;body&gt;...&lt;/body&gt; |
  | 单层多个class | .demo1.demo2 | &lt;element class="demo1 demo2"&gt; |
  | 多个并列 | .demo1,.demo2 |&lt;element class="demo1"&gt;或&lt;element class="demo2"&gt;|

  使用本补丁包后**增加**支持的选择器：

  | 模式 | 匹配的标签 | 说明 |
  |:---:|:---:|:---:|
  | * | 所有 | 通配符 |
  | .demo1 .demo2 | &lt;element class="demo1"&gt;<br />...<br />&ensp;&ensp;&ensp;&ensp;&lt;element class="demo2"&gt; | 后代选择器 |
  | .demo1>.demo2 | &lt;element class="demo1"&gt;<br />&ensp;&ensp;&ensp;&ensp;&lt;element class="demo2"&gt; | 子选择器 |

- 大小（与原大小相比增加）  
  `3.04KB`（`min`版本：`1.71KB`）  
- 使用方法  
  用`CssHandler`文件夹下的`CssHandler.js`（若使用`min`版本也要改名为`CssHandler.js`）替换原插件包下的`CssHandler.js`即可
- 注意事项  
  使用该补丁包后会一定程度上减慢解析速度，如非必要不建议使用  

## 立即体验 ##
![体验小程序](https://i.imgur.com/t3uXihW.jpg)  

## 后端解析 ##
&emsp;&emsp;本插件提供了一个配套的后端`node.js`支持包，可以提供更加强大的功能，如匹配多层的`style`，代码高亮，直接打开网址，解析`markdown`等，其返回值可以直接作为本组件的`html`属性的值；且在后端提前完成解析后可以节省解析时间，提高性能。  
**注意：该包需要node.js v7.6.0以上运行环境，无法直接在小程序前端使用，建议部署在服务器或云函数上**  
在百度小程序和头条小程序中使用时需要将`options`中的`setContain`设置为`true`    
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
&emsp;&emsp;该插件对`rich-text`组件进行了二次封装，对于节点下有`img`, `video`, `a`标签的，使用自定义组件递归的方式显示，否则直接通过`rich-text`组件显示，这样既解决了`WxParse`中过多的标签数（`rich-text`可以节省大量的标签），层数容易不够（自定义组件递归可以显示无限层级），无法解析表格，一些组件显示格式不正确（`rich-text`可以解析出更好的效果）等缺点；也弥补了`rich-text`图片无法预览，无法显示视频，无法复制链接，部分标签不支持（在解析过程中进行替换）等缺点，另外该解析脚本还减小了包的大小，提高了解析效率，通过包装成一个自定义组件，简单易用且功能强大。  
更多可见：[《小程序富文本能力的深入研究与应用》](https://developers.weixin.qq.com/community/develop/article/doc/0006e05c1e8dd80b78a8d49f356413)

## 许可与支持 ##
您可以随意的使用和分享本插件  
![支持](https://i.imgur.com/ASMBhWI.png)  


## 更新日志 ##
- 2019.10.27:
  1. `F` 修复了部分情况下多张相同的图片仅第一张可显示的问题  
- 2019.10.24:
  1. `U` `uni-app`包支持在`APP`端使用  
- 2019.10.17:
  1. `A` 增加了`CssHandler`补丁包（可支持多层的`css`选择器）[详细](#CssHandler)  
  2. `U` `uni-app`包支持在`H5`端使用  
- 2019.9.28:
  1. `A` 增加了`lazy-load`属性（可用于图片懒加载）  
- 2019.9.25:
  1. `A` 增加了`uni-app`插件包（可以编译到所有小程序平台）[详细](#在uni-app中使用)    
  2. `F` 修复了部分情况下样式显示错误的问题  
- 2019.9.22:
  1. `U` 支持引入`wxss` / `css`文件中的外部样式 [详细](#使用外部样式)  
- 2019.9.21:
  1. `A` 增加了百度小程序插件包 [详细](#插件包说明)  
  2. `U` 为与百度小程序包统一，所有事件的返回值改为`object`类型（影响`bindimgtap`和`bindlinkpress`） [详细](#回调函数)  
  3. `U` 优化了补丁包的引入方式
  4. `F` 修复了`autopause`属性在某些情况下会失效的问题  
- 2019.9.18:
  1. `A` 增加了在`wepy`中的使用方法 [详细](#在wepy中使用)  
  2. `F` 修复了部分情况下`style`标签解析时由于缺少`;`导致错误样式匹配失败的问题
  2. `F` 修复了`0917`版本中`a`标签失效的问题  
- 2019.9.17:
  1. `A` 增加了`list`补丁包（可用于模拟列表） [详细](#List)  
  2. `A` `video`组件增加支持`unit-id`属性（前插视频广告）  
  3. `F` 修复了部分情况下图片会被`text-indent`错误缩进的问题  
- 2019.9.15:
  1. `A` 增加了`document`补丁包（可用于动态操作`DOM`） [详细](#document) 
  2. `A` 增加支持小程序广告`ad`组件（可显示文中广告）  

更多可见：[更新日志](./docs/Update.md)
