## 使用方法 ##
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