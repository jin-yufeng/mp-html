## 使用方法 ##
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
- 关于基础库
  
    | 版本 | 功能 | 覆盖率 |
    |:---:|:---:|:---:|
    | >=2.2.5 | 全部正常 | 99.14% |
    | 1.6.3-2.2.4 | 部分html实体无法显示 | 0.82% |
    | <1.6.6 | 无法使用 | 0.04% |
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