# Parser {docsify-ignore} #
> 小程序富文本插件  

![star](https://badgen.net/github/stars/jin-yufeng/Parser)
![forks](https://badgen.net/github/forks/jin-yufeng/Parser)
![last-commit](https://badgen.net/github/last-commit/jin-yufeng/Parser)
![license](https://badgen.net/github/license/jin-yufeng/Parser)  

## 功能介绍 {docsify-ignore} ##
*注：以下所有代码示例均为微信原生框架代码*

### 匹配 style 标签 ###  
支持解析和匹配 `style` 标签中的样式，支持以下选择器
  
| 名称 | 示例 |
|:---:|:---:|
| class 选择器 | .the-class |
| id 选择器 | #the-id |
| 标签名选择器 | img |
| 多选择器的并集 | .the-class, #the-id |

示例：  
``` wxml
<parser html="{{html}}" />
```
``` javascript
Page({
  data:{
    html:'<style>.a{font-style:italic}#b{font-weight:bold}p{text-align:center}</style>'
  	  + '<p><span class="a">Hello </span><span id="b">World!</span></p>'
  }
})
```
<p style="text-align:center"><span style="font-style:italic;">Hello </span><span style="font-weight:bold;">World!</span></p>  

!> 不支持的选择器将被忽略，包括伪类、后代选择器、通配符等<br>如需支持更多选择器，请使用 [CssHandler](/instructions#CssHandler) 扩展包  

各类样式的优先级和作用域：

| 样式来源 | 优先级 | 作用域 | 备注 |
|:---:|:---:|:---:|:---:|
| 行内样式 | 0 | 单个标签 | style 属性中的值 |
| style 标签 | 1 | style 标签所在的 parser | 其中优先级标签名选择器 < class 选择器 < id 选择器 |
| [tag-style](#设置默认的标签样式) | 2 | 设置了该属性的 parser | 标签的默认样式 |
| [userAgentStyles](/instructions#配置项) | 3 | 所有 parser | 标签的默认样式 |
| 属性样式 | 4 | 设置了该属性的标签 | 如 size, align, border 等属性产生的样式 |
| [外部样式](/instructions#使用外部样式) | 5 | 所有 parser | 仅支持 class 选择器 |

### 设置默认的标签样式 ###
支持给各个标签设置默认的效果  
示例（给表格设置默认的边框）：
```wxml
<parser html="{{html}}" tag-style="{{tagStyle}}" />
```
```javascript
Page({
  data:{
    tagStyle:{
      table: 'border-collapse:collapse;border-top:1px solid gray;border-left:1px solid gray;',
      th: 'border-right:1px solid gray;border-bottom:1px solid gray;',
      td: 'border-right:1px solid gray;border-bottom:1px solid gray;'
    }
  }
})
```

### svg 支持 ###
支持直接使用所有 `svg` 系列标签  
示例：  
``` wxml
<parser html="{{html}}" />
```
``` javascript
Page({
  data:{
    html:'<svg><circle cx="100" cy="50" r="40" stroke="#3b5b81" stroke-width="2" fill="#5aa0b3" /></svg>'
  }
})
```
<svg><circle cx="100" cy="50" r="40" stroke="#3b5b81" stroke-width="2" fill="#5aa0b3" /></svg>

!> 该功能将 `svg` 标签转换为图片显示，已知存在以下问题：  
不能进行交互（即无法响应点击开始动画等）  
若 `svg` 中使用了 `image`，且 `href` 不是 `base64`，将无法显示该图片  

### 设置锚点 ###
支持设置页面内锚点（设置 `id` 即可），可通过 `a` 标签跳转，也可以通过获取组件实例手动跳转（需要配合 `use-anchor` 属性使用）  

```wxml
<parser id="article" html="{{html}}" use-anchor bindready="ready"></parser>
```
```javascript
Page({
  data:{
    html: "<a href='#test'>点我跳转锚点</a>" + // 点击此 a 标签可以跳转锚点
    "..." +
    "<div id='test'></div>"
  },
  ready(){
    // 通过获取组件实例按需手动跳转
    this.selectComponent("#article").navigateTo({
      id: "test",
      success: console.log,
      fail: console.error
    })
  }
})
```

### 长按复制 ###
通过设置 `selectable` 属性可以实现长按复制任意内容  

?> 如果需要设置局部可复制，可以给对应的标签的 `style` 属性里加上 `user-select:text;-webkit-user-select:text`

### 多媒体多资源加载 ###
支持在 `video` 和 `audio` 标签中设置多个 `source` 标签，本插件将按顺序进行加载，若前面的链接无法播放，将自动切换下一个链接进行加载和播放，直到最后一个链接；可用于解决平台差异，最大程度避免无法播放
```html
<video controls>
  <source src="demo1.mov" />
  <source src="demo2.webm" />
</video>
```

### 设置占位图 ###
支持设置图片未加载完成前（包括懒加载）和图片出错时的占位图  

设置方法：  
加载中占位图：通过 `loading-img` 属性设置（不同 `parser` 标签可以差异性设置）  
错误占位图：通过 `config.js` 中的 `errorImg` 字段设置（全局统一）  

注意事项：  
1. 只支持网络链接和 `base64`，不支持本地链接  
2. 设置 `loading-img` 后会一定程度上增加 `setData` 的次数（在加载完成时切换状态），需酌情使用  

### 自动设置标题 ###
若存在 `title` 标签，将自动把其内容设置到页面标题上（可通过 `autosetTitle` 属性控制）  

### 设置加载提示 ###
可以在 `parser` 标签内添加加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏；另外通过设置 `show-with-animation` 属性，可以实现内容渐显的动画效果    
```wxml
<parser html="{{html}}" show-with-animation>加载中...</parser>
```

### 智能压缩 ###  
支持自动通过以下方式对解析结果进行压缩，可以有效提升性能（减少 `setData` 的时间）：
- 自动合并一些不必要的层级  
- 在非 `pre` 标签且没有 `white-space:pre` 属性时自动去除没用的空白符  
- 压缩 `style` 属性，去除重复的属性和多余的空格  
- 移除所有 `data-` 属性和一些不支持的标签（如 `script` 等）  

通过设置 `compress` 属性，还可以实现以下压缩（在匹配完 `style` 标签中的样式后）：  
- 移除所有 `id` 属性（将无法使用锚点）  
- 移除所有 `class` 属性（将无法匹配 `wxss` 中的样式）  

### 懒加载 ###
- 图片  
  通过设置 `lazy-load` 属性，可以实现图片懒加载  
  
  ?> 可以通过修改 `trees.js` 中 `data` 里的 `placeholder` 来设置懒加载时的占位图  

- 视频  
  根据 [官方建议](https://developers.weixin.qq.com/community/develop/doc/000e4ef22583d8961919efb6b56009?highLine=video%2520%2520preload)，当视频数量超过三个时，将仅加载前三个视频，其他的用图片代替，避免一次加载过多视频导致卡死（设置了 `autoplay` 的视频将不会被懒加载）  
  另外通过设置 `autopause` 可以实现播放一个视频时自动暂停其他所有视频

### 自动填充链接 ###
1. 设置 `domain` 属性后，将自动给链接拼接上主域名或协议名（包括所有 `src` 属性和 `css` 中的 `url`，不会拼接 `a` 标签中的链接（因为可能是包内路径），不支持拼接相对路径）
   ```wxml
   <parser html="{{html}}" domain="https://example.com"></parser>
   ```
   ```javascript
   Page({
     data: {
       // 将被拼接成 https://example.com/path/xxx.png
       html: "<img src='/path/xxx.png'>"
         + "<div style='background-image:url(//example.com/path/xxx.png)'></div>"
     }
   })
   ```
2. 对于只有 `data-src` 没有 `src` 属性的图片，将自动把 `data-src` 的值设置成 `src`，避免无法显示

?> `domain` 也可以通过 `base` 标签设置，但优先级低于 `domain` 属性  

### 实体编码支持 ###
支持所有形如 `&#123;` 的实体编码和大部分常用的形如 `&nbsp;` 的实体编码  

### 支持丰富的标签 ###
支持以下标签和属性：   

| 标签 | 属性 |
|:---:|:---:|
| a | href, app-id, path |
| abbr |  |
| address |  |
| ad | unit-id / appid, apid, type / adpid |
| article |  |
| aside |  |
| audio | author, autoplay, controls, loop, name, poster, src |
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
| div | align |
| dl |  |
| dt |  |
| em |  |
| embed | autostart, height, loop, src, type, width |
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
| img | alt, src, ignore |
| ins |  |
| label |  |
| legend |  |
| li |  |
| mark |  |
| nav |  |
| ol | start, type |
| p | align |
| pre |  |
| q |  |
| s |  |
| section |  |
| small |  |
| source | src |
| span |  |
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
| tr | colspan, rowspan |
| tt |  |
| u |  |
| ul |  |
| video | autoplay, controls, height, loop, muted, poster, src, unit-id, width |

以下标签仅微信小程序基础库 `2.7.1` 以上可用：  

| 标签 | 属性 |
|:---:|:---:|
| bdi |   |
| bdo | dir |
| rp | 高版本不显示，可用于兼容 |
| rt |   |
| ruby |   |

说明：  
1. 除列举的标签外，还支持所有 `svg` 系列的标签（必须包裹在 `svg` 标签内，否则无效）  
2. 不在此列表中的标签，除个别将被直接移除（如 `script` 等），都会被转为一个行内标签，因此可以使用更多语义化标签  
3. 全局支持 `id`、`style`、`class`、`align` 属性，`class` 可以匹配 `style` 标签中的样式和 `trees.wxss` 中的样式；其他不支持的属性将被移除  

### 丰富的事件效果 ###
1. `a` 标签  
  支持 `hover` 效果（可在 `trees.wxss` 中的 `._hover` 中修改）  
  支持 `visited` 效果（仅微信包支持，可在 `trees.wxss` 中的 `._visited` 中修改）  
  点击的默认处理：  
  1. 若是包内路径，则直接跳转页面  
  2. 小程序端若设置了 `app-id`（还可以设置 `path`），将直接跳转到对应的小程序（跳转前需在 `app.json` 中进行 [全局配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#navigateToMiniProgramAppIdList)）  
  3. 若是外链，小程序上自动复制链接，`uni-app` 编译到 `H5` 和 `App` 时直接打开  
  
  同时触发 `linkpress` 事件，可以进行更多自定义处理（如下载文件）  

2. `img` 标签  
   点击的默认处理：  
   弹出预览框，并可以左右滑动查看所有图片  
   还进行了一些精细处理：  
   1. 相同 `url` 处理  
      `wx.previewImage` 中的 `current` 只能传入字符串，这导致若存在相同的 `url`，直接用此接口预览可能导致位置不正确，插件内部进行了 [处理](https://developers.weixin.qq.com/community/develop/article/doc/000004d972c3a8b33369dda8d51813)，将不会有这个问题  
   2. `base64` 处理  
      `wx.previewImage` 还不支持预览 `base64` 图片，插件通过暂存到本地文件，也可以实现预览 `base64`  
   
   还可以通过修改 [imgList](/instructions#imgList) 实现预览时使用高清图的效果  
   同时触发 `imgtap` 事件，可以进行更多自定义处理  

若不需要默认处理，可以在对应的事件中调用 `ignore` 函数，详见 [关于 ignore 方法](/instructions#关于-ignore-方法)  
默认不支持其他事件（包括 `onclick`），如有需要可参考 [添加自定义事件](/instructions#添加自定义事件)  

### 性能指标 ###
没有层数限制，解析速度快，轻量化，容错性强，稳定性高，不需要网络请求  
以下情况都可以正常解析：
``` html
<!--冒号不匹配-->
<div style="font-family:"宋体";text-align:center;">Hello</div>
<!--标签首尾不匹配-->
<div> World</label>
<!--异形标签-->
<o:p></o:p>
<!--缺少尾标签-->
<div>!
```

根据 [小程序测速](https://developers.weixin.qq.com/miniprogram/dev/framework/performanceReport/) 的结果，一篇长度约为 `2w` 的 `html` 字符串（示例小程序（微信原生框架）功能测试页面用的内容）在不同机型下的平均耗时如下：  

| / | 平均值（单位 ms） | 最大值（单位 ms） | 最小值（单位 ms） | 测试次数 |
|:---:|:---:|:---:|:---:|:---:|
| 解析时间 | 40.01 | 164 | 10 | 438 |
| 缓存读取时间 | 5.29 | 24 | 1 | 346 |
| 渲染时间 | 99.67 | 369 | 37 | 354 |

即平均情况下总耗时在缓存不命中时约 `145ms`，缓存命中时约 `110ms`；大部分用户可以在 `200ms` 内完成    
相关解释：  
1. 缓存是指开启 [use-cache](/instructions#use-cache) 属性后，首次解析后会缓存结果，多次打开不会重复解析，可以节省时间  
2. 这里不包含网络请求 `html` 数据的时间（从向组件传入 `html` 开始计算）  
3. 渲染时间仅为 `dom` 加载完毕的时间（`setData` 完成），而不是图片加载完毕的时间  
4. 网络请求和图片加载完毕的时间取决于网络状况和接口质量，与富文本解析无关，因此不纳入测试  

相比而言，解析时间偏长而渲染时间偏短，主要有以下原因：  
1. `html` 中有很多样式性的属性（如 `align`、`width`、`height` 等），小程序中都必须写在 `style` 属性中，因此需要进行转换  
2. 小程序中不能动态写入 `css`，为了实现 `style` 标签，需要在程序中匹配到各个标签的 `style` 属性中  
3. 小程序中并不能直接支持所有 `html` 标签，一些需要进行一定的转换和处理（如 `img`、`svg`、`source` 等）  
4. 解析过程中为加快渲染速度做了大量的处理：  
   1. 通过 [智能压缩](#智能压缩) 尽可能减小解析结果大小，加快 `setData` 的速度  
   2. 对于节点下没有图片、链接等的，直接使用 `rich-text` 显示，可以减少大量的标签，加快速度（这需要在解析过程中做标记，还要对一些 `rich-text` 不支持的标签进行转换）  

### 案例体验 ###

| [富文本插件](https://github.com/jin-yufeng/Parser/tree/master/demo/wx) | [程序员技术之旅](https://github.com/fendoudebb/z-blog-wx) | [极客时代](https://github.com/GeekEra/GBlog-wx) | APP 比比 | 全品作业小助手 | 多么生活 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| ![富文本插件](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md5.jpg?sign=911a1fd62af2666f9c8dfa367b22479c&t=1574499374 ':size=200') | ![程序员技术之旅](https://user-images.githubusercontent.com/16144460/74083526-0528bc80-4aa0-11ea-841f-a974c5f9131d.jpg ':size=200') | ![极客时代](https://camo.githubusercontent.com/f15b6b8854ae6d7fc4ceea552b79e326d5036978/68747470733a2f2f63646e2e66757a75692e6e65742f626c6f672f7172636f64655f313539323230383033333536372e6a7067 ':size=200') | ![APP比比](https://user-images.githubusercontent.com/5304020/80313264-70229d80-881c-11ea-8d8f-aed45719aed5.jpg ':size=200') | ![全品作业小助手](https://user-images.githubusercontent.com/21222276/80563130-b3e3f580-8a1c-11ea-9a07-7671ea5aa320.jpg ':size=200') | ![多么生活](https://user-images.githubusercontent.com/16403746/69929565-665d6e00-14fa-11ea-807a-8d9050caf342.jpg ':size=200') |

| 欢喜商城 | 古典文学名著阅读 | 典典博客 | 咚咚阅读 | 源创智造 |  |
|:---:|:---:|:---:|:---:|:---:|:---:|
| ![欢喜商城](https://user-images.githubusercontent.com/13982274/89155296-1e1bb180-d59b-11ea-8fe7-8ae2c298d736.png ':size=200') | ![古典文学名著阅读](https://camo.githubusercontent.com/bb2aa4562a8b4912c82129f10ff15d1eb4ce0d08/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f6a7065672f3432383733322f313537353830303731333133312d36326639663836362d366233362d343766312d396234302d6132633964373839616633362e6a706567 ':size=200') | ![典典博客](https://6874-html-foe72-1259071903.tcb.qcloud.la/%E5%85%B8%E5%85%B8%E5%8D%9A%E5%AE%A2.jpg?sign=5b2d371a4bd840c14c8d3740c35ee07f&t=1586360436 ':size=200') | ![咚咚阅读](https://user-images.githubusercontent.com/7794149/84689281-575c7b80-af73-11ea-9035-6b3fcb3a3e5b.png ':size=200') | ![源创智造](https://6874-html-foe72-1259071903.tcb.qcloud.la/%E6%BA%90%E5%88%9B%E6%99%BA%E9%80%A0.png?sign=71b39d28c444259a7204bc14a8091135&t=1593401495 ':size=200') | <img width="200"> |

以上排名不分先后，更多可见：[链接](https://github.com/jin-yufeng/Parser/issues/27)（欢迎添加）  

相关项目：  
[EastWorld/wechat-app-mall](https://github.com/EastWorld/wechat-app-mall)  
[YanxinNet/uView](https://github.com/YanxinNet/uView)  
[zhangdaren/miniprogram-to-uniapp](https://github.com/zhangdaren/miniprogram-to-uniapp)  
[woniudiancang/bee](https://gitee.com/woniudiancang/bee)  
