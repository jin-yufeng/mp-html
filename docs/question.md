## 疑问解答 {docsify-ignore} ##

### 常见问题 ###

#### 连续图片间有间隙 ####
*问题描述：*  
多张图片连续排列时，中间会有一条缝隙  

*问题原因：*  
由于 `img` 的默认 `display` 是 `inline-block`，每张图片的底部会有空隙，如果不需要，可以对该 `img` 设置 `display:block`  
  
*解决方案：*  
- 设置行内样式  
  直接在需要的 `img` 的 `style` 属性中添加  
- 通过 `style` 标签添加
  ```html
  <style>
  /* 对所有图片生效 */
  img {
    display:block;
  }
  /* 对特定 class 的图片生效 */
  .xximg {
    display:block;
  }
  </style>
  <img class="xximg" src="xxxx" />
  ```
- 通过 `tag-style` 属性添加（将对该 `parser` 标签内所有图片生效）  
  ```wxml
  <parser html="{{html}}" tag-style="{{tagStyle}}"></parser>
  ```
  ```javascript
  data: {
    tagStyle: {
      img: "display:block"
    }
  }
  ```
- 通过 `wxss` 设置  
  将 `trees.wxss` 中的 `._img` 增加（将对所有 `parser` 标签生效）  
  ```css
  ._img {
    ...
    display: block;
  }
  ```  

如果加了还不生效可能是优先级的问题，可以尝试再加一个 `!important`  
  
*相关 issue：*[#25](https://github.com/jin-yufeng/Parser/issues/25)、[#65](https://github.com/jin-yufeng/Parser/issues/65)、[#74](https://github.com/jin-yufeng/Parser/issues/74)

#### editor 编辑出的内容无法正常显示 ####
*问题描述：*  
如果直接将 [editor 组件](https://developers.weixin.qq.com/miniprogram/dev/component/editor.html) 编辑产生的 `html` 用于本插件，可能无法正确显示  

*问题原因：*  
`editor` 编辑产生的 `html`，若要正确显示，需要维护指定的结构，还要引入对应的 `css`，详见 [官网说明](https://developers.weixin.qq.com/miniprogram/dev/component/editor.html)  

*解决方案：*
- 复杂方案  
  维护 `<ql-container><ql-editor></ql-editor></ql-container>` 的结构，并引入对应的 `css`；另外，由于组件中仅支持 `class` 选择器，还需要将标签名选择器等转为 `class` 选择器  
- 简单方案  
  大部分情况下，只需要在 `config.js` 的 [filter](/instructions#filter) 函数中添加以下内容即可（个别情况自行调整）：
  ```javascript
  filter(node) {
    if ((node.attrs.class || '').includes('ql')) {
      node.attrs.class = node.attrs.class.replace(/ql-align-(\S+)/, ($, $1) => {
        node.attrs.style += ';text-align:' + $1;
      }).replace(/ql-indent-([1-9])/, ($, $1) => {
        node.attrs.style += ';padding-left:' + (parseInt($1) * 2) + 'em';
      })
    }
  }
  ```

#### 出现横向滚动条 ####  
*问题描述：*  
从其他网站或编辑器中移植富文本时可能因为手机屏幕宽度小而导致内容超出宽度出现滚动条  
  
*解决方案：*  
- 禁用滚动  
  在 `parser` 标签的 `style` 属性中加上 `overflow: hidden`（如果通过 `class` 设置还要加上 `!important`）即可禁用横向滚动  
  ```wxml
  <parser style="overflow:hidden" html="{{html}}"></parser>
  ```  
- 通过 `tag-style` 设置 `max-width:100%`  
  ```wxml
  <parser html="{{html}}" tag-style="{{tagStyle}}"></parser>
  ```
  ```javascript
  data: {
    tagStyle: {
      p: "max-width:100%",
      div: "max-width:100%",
      section: "max-width:100%"
    }
  }
  ```  
- 通过 [filter](/instructions#filter) 方法个别调整样式  

*相关 issue：*[#6](https://github.com/jin-yufeng/Parser/issues/6)、[#44](https://github.com/jin-yufeng/Parser/issues/44)、[#50](https://github.com/jin-yufeng/Parser/issues/50)、[#66](https://github.com/jin-yufeng/Parser/issues/66)

#### 表格中的链接无法点击 ####
*问题描述：*  
使用了 `colspan` 或 `rowspan` 的表格，其中的链接和图片无法点击  

*问题原因：*  
小程序中不支持使用 `table` 标签，这使得显示 `table` 成为一个难题，目前的处理如下：  
对于没有使用 `colspan` 和 `rowspan` 的 `table`，将被转为如下结构，可以实现和 `table` 相同的效果：  
```wxml
<view style="display:table">
  <view style="display:table-row">
    <view style="display:table-cell">
      单元格
    </view>
    <view style="display:table-cell">
      单元格
    </view>
  </view>
</view>
```

但这无法实现 `colspan` 和 `rowspan` 的效果（没有 `css` 可以实现），因此只能通过 `rich-text` 显示，其中的图片、链接无法点击，也无法使用音视频  

*临时解决方案：*  
1. 不在使用了 `colspan` 和 `rowspan` 的表格中使用图片、链接等  
2. 自行将其用其他标签实现（就个例而言，还是可以通过 `flex` 布局实现的，但很难有一个通用的模板）  

#### 表格没有边框 ####  
*问题描述：*  
表格没有边框  

*问题原因：*  
一些编辑器可能给表格加上了默认的边框（需要引入相应的 `css` 才能正确显示），如果希望在显示时也给所有表格加上边框，可参考以下方法  

*解决方案：*  
- 通过 [tag-style](/features#设置默认的标签样式) 属性设置  
- 通过 [filter](/instructions#filter) 方法设置  
  ```javascript
  filter(node) {
    if(node.name == 'table') {
      // 这种方式更灵活，可以根据具体情况决定是否加边框
      if(!(node.attrs.class || '').includes('noBorderTable'))
        node.attrs.border = '1'; // 注意不能设置成数字
    }
  }
  ```

#### 懒加载不生效 ####
*问题描述：*  
图片的懒加载效果没有生效  

*问题原因：*  
- 检查是否设置了 `lazy-load` 属性（或者 `lazyLoad`，但不能是 `lazyload`）  
- 检查富文本内容是否足够长，不够长会被一次性加载（加载时机：`H5` 和 `App` 为屏下 `500px`，小程序中同 `image` 的懒加载时机）  
- 一些平台懒加载加载时机较早，可能不能直观的看到效果，可以在 `Network` 面板查看图片请求时间  

*相关 issue：*[#30](https://github.com/jin-yufeng/Parser/issues/30)、[#118](https://github.com/jin-yufeng/Parser/issues/118)

#### 无法使用 iframe 视频 ####
*问题描述：*  
除 `uni-app` 包编译到 `H5` 和 `App(v3)` 端外，均无法使用 `iframe` 标签  

*问题原因：*  
因为 `iframe` 视频的地址并不是真实的视频地址，其内容是 `js` 动态加载出来的，小程序上既无法操作 `dom` 也无法执行动态的 `js`（`eval`），因此无法实现  

*解决方案：*  
- 改用 `video` 标签  
- 使用 [腾讯视频插件](https://developers.weixin.qq.com/community/develop/doc/000ece3c044210190ef61a4a954c09?highLine=%25E8%2585%25BE%25E8%25AE%25AF%25E8%25A7%2586%25E9%25A2%2591)  
  微信小程序中可以考虑使用腾讯视频插件代替（参考 [添加自定义标签](/instructions#添加一个自定义标签)、[#103](https://github.com/jin-yufeng/Parser/issues/103)）  

*相关 issue：*[#96](https://github.com/jin-yufeng/Parser/issues/96)、[#156](https://github.com/jin-yufeng/Parser/issues/156)  

#### 无法禁用自动预览 / 跳转 ####
*问题描述：*  
默认情况下，图片受到点击时会自动预览，链接受到点击时会自动进行跳转/复制链接；某些情况下，可能不希望如此处理  

*解决方案：*    
禁用自动预览：  
1. 给 `img` 标签增加 `ignore` 属性（如 `<img src="xxx" ignore>`），通过这种方法，点击无法预览，且其他图片预览时 **无法通过左右滑动** 看到这张图片（也无法从 [imgList](/instructions#imgList) 中获取），且 **懒加载、占位图都会失效**  
2. 在 `imgtap` 事件中调用 `ignore` 函数，通过这种方法将不会自动预览，但其他图片预览时 **仍可以** 通过左右滑动看到这张图片  

禁用自动跳转/复制链接：  
在 `linkpress` 事件中调用 `ignore` 函数，即可禁用自动跳转  

头条小程序中，`imgtap` 和 `linkpress` 事件中无法获得 `ignore` 函数，如有需要，要通过 `global.Parser.onxxx` 接收，更多可见 [事件](/instructions#关于-ignore-方法) 中的相关说明  

*相关issue：*[#51](https://github.com/jin-yufeng/Parser/issues/51)、[#166](https://github.com/jin-yufeng/Parser/issues/166)

#### 标签原样显示 ####
*问题描述：*  
解析后标签还是原样显示  

*问题原因：*  
最大的可能是 `html` 字符串被转义，`<` 和 `>` 被转义为 `&lt;` 和 `&gt;`  

*解决方案：*  
自行全局替换一下  
```javascript
html = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
```

组件内部不会对此进行处理，因为在 `html` 中使用实体就是为了不被解析为标签  

*相关 issue：*[#97](https://github.com/jin-yufeng/Parser/issues/97)

#### 长内容卡顿 ####
*问题描述：*  
当富文本内容过长时，可能出现卡顿等问题  

*解决方案：*  
1. 分页处理  
   自行进行分页，每页显示适当长度的内容  
2. 触底加载更多  
   先渲染一部分，滑动到底部时，通过 [setContent](/instructions#setContent) 方法，设置 `append` 为 `true` 即可在尾部追加内容（这种方法只能避免一次性加载过多标签，不能解决总标签数过多的问题）  
3. 通过 [recycle-view](https://developers.weixin.qq.com/miniprogram/dev/extended/component-plus/recycle-view.html) 显示  
   将内容拆分成多个章节（需要提供每个章节的高度），每个章节用一个 `parser` 标签显示，还可以通过 [parser-group](#parser-group) 将所有章节的 `parser` 组合在一起  
   ```wxml
   <parser-group>
     <recycle-view batch="{{batchSetRecycleData}}" id="recycleId">
       <recycle-item wx:for="{{recycleList}}" wx:key="id">
         <parser html="{{item.content}}" />
       </recycle-item>
     </recycle-view>
   </parser-group>
   ```

为什么没有采用异步渲染：  
如果只是在初始时分批次 `setData` 设置数据（不加延时）：
1. 可能导致短时间内发起过多的 `setData`  
2. 这样虽然可以先显示一部分出来，但此时由于仍在进行 `setData`，可能导致卡顿，影响体验  

如果先显示一部分，剩余的延迟渲染（如根据滑动位置）：
1. 难以确定初次渲染的范围（未渲染前无法知晓元素的高度，若渲染过多则没有意义，若渲染过少则可能影响体验）  
2. 滑动的时候难以直观看到整体高度（因为只渲染了一部分，也无法知晓总高度）  

另外，异步渲染还存在增加处理难度、无法解决过长内容节点数过多等问题  

#### 连续空格无效 ####
*问题描述：*  
使用连续的空格在显示时会被合并成一个空格  

*问题原因：*  
在 `html` 中默认会合并空白符  

*解决方案：*  
- 使用实体编码的空格  
  可以用 `&nbsp;`、`&ensp;`、`&emsp;` 来替换空格，可以实现连续多个空格（可以通过正则全局替换）  
  ```javascript
  html = html.replace(/ /g, '&ensp;');
  ```
- 给需要的内容的 `style` 设置 `white-space:pre-wrap`  
  ```javascript
  html = '<div style="white-space:pre-wrap">' + html + '</div>'
  ```

!>如果通过 [外部样式](/instructions#使用外部样式) 设置 `white-space`，可能无法生效，因为在解析过程中，为减小解析结果大小，会提前合并空白格  

*相关 issue：*  
[#148](https://github.com/jin-yufeng/Parser/issues/148)、[#157](https://github.com/jin-yufeng/Parser/issues/157)

#### 换行符无效 ####  
*问题描述：*  
使用 `↵`, `\n` 等换行符都无效并原样显示  

*问题原因：*  
`html` 中换行只能使用 `br` 标签，其他的只会原样显示  

*解决方案：*  
- 通过正则替换（传入前）  
  ```javascript
  // 以 ↵ 为例
  html = html.replace(/↵/g,''); // 移除所有 ↵
  html = html.replace(/↵/g,'<br>'); // 全部替换为 br 标签
  ```
- 通过 [onText](/instructions#onText) 方法处理  
  ```javascript
  onText(text) {
    if(text.includes('↵'))
      return text.replace(/↵/g,''); // 移除所有 ↵
  }
  ```

#### style 标签中的样式没有生效 ####
*问题描述：*  
一些写在 `style` 标签里的样式没有生效  

*问题原因：*  
处理 `style` 标签并非是动态写入 `css`（小程序中无法动态写入 `css`），而是在程序中将样式匹配到各个标签的 `style` 属性里（因此像 `@keyframes` 这种不能写在行内样式中的还无法实现），因此并非支持所有选择器，需要关注一下支持的选择器类型，不支持的选择器将被忽略  

*解决方案：*  
使用 [CssHandler](/instructions#CssHandler) 扩展包后可以支持更多选择器（但也不是全部）  

#### 不能正确显示一些网页 ####
*问题描述：*  
若直接将一些网页源码传给组件，可能无法正确显示  

*问题原因：*  
1. 一些网站的结构十分复杂，本插件不一定能够处理  
2. 很多网站的内容是在 `js` 中动态加载出来的，但本插件中 `script` 是直接忽略的（因为小程序中无法执行动态 `js` 也无法操作 `dom`）  

本插件并不能替代 `web-view` 的功能，仅建议用于富文本编辑器编辑的富文本或简单的静态网页  

#### 无法编辑 / 没有配套的编辑器 ####
本插件仅支持显示富文本，没有编辑功能  
本插件没有专门配套的富文本编辑器，一般来说，能够导出 `html` 的富文本编辑器都是支持的（一些编辑器可能带有一些默认的 `css`，处理方式可参考 [显示 editor 编辑的内容](#editor-编辑出的内容无法正常显示)）  

*相关 issue：*[#10](https://github.com/jin-yufeng/Parser/issues/10)

### 反馈问题 ###
在反馈问题前，请先通过以下方式尝试解决：  
1. 检查是否使用的是最新版的插件包  
2. 在 [常见问题](#常见问题) 中查找是否有此问题  
3. 在 [issues](https://github.com/jin-yufeng/Parser/issues) 中查找是否有相同问题  
4. 使用 [示例项目](https://github.com/jin-yufeng/Parser/tree/master/demo) 或微信小程序 [富文本插件](/features#案例体验) 中的自定义测试尝试是否也会出现相同的问题  
5. 在下框中输入 `html` 字符串进行测试（即直接用浏览器进行渲染，若也存在问题，请检查样式） 
 
  <textarea id="input" style="font-family:Consolas;height:200px;margin-bottom:.8em;padding:5px;width:100%" placeholder="请输入字符串"></textarea>
  <button onclick="parse()">解析</button>
  <button onclick="reset()" style="margin-left:10px">清空</button>
  <iframe id="frame" style="height:200px;margin-top:0"></iframe>  

如果以上方式无法解决问题，可通过以下方式反馈  
1. 在 `Github` 上 [提出 issue](https://github.com/jin-yufeng/Parser/issues/new/choose)，请注意按照模板要求详细描述问题（推荐，可以给他人提供经验）  
2. 在微信小程序 [富文本插件](#立即体验) 中的疑问解答 - 联系客服中联系我，请 **直接发送相关问题**，发送无意义内容将不会回复  

### 性能优化建议 ###
#### 利用缓存 ####
*问题描述：*  
传入的 `html` 为字符串类型时，需要先进行解析再进行渲染，解析会占用一定的时间，如果一个内容被多次打开，每次都进行一次解析会造成浪费，因此本插件设计了一个缓存机制，开启 [use-cache](/instructions#use-cache) 属性后，每次传入字符串时，先计算该字符串的哈希值，然后根据该哈希值查找是否已解析过，若已解析过则直接获取结果，若没有则进行解析并缓存结果  

*测试数据：*  
在多次打开时，设置缓存后的总耗时约为原来的 `75%`（节省了解析时间，详细数据见 [性能指标](/#性能指标)）  

*优化建议：*  
对于 `html` **内容较长** 且 **较大可能会多次打开** 的情况，建议打开 [use-cache](/instructions#use-cache) 属性  
但不要 **盲目设置**，因为缓存会占用一定的内存且计算哈希值也需要时间（非常短，主要是前者）  

#### 利用压缩 ####
*问题描述：*  
一些网站会设置大量的 `class` 和 `id`，这些可能在渲染后是毫无作用的，反而增加了解析结果的大小，减慢渲染速度。但插件不能直接移除它们，因为某些情况下会使用到，比如 `class` 用于匹配 [外部样式](/instructions#使用外部样式)，`id` 用于 [锚点跳转](/#设置锚点) 等，因此插件提供了 [compress](/instructions#compress) 属性供使用者选择是否移除  

*测试数据：*  
根据设置情况不同，能够减少的量有很大的差别，对于一个一般的网页，大约可以压缩 `10%` 以上  

*优化建议：*  
1. 如果没有使用锚点，且传入的内容中可能有很多 `id`，则将 [compress](/instructions#compress) 属性设置为 `1`  
2. 如果没有使用 [外部样式](/instructions#使用外部样式)，且传入的内容中可能有很多 `class`，则将 [compress](/instructions#compress) 属性设置为 `2`  
3. 如果上述两条都满足，就将 [compress](/instructions#compress) 属性设置为 `3`  

附：移除 `id` 和 `class` 不影响 `style` 标签中样式的匹配，但影响 [document](/instructions#document) 扩展包的选取  

#### 慎用锚点 ####
*问题描述：*  
开启锚点（`use-anchor` 属性）后会一定程度上减慢渲染速度。这与本插件原理有关，本插件对于节点下没有图片、链接等的，会直接通过 `rich-text` 显示，通过这种方式可以减少大量的标签，加快渲染速度。使用锚点时，需要知晓锚点的位置，但 `rich-text` 中的节点是无法被选取的，因此在开启 `use-anchor` 属性后，会把所有设置了 `id` 的节点都暴露出来，不被 `rich-text` 包含，这会一定程度上增加节点数量，减慢渲染速度  

*测试数据：*  
这个问题对性能的影响程度与设置方式有很大关系，如果设置了 `id` 的节点很少，或都是设置在图片、链接等本来就需要暴露出来的节点上时，就几乎没有影响；反之，如果设置了非常多的 `id`，且设置的层级比较深，就会增加大量的节点，引起一定的性能问题  
这里测试两种极端情况，一是不开启 `use-anchor` 属性，二是将所有节点都暴露出来（不使用 `rich-text`)，经测试，渲染时间二是一的约 `1.7` 倍（当然，实际情况不会如此极端，但可能产生一定的影响）  

*优化建议：*  
1. 如果没有使用到锚点，不要开启 `use-anchor` 属性  
2. 开启 `use-anchor` 属性后，尽量不要给非锚点的标签设置 `id` 属性  
3. 设置锚点标签的 `id` 时，尽量给外层标签设置（这样可以少暴露出一些节点，但如果该标签是图片、链接等本来就需要暴露出的节点的话则无影响）  

#### 慎用宽泛的选择器 ####
*问题描述：*  
本插件提供了通过 [tag-style](/instructions#tag-style) 属性和配置项中的 [userAgentStyles](/instructions#配置项) 来设置标签的默认样式，以及匹配 `style` 标签中的样式的功能。但小程序中是不能动态写入 `css` 的，这些功能都是通过解析到各个标签的 `style` 属性中去实现的，如果某个样式匹配上的标签非常多，这段样式就会被复制非常多份，导致解析结果大小大大增大，渲染速度减慢  

*测试数据：*  
若给 `section` 标签设置了一个默认样式 `margin:0;padding:0`，该段富文本中有 `100` 个 `section` 标签，那么解析结果大小就会增大 `1800` 个字符  

*优化建议：*  
1. 尽量避免对 `section`、`p`、`div` 等非常常用的标签设置默认样式，如果必要也应尽量简短  
2. `style` 标签中也应避免使用这些标签名选择器和通配符  

附：[外部样式](/instructions#使用外部样式) 没有这个问题，但外部样式只能使用 `class` 选择器  

#### 慎用后代选择器等复杂选择器 ####
*问题描述：*  
本插件提供了解析和匹配 `style` 标签中样式的功能，不过小程序中是无法动态写入 `css` 的，因此该功能实际上是在解析过程中直接匹配到各个标签的 `style` 属性中，默认情况下，为保证解析速度，只会处理几种简单的选择器（详见 [匹配 style 标签](/#匹配-style-标签)）。对于一些复杂的选择器，提供 [CssHandler](/instructions#CssHandler) 扩展包实现，不过，这会增加解析复杂程度，减慢解析速度  

*测试数据：*  
经测试，使用 [CssHandler](/instructions#CssHandler) 扩展包后，解析时间变为原来的约 `1.7` 倍（不过与渲染时间相比，解析时间还是占少数，具体可见 [性能指标](/#性能指标)）  

*优化建议：*  
1. 如果没有在 `style` 标签中使用后代选择器等复杂选择器，或者可以改为简单选择器的，不要使用  [CssHandler](/instructions#CssHandler) 扩展包  
2. 如果后代选择器中只使用了 `class` 选择器，可以写在 [外部样式](/instructions#使用外部样式) 里（外部样式支持后代选择器，但只支持 `class` 选择器）  
3. 如果需要使用 [CssHandler](/instructions#CssHandler) 扩展包且可能多次打开的，可以使用 [use-cache](/instructions#use-cache) 属性缓存解析结果  


### 体验优化建议 ###
#### 占位图 ####
*问题描述：*  
一些图片加载较慢，可能出现较长时间空白或变形等  
默认情况下，图片出错会不显示，若设置了 `alt` 属性，则显示其值  
这些情况下可能并不美观，影响体验  

*优化建议：*  
本插件支持设置加载完成前的占位图（通过 [loadingImg](/instructions#组件属性) 属性设置）和出错时的占位图（通过配置项中的 [errorImg](/instructions#配置项) 设置），通过合理设置可以有效提高用户体验  

#### 忽略装饰图 ####
*问题描述：*  
本插件对于图片的默认处理是点击时可以放大预览，预览时可以左右滑动查看所有图片，长按时会弹出菜单（仅微信端）。这些功能在大部分情况下是十分有用的，但是如果是一些小的装饰性的图片，用户可能不需要进行预览，这些功能反而会影响体验，比如在预览时进行左右滑动，翻了多张都是没用的图片等。因此，本插件支持给 `img` 标签设置 `ignore` 属性，设置后，该图片不可预览，不可长按弹出菜单，也不可在预览时通过左右滑动查看  

*优化建议：*  
1. 给装饰性的小图片的 `img` 标签上添加一个 `ignore` 属性  
2. 装饰性的小图片用 `background-image` 设置  

!> 加上 `ignore` 属性后，该图片将不会被暴露出来，直接通过 `rich-text` 显示，这样可以减少一定的标签数，提高性能，但懒加载、占位图等也会失效  

*关于自动设置：*  
尝试过对于小图片（在 `load` 事件中获取尺寸）自动禁用预览，但存在以下问题：  
1. 难以非常准确的判断是否为装饰性小图  
2. 如果只是禁用预览，预览其他图片时仍可以左右翻到这些装饰图，效果依然不佳  
3. 如果还要其他图片预览时也无法翻到这些图片，则要求在预览第一张图片的时候，就必须知道所有图片的尺寸，但是，如果开启了懒加载，是无法知晓所有图片的尺寸的  

基于以上原因，目前还需要手动设置  

#### 锚点 ####
*问题描述：*  
如果需要在初始化时就跳转到某个位置，可以通过 [navigateTo](/instructions#navigateTo) 的 `api` 进行跳转，理论上 [load](/instructions#事件) 事件（`dom` 加载完毕）触发时就可以跳转，但如果锚点之前有图片，且该图片没有设置高度，可能因为图片加载过程中高度伸展导致锚点跳转位置不准确，影响体验  

*优化建议：*  
1. 初始时就要跳转的锚点上方尽量不使用没设置高度的图片  
2. 否则如果图片加载较快，建议在 [ready]((/instructions#事件) 事件（图片加载完毕）事件中再进行跳转，保证跳转位置准确  
3. 如果图片加载较慢，采用上述方案反应较慢，也可能影响体验，这时可以在 [navigateTo](/instructions#navigateTo) 方法中设置 `offset` 参数进行适当偏移  

#### 音视频多源加载 ####
*问题描述：*  
如果音视频资源不稳定，可能出错或格式仅部分平台支持，会导致部分情况下用户无法播放该音视频，影响体验  

*优化建议：*  
本插件支持在 `video` 和 `audio` 标签中设置多个 `source` 标签，加载时，会从第一个源开始加载，若出错再加载第二个源，以此类推。因此设置多个 `source` 可以最大程度上避免无法播放  

#### 加载提示 ####
*问题描述：*  
如果富文本数据是网络请求得到的，可能耗费一定的时间，如果这段时间让用户空等，会影响体验  

*优化建议：*  
在 `parser` 标签中放入加载提示信息或动画，加载完毕后插件会自动隐藏这部分内容  
