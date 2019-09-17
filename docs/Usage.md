## 使用方法 ##
- 组件属性：  

  | 属性 | 类型 | 默认值 | 必填 | 说明 |
  |:----:|:----:|:----:|:----:|----|
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
    2. `object`类型：一个形如`{nodes: [Array], imgList: [Array], title: "String"}`的结构体，其中nodes数组的格式基本同[rich-text](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)，对于该节点下有`img`，`video`，`a`标签的，需要将`continue`属性设置为`true`，否则将直接使用`rich-text`组件渲染，可能导致图片无法预览，链接无法点击等问题，imgList为其中所有图片地址的数组，`title`是页面的标题（不必要，传入将会设置到页面的标题上），回调函数`bindparser`的返回值就是这样的结构体
    3. `array`类型：格式要求同上（用此格式传入预览图片时，将`不能`通过左右滑动查看所有图片）  
    4. 使用b, c方法可以节省解析的时间，提高性能
  - 关于img-mode
    默认`default`，在没有设置宽高时，按图片原大小显示；设置了宽或高时，按比例进行缩放；同时设置了宽高时，按设置的宽高进行缩放。在同时设置了宽高的情况下，宽度可能因为`max-width:100%`的限制而缩短导致图片变形，此时可将模式设置为`widthFix`，即保持宽度不变，高度自动变化（会导致设置的高度无效）
  - 关于tag-style  
    可以设置标签的默认样式，如`{ body:"margin:5px" }`；仅传入的`html`为`String`类型时有效（在解析过程中设置）  

- 回调函数
  
    | 名称 | 功能 | 说明 |
    |:----:|:----:|----|
    | bindparser | 在解析完成时调用（仅当传入的html为`字符串`时会调用） | 返回一个`object`，其中`nodes`为解析后的节点数组，`imgList`为图片列表，`title`是页面标题，该`object`可以在下次调用直接作为html属性的值，节省解析的时间 |
    | bindready | 渲染完成时调用 | 返回整个组件的`NodesRef`结构体，包含宽度、高度、位置等信息（每次`html`修改后都会触发） |
    | binderror | 出错时调用 | 返回一个`object`，其中`source`是错误来源（`ad`广告出错、`video`视频加载出错、`audio`音频加载出错、`parse`解析过程中出错），`errMsg`为错误信息，`errCode`是错误代码（仅`ad`），`target`包含出错标签的具体信息 |
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
    - 表格和列表由于较难通过模板循环的方式显示，将直接通过`rich-text`进行渲染，因此请尽量避免在列表和表格中加入图片或链接，否则将无法预览或点击（但可以正常显示）（列表引入`list`补丁包后可以解决这个问题）    
    - 若需要自定义链接受到点击时的效果，可对`Parser/trees`文件夹下的`trees.wxss`中的`navigator-hover`进行修改（默认下划线+半透明）

## 补丁包 ##
`patches`文件夹中准备了一些补丁包，可根据需要选用，可以实现更加丰富的功能  

### emoji ###  
- 功能  
  将形如`[笑脸]`的文本解析为`emoji`小表情  
- 大小  
  `4.66KB`（`min`版本`3.59KB`）  
- 使用方法  
  将`emoji.js`复制到`Parser`文件夹下即可（若使用`min`版本也要改名为`emoji.js`）  
  默认配置中支持`176`个常用的`emoji`小表情  
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
  `4.75KB`（`min`版本`3.69KB`）  
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
### list ### 
- 背景  
  在原插件中，由于列表较难通过模拟实现，是直接使用`rich-text`来显示列表，这导致列表中的图片无法预览，链接无法点击，此补丁包可以解决这个问题  
- 功能  
  模拟`ol`、`ul`、`li`标签  
  `ol`标签支持`start`和`type`属性；`ul`标签会自动根据层级显示不同的样式  
- 大小  
  `3.61KB`  
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