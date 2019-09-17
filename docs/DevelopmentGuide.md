# 二次开发指南 ##
如您需要为本组件支持更多的组件或实现更多的更多的功能，可以参考这里
## DomHander.js ##
- 宏定义  

  | 变量名 | 功能 |
  |:---:|---|
  | trustTag | 信任的标签列表，其中`0`标记一些难以模拟的标签（如列表和表格等），将直接用`rich-text`组件显示，不能继续深入递归显示；`Common`标记的标签可以继续递归 |
  | blockTag | 一些`rich-text`组件不直接支持的块级标签列表，将被转为`div`标签 |
  | textTag | 行内标签列表 |
  | ignoreTag | 忽略的标签列表，将被直接移除 |
  
  对于一个标签，若在`ignoreTag`中，则被直接忽略；否则若在`trustTag`中则保持不变；否则若在`blockTag`则被转为`div`标签；否则将被转为`span`标签，可根据需要添加

- 属性处理  
  在一个大的`switch`中对一些需要特殊处理的标签进行处理，以`font`和`a`标签为例：
  ```javascript
  case 'font':
      name = 'span'; //font标签是rich-text（低版本）不支持的，需要转为span
      if (attrs.color) { //将color和face属性解析到style中，使其生效
          attrs.style += (';color:' + attrs.color);
           delete attrs.color;
      }
      if (attrs.face) {
          attrs.style += (";font-family:" + attrs.face);
          delete attrs.face;
      }
      break;
  case 'a':
      /*该函数的功能是对该标签的所有祖先节点做一个标记，有该标记的标签在显示时会继续递归深入，这样才能实现自定义的a标签点击效果*/
      this._bubbling(); 
      break;
  ```

- 组件的默认样式  
  `initStyle`函数用于设置标签的默认样式，可在这里添加或删除  
  `CanIuse`变量用于标记当前设备基础库版本是否大于`2.7.1`，`rich-text`组件在`2.7.1`基础库增加支持了大量标签，可通过这个变量进行兼容处理  

## Parser.js ##
- 宏定义
  
  | 变量名 | 功能 |
  |:---:|---|
  | trustAttrs | 支持的属性列表，不在该列表中的属性都会被移除，如需增加支持新的属性，需要在这里添加 |
  | voidTag | 没有子标签的标签列表，可根据需要添加 |

- 其余部分是较底层的处理，一般不需要修改

## trees组件 ##

`trees`组件是一个递归定义的组件，用于显示结点树
- `trees.wxml`  
  `trees.wxml`定义的是标签的显示效果，对于有`continue`标记的标签将继续递归，否则将直接用基本类型进行显示，主要分为图片，文本，视频，音频，富文本，链接等基本类型，可根据需要添加，以链接为例：
  ```html
  <!--链接-->
  <navigator wx:elif="{{item.name=='a'}}" // 选择a标签
    url="{{item.attrs.href}}" 
    style="{{item.attrs.style}}" // 设置属性，所有属性都在item.attrs中
    data-href='{{item.attrs.href}}' 
    hover-class="navigator-hover" 
    hover-start-time="25" 
    hover-stay-time="300" // 设置一些默认的样式
    bindtap="tapEvent">
      <trees id="node" nodes="{{item.children}}" controls="{{controls}}" />
    </navigator>
  ```
- `trees.wxss`  
  定义一些标签基本的样式，主要是由于这些标签在`rich-text`组件中有默认样式，在模拟时需要加上，以`strong`标签为例
  ```css
  /* strong标签在rich-text组件中有默认加粗效果，在模拟实现时通过class="{{item.name}}"的方式加上这个效果 */
  .b, .strong {
      display: inline;
      font-weight: bold;
  }
  ```
  可根据需要添加或修改样式

- `trees.js`  
  主要向顶层组件冒泡传递事件，因此需要将设置`bubbles`和`compose`设置为`true`，可根据需要添加事件

- `handler.wxs`  
  主要用于`rich-text`组件。例如，在`rich-text`中的顶层标签设置了`float:left`，如果没有对`rich-text`组件本身也设置，其作为整体的一部分布局就会出现问题；但又不能直接将顶层标签的所有样式直接赋给`rich-text`，否则如`margin`等属性会被缩进多次，也会导致错误的效果；因此通过这个脚本将一些需要的样式，如`float`，`display`等提取出来给`rich-text`作为样式，可根据需要修改

## index组件 ##
这是顶层组件，直接与用户交互，主要功能是捕获子组件`trees`冒泡上来的事件，经过处理后发送给调用者，另外还需要处理初始数据的解析等操作  
`initData`函数主要用于在组件加载完毕后获取`video`和`audio`组件的`context`，`video`组件的`context`用于实现一个视频播放时暂停其他视频播放的功能；`audio`的`context`用于播放背景音乐

## 其他文件 ##
- `Tokenizer.js`  
  这是解析`html`比较底层的模块，一般不需要修改，顶层的模块是`DomHandler.js`，解析完成的结构体结构同`rich-text`组件的要求
- `CssTokenizer.js`  
  这是处理`style`标签中的`css`的底层模块，一般不需要修改
- `api.js`  
  提炼出的一些常用函数，一般不需要修改，可添加

## 一些问题 ##
- 为什么不支持匹配`wxss`中的样式  
  `rich-text`组件本身是支持匹配`wxss`中的`class`的，但由于在自定义组件中使用`rich-text`组件时仅能匹配组件内的样式，无法匹配使用页面的样式，因此本插件没有支持匹配`wxss`中的`class`，如果确有需要的，可以按照以下思路进行修改：  
  1. 在`Parser/trees/trees.wxss`中通过`@import`引入需要的样式  
  2. 在`Parser/trees/trees.wxml`中的每一个标签上加上`class="{{item.attrs.class}}"`（因为不是所有标签都由`rich-text`组件显示）  
  3. 删除`DomHandler.js`中第177行的`delete attrs.class;`（因为原来匹配完后`class`就没有用了，删除可以减小解析结果大小）  
&nbsp;
- 为什么图片使用`rich-text`组件中的`img`显示而不是用`image`组件显示  
  因为`rich-text`组件中的`img`更贴近`html`中的显示模式，在没有设置宽高时，会自动按照原大小显示；设置了宽或高时，按照比例缩放；同时设置了宽高时，按设置的宽高显示。若用`image`组件实现这样的效果将比较复杂，且需要多次`setData`（不过这样的缺陷是不支持`lazyload`和`error`事件）  
&nbsp;
- 为什么文本标签都被设置了`continue`（`/trees/handler.wxs`中）  
  因为`rich-text`组件设置`display:inline`是无效的，对于文本标签，除了个别难模拟的（如`bdi`、`bdo`等），会使用`rich-text`（设置`display:inline-block`），其他标签都会通过一个`display:inline`的`view`来模拟，以实现最佳效果  

## 最后 ##
欢迎将本插件适配更多前端框架，欢迎提PR
