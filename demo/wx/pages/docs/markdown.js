module.exports = [
`## 解析 style 标签  
支持将\`style\`标签中的样式解析到各个标签的\`style\`属性中去，支持以下选择器：  

| 名称 | 示例 |
|:---:|:---:|
| class 选择器 | .the-class |
| id 选择器 | #the-id |
| 标签名选择器 | img |
| 多选择器的并集 | .the-class, #the-id |

示例：  
\`\`\`html
<style>
.demo {
  font-style: italic;
}
#demo2 {
  font-weight: bold;
}
view {
  display: block;
  text-align: center;
  font-size: 30px;
}
</style>
<view>
  <span class="demo">Hello </span>
  <span id="demo2">World!</span>
</view>
\`\`\`
<style>
.demo {
  font-style: italic;
}
#demo2 {
  font-weight: bold;
}
view {
  display: block;
  text-align: center;
  font-size: 30px;
}
</style>
<view>
  <span class="demo">Hello </span>
  <span id="demo2">World!</span>
</view>
</br>

## 设置标签的默认样式  
可以对标签设置任意的自定义样式，示例：  
\`\`\`javascript
Page({
  data: {
    tagStyle: {
      code: "background-color:#f0f0f0;border-radius:2px;font-family:monospace"
    }
  }
})
\`\`\`
解析结果：\`test\`  
</br>

## svg 支持  
可以直接使用所有\`svg系列标签，示例：  
\`\`\`html
<svg width="200" height="100">
  <circle cx="100" cy="50" r="40" stroke="#3b5b81" stroke-width="2" fill="#5aa0b3" />
</svg>
\`\`\`
解析结果：  
<svg width="200" height="100">
  <circle cx="100" cy="50" r="40" stroke="#3b5b81" stroke-width="2" fill="#5aa0b3" />
</svg>
</br></br>

## 锚点跳转  
\`a\`标签支持跳转到锚点（也可以通过\`api\`手动跳转），示例：  
\`\`\`html
<div id="anchor">我是锚点</div>
···
<a href="#anchor">点我跳转锚点</a>
\`\`\`
[立即体验](../demo/demo?index=0&anchor=anchor)  
</br>

## 多资源加载  
在\`video\`和\`audio\`标签中放置多个\`source\`标签，插件将按顺序进行加载，可用于解决平台支持性差异，避免无法播放，示例：  
\`\`\`html
<video controls>
  <source src="demo1.mov" />
  <source src="demo2.webm" />
</video>
\`\`\`
</br>

## 设置占位图  
支持设置图片加载完成前（包括懒加载）和图片出错时的占位图  
<div id="display">
  <a href="display" style="display:flex;align-items:center;justify-content:center;height:280rpx;border:1px solid gray;color:black">
    点击加载
  </a>
</div>
</br>

## 内容可复制  
<div style="user-select:text;-webkit-user-select:text">

当\`selectable\`属性被设置为\`true\`时，可以通过长按复制内容（本段文字可以体验）

</div>
</br>

## 自动设置标题  
若\`html\`中存在\`title\`标签，将自动把\`titile\`标签的内容设置到页面标题上  
</br>

## 添加加载提示  
可以在\`parser\`标签内添加加载提示，加载完成后自动隐藏，还可以通过设置\`show-with-animation\`属性实现渐显动画，示例：  
\`\`\`wxml
<parser html="{{html}}" show-with-animation>
  加载中...
</parser>
\`\`\`
</br>

## 智能压缩  
本插件可以通过以下方法实现自动压缩解析结果，有效加快渲染速度  
  
- 自动合并一些不必要的层级
- 在非\`pre\`标签且没有\`white-space:pre\`时自动合并空白符
- 压缩\`style\`属性的值，自动去除重复的样式和多余的空格
- 自动移除不支持的属性和标签
  
另外还可以通过设置\`compress\`属性选择是否移除\`id\`和\`class\`属性  
</br>

## 懒加载  
图片的懒加载由\`lazy-load\`属性控制  
视频的懒加载强制开启，存在超过\`3\`个视频时，将仅加载前\`3\`个，其他用图片占位，避免页面卡死  
另外，视频支持播放时自动暂停其他播放中的视频（通过\`autopause\`属性控制）  
</br>

## 自动填充链接  
通过设置\`domain\`属性，可以自动给链接填充域名，示例：  
\`\`\`wxml
<parser html="{{html}}" domain="https://example.com" />
\`\`\`
\`\`\`javascript
Page({
  data: {
    // 将被填充为 https://example.com/pics/pic.png
    html: "<img src='//example.com/pics/pic.png'>" +
      "<div style='background-image:url(/pics/pic.png)'>"
  }
})
\`\`\`
</br>

## 支持丰富的标签  
本插件支持所有\`rich-text\`支持的标签，并增加支持以下标签或属性  

| 标签 | 属性 |
|:---:|:---:|
| a | href, app-id, path |
| ad | unit-id |
| audio | author, autoplay, controls, loop, name, poster, src |
| base | href |
| embed | autostart, height, loop, src, type, width |
| font | color, face, size |
| source | src |
| svg | svg 系列所有标签 |
| table | border, cellpadding, cellspacing, width |
| video | autoplay, controls, height, loop, muted, poster, src, unit-id, width |

对于不支持的标签，除个别将被直接移除（如\`script\`），将被转为一个行内标签，因此可以使用更多语义化标签  
</br>

## 支持丰富的事件  
默认支持以下事件：  
1. 链接点击事件  
  链接受到点击时，若\`href\`为网络链接，将自动复制链接；若是内部路径，则自动跳转页面；若设置了\`app-id\`，则跳转其他小程序；同时触发\`linkpress\`事件，可进行自定义处理  
2. 图片点击事件  
  图片受到点击时，将自动进行预览（支持\`base64\`，可以左右滑动查看所有图片），同时触发\`imgtap\`事件，可进行自定义处理（对于装饰性图片，可以设置\`ignore\`属性，将无法预览）  

</br>

## 多端使用  
本插件目前已经适配了微信、\`QQ\`、百度、支付宝、头条小程序和\`uni-app\`等多平台，可通过相同的方式多端使用，大大提高效率  
</br>

## 性能指标  
本插件解析和渲染效率高，轻量化（\`40.3KB\`，\`min\`版本\`25.6KB\`）；封装成自定义组件，简便易用；容错性强，稳定性高，以下情况都不会出错：  
\`\`\`html
<!--冒号不匹配-->
<div style="font-family:"宋体"">Hello</div>
<!--标签首位不匹配-->
<div> World!</p>
<!--异形标签-->
<o:p></o:p>
<!--缺少尾标签-->
<div>!
\`\`\`
</br>

更多功能可见：[功能介绍](https://jin-yufeng.github.io/Parser/#/)  
</br>
<a style="display:block;text-align:center" href="page1">下一章：使用方法</a>`,
`## 使用步骤  
源码引入  
1. 复制\`parser\`文件夹至\`components\`目录下  
2. 在需要使用页面的\`json\`文件中添加  
  \`\`\`json
  {
    "usingComponents": {
      "parser": "/components/parser/parser"
    }
  }
  \`\`\`
3. 在需要使用页面的\`wxml\`文件中添加  
  \`\`\`wxml
  <parser html="{{html}}" />
  \`\`\`
4. 在需要使用页面的\`js\`文件中添加  
  \`\`\`javascript
  Page({
    onLoad() {
      this.setData({
        html: "<div>Hello World!</div>"
      })
    }
  })
  \`\`\`
</br>

\`npm\` 引入  
1. 在小程序目录下执行  
  \`\`\`bash
  npm install parser-wx
  \`\`\`
2. 勾选使用\`npm\`模块，并点击工具-构建\`npm\`  
3. 在需要使用页面的\`json\`文件中添加  
  \`\`\`json
  {
    "usingComponents": {
      "parser": "parser-wx"
    }
  }
  \`\`\`
  
后续步骤同上  
</br>

本插件还支持在\`uni-app\`等多个框架中使用，更多信息见：[使用方法](https://jin-yufeng.github.io/Parser/#/instructions)  
</br>

## 组件属性  

| 属性 | 类型 | 默认 | 说明 |
|:---:|:---:|:---:|---|
| html | String |  | 要显示的 html 字符串 |
| autopause | Boolean | true | 是否在播放视频时自动暂停其他视频 |
| autoscroll | Boolean | false | 是否自动给表格添加一个滚动层 |
| autosetTitle | Boolean | true | 是否自动将 title 标签的内容设置到页面标题 |
| compress | Number | 0 | 压缩等级，可以选择是否移除 id 和 class |
| domain | String |  | 主域名，设置后将给链接拼接上域名 |
| lazy-load | Boolean | false | 是否开启图片懒加载 |
| loading-img | String |  | 图片加载完成前的占位图 |
| selectable | Boolean | false | 是否允许长按复制内容 |
| tag-style | Object |  | 标签的默认样式 |
| use-anchor | Boolean | false | 是否使用锚点跳转 |
| use-cache | Boolean | false | 是否缓存解析结果 |

详细可见：[组件属性](https://jin-yufeng.github.io/Parser/#/instructions?id=组件属性)  
</br>

## 事件  

| 名称 | 说明 |
|:---:|---|
| bindparse | 解析完成时触发，返回解析结果 |
| bindload | dom 结构加载完毕时触发 |
| bindready | 图片加载完毕时触发，返回组件的大小 |
| binderror | 出错时触发，返回错误来源和信息 |
| bindlinkpress | 链接被点击时触发，返回链接地址和 ignore 函数（阻止自动跳转） |
| bindimgtap | 图片被点击时触发，返回图片地址和 ignore 函数（阻止自动预览） |

详细可见：[事件](https://jin-yufeng.github.io/Parser/#/instructions?id=事件)  
</br>

## api  
本插件的实例中提供了一些\`api\`方法，获取实例的方法：  
\`\`\`wxml
<parser id="article" html="{{html}}" bindload="load" />
\`\`\`
\`\`\`javascript
Page({
  load() {
    var context = this.selectComponent("#article");
    // 通过 context 调用 api 函数
  }
})
\`\`\`
1. \`getText\`  
  功能：获取所有文本内容  
  \`\`\`javascript
  // context 为组件实例
  var text = context.getText();
  console.log(text)
  \`\`\`
2. \`navigateTo\`  
  功能：跳转锚点  
  输入值：一个\`object\`，\`id\`为锚点的\`id\`（为空时将跳转到组件顶部），\`offset\`为偏移量，\`success\`和\`fail\`是成功和失败的回调  
  为确保跳转位置准确，建议在\`ready\`事件中或之后使用  
  \`\`\`javascript
  // context 为组件实例
  context.navigateTo({
    id: "anchor",
    success: console.log,
    fail: console.error
  })
  \`\`\`
3. \`in\`  
  功能：将锚点跳转的范围限定在一个\`scroll-view\`内（默认相对于页面跳转）  
  输入值：一个\`object\`，\`selector\`为该\`scroll-view\`的选择器，\`page\`为\`scroll-view\`所在页面或组件的实例，\`scrollTop\`为\`scroll-top\`属性绑定的变量名  
  \`\`\`wxml
  <scroll-view id="scroll" scroll-y scroll-top="{{top}}" scroll-with-animation style="height:300px">
    <parser id="article" html="{{html}}" use-anchor />
  </scroll-view>
  \`\`\`
  \`\`\`javascript
  Page({
    onLoad() {
      this.selectComponent("#article").in({
        page: this,
        selector: "#scroll",
        scrollTop: "top"
      })
      // 之后的锚点跳转都会在这个 scroll-view 内部滚动
    }
  })
  \`\`\`
4. \`getVideoContext\`  
  功能：获取视频的\`context\`对象  
  输入值：\`video\`标签的\`id\`（不输入则返回所有视频的数组）  
  \`\`\`javascript
  // context 为组件实例
  var video = context.getVideoContext("the-id"); // id 为 the-id 的视频对象
  var videos = context.getVideoContext(); // 获取所有视频的对象
  \`\`\`
5. \`imgList\`  
  功能：获取所有图片地址的数组（这是一个属性）  
  另外，该数组还提供一个\`each\`方法修改值，该数组用于图片的预览，可以通过此方法设置预览时的大图  
  \`\`\`javascript
  // context 是组件实例
  var imgList = context.imgList;
  var cover = imgList[0]; // 首图作为转发封面
  imgList.each((src, i, arr) => {
    console.log(src);
    // 若有 return 将改变原数组，可将缩略图链接替换为大图链接
    return src.replace("thumb", "");
  })
  \`\`\`
6. \`rect\`  
  功能：获取整体的大小和位置（这是一个属性）  
  \`\`\`javascript
  // context 是组件实例
  var rect = context.rect;
  console.log(rect.height); // 高度
  \`\`\`
7. \`setContent\`  
  功能：设置富文本的内容（功能上同\`html\`属性，尾部追加时性能更佳）  
  输入值：\`html\`是富文本字符串，\`append\`表示是否在尾部追加  
  \`\`\`javascript
  // context 是组件实例
  var html = "<div>Hello World!</div>";
  context.setContent(html);
  \`\`\`

详细可见：[api](https://jin-yufeng.github.io/Parser/#/instructions?id=api)  
</br>

## 配置项  
支持在\`config.js\`中配置一些全局配置  
1. \`errorImg\`  
  图片出错时的占位图  
2. \`filter\`  
  功能：过滤器函数，可对任意标签进行自定义处理  
  输入值：\`node\`是解析的标签，\`context\`是解析器实例  
  返回值：若返回\`false\`将移除该标签  
  \`\`\`javascript
  filter(node, ctx) {
    if(node.name == "xxx") return false; // 将移除 xxx 标签
    if(node.name == "yyy") ctx.bubble(); // 不能被 rich-text 包含的标签需要调用此方法
  }
  \`\`\`
3. \`highlight\`  
  功能：处理代码高亮  
  输入值：\`content\`为\`pre\`标签的内容，\`attrs\`为\`pre\`标签的属性列表  
  返回值：高亮处理后的结果  
  \`\`\`javascript
  highlight(content, attrs) {
    attrs["data-content"] = content; // 记录原始文本，可用于长按复制
    if(attrs.lan)
      return Prism.highlight(content, Prism.languages[attrs.lan], attrs.lan);
    else
      return content;
  }
  \`\`\`
4. \`onText\`  
  功能：处理文本  
  输入值：\`text\`是解析到的文本，\`hasTag\`是一个函数，若返回值中有标签需要调用，将重新解析这段内容  
  返回值：处理后的结果  
  \`\`\`javascript
  onText(text, hasTag) {
    if(text.includes("$math$")) {
      hasTag();
      retrun text.replace("$math$", "<img src='xxx.jpg'>"); // 替换数学公式符号为图片
    }
  }
  \`\`\`

</br>

## 使用外部样式  
如果需要引入\`wxss\`中的外部样式，需要写在\`parser/trees/trees.wxss\`中，且只能使用\`class\`选择器  
</br>

## 扩展包  
本插件在\`patches\`文件夹中提供了一些可选的扩展包，可以实现更加丰富的功能  
1. \`emoji\`  
  功能：将形如 [\`笑脸\`] 的文本解析为\`emoji\`小表情[笑脸]  
2. \`document\`  
  功能：实现类似\`web\`中的\`document\`对象  
  \`\`\`wxml
  <parser id="article" html="{{html}}" binderror="error" />
  \`\`\`
  \`\`\`javascript
  Page({
    data: {
      html: "...<div id='adContainer'><ad unit-id='...'></ad></div>..."
    },
    error(e) {
      // 广告组件加载出错
      if(e.detail.source == "ad") {
        var document = this.selectComponent("#article").document;
        document.getElementById("adContainer").setStyle("display", "none");
      }
    }
  })
  \`\`\`
3. \`CssHandler\`  
  功能：支持匹配更多\`style\`标签中的选择器  

  | 名称 | 示例 |
  |:---:|:---:|
  | 通配符 | * |
  | 后代选择器 | .the-class1 .the-class2 |
  | 子选择器 | .the-class1>.the-class2 |
  | 属性选择器 | [name="123"] |
  | before 伪类 | .the-class::before |
  | after 伪类 | .the-class::after |
  | @media 查询 | @media(min-width:300px) |

4. \`parser-group\`  
  功能：将多个\`parser\`标签组合在一起，实现图片、锚点等的互通  
5. \`audio\`  
  功能：音乐播放器，替代被废弃的\`audio\`标签，并进行了一些优化  
  <div style="text-align:center;margin-left:-20px">
    <audio poster="https://6874-html-foe72-1259071903.tcb.qcloud.la/music.jpg?sign=fcc5ef3dc42d606ea54064f0291eb4b6&t=1584979825" name="致爱丽丝" author="暂无" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/music.mp3?sign=ee1a9895e9421d296cda186b17f0de22&t=1584979840" controls loop style="margin:0.8em 0"></audio>
  </div>

6. \`search\`  
  功能：关键词搜索并高亮显示，[立即体验](../demo/demo?index=0&search=true)

详细可见：[扩展包](https://jin-yufeng.github.io/Parser/#/instructions?id=扩展包)  
</br>

## 基础库要求  

| 版本 | 功能 | 占比 |
|:---:|:---:|:---:|
| <2.7.1 | 不支持图片长按菜单</br>不支持 bdi bdo ruby 标签 | 1.18% |
| <2.4.4 | 不支持 a 标签的 visited 效果 | 0.19% |
| <2.2.5 | 不支持部分实体编码 | 0.08% |
| <1.6.3 | 无法使用 | <0.01% |

</br>

## 下载链接  
许可：MIT License  
获取：[https://github.com/jin-yufeng/Parser](https://github.com/jin-yufeng/Parser)  
</br>
<div style="display:flex;justify-content:center;margin:0 5%">
  <a href="page0">上一章：功能介绍</a>
  <div style="flex:1"></div>
  <a href="page2">下一章：更新日志</a>
</div>`,
`- 2020.7.28  
  1. \`A\` 增加了\`search\`扩展包，可以进行关键词搜索并高亮显示
  2. \`U\` 优化了解析过程，含有换行的空字符串将被去除以减小大小
  3. \`F\` 修复了\`getText\`方法可能无法使用的问题
  4. \`F\` 修复了\`ul\`中\`li\`的黑块可能被复制的问题
  5. \`F\` 修复了通过\`document\`扩展包进行修改时设置了懒加载的图片可能闪一下的问题
</br></br>
- 2020.7.19  
  1. \`A\` 发布了\`npm\`包
  2. \`F\` 修复了\`svg\`的\`viewBox\`属性小写无法生效的问题
  3. \`F\` 修复了图片层级过高，无法被遮盖的问题
</br></br>
- 2020.7.12  
  1. \`A\` 增加了\`in\`的\`api\`，可以将锚点跳转的范围限定在一个\`scroll-view\`内
  2. \`U\` 支持识别\`xml\`声明（\`<?xml\`）
  3. \`F\` 修复了\`sub\`和\`sup\`标签可能被错误换行的问题
  4. \`F\` 修复了\`audio\`扩展包设置\`autoplay\`时状态不正确的问题
</br></br>
- 2020.6.30
  1. \`F\` 修复了个别情况下图片样式异常的问题
  2. \`F\` 修复了个别情况下会出现多余的换行的问题
</br></br>
- 2020.6.15
  1. \`D\` \`html\`属性不再支持\`Array\`类型
</br></br>
- 2020.6.11
  1. \`F\` 修复了\`ios\`端图片长按可能导致页面失去响应的问题
  2. \`D\` 移除了\`trustAttrs\`的配置项，改为自动移除\`data-\`开头的属性
</br></br>
- 2020.5.28
  1. \`F\` 修复了属性名后有空格会无法识别的问题
  2. \`F\` 修复了\`img\`没有设置\`src\`会报错的问题
</br></br>
- 2020.5.24
  1. \`A\` 增加\`loading-img\`属性，可以设置图片加载完成前的占位图
  2. \`A\` 增加\`errorImg\`的配置项，可以设置图片出错时的占位图
  3. \`D\` \`error\`事件中不再返回\`context\`对象
</br></br>
- 2020.5.21
  1. \`U\` 支持\`embed\`标签（\`type\`中含\`video\`或后缀名为\`.mp4\` \`.3gp\` \`.m3u8\`的将被转为视频；\`type\`中含\`audio\`或后缀名为\`.m4a\` \`.wav\` \`.mp3\` \`.aac\`的将被转为音频；其余不支持）
  2. \`U\` 音视频既没有设置\`autoplay\`也没有设置\`controls\`将自动设置\`controls\`，避免无法播放
  3. \`F\` 修复了锚点无法跳转到\`li\`和\`a\`标签的问题
  4. \`F\` 修复了部分情况下\`svg\`标签\`style\`中的\`vertical-align\`无法生效的问题
  5. \`F\` 修复了未闭合的标签如果是\`rich-text\`不支持的标签可能无法显示的问题
  6. \`F\` 修复了\`error\`事件中通过\`setSrc\`重设图片地址后无法预览的问题
  7. \`F\` 修复了个别情况下可能出现\`null is not an object\`错误的问题
</br></br>
- 2020.5.13
  1. \`A\` 增加了\`autoscroll\`属性，可以给所有表格添加一个滚动层
  2. \`U\` \`a\`标签可以跳转到\`tabbar\`页面
  3. \`U\` 通过\`stylelint\`规范\`css\`的写法
  4. \`D\` 去除了\`gesture-zoom\`属性
  5. \`D\` 去除了\`preLoad\`的\`api\`
</br></br>
- 2020.5.11
  1. \`F\` 修复了电脑端\`rpx\`可能换算不正确的问题
  2. \`F\` 修复了上一版本个别情况下可能出现\`Cannot read property 'name' of undefined\`的问题
</br></br>
- 2020.5.8
  1. \`F\` 修复了个别情况下空格被错误过滤的问题
  2. \`D\` 移除了\`xml\`属性（\`svg\`标签默认按\`xml\`方式解析，可以以\`&lt;svg />\`方式结束）
  3. \`D\` 取消对\`picture\`标签的支持
</br></br>
- 2020.5.6
  1. \`F\` 修复了\`CssHandler\`扩展包后代选择器优先级低于\`id\`选择器的问题
</br></br>

更多信息可见：[更新日志](https://jin-yufeng.github.io/Parser/#/changelog)  
</br>
<a style="display:block;text-align:center" href="page1">上一章：使用方法</a>`]