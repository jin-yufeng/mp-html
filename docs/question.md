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

#### 表格无法单独滚动 ####  
*问题描述：*  
表格的宽度往往较宽，容易超出屏幕宽度，导致其他内容一起滚动或无法滚动  

*解决方案：*  
- 修改 `html`  
  在 `table` 标签外套一个 `div`，并在 `style` 中设置 `overflow:scroll`  
- 不修改 `html`  
  如果不方便修改 `html`，可以在 [filter](/instructions#filter) 方法中添加：  
  ```javascript
  filter(node) {
    if (node.name == 'table') {
      setTimeout(() => { // 这个延时是为了 table 的 border、cellpadding、cellspacing 属性不失效，与内部处理有关
        var table = Object.assign({}, node); // 拷贝一个 table 节点
        node.name = 'div'; // 将原 table 改为一个滚动层
        node.attrs = {
          style: 'overflow: scroll'
        }
        node.children = [table];
      }, 0)
    }
  }
  ```

*相关 issue：*[多列表格的适配问题](https://ask.dcloud.net.cn/question/94524)

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

#### 无法使用 iframe 视频 ####
*问题描述：*  
除 `uni-app` 包编译到 `H5` 和 `App(v3)` 端外，均无法使用 `iframe` 标签  

*问题原因：*  
因为 `iframe` 视频的地址并不是真实的视频地址，其内容是 `js` 动态加载出来的，小程序上既无法操作 `dom` 也无法执行动态的 `js`（`eval`），因此无法实现  

*解决方案：*  
- 改用 `video` 标签  
- 使用 [腾讯视频插件](https://developers.weixin.qq.com/community/develop/doc/000ece3c044210190ef61a4a954c09?highLine=%25E8%2585%25BE%25E8%25AE%25AF%25E8%25A7%2586%25E9%25A2%2591)  
  微信小程序中可以考虑使用腾讯视频插件代替（参考 [添加自定义标签](/instructions#添加一个自定义标签)、[#103](https://github.com/jin-yufeng/Parser/issues/103)）  

*相关 issue：*[#96](https://github.com/jin-yufeng/Parser/issues/96)

#### 无法禁用自动预览 / 跳转 ####
*问题描述：*  
默认情况下，图片受到点击时会自动预览，链接受到点击时会自动进行跳转/复制链接；某些情况下，可能不希望如此处理  

*解决方案：*    
禁用自动预览：  
1. 给 `img` 标签增加 `ignore` 属性（如 `<img src="xxx" ignore>`），通过这种方法，点击无法预览，且其他图片预览时 **无法通过左右滑动** 看到这张图片（也无法从 [imgList](/instructions#imgList) 中获取）  
2. 在 `imgtap` 事件中调用 `ignore` 函数，通过这种方法将不会自动预览，但其他图片预览时 **仍可以** 通过左右滑动看到这张图片  

禁用自动跳转/复制链接：  
在 `linkpress` 事件中调用 `ignore` 函数，即可禁用自动跳转  

头条小程序中，`imgtap` 和 `linkpress` 事件中无法获得 `ignore` 函数，如有需要，要通过 `global.Parser.onxxx` 接收，更多可见 [事件](/instructions#关于-ignore-方法) 中的相关说明  

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
2. 通过 [recycle-view](https://developers.weixin.qq.com/miniprogram/dev/extended/component-plus/recycle-view.html) 显示  
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

#### 无法使用 markdown #### 
*问题描述：*  
无法直接使用 `markdown`  

*问题原因：*  
`markdown` 库较大，且用到的人不多，默认没有支持  

*解决方案：*  
先自行通过 `markdown` 库转为 `html` 后再进行解析和显示，其中一些标签的默认样式可以放在 `tag-style` 属性中  
可以参考：[示例小程序](https://github.com/jin-yufeng/Parser/tree/master/demo/wx) 中的 `markdown` 解析  

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
