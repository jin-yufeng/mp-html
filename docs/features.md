## 功能介绍 {docsify-ignore}##
*注：以下所有代码示例均为微信原生框架代码*

### 匹配 style 标签 ###  
支持解析和匹配 `style` 标签中的样式，支持以下选择器
  
| 选择器 | 举例 | 匹配 |
|----|----|----|
| .class | .demo | &lt;element class="demo"&gt; |
| #id | #demo | &lt;element id="demo"&gt; |
| element | img | &lt;img&gt; |

示例：  
``` wxml
<parser html="{{html}}" />
```
``` javascript
data:{
  html:'<style>.a{font-style:italic}#b{font-weight:bold}p{text-align:center}</style>'
	+'<p><span class="a">Hello </span><span id="b">World!</span></p>'
}
```
<p style="text-align:center"><span style="font-style:italic;">Hello </span><span style="font-weight:bold;">World!</span></p>  

>支持通过逗号分隔的多个相同的选择器，例如 `.a,.b,div{}`  

>`uni-app` 包编译到 `H5` 平台时支持所有浏览器支持的选择器  

!>不支持的选择器将被忽略，包括伪类、后代选择器、通配符等<br>如需支持更多选择器，请使用 [CssHandler](/instructions#CssHandler) 补丁包  

各类样式的优先级和作用域：

| 样式来源 | 优先级 | 作用域 | 备注 |
|:---:|:---:|:---:|:---:|
| 行内样式 | 0 | 单个标签 | style 属性中的值 |
| style 标签 | 1 | style 标签所在的 parser | 其中优先级标签名选择器 < class 选择器 < id 选择器 |
| [tag-style](#设置默认的标签样式) | 2 | 设置了该属性的 parser | 标签的默认样式 |
| [userAgentStyles](/instructions#配置项) | 3 | 所有 parser | 标签的默认样式 |
| [外部样式](/instructions#使用外部样式) | 4 | 所有 parser | 仅支持 class 选择器 |

### 设置默认的标签样式 ###
支持给各个标签设置默认的效果  
示例（给表格设置默认的边框）：
```wxml
<parser html="{{html}}" tag-style="{{tagStyle}}" />
```
```javascript
data:{
  tagStyle:{
    table: 'border-collapse:collapse;border-top:1px solid gray;border-left:1px solid gray;',
    th: 'border-right:1px solid gray;border-bottom:1px solid gray;',
    td: 'border-right:1px solid gray;border-bottom:1px solid gray;'
  }
}
```

### 多媒体多资源加载 ###
支持在 `video` 和 `audio` 标签中设置多个 `source` 标签，本插件将按顺序进行加载，若前面的链接无法播放，将自动切换下一个链接进行加载和播放，直到最后一个链接；可用于解决平台差异，最大程度避免无法播放
```html
<video controls>
  <source src="demo1.mov" />
  <source src="demo2.webm" />
</video>
```

### 懒加载 ###
- 图片  
  通过设置 `lazy-load` 属性，可以实现图片懒加载，在图片进入当前可视范围上下 `1000px` 范围内时再进行加载
- 视频  
  当视频数量超过三个时，将仅加载前三个视频，其他的用图片代替，避免一次加载过多视频导致卡死  
  另外通过设置 `autopause` 可以实现播放一个视频时自动暂停其他所有视频

### 设置锚点 ###
支持设置页面内锚点（设置 `id` 即可），可通过 `a` 标签跳转，也可以通过获取组件实例手动跳转

```wxml
<parser id="article" html="{{html}}" use-anchor bindready="ready"></parser>
```
```javascript
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
```

### 自动设置标题 ###
若存在 `title` 标签，将自动把其内容设置到页面标题上（可通过 `autosetTitle` 属性控制）  
并将在 `parser`（解析完成）回调中返回，可用于转发设置

### 自动填充图片链接 ###
1. 设置 `domain` 属性后，将自动给图片链接拼接上主域名或协议名
   ```wxml
   <parser html="{{html}}" domain="https://example.com"></parser>
   ```
   ```javascript
   data:{
     html:"<img src='/path/xxx.png'>" // 将被拼接成 https://example.com/path/xxx.png
   }
   ```
2. 对于只有 `data-src` 没有 `src` 属性的图片，将自动把 `data-src` 的值设置成 `src`，避免无法显示

### 设置加载提示 ###
可以在 `parser` 标签内添加加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏  
```wxml
<parser html="{{html}}">加载中...</parser>
```

### 动画显示效果 ###  
通过设置 `show-with-animation` 属性可以实现内容加载完成后渐显的动画效果  
```wxml
<parser html="{{html}}" show-with-animation animation-duration="500" />
```

### 长按复制 ###
通过设置`selectable`属性可以实现长按复制任意内容  

?>百度小程序的 `rich-text` 本身支持 `selectable` 属性（需要百度 `APP 11.10` 以上）；但微信小程序不支持；本插件**均可实现**支持复制（且**没有版本要求**）  

### 实体编码支持 ###
支持各类 `html` 实体编码

!>微信小程序 / `QQ` 小程序等支持所有 `html` 实体编码；百度小程序等仅支持一些常用的实体编码，如 `&nbsp;`、`&lt;`、`&quot;` 等

### 智能压缩 ###  
支持自动通过以下方式对解析结果进行压缩，可以有效提升性能：
- 将一些只有一个子节点的标签进行合并，以实现减小深度的效果，根据内容不同，可以减少 `15%~60%` 的深度  
- 在非 `pre` 标签且没有 `white-space:pre` 属性时自动去除没用的空白符  

### 支持丰富的标签 ###
支持以下标签和属性：   

| 标签 | 属性 |
|:---:|:---:|
| a | href |
| abbr |  |
| address |  |
| ad | unit-id / appid, apid, type |
| article |  |
| aside |  |
| audio | author, autoplay, controls, loop, name, poster, src |
| b |  |
| big |  |
| blockquote |  |
| body |  |
| br |  |
| center |  |
| cite |  |
| code |  |
| col | span, width |
| colgroup | span, width |
| dd |  |
| del |  |
| div | align |
| dl |  |
| dt |  |
| em |  |
| fieldset |  |
| font | color, face, size |
| footer |  |
| h1 |  |
| h2 |  |
| h3 |  |
| h4 |  |
| h5 |  |
| h6 |  |
| header |  |
| hr |  |
| html |  |
| i |  |
| img | alt, src, height, ignore, width |
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
| table | border, cellpadding, cellspacing, width |
| tbody |  |
| td | colspan, height, rowspan, width |
| tfoot |   |
| th | colspan, height, rowspan, width |
| thead |  |
| tr | colspan, height, rowspan, width |
| tt |  |
| u |  |
| ul |  |
| video | autoplay, controls, height, loop, muted, src, unit-id, width |

以下标签仅微信小程序基础库 `2.7.1` 以上可用：  

| 标签 | 属性 |
|:---:|:---:|
| bdi |   |
| bdo | dir |
| caption |   |
| rp | 高版本不显示，可用于兼容 |
| rt |   |
| ruby |   |

>支持图片点击（可自动预览）、链接点击事件（可自动复制链接），不支持其他事件（如 `onclick` 等）  

>全局支持 `id`、`style`、`class` 属性，`class` 可以匹配 `style` 标签中的样式和 `trees.wxss` 中的样式；其他不支持的属性将被移除  

>不在此列表中的标签，除个别将被直接移除（如 `script` 等），都会被转为一个行内标签，因此可以使用更多语义化标签  

>`uni-app` 包编译到 `H5` 平台时支持所有浏览器支持的标签  

!>`ad`（广告）标签仅微信 / `QQ` 小程序、百度小程序支持，且使用后会大大增加渲染时间

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

### 案例体验 ###

| [富文本插件](https://github.com/jin-yufeng/Parser/tree/master/demo/wx) | 多么生活 | [SteamCN 蒸汽动力论坛](https://github.com/xPixv/SteamCN-Mini-Program) |
|:---:|:---:|:---:|
| ![富文本插件](https://6874-html-foe72-1259071903.tcb.qcloud.la/md/md5.jpg?sign=911a1fd62af2666f9c8dfa367b22479c&t=1574499374 ':size=200') | ![多么生活](https://user-images.githubusercontent.com/16403746/69929565-665d6e00-14fa-11ea-807a-8d9050caf342.jpg ':size=200') | ![SteamCN 蒸汽动力论坛](https://github.com/xPixv/SteamCN-Mini-Program/raw/master/resources/qrcode.jpg ':size=200') |

| 恋爱宝典xcx | 恋爱宝典（QQ） |
|:---:|:---:|
| ![恋爱宝典xcx](https://user-images.githubusercontent.com/22900470/70421652-2de30480-1aa5-11ea-93b0-180352d4c397.jpg ':size=200') | ![恋爱宝典](https://user-images.githubusercontent.com/22900470/70422223-5ae3e700-1aa6-11ea-97ce-fec96d17408f.png ':size=200') |

欢迎添加：[链接](https://github.com/jin-yufeng/Parser/issues/27)  
