## 功能介绍 ##
- 支持解析`<style>`标签中的全局样式  
  可以按以下模式解析

  | 模式 | 举例 | 匹配 |
  |:----:|:----:|:----:|
  | 按class名匹配 | .demo | &lt;element class="demo"&gt; |
  | 按id名匹配 | #demo | &lt;element id="demo"&gt; |
  | 按标签名匹配 | body | &lt;body&gt;...&lt;/body&gt; |
  | 单层多个class | .demo1.demo2 | &lt;element class="demo1 demo2"&gt; |
  | 多个并列 | .demo1,.demo2 |&lt;element class="demo1"&gt;或&lt;element class="demo2"&gt;|

  含有@或*的，伪类以及多层的样式将被直接忽略；例如：  
	``` html
	<style>
	.demo1{
	  font-style: italic;
	}
	#demo2{
	  font-weight:bold;
	}
	p{
	  text-align:center;
	}
	</style>
	<p>
	 <span class="demo1">Hello </span>
	 <span id="demo2">World!</span>
	</p>
	```
  ![解析style](https://i.imgur.com/vL31Ykz.png)
- 支持自定义默认的标签样式
  ``` javascript
  data:{
    tagStyle:{
      code: "font-style:italic;color:#005cc5"
    }
  }
  ```
  ``` html
  <Parser html="<code>test</code>" tag-style="{{tagStyle}}" />
  ```
  ![解析自定义样式](https://i.imgur.com/MMbq7ld.png)
- 自动设置标题  
  若`html`中存在`title`标签，将自动把`title`标签的内容设置到页面的标题上，并在回调`bindparse`中返回，可以用于转发  
- 支持添加加载提示  
  可以在`Parser`标签内添加加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏，例如：
  ```html
  <Parser html="{{html}}">加载中...</Parser>
  ```
- 支持动画显示效果  
  通过设置`show-with-animation`属性可以实现内容加载完成后渐显的动画效果
  ```html
  <Parser html="{{html}}" show-with-animation animation-duration="500" />
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

- 支持的标签种类丰富，包括`视频`、`表格`等  
  在[`rich-text`](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)组件的基础上增加支持以下标签: 
  
  | 标签 | 属性 |
  |:---:|:---:|
  | video | src, controls, loop, autoplay, muted, height, width |
  | audio | src, controls, loop, autoplay, [poster, name, author](https://developers.weixin.qq.com/miniprogram/dev/component/audio.html) |
  | source | src |
  | u |  |
  | s |  |
  | center |  |
  | font | face, color |
  | pre |  |
  | section |  |
  | style |  |
  | body |  |

  另外，对于不在支持列表中的标签，除个别会直接移除外，都会被转换为一个行内标签，因此可以使用一些语义化标签  
  *附注：2.7.1基础库开始`rich-text`组件已经支持`section`、`center`、`u`、`s`、`font`等标签，但本插件可以实现低版本兼容*
  
- 图片支持大小自适应，点击图片可以预览（预览时通过左右滑动可以查看所有图片）；对于一些装饰性的图片，可以对其设置`ignore`属性，设置后将无法预览  

  ![解析图片](https://i.imgur.com/XG7XdRa.gif)  
- 点击`a`标签，若`href`为小程序内部页面路径，将直接跳转；若是网页链接，则可以自动复制链接（可通过`autocopy`属性控制），并在浏览器中打开；点击时将有下划线和半透明的效果，支持图片链接。链接被点击时会触发`bindlinkpress`事件，可以在该回调中进行下载附件等更多操作  
  ![解析链接](https://i.imgur.com/2pySRst.gif)
- 支持解析有序列表和无序列表（直接由`rich-text`进行显示）  
  ![解析列表](https://i.imgur.com/QYMbUkV.png)
 
- 容错性强，稳定性高，不需要网络请求  
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
 
- 功能强大，支持无限层级，解析速度快，包大小仅约`33.9KB`  