## 功能介绍 ##
- 支持解析`<style>`标签中的全局样式  
  可以按以下模式解析

  | 模式 | 举例 | 匹配 |
  |:----:|:----:|:----:|
  | 按class名匹配 | .demo | &lt;element class="demo"&gt; |
  | 按id名匹配 | #demo | &lt;element id="demo"&gt; |
  | 按标签名匹配 | body | &lt;body&gt;...&lt;/body&gt; |
  | 多个并列 | .demo1,.demo2 |&lt;element class="demo1"&gt;或&lt;element class="demo2"&gt;|

  含有@或*的，伪类以及多层的样式将被直接忽略  
  示例：  
  ``` html
  <Parser html="{{html}}" />
  ```
  ``` javascript
  data:{
	html:'<style>.demo1{font-style:italic;}#demo2{font-weight:bold;}p{text-align:center;}</style>'+
	'<p><span class="demo1">Hello </span><span id="demo2">World!</span></p>'
  }
  ```
  ![解析style](https://i.imgur.com/vL31Ykz.png)
- 支持自定义默认的标签样式  
  可以在`tag-style`属性中设置标签的默认样式  
  示例：  
  ``` html
  <parser html="<code>test</code>" tag-style="{{tagStyle}}" />
  ```
  ``` javascript
  data:{
    tagStyle:{
      code: "font-style:italic;color:#005cc5"
    }
  }
  ```
  ![解析自定义样式](https://i.imgur.com/MMbq7ld.png)
- 自动设置标题  
  若`html`中存在`title`标签，将自动把`title`标签的内容设置到页面的标题上，并在回调`bindparse`中返回，可以用于转发  
- 支持添加加载提示  
  可以在`Parser`标签内添加加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏  
  ```html
  <parser html="{{html}}">加载中...</parser>
  ```
- 支持动画显示效果  
  通过设置`show-with-animation`属性可以实现内容加载完成后渐显的动画效果  
  ```html
  <parser html="{{html}}" show-with-animation animation-duration="500" />
  ```
- 支持多资源加载  
  可以在`video`和`audio`中设置多个`source`标签，组件将按顺序进行加载，若前面的链接无法播放，将自动切换下一个链接进行加载和播放，直到最后一个链接；可用于解决平台差异，最大程度避免无法播放
  ```html
  <video controls>
    <source src="demo1.mov" />
    <source src="demo2.webm" />
  </video>
  ```
- 支持长按复制内容  
  通过设置`selectable`属性可以实现长按复制任意内容  
  `tips`: 百度小程序的`rich-text`本身支持`selectable`属性（需要百度`APP 11.10`以上）；但微信小程序不支持；本插件**均可实现**支持复制（且**没有版本要求**）  
- 支持各类实体  
  支持 `&nbsp;` `&ensp;` `&emsp;` `&lt;` `&gt;` `&quot;` `&mdash;` `&hellip;` `&copy;`等多个常用实体  
- 智能压缩  
  支持自动通过以下方式对解析结果进行压缩，可以有效提升性能：
  - 将一些只有一个子节点的标签进行合并，以实现减小深度的效果，根据内容不同，可以减少`15%~60%`的深度  
  - 在非`pre`标签且没有`white-space:pre`属性时自动去除没用的空白符  
&nbsp;
- 支持丰富的标签  
  在`rich-text`组件的基础上增加支持以下标签: 
  
  | 标签 | 属性 |
  |:---:|:---:|
  | video | src, controls, loop, autoplay, muted, height, width |
  | audio | src, controls, loop, autoplay, [poster, name, author](https://developers.weixin.qq.com/miniprogram/dev/component/audio.html) |
  | source | src |
  | style |  |
  | body |  |
  | html |  |
  | ad | unit-id / appid, apid, type |

  以下标签在微信小程序基础库2.7.1以上已经支持；其他小程序不支持；本插件可以实现**均支持**这些标签，且**没有基础库要求**：  

  | 标签 | 属性 |
  |:---:|:---:|
  | address |   |
  | article |   |
  | aside |   |
  | big |   |
  | center |   |
  | cite |   |
  | font | size, face, color |
  | footer |   |
  | header |   |
  | mark |   |
  | nav |   |
  | pre |   |
  | s |   |
  | section |   |
  | small |   |
  | u |   |

  以下标签仅微信小程序基础库2.7.1以上可用：  

  | 标签 | 属性 |
  |:---:|:---:|
  | bdi |   |
  | bdo | dir |
  | caption |   |
  | rp | 高版本不显示，可用于兼容 |
  | rt |   |
  | ruby |   |

  另外，对于不在支持列表中的标签，除个别会直接移除外，都会被转换为一个行内标签，因此可以使用一些语义化标签  
  
- 图片显示效果  
  支持自动按原大小显示，点击图片可以预览（预览时通过左右滑动可以查看所有图片），支持懒加载；对于一些装饰性的图片，可以对其设置`ignore`属性，设置后将无法预览  

  ![解析图片](https://i.imgur.com/XG7XdRa.gif)  
- 链接点击效果  
  点击`a`标签，若`href`为小程序内部页面路径，将直接跳转；若是网页链接，则可以自动复制链接（可通过`autocopy`属性控制）；点击时将有下划线和半透明的效果，支持图片链接。链接被点击时会触发`bindlinkpress`事件，可以在该回调中进行下载附件等更多操作  
  ![解析链接](https://i.imgur.com/2pySRst.gif)

- 视频效果  
  1. 当一个加载超过3个视频时，将仅加载前3个视频，其余用图片代替，被点击时再加载，避免因同时加载过多视频而导致页面卡死  
  2. 当一个视频播放时，可自动暂停其他所有视频的播放（可通过`autopause`属性控制）  
&nbsp;  
- 支持解析有序列表和无序列表  
  ![解析列表](https://i.imgur.com/QYMbUkV.png)
 
- 性能指标  
  支持无限层级，解析速度快，包大小仅约`39.7KB`（`min`版本`28.3KB`），容错性强，稳定性高，不需要网络请求  
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
