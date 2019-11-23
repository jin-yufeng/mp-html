## 使用方法 ##
- 插件包说明

  | 名称 | 大小 | 使用 |
  |:---:|:---:|:---:|
  | Parser | 39.7KB | 微信小程序插件包 |
  | Parser.min | 28.3KB | 微信小程序插件包压缩版（功能相同） |
  | Parser.bd | 36.9KB | 百度小程序插件包 |
  | Parser.bd.min | 26.7KB | 百度小程序插件包压缩版（功能相同） |
  | Parser.uni | 48.3KB | `uni-app` 插件包（可以编译到所有平台） |
  
  - 关于百度版与微信版的差别，可见[百度版与微信版的差别](#百度版与微信版的差别)  
  - `uni-app`版因为各平台`rich-text`和自定义组件表现有所不同，有较多条件编译的内容，编译后大小会缩小，关于各平台间的差别和与原生包的差别，可见[`uni-app`包说明](#uni-app包说明)  
  - 可根据需要选用，使用时建议统一更名为`Parser`，以下**统称**为`Parser`  
&nbsp;  
- 在原生框架中使用
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
  - `demo`文件夹下的是微信小程序 `富文本插件` 示例程序的源码，可供参考  
&nbsp;  
- 在`uni-app`中使用  
  - 使用`uni-app`包（可以编译到所有小程序平台）  
    1. 下载`Parser.uni`包到`component`目录下（更名为`Parser`）  
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
  - 使用原生包  
    参考[官网-小程序组件支持](https://uniapp.dcloud.io/frame?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e7%bb%84%e4%bb%b6%e6%94%af%e6%8c%81)  
&nbsp;  
- 在`mpVue`中使用  
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
&nbsp;  
- 在`wepy`中使用  
  测试版本：V1.7.3
  - 方法一
    1. 通过`wepy build --no-cache --watch`命令编译（**一定要有**`--no-cache`，否则可能出现`Components not found`的错误）  
    2. 将`Parser`文件夹复制到`/src/components`目录下  
    3. 如果没有使用`document`补丁包，删除`Parser/index.js`中第25到30行；如果没有使用`emoji`补丁包，删除`Parser/Parser.js`中148到151行（这两个地方都是通过`try`来引入文件，但在`wepy`中还是会出文件不存在的错误）  
       ```javascript
       // Parser/index.js
       created() {
         try {
           const Document = require("./document.js");
           this.document = new Document();
         } catch (e) {}
       },
       // Parser/Parser.js
       try {
         var emoji = require("./emoji.js");
         data = emoji.parseEmoji(data);
       } catch (err) {}
       ```

    4. 在需要使用的页面的`wpy`文件中添加
       ```vue
       <template>
         <view class="container">
           <Parser html="{{html}}"></Parser>
         </view>
       </template>
       <script>
       import wepy from 'wepy'
       export default class Index extends wepy.page {
         config = {
           usingComponents: {
             'Parser': '/components/Parser/index'
           }
         }
         data = {
           html: '<div>Hello World!</div>',
         }
       }
       </script>
       ```
  - 方法2 
    1. 将`Parser`文件夹复制到`/dist/components`文件夹下（注意是**dist**不是**src**）
    2. 同方法一的第4步
    - 这种方法`wepy`不会对插件包进行编译和压缩  
&nbsp;  
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
  | lazy-load | Boolean | false | 否 | 是否开启图片懒加载 |
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
&nbsp;  
- 回调函数
  
  | 名称 | 功能 | 说明 |
  |:----:|:----:|----|
  | bindparser | 在解析完成时调用（仅当传入的html为`字符串`时会调用） | 返回一个`object`，其中 `nodes`为解析后的节点数组，`imgList`为图片列表，`title`是页面标题，该`object`可以在下次调用直接作为html属性的值，节省解析的时间 |
  | bindready | 渲染完成时调用 | 返回整个组件的`NodesRef`结构体，包含宽度、高度、位置等信息（每次`html`修改后都会触发） |
  | binderror | 出错时调用 | 返回一个`object`，其中`source`是错误来源（`ad`广告出错、`video`视频加载出错、`audio`音频加载出错、`parse`解析过程中出错），`errMsg`为错误信息，`errCode`是错误代码（仅`ad`），`target`包含出错标签的具体信息 |
  | bindimgtap | 在图片受到点击时调用 | 返回一个形如`{src:...}`的结构体（`src`是图片链接），可用于阻挡`onShow`的调用 |
  | bindlinkpress | 在链接受到点击时调用 | 返回一个形如`{href:...}`的结构体（`href`是链接地址），开发者可以在该回调中进行进一步操作，如下载文档和打开等 |  

  - 所有回调函数的返回值从`e.detail`中获取    
&nbsp;
- 使用外部样式  
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
&nbsp;  
- 关于基础库  
  微信小程序：
  
  | 版本 | 功能 | 覆盖率 |
  |:---:|:---:|:---:|
  | >=2.2.5 | 全部正常 | 99.19% |
  | 1.9.3-2.2.4 | 部分`html`实体无法显示 | 0.68% |
  | 1.6.3-1.9.2 | 部分`html`实体无法显示<br>不支持`lazy-load`属性 | 0.05% |
  | <1.6.6 | 无法使用 | 0.05% |

  百度小程序：
  
  | 版本 | 功能 | 覆盖率 |
  |:---:|:---:|:---:|
  | >=1.10.13 | 全部正常 | 100% |
  
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
### list ### 
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

## 百度版与微信版的差别 ##
百度小程序版插件与微信小程序版基本相同，组件属性、回调函数等基本完全一致，仅一些实现方式上的差别：  
1. 解析实体  
   在微信小程序中，`rich-text`从基础库2.2.5开始就基本支持了所有实体；但百度小程序的`rich-text`组件仅支持很少的实体，且不支持的实体会被显示为`undefined`  
   *解决方案：* 在百度小程序版的插件包中增加了对`&nbsp;` `&ensp;` `&emsp;` `&mdash;` `&middot;` `&lsquo;` `&rsquo;` `&ldquo;` `&rdquo;` `&hellip;`等`23`个常用实体的支持  
2. 一些`html5`新标签  
   在微信小程序中，`rich-text`从基础库2.7.1开始增加支持了很多`html5`新标签，但百度小程序的`rich-text`仍不支持  
   *解决方案：* 微信小程序版本中就准备了低版本的兼容方案，在百度小程序中直接使用兼容方案，使得其也能够使用`section`、`font`等标签  
3. `audio`的`autoplay`属性  
   微信小程序和百度小程序的`audio`都没有`autoplay`属性，但微信小程序可以通过`createAudioContext`的`api`来获取`audio`标签的`context`并进行自动播放；但百度小程序没有这个`api`，因此不支持`audio`的`autoplay`属性  
4. `List`补丁包  
   `List`补丁包中使用了`Component`中的`relations`字段来控制`ol`、`ul`标签与`li`标签的关系，但百度小程序中不支持`relations`字段，所有暂不支持在百度小程序中使用这个补丁包  
5. `wxs`与`filter`  
   在插件中，由于使用`rich-text`组件作为整个富文本的一部分，有时需要给`rich-text`本身添加一些顶层组件的样式以达到正确的效果（如`display`、`float`等，但又不能将顶层模块的`style`全部加在`rich-text`上，否则如`margin`等样式会被重复缩进），在微信小程序版本中，是通过`wxs`脚本筛选出一些样式并给`rich-text`组件设置；但在百度小程序中，`filter`在属性的设置中无效（好像只能设置标签中的文本）  
   *解决方案：* 将这部分设置改在解析过程中处理，给需要的标签增加一个`containStyle`的属性，在显示时用这个属性的值设置为`rich-text`的样式  
   *带来的问题：*  
   1. 稍慢的速度（`wxs`在`ios`中的执行速度远快于`js`，且在解析过程中处理需要先找出哪些标签需要这样处理，算法更复杂，耗时稍长）  
   2. 稍大的解析结果（由于部分标签多了一个`containStyle`属性，会稍微增加解析结果的大小）  
   3. `imgMode`属性仅为传入的`html`为`String`类型时有效（因为`imgMode`的处理也被移到解析过程中，`array`或`object`类型传入不进行解析）  
   4. 百度版暂不支持`lazy-load`属性  
6. `rich-text`组件的`display:inline`  
   在微信小程序中，给`rich-text`设置`display:inline`是无效的，这导致很多文本标签（如`span`、`strong`、`label`等）直接用`rich-text`容易出现问题，因此需要对所有文本标签都继续递归，用一个`display:inline`的`view`来模拟（除`sup`、`sub`等一些难模拟的标签外）；但百度小程序的`rich-text`是支持`inline`的，这使得百度小程序版本中**不需要这样的处理**，在一些情况下还能取得更好的效果  
7. 组件间通信  
   本插件的基本显示方式是通过自定义组件`trees`递归调用来显示`dom`树，在微信小程序中，事件通过设置`options`中的`composed`属性即可让该事件穿过自定义组件边界继续冒泡，使得各层`trees`组件中的图片受到点击、链接受到点击等情况发生时，顶层组件都能收到并处理；但在百度小程序中无论是`triggerEvent`、`dispatch`还是`selectComponent`**均无法**穿透组件边界，这将导致顶层组件无法知晓子孙组件的事件  
   *解决方案：* 通过`getApp()`设置了一个全局变量`_Parser`，当顶层模块被创建的时候，将这个变量设置为顶层模块的`this`；子孙组件建立时，通过这个变量获取顶层组件示例，并直接操作顶层模块的各类方法以实现等价效果，最终效果基本无明显差异  

## uni-app包说明 ##
1. 本插件需要使用 `HBuilderX 2.2.5-alpha` **及以上版本**进行编译  
2. 本插件通过组件递归的方式显示节点树，因此必须使用**自定义组件模式**编译  
3. 本插件支持小程序、`H5`、`APP`（不支持`nvue`）端使用（除`ios`端外都已经过基本测试）  
4. 百度小程序中基础库版本 `3.60`（客户端版本`11.9`）以下的可能无法正常显示  
5. `a` 标签 `autocopy` 属性的表现效果：`H5` 中将**直接跳转**对应网页；小程序和 `APP` 中将**复制链接**；`APP` 中建议在 `@linkpress` **回调中跳转**到 `web-view` 页面（可参考示例项目）  
6. **仅**微信小程序、QQ小程序、`APP` 支持 `lazy-load` 属性  
7. **仅**微信小程序、QQ小程序、百度小程序支持 `ad` 组件  
8. 微信小程序、QQ小程序、`H5`、`APP` 支持所有实体编码  
9. 支付宝小程序、`H5`、`APP`**没有** `versionHigherThan` 的 `api`  
10. 支付宝小程序**不支持** `autopause` 属性  
11. **仅**微信小程序支持 `ruby`、`bdi`、`bdo` 标签及 `audio` 标签的 `autoplay` 属性  
- 与原生包编译结果的区别（已知问题）
  1. 微信小程序中要求基础库 `2.3.0` 及以上
  2. `vue`框架要求`template`下只能有一个直接子节点，因此每个`trees`组件都需要用一个`view`套着，一定程度上增加了节点树深度
  3. 编译中会使用大量的`block`，一定程度上增大了编译结果大小
     ```html
     <!--原生包-->
     <view wx:elif="{{item.name=='div'}}">...</view>
     <!--uni-app编译结果-->
     <block wx:else>
       <block wx:if="{{item.name=='div'}}">
         <view>...</view>
       </block>
     </block>
     ```