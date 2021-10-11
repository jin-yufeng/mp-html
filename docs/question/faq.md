# 📘 常见问题 :id=question

## 基础库要求 :id=lib
本组件尽最大可能兼容低版本基础库，各平台只要满足 **最低要求** 即可正常使用（不报错，但高基础库支持的功能不可用），可按照实际需要设置最低基础库要求  

微信：  

| 版本 | 功能 | 占比 |
|:---:|:---:|:---:|
| 2.9.0+ | ios 支持 webp 图片 | >99.74% |
| 2.7.0+ | 支持图片长按弹出菜单 | >99.87% |
| 2.4.0+ | 支持 video 同层渲染 | >99.90% |
| 2.3.0+ | 支持使用云文件 ID | >99.98% |
| 2.2.1+ | 支持 npm 引入 | >99.99% |
| 1.9.94+ | 支持使用 ad | >99.99% |
| 1.6.6+ | 可以使用 | >99.99% |

QQ：  

| 版本 | 功能 |
|:---:|:---:|
| 安卓 1.10.2+，ios 1.4.7+ | 支持 video 同层渲染 |
| 1.1.7+ | 可以使用 |

百度：  

| 版本 | 功能 | 占比 |
|:---:|:---:|:---:|
| 3.180.1+ | ios 支持 webp 图片 | >99.04% |
| 3.170.1+ | 支持图片长按弹出菜单 | >99.19% |
| 3.90.25+ | 可以使用 | >99.99% |

*3.240.10* - *3.260.25* 基础库由于 [此问题](https://smartprogram.baidu.com/forum/topic/show/125787)，需要将以下样式拷贝到 *app.css* 以保证正确显示  
```css
/* a 标签默认效果 */
._a {
  padding: 1.5px 0 1.5px 0;
  color: #366092;
  word-break: break-all;
}

/* a 标签点击态效果 */
._hover {
  text-decoration: underline;
  opacity: 0.7;
}

/* 图片默认效果 */
._img {
  max-width: 100%;
  -webkit-touch-callout: none;
}
```

支付宝：  

| 版本 | 功能 | 占比 |
|:---:|:---:|:---:|
| 1.11.0+ | 可以使用 | >97.95% |

头条：  

| 版本 | 功能 |
|:---:|:---:|
| 1.59.0+ | 支持 video 同层渲染 |
| 1.19.0+ | 支持使用 ad |
| 1.15.0+ | a 标签支持跳转其他小程序 |
| 1.7.0+ | 可以使用 |

!> 不支持 *video* 同层渲染时，需要注意原生组件的限制，视频的层级最高，且不能在 *scroll-view* 中使用  

## 一般标签的点击事件 :id=tap
默认情况下，组件仅支持 *a* 和 *img* 标签的点击事件，如果希望给标签添加点击事件，又不希望应用 *a* 标签的默认样式，可以使用没有 *href* 属性的 *a* 标签，该标签不会应用链接的默认样式，但被点击时会触发 *linktap* 事件，可以在 *data-* 属性中记录需要的信息  

## 长内容处理 :id=long
如果富文本内容特别长，可以考虑以下方案：  
1. 分次渲染  
   小程序中单次 *setData* 大小不能超过 *1MB*，如果内容过长，可以先将内容拆分成几段，首先渲染第一段，后续内容在适当的时机（触底等）通过 [setContent](/advanced/api#setContent) 方法追加到末尾  
2. 分页渲染  
   以上方案虽然能解决一次性设置数据过大问题，但过长的内容仍会导致总标签数量过大，页面性能下降的问题，因此，对于过长的内容，应该分页进行显示，每页仅显示一部分  

## 图片底部缝隙 :id=img
由于图片的默认 *display* 是 *inline-block*，多个图片连接时底部会有一条缝隙，可以通过设置 *vertical-align: bottom*, *display:block* 或 *float:left* 等方法去除  
设置以上样式后仍有一个小缝隙的，可以进一步添加 *margin-top:-1px*  
设置方法参考 [样式设置](overview/feature#style)  

## 标签原样显示 :id=entity
如果出现渲染后 *html* 标签还是原样显示，请检查传入的 *html* 是否被转义：
1. *&lt;* 和 *&gt;* 被转义为 *&amp;lt;* 和 *&amp;gt;*  
2. *&lt;img* 被转义为 *< img*  

如果是则需要进行替换  
```javascript
// 第一种
html = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>') // 如果还转义了其他字符如 &amp; 等也要进行替换
// 第二种
html = html.replace(/< img/g, '<img')
```

## 空白符失效 :id=space
*html* 中，默认会将多个空白符（包括换行）合并为一个空格，若不希望如此，可参考以下方法：  
1. 替换为指定标签或实体编码  
   换行可以使用 *br* 标签  
   连续空格可以使用 *&amp;nbsp;* *&amp;ensp;* *&amp;emsp;* 等实体编码  
   ```javascript
   html = html.replace(/\n/g, '<br>') // 替换换行符
   html = html.replace(/ /g, '&nbsp;') // 替换空格
   ```
2. 通过 *css* 设置 *white-space*  
   将 *css* 中的 *white-space* 设置为 *pre-line* 可以保留换行符，设置为 *pre-wrap* 可以保留空格和换行符  
   给特定标签设置的方法见 [样式设置](overview/feature#style)，需要注意的是如果通过外部样式设置 *white-space* 将不会生效，因为在解析过程中为减小解析结果大小提前进行了空白符合并（解析过程中无法获取外部样式）  
   [2.1.2]() 版本起可以通过 [container-style](basic/prop#container-style) 属性全局设置 *white-space*  
   ```html
   <mp-html container-style="white-space:pre-wrap" />
   ```

## 懒加载失效 :id=lazy-load
如果富文本内容全部（或大部分）是图片，由于其图片未加载时大小为零，即使数量很多也会全部进入视图范围，导致懒加载失效，若出现这种情况，可通过以下方案解决  
1. 通过 [tag-style](basic/prop#tag-style) 属性等方法给 *img* 父级标签的样式里设置 *min-height*（如果直接给图片本身设置 *min-height*，可能在加载过程中出现变形的情况）  
2. 通过 [loading-img](basic/prop#loading-img) 属性设置加载过程中的占位图  