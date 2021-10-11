# 功能介绍

## ⏳ 渲染效果 :id=show
1. *加载提示*  
   支持在 *mp-html* 标签内部放上自定义的加载提示，内容未加载完成（或为空）时将显示，加载完成后自动隐藏  
   ```wxml
   <mp-html>加载中...</mp-html>
   ```
2. *自动设置标题*  
   支持自动把 *title* 标签的内容设置到页面标题上，如不需要，可通过 [set-title](basic/prop#set-title) 属性关闭  
3. *长按复制*  
   支持长按复制文本内容，可通过 [selectable](basic/prop#selectable) 属性开启  
4. *支持 rpx*  
   支持 *rpx* 作为单位，自动根据屏幕宽度调整  
5. *支持 html 实体*  
   支持所有形如 *&amp;#123;* 的 *html* 实体和大部分常用的形如 *&amp;nbsp;* 的实体  
   

## 📰 图片效果 :id=img
1. *占位图*  
   支持设置图片未加载完成时的占位图 [loading-img](basic/prop#loading-img) 和加载出错时的占位图 [error-img](basic/prop#error-img)  
2. *懒加载*  
   内容较长、图片较多时，开启懒加载有助于改善性能，需要时可通过 [lazy-load](basic/prop#lazy-load) 属性开启  
3. *自动预览*  
   图片被点击时，将自动放大预览，如不需要，可通过 [preview-img](basic/prop#preview-img) 属性关闭。还可以在 [imgtap](basic/event#imgtap) 事件中进行自定义处理    
   自动预览通过特定的处理，可以实现左右滑动查看所有图片、预览重复链接不错位等效果  
4. *预览高清图*  
   同一张图片，可以给显示时和预览时设置不同的链接地址以达到最佳效果  
   设置方式 1：给 *img* 标签增加一个 *original-src* 即可  
   ```html
   <!-- 显示时使用 xxx，预览时使用 yyy -->
   <img src="xxx" original-src="yyy" />
   ```
   设置方式 2：通过 [imgList](advanced/api#imgList) 的 *api* 进行设置  
5. *长按弹出菜单*  
   微信和百度平台支持图片长按时弹出菜单，可以进行保存、分享等操作，如不需要，可通过 [show-img-menu](basic/prop#show-img-menu) 属性关闭  
6. *装饰图片处理*  
   有时对于一些小的装饰性图片，可能不希望产生上述效果，此时可以给 *img* 标签设置 *ignore* 属性，将屏蔽预览、弹出菜单等操作，提升体验  
   ```html
   <!-- 设置 ignore 属性后这张图片不可预览、不会弹出菜单 -->
   <img src="xxx" ignore />
   ```
   在链接内的、*src* 为 *data url* 且没有设置 *original-src* 的图片，默认为不可预览的小图片  
7. *支持原大小显示*  
   本组件通过合理转换，基本实现了和 *html* 中 *img* 的相同效果：没有设置宽度时按原大小显示；设置了宽度时按比例缩放；同时设置宽高时按设置的值显示。不必去考虑小程序中的 *mode* 等问题  
8. *支持 svg*  
   虽然小程序中不支持 *svg* 系列标签，本组件通过在解析过程中转为 *data url* 图片的方式实现了 *svg* 的显示  

## 🔗 链接效果 :id=link
1. *支持设置多种状态下的样式*  
   包括默认状态、点击态的样式，可以在 *src/node/node.wxss* 中进行修改  
2. *锚点跳转*  
   支持跳转内部锚点，使用锚点需要开启 [use-anchor](basic/prop#use-anchor) 属性  
   跳转方式 1：给 *a* 标签的 *href* 属性设置为 *#id*，点击时即可跳转到对应 *id* 的位置（设置为 *#* 则跳转到开头）  
   跳转方式 2：通过 [navigateTo](advanced/api#navigateTo) 的 *api* 进行跳转  
   默认情况下锚点跳转通过控制页面滚动的方式进行，如果要在 *scroll-view* 内使用，可以通过 [in](advanced/api#in) 的 *api* 进行配置  
3. *跳转内部路径*  
   如果需要点击 *a* 标签跳转到小程序内的一个页面，直接将其 *href* 属性设置为页面路径即可（包括 *tab* 页面）  
   ```html
   <!-- 该链接被点击后将跳转到 pages/test/test 页面 -->
   <a href="pages/test/test">链接</a>
   ```
4. *复制外部链接*  
   对于外部链接，由于小程序无法直接打开，将自动复制到剪贴板，如不需要，可通过 [copy-link](basic/prop#copy-link) 属性关闭  

?> 设置 *a* 标签的 *href* 属性时，如果是外部链接需将协议名 *http://* 写完整，否则会被认为是内部路径并尝试跳转  
除这些默认的处理外，还可以在 [linktap](basic/event#linktap) 事件中进行自定义处理  

## 📈 表格效果 :id=table
1. *支持独立横向滚动*  
   表格宽度通常较大，容易超出屏幕宽度，导致整体内容一起滚动，影响体验，可以通过设置 [scroll-table](basic/prop#scroll-table) 属性给所有表格添加一个滚动层使其能单独横向滚动  
2. *支持常用表格属性*  
   支持 *border*, *cellspacing*, *cellpadding*, *align* 等常用表格属性  
3. *支持含有合并单元格的表格*  
   
附渲染原理：   
小程序中没有 *table* 标签，使得显示表格一直是一个难题，本组件主要通过以下三种方式显示表格  

| 显示方式 | 适用情况 | 说明 |
|:---:|:---:|:---:|
| *rich-text* 标签 | 表格内部没有链接、图片等特殊标签 | 效果最佳，几乎不需要进行转换 |
| *table* 布局 | 表格内有特殊标签但没有使用合并单元格 | 需要进行一定转换，将 *table*, *tr*, *td* 等标签转为对应的布局 |
| *grid* 布局 | 表格内有特殊标签且使用了合并单元格 | 需要进行复杂的转换将合并单元格用 *grid* 布局表现出来 |

## 📊 列表效果 :id=list
1. *支持多层嵌套*  
   支持嵌套多层列表，对于无序列表，不同的层级会显示不同的黑点格式  
2. *支持多种有序列表格式*  
   通过设置 *ol* 标签的 *type* 属性，可以显示数字、字母、罗马数字等多种形式的标号  
3. *支持不显示标号*  
   支持通过设置 *list-style:none* 的方式不显示 *li* 标签开头的标号  

## 🎬 音视频效果 :id=video  
1. *自动暂停*  
   在存在多个视频的情况下，同时播放可能会影响体验，本组件支持在播放一个视频的时候自动暂停其他所有视频，如不需要，可通过 [pause-video](basic/prop#pause-video) 属性关闭  
   音频在引入 [audio](advanced/plugin#audio) 插件后也可以实现此效果  
2. *多源加载*  
   不同平台支持播放的格式不同，只设置一个 *src* 可能会出现兼容性问题导致无法播放，因此本组件支持像 *html* 中一样给 *video* 和 *audio* 设置多个 *source*，将按照顺序进行加载，直到可以播放，最大程度上避免无法播放  
   ```html
   <!-- 组件将依次加载 xxx 和 yyy -->
   <video controls>
     <source src="xxx">
     <source src="yyy">
   </video>
   ```
3. *自动添加控件*  
   对于既没有设置 *controls* 也没有设置 *autoplay* 的标签将自动把 *controls* 属性设置为 *true*，避免无法播放，影响体验  

## 📡 样式设置 :id=style
样式（*css*）是富文本中最重要的内容之一，本组件提供多种样式设置的方法，可以进行灵活的设置  

1. *行内样式*  
   这是最常用的样式设置方法，直接将需要的样式放在对应标签的 *style* 属性中即可，这种方式仅作用于单个标签，优先级最高  
2. *tag-style*  
   这是本组件独有的一种样式设置方式，可以给某一种标签名设置默认的样式  
   可以通过 [tag-style](basic/prop#tag-style) 属性设置，具体用法见对应说明  
3. *外部样式*  
   如果希望将某些样式固定的用于渲染，可以添加到 *tools/config.js* 的 *externStyle* 字段中，该方法仅支持 *class* 选择器（[2.1.0](changelog/changlog#v210) 版本起支持标签名选择器），优先级最低，具体见 [个性化](overview/quickstart#setting)  

需要调整优先级时，可以通过设置 *!important* 实现  

另外，通过引入 [style](advanced/plugin#style) 插件，还可以实现匹配 *style* 标签中样式的功能  

## 🍭 全面的标签支持 :id=tag
本组件支持以下标签和属性：  

| 标签 | 属性 |
|:---:|:---:|
| a | href |
| abbr |  |
| address |  |
| article |  |
| aside |  |
| audio | author, controls, loop, name, poster, src |
| b |  |
| base | href |
| big |  |
| blockquote |  |
| body |  |
| br |  |
| caption |   |
| center |  |
| cite |  |
| code |  |
| col | span |
| colgroup | span |
| dd |  |
| del |  |
| div |  |
| dl |  |
| dt |  |
| em |  |
| embed | autostart, loop, src, type |
| fieldset |  |
| font | color, face, size |
| footer |  |
| h1 |  |
| h2 |  |
| h3 |  |
| h4 |  |
| h5 |  |
| h6 |  |
| head |  |
| header |  |
| hr |  |
| html |  |
| i |  |
| img | ignore, original-src, src |
| ins |  |
| label |  |
| legend |  |
| li |  |
| mark |  |
| nav |  |
| ol | start, type |
| p |  |
| pre |  |
| q |  |
| rt |  |
| ruby |  |
| s |  |
| section |  |
| small |  |
| source | src |
| span |  |
| strike |  |
| strong |  |
| style |  |
| sub |  |
| sup |  |
| table | border, cellpadding, cellspacing |
| tbody |  |
| td | colspan, rowspan |
| tfoot |   |
| th | colspan, rowspan |
| thead |  |
| tr |  |
| tt |  |
| u |  |
| ul |  |
| video | autoplay, controls, loop, muted, poster, src |

说明：  
1. 除上面列举的外，还支持 *svg* 系列的标签和 *id*、*style*、*class*、*align*、*height*、*width*、*dir* 属性  
2. 对于不信任的标签，除个别将被直接移除，都会被转为一个行内标签，因此可以使用更多语义化标签  

## 🌟 稳定性 :id=stable  
本组件的解析脚本能够支持多种 *html* 格式，具有强大的稳定性：  
1. 标签名中可以含有 *:* 等特殊字符（如 *o:p*）  
2. 标签名和属性名大小写不敏感  
3. 属性值可以不加引号、加单引号、加双引号，也可以缺省（默认 *true*）  
4. 属性之间可以没有空格（通过引号划分）、有空格（可以多个）、有换行符  
5. 支持正常格式、*CDATA* 等多种形式的注释  

同时，对于一些错误情况，程序也能够自动处理：  
1. 标签首尾不匹配  
2. 属性值中冒号不匹配  
3. 标签未闭合  

以下情况均能正确解析：  
```html
<!-- 不同的属性格式 -->
<font face="宋体" color='green' size=7>Hello</font>
<!-- 标签首尾不匹配或未闭合 -->
<div> World</section>
<!-- 大小写搭配 -->
<dIv StYle="color:green">!</DIv>
```
