## 补丁包 ##
本文件夹中准备了一些补丁包，可根据需要选用，可以实现更加丰富的功能  
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
&nbsp;
- document  
  使用方法：将`document.js`复制到`Parser`文件夹下即可（若使用`min`版本也要改名为`document.js`）  
  大小：`4.75KB`（`min`版本`3.69KB`）  
  功能：实现类似于`web`中的`document`对象，可以动态操作`DOM`  
  - `document`：  
    获取方式：可通过 `this.selectComponent("#id").document` 获取  
    `Api`列表:   
  
    | 名称 | 输入值 | 返回值 | 功能 |
    |:---:|:---:|:---:|:---:|
    | getElementById | id | element | 按照`id`查找`element` |
    | getChildren | i | element | 获取根节点的第`i`个子节点的`element`实例 | 
  - `element`：   
    属性名：

    | 名称 | 功能 |
    |:---:|:---:|
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