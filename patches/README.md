## 补丁包 ##
本文件夹中准备了一些补丁包，可根据需要选用，可以实现更加丰富的功能  

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
  `4.22KB`  
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