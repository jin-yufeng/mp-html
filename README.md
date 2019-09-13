# Parser
微信小程序富文本插件（本文档动态更新，建议加星收藏）
## 立即体验 ##
![体验小程序](https://i.imgur.com/t3uXihW.jpg)
## 功能介绍 ##
- 支持解析`<style>`标签中的全局样式  
- 支持自定义默认的标签样式
- 支持自动设置标题  
  若`html`中存在`title`标签，将自动把`title`标签的内容设置到页面的标题上，并在回调`bindparse`中返回，可以用于转发  
- 支持添加加载提示  
  可以在`Parser`标签内添加加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏
- 支持动画显示效果  
  通过设置`show-with-animation`属性可以实现内容加载完成后渐显的动画效果
- 支持多资源加载  
  可以在`video`和`audio`中设置多个`source`标签，组件将按顺序进行加载，若前面的链接无法播放，将自动切换下一个链接进行加载和播放，直到最后一个链接；可用于解决平台差异，最大程度避免无法播放
- 支持长按复制内容  
  通过设置`selectable`属性可以实现长按复制任意内容  
- 智能压缩  
  可以智能对解析结果进行压缩，包括较小深度、去除无用的空白符等，可以有效提高性能  
- 支持的标签种类丰富，包括`视频`、`表格`等  
- 图片支持大小自适应，点击图片可以预览（预览时通过左右滑动可以查看所有图片）；对于一些装饰性的图片，可以对其设置`ignore`属性，设置后将无法预览  
- 点击`a`标签，若`href`为小程序内部页面路径，将直接跳转；若是网页链接，则可以自动复制链接（可通过`autocopy`属性控制），并在浏览器中打开；点击时将有下划线和半透明的效果，支持图片链接。链接被点击时会触发`bindlinkpress`事件，可以在该回调中进行下载附件等更多操作  
- 支持解析有序列表和无序列表（直接由`rich-text`进行显示）  
- 容错性强，稳定性高，不需要网络请求  
- 功能强大，支持无限层级，解析速度快，包大小仅约`36.9KB`（`min`版本`27.3KB`）  
  
详细可见：[功能介绍](./docs/Introduction.md)
## 使用方法 ##
1. 下载Parser文件夹至小程序目录（`Parser.min`是压缩版本，功能相同）  
   ![页面结构](https://i.imgur.com/XW4Jupv.png)
   
2. 在需要引用的页面的`json`文件中添加
   ``` json
   {
     "usingComponents": {
       "Parser":"/Parser/index"
     }
   }
   ```
3. 在需要引用的页面的`wxml`文件中添加  
   ``` html
   <Parser html="{{html}}" />
   ```
4. 在需要引用的页面的`js`文件中添加  
   ``` javascript
   onLoad:function(){
     this.setData({
       html:'your html'
     })
   }
   ```
- `demo`文件夹下的是示例小程序的源码，可供参考
- 在`mpVue`中使用：
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
- 在`Taro`中使用可参考：[Github链接](https://github.com/xPixv/Taro-ParserRichText)  
- 在`uni-app`中使用可参考：[官网-小程序组件支持](https://uniapp.dcloud.io/frame?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e7%bb%84%e4%bb%b6%e6%94%af%e6%8c%81)
- 组件属性：  

  | 属性 | 类型 | 默认值 | 必填 | 说明 |
  |:----:|:----:|:----:|:----:|:----:|
  | html | String/Object/Array | | 是 | 要显示的富文本数据，具体格式见下方说明 |
  | tag-style | Object | | 否 | 设置标签的默认样式 |
  | autocopy | Boolean | true | 否 | 是否允许链接受到点击时自动复制链接（仅限http开头的网络链接）|
  | autopause | Boolean | true | 否 | 是否允许播放视频时自动暂停其他视频 |
  | autopreview | Boolean | true | 否 | 是否允许点击图片时自动预览 |
  | autosetTitle | Boolean | true | 否 | 是否自动将title标签的内容设置到页面标题上 |
  | img-mode | String | default | 否 | 图片显示模式 |
  | selectable | Boolean | false | 否 | 是否允许长按复制内容 |
  | show-with-animation | Boolean | false | 否 | 是否使用渐显动画 |
  | animation-duration | Number | 400 | 否 | 动画持续时间 |
  
  - html格式：
    1. `string`类型：一个`html`字符串，例如：`<div>Hello World!</div>`
    2. `object`类型：一个形如`{nodes: [Array], imgList: [Array], videoNum: Number, title: "String"}`的结构体，其中nodes数组的格式基本同[rich-text](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)，对于该节点下有`img`，`video`，`a`标签的，需要将`continue`属性设置为`true`，否则将直接使用`rich-text`组件渲染，可能导致图片无法预览，链接无法点击等问题，imgList为其中所有图片地址的数组，`videoNum`是视频数量（不必要，用于`autopause`属性）`title`是页面的标题（不必要，传入将会设置到页面的标题上）回调函数`bindparser`的返回值就是这样的结构体
    3. `array`类型：格式要求同上（用此格式传入预览图片时，将`不能`通过左右滑动查看所有图片）  
    4. 使用b, c方法可以节省解析的时间，提高性能
  - 关于img-mode  
    默认`default`，在没有设置宽高时，按图片原大小显示；设置了宽或高时，按比例进行缩放；同时设置了宽高时，按设置的宽高进行缩放。在同时设置了宽高的情况下，宽度可能因为`max-width:100%`的限制而缩短导致图片变形，此时可将模式设置为`widthFix`，即保持宽度不变，高度自动变化（会导致设置的高度无效）
  - 关于tag-style  
    可以设置标签的默认样式，如`{ body:"margin:5px" }`；仅传入的`html`为`String`类型时有效（在解析过程中设置）  

- 回调函数
  
    | 名称 | 功能 | 说明 |
    |:----:|:----:|:----:|
    | bindparser | 在解析完成时调用（仅当传入的html为`字符串`时会调用） | 返回一个`object`，其中`nodes`为解析后的节点数组，`imgList`为图片列表，`title`是页面标题，该`object`可以在下次调用直接作为html属性的值，节省解析的时间 |
    | bindready | 渲染完成时调用 | 返回整个组件的`NodesRef`结构体，包含宽度、高度、位置等信息（每次`html`修改后都会触发） |
    | binderror | 出错时返回 | 解析错误或加载多媒体资源出错时调用，返回一个`object`，其中`message`为错误原因，若由于加载多媒体资源出错还会具有`target`属性，包含该标签的具体信息 |
    | bindimgtap | 在图片受到点击时调用 | 返回该图片的`src`值，可用于阻挡`onShow`的调用 |
    | bindlinkpress | 在链接受到点击时调用 | 返回该链接的`href`值，开发者可以在该回调中进行进一步操作，如下载文档和打开等 |
  
更多信息可见：[使用方法](./docs/Usage.md)

## 补丁包 ##
`patches`文件夹中准备了一些补丁包，可根据需要选用，可以实现更加丰富的功能  
- emoji  
  使用方法：将`emoji.js`复制到`Parser`文件夹下即可（若使用`min`版本也要改名为`emoji.js`）  
  大小：`4.66KB`（`min`版本`3.59KB`）  
  功能：将形如`[笑脸]`的文本解析为`emoji`小表情  
  默认配置中支持`176`个常用的`emoji`小表情  
  支持两种形式的`emoji`，一是`emoji`字符（不同设备上显示的样子可能不同），或者是网络图片（将按照`16px` × `16px`的大小显示，且不可放大预览），默认配置中都是`emoji`字符，可使用以下`api`获取或修改：  
  ```javascript
  const parserEmoji = require("path/Parser/emoji.js");
  console.log(parserEmoji.getEmoji("笑脸")); //笑脸的emoji字符
  parserEmoji.removeEmoji("笑脸"); //移除笑脸emoji
  parserEmoji.setEmoji("哈哈","https://example.png"); //设置emoji，支持emoji字符或网络图片
  ```  
  ![emoji演示](https://i.imgur.com/Uc2ZHoH.png)

## 后端解析 ##
&emsp;&emsp;本插件提供了一个配套的后端`node.js`支持包，可以提供更加强大的功能，如匹配多层的`style`，代码高亮，直接打开网址，解析`markdown`等，其返回值可以直接作为本组件的`html`属性的值；且在后端提前完成解析后可以节省解析时间，提高性能。  
**注意：该包需要node.js v7.6.0以上运行环境，无法直接在小程序前端使用，建议部署在服务器或云函数上**  
安装方法：
```npm
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

## 二次开发 ##
如需要进行二次开发，请参考[《二次开发指南》](./docs/DevelopmentGuide.md)

## 原理简介 ##
&emsp;&emsp;该插件对`rich-text`组件进行了二次封装，对于节点下有`img`, `video`, `a`标签的，使用自定义组件递归的方式显示，否则直接通过`rich-text`组件显示，这样既解决了`WxParse`中过多的标签数（`rich-text`可以节省大量的标签），层数容易不够（自定义组件递归可以显示无限层级），无法解析表格，一些组件显示格式不正确（`rich-text`可以解析出更好的效果）等缺点；也弥补了`rich-text`图片无法预览，无法显示视频，无法复制链接，部分标签不支持（在解析过程中进行替换）等缺点，另外该解析脚本还减小了包的大小，提高了解析效率，通过包装成一个自定义组件，简单易用且功能强大。  
更多可见：[《小程序富文本能力的深入研究与应用》](https://developers.weixin.qq.com/community/develop/article/doc/0006e05c1e8dd80b78a8d49f356413)

## 许可 ##
您可以随意的使用和分享本插件

## 支持 ##
![支持](https://i.imgur.com/ASMBhWI.png)

## 更新日志 ##
- 2019.9.13:
  1. `A` 增加了`emoji`补丁包（可用于解析小表情）
  2. `A` 增加了`autopreview`属性（可用于控制点击图片时是否自动预览，默认`true`）和`imgtap`事件（图片被点击时触发）
  3. `A` 提供了一个`min`版本（`27.3KB`，功能上无差别）
  3. `U` 缩小了节点深度（约`15%~35%`，主要是通过合并一些只有一个子节点的标签以及优化排版方式），优化了性能
  4. `U` 缩小了解析结果的大小（约`3%~5%`）
  5. `F` 修复了解析完成后传入的`tagStyle`会被修改的问题
  6. `F` 修复了存在多张相同`url`图片时，进行预览会出现定位错误的问题
  7. `F` 修复了部分情况下`html`中的换行符会被显示的问题
- 2019.8.22：
  1. `U` 支持了`font`标签的`size`属性
- 2019.8.21:
  1. `F` 修复了部分情况下实体编码内容无法显示的问题
- 2019.8.17:
  1. `A` 添加了在`mpVue`中使用的`demo`
  2. `F` 修复了形如`class="a b"`（多个）时样式匹配失效的问题
- 2019.8.10:
  1. `U` 优化了`a`标签的点击态效果
  2. `F` 修复了部分情况下`span`标签样式出错的问题

更多可见：[更新日志](./docs/Update.md)
