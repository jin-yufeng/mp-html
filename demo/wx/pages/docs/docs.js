// docs.js
Page({
  // 数据
  data: {
    // 标题
    titles: ["功能介绍", "使用方法", "更新日志"],
    // 标签的默认样式
    tagStyle: {
      pre: "padding:1em 1em 0 1em;margin:.5em 0;border-radius:0.3em;background:#2d2d2d;color:#ccc;line-height: 1.5;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;position:relative;user-select:text;-webkit-user-select:text",
      code: "background-color:#f0f0f0;font-size:85%;margin:0 3px;padding:2px 5px 2px 5px;border-radius:2px;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace"
    },
    // 支持的选择器
    selectors: [{
      name: "class 选择器",
      example: ".the-class"
    }, {
      name: "id 选择器",
      example: "#the-id"
    }, {
      name: "标签名选择器",
      example: "img"
    }, {
      name: "多选择器的并集",
      example: ".the-class, #the-id"
    }],
    // 选择器示例代码
    selectorCode: `<pre><code class="language-html"><style>
.demo {
  font-style: italic;
}
#demo2 {
  font-weight: bold;
}
p {
  text-align: center;
  font-size: 30px;
}
</style>
<p>
  <span class="demo">Hello </span>
  <span id="demo2">World!</span>
</p></code></pre>
<style>.demo{font-style:italic;}#demo2{font-weight:bold;}p{text-align:center;font-size:30px;}</style>
<p><span class="demo">Hello </span><span id="demo2">World!</span></p>`,
    // tag-style 示例代码
    tagStyleCode: `<pre><code class="language-javascript">Page({
  data: {
    tagStyle: {
      code: "background-color:#f0f0f0;border-radius:2px;font-family:monospace;"
    }
  }
})</code></pre>
<pre style="margin:15px 0 10px 0"><code class="language-html"><parser html="<code>test</code>" tag-style="{{tagStyle}}" /></code></pre>
解析结果：<code>test</code>`,
    // svg 示例代码
    svgCode: `<pre><code class="language-html"><svg>
  <circle cx="100" cy="50" r="40" stroke="#3b5b81" stroke-width="2" fill="#5aa0b3" />
</svg></code></pre>
<p>解析结果：</p>
<svg width="200" height="100">
  <circle cx="100" cy="50" r="40" stroke="#3b5b81" stroke-width="2" fill="#5aa0b3" />
</svg>`,
    // 锚点跳转示例代码
    anchorCode: `<pre><code class="language-html"><div id="anchor">我是锚点</div>
···
<a href="#anchor">点我跳转锚点</a></code></pre>
<a href="../demo/demo?index=0&anchor=true">立即体验</a>`,
    // 多资源加载示例代码
    sourceCode: `<pre><code class="language-html"><video controls>
  <source src="demo1.mov" />
  <source src="demo2.webm" />
</video></code></pre>`,
    // 加载提示示例代码
    loadingCode: `<pre><code class="language-wxml"><parser html="{{html}}" show-with-animation>
  加载中...
</parser></code></pre>`,
    // 智能压缩
    compress: `<ol style="margin:10px 0 0 -15px">
  <li>将一些只有一个子节点的标签进行合并来减小节点的深度</li>
  <li>在非<code>pre</code>标签且没有<code>white-space:pre</code>时自动去除空白符</li>
  <li>压缩<code>style</code>属性的值，去除重复的属性和多余的空格</li>
</ol>`,
    // 自动填充链接示例代码
    completerCode: `<pre><code class="language-javascript">Page({
  data: {
    // 将被填充为 https://example.com/pics/pic.png
    html: "<img src='//example.com/pics/pic.png'>" +
      "<div style='background-image:url(/pics/pic.png)'>"
  }
})</code></pre>
<pre style="margin-top:15px"><code class="language-wxml"><parser html="{{html}}" domain="https://example.com" /></code></pre>`,
    // 与 rich-text 相比增加的标签
    tags: [{
      name: "a",
      attrs: "href, app-id, path"
    }, {
      name: "ad",
      attrs: "unit-id"
    }, {
      name: "audio",
      attrs: "author, autoplay, controls,\nloop, name, poster, src"
    }, {
      name: "div, p",
      attrs: "align"
    }, {
      name: "font",
      attrs: "color, face, size"
    }, {
      name: "source",
      attrs: "src"
    }, {
      name: "svg",
      attrs: "svg 系列所有标签"
    }, {
      name: "table",
      attrs: "border, cellpadding,\ncellspacing, width"
    }, {
      name: "video",
      attrs: "autoplay, controls, height, loop,\nmuted, poster, src, unit-id, width"
    }],
    // 2.7.1 基础库以上才支持的标签
    newTags: [{
      name: "bdi"
    }, {
      name: "bdo",
      attrs: "dir"
    }, {
      name: "caption"
    }, {
      name: "rp",
      attrs: "高版本不显示，可用于兼容"
    }, {
      name: "rt"
    }, {
      name: "ruby"
    }],
    // 事件
    eventsIntro: `<ol style="margin:10px 0 0 -15px">
  <li>链接点击事件
    <div>链接受到点击时，若<code>href</code>属性的值是网络链接，将自动复制链接；若是内部路径，则自动跳转页面；若设置了<code>app-id</code>和<code>path</code>，则将跳转其他小程序；同时触发<code>linkpress</code>事件，可进行自定义处理</div>
  </li>
  <li>图片点击事件
    <div>图片受到点击时，将自动进行预览（支持<code>base64</code>，可通过属性控制），同时触发<code>imgtap</code>事件，可进行自定义处理</div>
  </li>
  <li>图片长按事件
    <div>将触发<code>imglongtap</code>事件，可进行自定义处理（如显示菜单等，可在 <a href="../demo/demo?index=0">功能示例</a> 中长按图片体验）</div>
  </li>
</ol>`,
    // 错误示例代码
    errorCode: `<pre><code class="language-html"><!--冒号不匹配-->
<div style="font-family:"宋体"">Hello</div>
<!--标签首位不匹配-->
<div> World!</p>
<!--异形标签-->
<o:p></o:p>
<!--缺少尾标签-->
<div>!</code></pre>
<div style="margin-top:20px">更多功能可见：<a href="https://jin-yufeng.github.io/Parser/#/">功能介绍</a></div>`,
    // 使用步骤
    usage: `<div>在原生框架中使用</div>
<ol style="margin-left:-15px">
  <li>复制<code>parser</code>文件夹（<code>parser.min</code>是压缩版本，功能相同）至<code>components</code>目录下</li>
  <li>在需要使用页面的<code>json</code>文件中添加
    <pre style="margin:8px 0"><code class="language-json">{
  "usingComponents": {
    "parser": "/components/parser/parser"
  }
}</code></pre>
  </li>
  <li>在需要使用页面的<code>wxml</code>文件中添加
    <pre style="margin:8px 0"><code class="language-wxml"><parser html="{{html}}" /></code></pre>
  </li>
  <li>在需要使用页面的<code>js</code>文件中添加
    <pre style="margin:8px 0"><code class="language-javascript">Page({
  onLoad() {
    this.setData({
      html: "<div>Hello World!</div>"
    })
  }
})</code></pre>
  </li>
</ol>
</br>
<div>在<code>uni-app</code>中使用</div>
<ol style="margin-left:-15px">
  <li>复制<code>parser.uni</code>文件夹至<code>components</code>目录下（更名为<code>jyf-parser</code>）</li>
  <li>在需要使用页面的<code>vue</code>文件中添加
    <pre style="margin:8px 0"><code class="language-vue"><template>
  <view>
    <jyf-parser :html="html"></jyf-parser>
  </view>
</template>
<script>
// HbuilderX 2.5.5 及以上可以不需要引入
import parser from "@/components/jyf-parser/jyf-parser";
export default {
  // HbuilderX 2.5.5 及以上可以不需要引入
  components: {
    "jyf-parser": parser
  },
  data() {
    return {
      html: "<div>Hello World!</div>"
    }
  }
}
</script></code></pre>
  </li>
</ol>
<li style="margin-left:-15px">可以直接通过 <a href="https://ext.dcloud.net.cn/plugin?id=805">插件市场</a> 引入</li>
<div style="margin-top:10px">在其他框架中使用可见：<a href="https://jin-yufeng.github.io/Parser/#/instructions?id=在其他框架中使用">在其他框架中使用</a></div>`,
    // 组件属性
    attrs: [{
      name: "html",
      type: "String\nArray",
      notice: "要显示的 html 数据，格式同 rich-text"
    }, {
      name: "autopause",
      type: "Boolean",
      default: "true",
      notice: "是否允许在播放视频时自动暂停其他视频"
    }, {
      name: "autosetTitle",
      type: "Boolean",
      default: "true",
      notice: "是否自动将 title 标签的内容设置到页面标题"
    }, {
      name: "domain",
      type: "String",
      default: '',
      notice: "主域名，设置后将给链接拼接上主域名或协议名"
    }, {
      name: "gesture-zoom",
      type: "Boolean",
      default: "false",
      notice: "是否开启双击缩放"
    }, {
      name: "lazy-load",
      type: "Boolean",
      default: "false",
      notice: "是否开启图片懒加载"
    }, {
      name: "selectable",
      type: "Boolean",
      default: "false",
      notice: "是否允许长按复制内容"
    }, {
      name: "show-with-\nanimation",
      type: "Boolean",
      default: "false",
      notice: "是否使用渐显动画效果"
    }, {
      name: "tag-style",
      type: "Object",
      notice: "标签的默认样式"
    }, {
      name: "use-anchor",
      type: "Boolean",
      default: "false",
      notice: "是否使用页面内锚点"
    }, {
      name: "use-cache",
      type: "Boolean",
      default: "false",
      notice: "是否使用缓存，设置后多次打开不用重复解析"
    }],
    // 事件
    events: [{
      name: "bindparse",
      notice: "解析完成时触发，返回解析结果，对这个结果进行修改，将在渲染时生效"
    }, {
      name: "bindready",
      notice: "渲染完成时触发，返回组件框的位置大小信息"
    }, {
      name: "binderror",
      notice: "出错时触发，返回错误来源和信息，音视频出错时还会返回 context 对象"
    }, {
      name: "bindlinkpress",
      notice: "链接受到点击时触发，返回链接地址和 ignore 函数，调用将不自动跳转"
    }, {
      name: "bindimgtap",
      notice: "图片被点击时触发，返回图片地址和 ignore 函数，调用将不自动预览"
    }, {
      name: "bindimglongtap",
      notice: "图片被长按时触发，返回图片地址"
    }],
    // document 补丁包示例代码
    documentCode: `<pre><code class="language-wxml"><parser id="article" html="{{html}}" binderror="error" /></code></pre>
<pre style="margin-top:15px"><code class="language-javascript">Page({
  data: {
    html: "...<div id='adContainer'><ad unit-id='...'></ad></div>..."
  },
  error(e) {
    // 广告组件加载出错
    if(e.detail.source == "ad") {
      // 获取document
      var document = this.selectComponent("#article").document;
      // 查找广告框容器
      var adContainer = document.getElementById("adContainer");
      if(adContainer)
        adContainer.setStyle("display", "none"); // 隐藏广告容器
    }
  }
})</code></pre>`,
    // cssHandler 补丁包
    moreSelectors: [{
      name: "通配符",
      example: "*"
    }, {
      name: "后代选择器",
      example: ".the-class1 .the-class2"
    }, {
      name: "子选择器",
      example: ".the-class1>.the-class2"
    }, {
      name: "属性选择器",
      example: "[name=\"123\"]"
    }, {
      name: "before 伪类",
      example: ".the-class::before"
    }, {
      name: "after 伪类",
      example: ".the-class::after"
    }, {
      name: "@media 查询",
      example: "@media(min-width:300px)"
    }],
    // 基础库要求
    versions: [{
      version: ">=2.2.5",
      features: "完全正常",
      percent: "99.67%"
    }, {
      version: "1.6.3-2.2.4",
      features: "不支持 lazy-load 属性",
      percent: "0.31%"
    }, {
      version: "<1.6.3",
      features: "无法使用",
      percent: "0.02%"
    }],
    // 获取组件实例的方法
    apiCode: `<pre><code class="language-wxml"><parser id="article" html="{{html}}" bindready="ready" /></code></pre>
<pre style="margin-top:15px"><code class="language-javascript">Page({
  ready() {
    var context = this.selectComponent("#article");
    // 通过 context 调用 api 函数
  }
})</code></pre>
<ol style="margin-left:-15px">
  <li><code>getText</code>
    <div>功能：获取所有文本内容</div>
    <pre><code class="language-javascript">// context 为组件实例
var text = context.getText();
console.log(text)</code></pre>
  </li>
  <li><code>navigateTo</code>
    <div>功能：跳转锚点</div>
    <div>输入值：一个<code>object</code>，<code>id</code>是锚点的<code>id</code>（为空时将跳转到组件开头），<code>success</code>和<code>fail</code>是成功和失败回调（需要配合<code>use-anchor</code>属性使用）
    <pre><code class="language-javascript">// context 为组件实例
context.navigateTo({
  id: "anchor",
  success: console.log,
  fail: console.error
})</code></pre>
  </li>
  <li><code>getVideoContext</code>
    <div>功能：获取视频的<code>context</code>对象，可用于操控视频的播放</div>
    <div>输入值：<code>video</code>标签的<code>id</code>（不输入则返回所有视频的数组）</div>
    <pre><code class="language-javascript">// context 为组件实例
var video = context.getVideoContext("the-id"); // id 为 the-id 的视频对象
var videos = context.getVideoContext(); // 获取所有视频的对象</code></pre>
  </li>
  <li><code>imgList</code>
    <div>功能：获取所有图片数组（这是一个<strong>属性</strong>）
    <div>另外，该数组还提供一个<code>each</code>方法，通过<code>return</code>可以改变数组中的值，该数组用于图片的预览，可以通过此方法设置预览时的大图</div>
    <pre><code class="language-javascript">// context 是组件对象
var imgList = context.imgList;
var cover = imgList[0]; // 首图作为转发封面
imgList.each((src, i, arr) => {
  console.log(src);
  // 若有 return 将改变原数组，可将缩略图链接替换为大图链接
  return src.replace("thumb", "");
})</code></pre>
  </li>
  <li><code>setContent</code>
    <div>功能：解析和渲染<code>html</code>内容（功能上同<code>html</code>属性）</div>
    <div>说明：当<code>html</code>为<code>string</code>类型时无法直接渲染，需要经过解析后再次<code>setData</code>，因此通过此方法可以避免这次无用的<code>setData</code>，提高性能</div>
    <div>输入值：<code>html</code>是富文本字符串</div>
    <pre><code class="language-wxml"><parser id="article" /></code></pre>
    <pre style="margin-top:15px"><code class="language-javascript">Page({
  onLoad(){
    var html = "<div>Hello World!</div>";
    // 此 api 不需要等到 ready
    var context = this.selectComponent("#article");
    context.setContent(html);
    /* 等价于
    this.setData({
      html
    })
    但可以减少一次 setData */
  }
})</code></pre>
  </li>
</ol>`,
    // 更新日志
    changelog: `<style>ol{margin-left:-20px}</style>
<ul style="margin-left:-10px">
  <li>2020.2.23
    <ol>
      <li><code>U</code> 支持自动压缩<code>style</code>属性，移除重复的样式，可以减少解析结果大小</li>
      <li><code>U</code> 支持预览<code>base64</code>图片（通过暂存到本地实现）</li>
      <li><code>U</code> <code>CssHandler</code>补丁包支持属性选择器和<code>@media</code>，伪类中的<code>content</code>支持<code>attr()</code></li>
      <li><code>U</code> 精简了部分代码</li>
    </ol>
  </li>
  </br>
  <li>2020.2.17
    <ol>
      <li><code>A</code> 增加了<code>imglongtap</code>事件，图片被长按时触发，可用于显示自定义菜单</li>
      <li><code>U</code> 优化了双击缩放的效果</li> 
      <li><code>U</code> 图片设置的宽度超出屏幕宽度时自动将高度设置为<code>auto</code>，避免变形（同时移除了<code>img-mode</code>属性）</li>
      <li><code>U</code> 修改了部分文件和文件夹的命名（引入路径<b>有变化</b>）</li>
      <li><code>D</code> 移除了<code>autocopy</code>、<code>autopreview</code>属性，如需禁用自动预览/复制链接，请使用<code>linkpress</code>和<code>imgtap</code>事件中的<code>ignore</code>函数</li>
      <li><code>D</code> 移除了<code>versionHigherThan</code>、<code>parseHtml</code>、<code>parseCss</code>的<code>api</code></li>
      <li><code>D</code> 废弃了后端加强包</li>
    </ol>
  </li>
  </br>
  <li>2020.2.12
    <ol>
      <li><code>A</code> 增加了<code>gesture-zoom</code> 属性，可以设置双击缩放（默认<code>false</code>）</li>
    </ol>
  </li>
  </br>
  <li>2020.1.23
    <ol>
      <li><code>U</code> 支持<code>rpx</code>单位</li>
    </ol>
  </li>
  </br>
  <li>2020.1.20
    <ol>
      <li><code>U</code> <code>video</code>增加支持<code>poster</code>属性</li>
      <li><code>F</code> 修复了部分情况下表格处理出错的问题</li>
      <li><code>F</code> 修复了使用单独的<code>&lt;/p></code>出错的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.1.18
    <ol>
      <li><code>U</code> <code>domain</code>属性支持自动填充所有<code>src</code>属性的值（包括视频、音频、图片；协议名默认<code>http</code>）</li>
      <li><code>U</code> 优化了实体的处理（支持所有形如<code>&amp;#123;</code>的实体编码）</li>
      <li><code>F</code> 修复了图片一开始裂开之后又好了的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.1.7
    <ol>
      <li><code>U</code> 支持模拟显示<code>li</code>, <code>ol</code>, <code>ul</code>标签（即可以在其中放图片、链接、视频等，支持<code>ol</code>的<code>type</code>属性，支持多层<code>ul</code>）</li>
      <li><code>D</code> 删除了<code>List</code>补丁包（已在主包中实现）</li>
      <li><code>F</code> 修复了传入的<code>html</code>为数组时预览会出现顺序颠倒的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.1.5
    <ol>
      <li><code>U</code> 精简和优化了一些代码</li>
    </ol>
  </li>
  </br>
  <li>2019.12.30
    <ol>
      <li><code>A</code> 增加支持<code>svg</code>系列标签</li>
      <li><code>U</code> 减小了解析结果的大小（约<code>3%</code>），减小了插件包的大小</li>
      <li><code>U</code> <code>h1-6</code>标签支持通过组件递归显示（即可以在其中使用图片、链接等）</li>
      <li><code>U</code> 解决了<code>Audits</code>测评中<code>a</code>标签可点击元素的响应区域过小的问题</li>
      <li><code>F</code> 修复了一个样式优先级的错误</li>
    </ol>
  </li>
  </br>
  <li>2019.12.21
    <ol>
      <li><code>F</code> 修复了使用<code>font</code>标签的<code>size</code>属性时出错的问题</li>
    </ol>
  </li>
  </br>
  <li>2019.12.15
    <ol>
      <li><code>A</code> 增加<code>setContent</code>的<code>api</code>，用于设置<code>string</code>类型的数据，可以减少一次<code>setData</code></li>
      <li><code>A</code> 增加<code>imgList</code>的<code>api</code>，可以获取封面、设置缩略图等</li>
      <li><code>U</code> <code>a</code>标签支持了<code>app-id</code>和<code>path</code>属性，可以跳转其他小程序</li>
      <li><code>U</code> <code>domain</code>属性支持自动补全<code>css</code>中<code>url</code>的路径</li>
      <li><code>U</code> <code>cache-id</code>属性更名为<code>use-cache</code>，只用选择是否使用缓存即可，缓存 <code>id</code>会自动通过<code>hash</code>函数获取</li>
      <li><code>D</code> 废弃了<code>html</code>属性的<code>object</code>类型，直接设置<code>array</code>即可（<code>imgList</code>等其他信息可以从<code>nodes</code>中获取）</li>
      <li><code>D</code> 删除了<code>animation-duration</code>属性</code>
    </ol>
  </li>
  </br>
  <li>2019.12.10
    <ol>
      <li><code>A</code> 增加了<code>cache-id</code>属性，可以将解析结果缓存到<code>globalData</code>中，多次打开不用重复解析</li> 
      <li><code>A</code> 增加了<code>getText</code>的<code>api</code>，可以获取到一个富文本中的所有文本内容</li>
      <li><code>A</code> 增加了<code>getVideoContext</code>的<code>api</code>，可以获取到视频的<code>context</code>对象，用于操作播放状态</li>
      <li><code>A</code> 增加了<code>highlight</code>代码高亮处理接口</li>
      <li><code>U</code> 重构了解析脚本，提高了解析速度，减小了包的大小</li>  
      <li><code>U</code> 解决了微信最新版开发者工具会报 <code>wx: key = "" does not look like a valid key name</code> 的警告的问题</li>  
      <li><code>U</code> <code>error</code>事件将返回该视频的<code>context</code>对象，可以修改播放源</li>
    </ol>
  </li>
  </br>
  <li>2019.12.3
    <ol>
      <li><code>A</code> 增加了<code>domain</code>属性，设置后可以自动给图片链接拼接主域名或协议名</li>
      <li><code>A</code> 增加了<code>use-anchor</code>属性，可以选择是否使用页面内锚点</li>
      <li><code>U</code> <code>CssHandler</code>补丁包增加支持<code>before</code>和<code>after</code>伪类</li>
    </ol>
  </li>
  </br>
  <li>2019.11.29
    <ol>
      <li><code>U</code> <code>linkpress</code>和<code>imgtap</code>事件增加<code>ignore</code>函数，在事件中调用此函数将不自动进行链接跳转/图片预览操作，可以屏蔽指定的链接/图片或进行自定义操作</li>
    </ol>
  </li>
  </br>
  <li>2019.11.28
    <ol>
      <li><code>U</code> <code>table</code>标签支持了<code>border</code>, <code>cellpadding</code>, <code>cellspacing</code></li>
    </ol>
  </li>
</ul>
<div style="margin-top:20px">更多信息可见：<a href="https://jin-yufeng.github.io/Parser/#/changelog">更新日志</a></div>`
  },
  // 页面加载
  onLoad(e) {
    this.setData({
      index: e.index
    })
  },
  // 上一章
  prevSection(e) {
    this.setData({
      index: --this.data.index
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  },
  // 下一章
  nextSection(e) {
    this.setData({
      index: ++this.data.index
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  },
  // 页面分享
  onShareAppMessage() {
    return {
      title: "富文本插件" + this.data.titles[this.data.index],
      imageUrl: "https://6874-html-foe72-1259071903.tcb.qcloud.la/share.png?sign=1d1c1938f23a3b1d8b34818599f9f0b4&t=1560250134",
      path: "/pages/docs/docs?index=" + this.data.index
    }
  }
})