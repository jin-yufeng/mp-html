# Parser
微信小程序富文本插件（本文档动态更新，建议加星收藏）
## 立即体验 ##
![体验小程序](https://i.imgur.com/t3uXihW.jpg)
## 功能介绍 ##
- 支持解析`<style>`标签中的全局样式  
  可以按以下模式解析

  | 模式 | 举例 | 匹配 |
  |:----:|:----:|:----:|
  | 按class名匹配 | .demo | &lt;element class="demo"&gt; |
  | 按id名匹配 | #demo | &lt;element id="demo"&gt; |
  | 按标签名匹配 | body | &lt;body&gt;...&lt;/body&gt; |
  | 单层多个class | .demo1.demo2 | &lt;element class="demo1 demo2"&gt; |
  | 多个并列 | .demo1,.demo2 |&lt;element class="demo1"&gt;或&lt;element class="demo2"&gt;|

  含有@或*的，伪类以及多层的样式将被直接忽略；例如：  
	``` html
	<style>
	.demo1{
	  font-style: italic;
	}
	#demo2{
	  font-weight:bold;
	}
	p{
	  text-align:center;
	}
	</style>
	<p>
	 <span class="demo1">Hello </span>
	 <span id="demo2">World!</span>
	</p>
	```
  ![解析style](https://i.imgur.com/vL31Ykz.png)
- 支持自定义默认的标签样式
  ``` javascript
  data:{
    tagStyle:{
      code: "font-style:italic;color:#005cc5"
    }
  }
  ```
  ``` html
  <Parser html="<code>test</code>" tag-style="{{tagStyle}}" />
  ```
  ![解析自定义样式](https://i.imgur.com/MMbq7ld.png)
- 自动设置标题  
  若`html`中存在`title`标签，将自动把`title`标签的内容设置到页面的标题上，并在回调`bindparse`中返回，可以用于转发  
- 支持添加加载提示  
  可以在`Parser`标签内添加加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏，例如：
  ```html
  <Parser html="{{html}}">加载中...</Parser>
  ```
- 支持动画显示效果  
  通过设置`show-with-animation`属性可以实现内容加载完成后渐显的动画效果
  ```html
  <Parser html="{{html}}" show-with-animation animation-duration="500" />
  ```
- 支持多资源加载  
  可以在`video`和`audio`中设置多个`source`标签，组件将按顺序进行加载，若前面的链接无法播放，将自动切换下一个链接进行加载和播放，直到最后一个链接；可用于解决平台差异，最大程度避免无法播放
  ```html
  <video controls>
    <source src="demo1.mov" />
    <source src="demo2.webm" />
  </video>
  ```
- 支持长按复制内容  
  通过设置`selectable`属性可以实现长按复制任意内容  

- 支持的标签种类丰富，包括`视频`、`表格`等  
  在[`rich-text`](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)组件的基础上增加支持以下标签: 
  
  | 标签 | 属性 |
  |:---:|:---:|
  | video | src, controls, loop, autoplay, muted, height, width |
  | audio | src, controls, loop, autoplay, [poster, name, author](https://developers.weixin.qq.com/miniprogram/dev/component/audio.html) |
  | source | src |
  | u |  |
  | s |  |
  | center |  |
  | font | face, color |
  | pre |  |
  | section |  |
  | style |  |
  | body |  |

  另外，对于不在支持列表中的标签，除个别会直接移除外，都会被转换为一个行内标签，因此可以使用一些语义化标签  
  *附注：2.7.1基础库开始`rich-text`组件已经支持`section`、`center`、`u`、`s`、`font`等标签，但本插件可以实现低版本兼容*
  
- 图片支持大小自适应，点击图片可以预览（预览时通过左右滑动可以查看所有图片）；对于一些装饰性的图片，可以对其设置`ignore`属性，设置后将无法预览  

  ![解析图片](https://i.imgur.com/XG7XdRa.gif)  
- 点击`a`标签，若`href`为小程序内部页面路径，将直接跳转；若是网页链接，则可以自动复制链接（可通过`autocopy`属性控制），并在浏览器中打开；点击时将有下划线和半透明的效果，支持图片链接。链接被点击时会触发`bindlinkpress`事件，可以在该回调中进行下载附件等更多操作  
  ![解析链接](https://i.imgur.com/2pySRst.gif)
- 支持解析有序列表和无序列表（直接由`rich-text`进行显示）  
  ![解析列表](https://i.imgur.com/QYMbUkV.png)
 
- 容错性强，稳定性高，不需要网络请求  
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
 
- 功能强大，支持无限层级，解析速度快，包大小仅约`33.9KB`  
## 使用方法 ##
1. 下载Parser文件夹至小程序目录  
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
- 整个项目是示例小程序的源码，可以直接体验
- 在Taro中使用可参考：[https://github.com/xPixv/Taro-ParserRichText](https://github.com/xPixv/Taro-ParserRichText)
- 组件属性：  

  | 属性 | 类型 | 默认值 | 必填 | 说明 |
  |:----:|:----:|:----:|:----:|:----:|
  | html | String/Object/Array | | 是 | 要显示的富文本数据，具体格式见下方说明 |
  | tag-style | Object | | 否 | 设置标签的默认样式 |
  | autocopy | Boolean | true | 否 | 是否允许链接受到点击时自动复制链接（仅限http开头的网络链接）|
  | autopause | Boolean | true | 否 | 是否允许播放视频时自动暂停其他视频 |
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
    | bindlinkpress | 在链接受到点击时调用 | 返回该链接的`href`值，开发者可以在该回调中进行进一步操作，如下载文档和打开等 |
  
- 关于基础库
  
    | 版本 | 功能 | 覆盖率 |
    |:---:|:---:|:---:|
    | >=2.2.5 | 全部正常 | 99.06% |
    | 1.6.3-2.2.4 | 部分html实体无法显示 | 0.91% |
    | <1.6.6 | 无法使用 | 0.03% |
- Api 
  - `html2nodes`  
    功能：解析`html`字符串  
    参数：`html`（要解析的字符串）, `tagStyle`（默认的标签样式）  
    返回值：同`bindparse`，可作为`html`属性的参数  
    ```javascript
    const Api=require("path/Parser/api.js");
    Api.html2nodes("<div>Hello World!</div>").then(res=>{
      console.log(res);
    })
    ```   
  - `css2object`  
    功能：解析`css`字符串  
    参数：`style`（要解析的字符串）, `tagStyle`（已有的样式）  
	返回值：一个形如{key: value}的结构体，可作为`tag-style`属性的值  
    ```javascript
	const Api=require("path/Parser/api.js");
	console.log(Api.css2object(".demo{text-align:center;}"));
	//{.demo:"text-align:center;"}
    ```
  - `versionHigherThan`  
    功能：判断当前设备的基础库版本是否高于或等于输入的版本  
    参数：`version`（要比较的基础库版本号）  
    返回值：若当前设备的基础库版本高于或等于输入的版本，返回`true`，否则返回`false`  
    ```javascript
	const Api=require("path/Parser/api.js");
	console.log(Api.versionHigherThan("2.7.1"));
    ```
  - `String.splice`  
    功能：对字符串的指定位置进行删改（类似于数组的`splice`方法）  
    参数：`start`（开始修改的位置，为负数时表示倒数第几个）, `deleteCount`（要删除的字符个数）, `addStr`（要添加的字符串）  
	返回值：修改后的字符串（该方法不改变原字符串，不需要引入文件）  
    ```javascript
    var Str="Hello world!";
    Str=Str.splice(6,1,'W');
	console.log(Str);
	//Hello World
    ```
- Tips  
    - `table`, `ol`, `ul`等标签由于较难通过模板循环的方式显示，将直接通过`rich-text`进行渲染，因此请尽量避免在表格，列表中加入图片或链接，否则将无法预览或点击（但可以正常显示）  
    - 请尽量避免在一个页面中使用过多的`Parser`组件，由于每个`Parser`组件都需要对传入的`html`进行监听（改变时进行解析等操作），过多的监听器将占用较大的内存
    - 若需要自定义链接受到点击时的效果，可对`Parser/trees`文件夹下的`trees.wxss`中的`navigator-hover`进行修改（默认下划线+半透明）

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

## 更新日志 ##
- 2019.8.10:
  1. `U` 优化了`a`标签的点击态效果
  2. `F` 修复了部分情况下`span`标签样式出错的问题
- 2019.8.2:
  1. `F` 修复了部分情况下`display:flex`显示出错的问题
- 2019.7.24:
  1. `A` 增加了`autosetTitle`属性，可设置是否自动将`title`标签的值设置到页面标题上（默认`true`）
  2. `F` 修复了`margin:auto`失效的问题
- 2019.6.15:
  1. `F` 修复了部分情况下`br`标签换行格式不正确的问题
- 2019.6.10：
  1. `A` 适配了`rich-text`组件在2.7.1基础库新增加的标签，其中`big`、`small`、`mark`、`cite`、`s`等标签在低版本都可以兼容；`bdi`、`bdo`、`caption`、`rt`、`ruby`标签必须基础库2.7.1及以上才能正常显示，低版本会被转为`span`
  2. `A` 增加了`html2nodes`（解析`html`）、`css2object`（解析`css`）、`versionHigherThan`（比较和判断基础库版本）、`String.splice`（对字符串指定位置进行删改）等`api`函数
  3. `A` 增加了`img-mode`属性，可以设置为`default`或`widthFix`，设置为`widthFix`时，宽度不变，高度自动变化，可用于解决部分情况下图片变形的问题（但设置的高度会失效）
  4. `U` 优化了样式匹配的优先级：`tag-style`&lt;`style`标签&lt;内联`style`样式
  5. `F` 修复了`style`标签中`,`前后有空格时导致该样式被忽略的问题
- 2019.6.3:
  1. `A` 增加了`autocopy`属性，用于控制是否允许`a`标签受到点击时自动复制链接（仅限`http`开头的网址链接；默认`true`；接近于原`selectable`属性的功能）
  2. `U` 可以通过设置`selectable`属性控制是否允许长按复制任意内容（默认`false`)
  3. `F` 修复了`style`标签内容过长时安卓机可能出现栈溢出的问题
- 2019.6.1:
  1. `F` 修复了部分情况下`width`设置为百分比时失效的问题
- 2019.5.24:
  1. `U` 通过以自定义组件递归的方式替代了模板循环，精简包的大小至`28.1KB`，且不再受层数限制
  2. `D` 删除了`html-class`和`html-style`属性，支持直接对`Parser`标签设置`class`和`style`，默认的`display`是`block`
  3. `F` 修复了部分情况下节点的`display`和`float`可能不生效的问题
  4. `F` 修复了背景音乐无法播放的问题（设置`autoplay`），并支持对多个`audio`设置`autoplay`
- 2019.5.22:
  1. `U` `bindready`回调将返回整个组件的`NodeRef`结构体，包含了宽度、高度、位置等信息
  2. `U` 提高了传入的`html`类型为`Array`或`Object`时的渲染速度（约10%）
  3. `U` 解析时若存在`video`或`audio`组件既没有`controls`属性也没有`autoplay`属性，会向控制台打印“可能不能播放”的警告
- 2019.5.20:
  1. `A` 增加支持`source`标签（仅限用于`audio`和`video`标签中），设置多个`source`的，会按顺序进行加载，加载失败的，自动加载下一条链接
  2. `U` `video`标签增加支持`autoplay`和`muted`属性
  3. `U` `audio`标签增加支持`autoplay`属性（仅允许自动播放一首音乐，若设置多首将仅自动播放第一首）
  4. `F` 修复了视频数量超过3时，后面的视频无法播放的问题
- 2019.5.19: 
  1. `A` 增加了`html-style`属性，可以对整个富文本容器设置`style`样式，可通过`wxml`的数据绑定实现动态修改（直接在`style`中设置可能不生效）
  2. `A` 增加了`show-with-animation`和`animation-duration`属性，支持在显示时使用渐显动画
- 2019.5.17:
  1. `A` 增加了`bindready`回调，渲染完成时调用
  2. `A` 增加了`binderror`回调，解析错误或加载多媒体资源出错时调用
- 2019.5.15:
  1. `F` 修复了一个页面内存在多个`Parser`组件时，`imgList`被覆盖而导致预览失效的问题
  2. `F` 修复了图片设置`float`属性无效的问题
- 2019.5.14:
  1. `A` 增加了`html-class`属性，可以对整个富文本容器设置样式，包括`display`、`margin`、`padding`等
  2. `D` 删除了`scroll`属性，默认内容宽度超出页面时允许横向滚动，如要禁止滚动可在`html-class`中设置`overflow:hidden !important`
  3. `F` 修复了实体编码的空格`&nbsb;`在部分情况下失效的问题
- 2019.5.10:
  1. `A` 增加了`autopause`属性，支持选择是否允许在播放视频时自动暂停其他视频播放
  2. `U` 在视频数量超过3时，仅加载前3个，其他的由图片取代，在受到点击时再进行加载和播放，避免页面卡死
  3. `U` 在完成样式匹配后移除了节点的`class`和`id`属性，减小了`nodes`数组的大小，加快渲染速度
- 2019.5.6:
  1. `A` 发布了后端`node.js`支持包 
  2. `U` 支持在`Parser`组件内加入加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏
- 2019.4.29:
  1. `A` 增加支持将`title`标签中的内容设置到页面标题上，并在`bindparse`回调中返回（可用于转发分享）
  2. `A` 增加`scroll`属性，可以选择是否允许页面横向滚动
  3. `U` `style`标签中的样式支持更多匹配模式（包括单层多个`.demo1.demo2`和多个并列`.demo1,.demo2`等，另外对于伪类、多层的以及含有@或*的将直接忽略）
  4. `F` 修复了已知`bug`
- 2019.4.28:
  1. `U` 优化图片显示效果，对没有设置宽高的图片，按原大小显示（最大不超过100%）；设置了宽度或高度之一的，按比例进行缩放；同时设置了宽度和高度的，按设置的值进行拉伸；图片无法显示时，可以显示`alt`属性中的文本；但由于这些特性需要通过`rich-text`显示，因此取消了`lazyload`属性
  2. `U` 优化了`a`标签的内联效果
- 2019.4.26:
  1. `A` 增加支持`pre`, `u`, `center`, `source`等标签
  2. `A` 增加`bindlinkpress`回调函数，在链接受到点击时触发，开发者可以在此回调中进行进一步操作（如下载和打开文档等）
  3. `U` 对于不在支持列表中的标签，除个别直接移除外，都会被转为`div`标签，因此可以使用一些语义化标签，如`article`, `address`等
  4. `U` 提高了解析效率和渲染效率（约`10%`）
  5. `D` 删除了`preview`属性，默认允许图片预览
  6. `D` 删除了`space`属性，由于设置连续空格会使得标签间的空格都被显示，导致错误的效果，因此取消了这一属性；如需要显示连续空格，请使用实体编码的空格或设置`white-space`属性
  7. `F` 修复了已知`bug`
- 2019.4.21：
  1. `A` 增加了`tagStyle`属性，支持对标签设置自定义样式
  2. `A` 发布了`demo`小程序
  3. `U` 降低了最低基础库的要求  
  4. `F` 修复了已知`bug`
- 2019.4.18：  
  1. `A` 增加支持`audio`标签
  2. `A` 增加支持图片懒加载（`lazyload`属性）
  3. `U` 优化`a`，`code`，`blockquote`等标签显示效果
  4. `F` 修复了已知`bug`
- 2019.4.16：
  1. `U` 精简插件包的大小
  2. `F` 修复已知`bug`
- 2019.4.14：
  1. `U` `style`标签中的样式支持按标签名匹配，如`body{ Object }`
