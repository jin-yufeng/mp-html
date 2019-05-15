# Parser
微信小程序富文本插件（本文档动态更新，建议加星收藏）
## 立即体验 ##
![体验小程序](http://bmob-cdn-17111.b0.upaiyun.com/2019/04/27/e0290fef409d5baa803d3ed551f10d49.jpg)
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
  ![解析style](http://bmob-cdn-17111.b0.upaiyun.com/2019/04/27/d7c003d7404e2d278049ab62f8c0cf88.png)
- 支持自定义默认的标签样式
  ``` javascript
  data:{
    tagStyle:{
      code: "font-style:italic;color:#005cc5"
    }
  }
  ```
  ``` html
  <Parser html="<code>test</code>" tagStyle="{{tagStyle}}" />
  ```
  ![解析自定义样式](http://bmob-cdn-17111.b0.upaiyun.com/2019/04/27/ca68a4464065829c80c33d056f95a7d2.png)
- 自动设置标题  
  若`html`中存在`title`标签，将自动把`title`标签的内容设置到页面的标题上，并在回调`bindparse`中返回，可以用于转发  
- 设置容器的样式  
  支持在`html-class`属性中设置整个富文本容器的样式，包括`display`、`margin`、`padding`等
  ```html
  <Parser html="{{html}}" html-class="contain" />
  ```
  ```css
  .contain{
    margin:5px;
  }
  ```
- 支持添加加载提示
  可以在`Parser`标签内添加加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏，例如：
  ```html
  <Parser html="{{html}}">加载中...</Parser>
  ```
- 支持的标签种类丰富，包括`视频`、`表格`等  
  在[`rich-text`](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)组件的基础上增加支持以下标签: 
  
  | 标签 | 属性 |
  |:---:|:---:|
  | video | src, controls, loop, height, width |
  | audio | src, controls, loop, [poster, name, author](https://developers.weixin.qq.com/miniprogram/dev/component/audio.html) |
  | u |  |
  | center |  |
  | font | face, color |
  | pre |  |
  | section |  |
  | style |  |
  | body |  |

  另外，对于不在支持列表中的标签，除个别会直接移除外，都会被转换为`div`标签，因此可以使用一些语义化标签，如`article`, `address`等
  
- 图片支持大小自适应，点击图片可以预览（预览时通过左右滑动可以查看所有图片）；对于一些装饰性的图片，可以对其设置`ignore`属性，设置后将无法预览  

  ![解析图片](http://bmob-cdn-17111.b0.upaiyun.com/2019/04/28/e20b6b6340f1e2c28073a1137b94bdcc.gif)  
- 点击`a`标签，若`href`为小程序内部页面路径，将直接跳转；若是网页链接，则`长按`可以复制链接，并在浏览器中打开；点击时将有下划线和半透明的效果，支持图片链接。链接被点击时会触发`bindlinkpress`事件，可以在该回调中进行下载附件等更多操作  
  ![解析链接](http://bmob-cdn-17111.b0.upaiyun.com/2019/04/28/660803d34009355a80f888218369515e.gif)
- 支持解析有序列表和无序列表（直接由`rich-text`进行显示）  
  ![解析列表](http://bmob-cdn-17111.b0.upaiyun.com/2019/04/28/af3fc4dd4041cf7680e24f1f49ba715a.png)
 
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
 
- 功能强大，支持无限层级，解析速度快，包大小仅约`34.8KB`  
## 使用方法 ##
1. 下载Parser文件夹至小程序目录  
   ![页面结构](http://bmob-cdn-17111.b0.upaiyun.com/2019/05/06/ff92de3340b36dbf803addcf85659e42.png)
   
2. 在需要引用的页面的`json`文件中添加
   ``` json
   {
     "usingComponents": {
       "Parser":"../../Parser/index"
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
- 组件属性：  

  | 属性 | 类型 | 默认值 | 必填 | 说明 |
  |:----:|:----:|:----:|:----:|:----:|
  | html | String/Object/Array | | 是 | 要显示的富文本数据，具体格式见下方说明 |
  | html | String | | 否 | 对整个富文本容器设置class样式 |
  | autopause | Boolean | true | 否 | 是否允许播放视频时自动暂停其他视频 |
  | selectable | Boolean | true | 否 | 是否允许长按复制链接 |
  | tagStyle | Object | | 否 | 设置标签的默认样式 |
  
  - html格式：
    1. `string`类型：一个`html`字符串，例如：`<div>Hello World!</div>`
    2. `object`类型：一个形如`{nodes: [Array], imgList: [Array], videoNum: Number, title: "String"}`的结构体，其中nodes数组的格式基本同[rich-text](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)，对于该节点下有`img`，`video`，`a`标签的，需要将`continue`属性设置为`true`，否则将直接使用`rich-text`组件渲染，可能导致图片无法预览，链接无法点击等问题，imgList为其中所有图片地址的数组，`videoNum`是视频数量（不必要，用于`autopause`属性）`title`是页面的标题（不必要，传入将会设置到页面的标题上）回调函数`bindparser`的返回值就是这样的结构体
    3. `array`类型：格式要求同上（用此格式传入预览图片时，将`不能`通过左右滑动查看所有图片）  
    4. 使用b, c方法可以节省解析的时间，提高性能
  - 关于tagStyle  
    可以设置标签的默认样式，如`{ body:"margin:5px" }`  

- 回调函数
  
    | 名称 | 功能 | 说明 |
    |:----:|:----:|:----:|
    | bindparser | 在解析完成时调用（仅当传入的html为`字符串`时会调用） | 返回一个`object`，其中`nodes`为解析后的节点数组，`imgList`为图片列表，`title`是页面标题，该`object`可以在下次调用直接作为html属性的值，节省解析的时间 |
    | bindlinkpress | 在链接受到点击时调用 | 返回该链接的`href`值，开发者可以在该回调中进行进一步操作，如下载文档和打开等 |
  
- 关于基础库
  
    | 版本 | 功能 | 覆盖率 |
    |:---:|:---:|:---:|
    | >=2.2.5 | 全部正常 | 98.23% |
    | 1.9.90-2.2.4 | 部分html实体无法显示 | 1.55% |
    | 1.6.6-1.9.90 | html-class属性无法使用<br />部分html实体无法显示 | 0.13% |
    | <1.6.6 | 无法使用 | 0.09% |
- Tips  
    `table`, `ol`, `ul`等标签由于较难通过模板循环的方式显示，将直接通过`rich-text`进行渲染，因此请尽量避免在表格，列表中加入图片或链接，否则将无法预览或点击（但可以正常显示）

## 后端解析 ##
&emsp;&emsp;本插件提供了一个配套的后端`node.js`支持包，可以提供更加强大的功能，如匹配多层的`style`，代码高亮，直接打开网址，解析`markdown`等，其返回值可以直接作为本组件的`html`属性的值，在后端提前完成解析后可以节省解析时间，提高性能。  
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

## 原理简介 ##
&emsp;&emsp;该插件结合了`WxParse`中模板循环的方式和`rich-text`组件，对于节点下有`img`, `video`, `a`标签的，使用模板循环的方式显示，否则直接通过`rich-text`组件显示，这样既解决了`WxParse`中过多的标签数（`rich-text`可以节省大量的标签），层数容易不够（对于大于20层的直接用`rich-text`解析，理论上可以显示无限层级），无法解析表格，一些组件显示格式不正确（`rich-text`可以解析出更好的效果）等缺点；也弥补了`rich-text`图片无法预览，无法显示视频，无法复制链接，部分标签不支持（在解析过程中进行替换）等缺点，另外该解析脚本还减小了包的大小，提高了解析效率，通过包装成一个自定义组件，简单易用且功能强大。
## 许可 ##
您可以随意的使用和分享本插件
## 更新日志 ##
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
