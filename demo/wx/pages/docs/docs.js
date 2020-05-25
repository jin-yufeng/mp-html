// docs.js
Page({
  // 数据
  data: {
    // 标题
    titles: ['功能介绍', '使用方法', '更新日志'],
    // 标签的默认样式
    tagStyle: {
      pre: 'padding:1em 1em 0 1em;margin:.5em 0;border-radius:0.3em;background:#2d2d2d;color:#ccc;line-height: 1.5;font-family:Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace;position:relative',
      code: 'background-color:#f0f0f0;font-size:85%;margin:0 3px;padding:2px 5px 2px 5px;border-radius:2px;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace'
    },
    // 支持的选择器
    selectors: [{
      name: 'class 选择器',
      example: '.the-class'
    }, {
      name: 'id 选择器',
      example: '#the-id'
    }, {
      name: '标签名选择器',
      example: 'img'
    }, {
      name: '多选择器的并集',
      example: '.the-class, #the-id'
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
      code: "background-color:#f0f0f0;border-radius:2px;font-family:monospace"
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
<a href="../demo/demo?index=0&anchor=anchor">立即体验</a>`,
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
    compress: `<ul style="margin:10px 0 0 -15px">
  <li>自动合并一些不必要的层级</li>
  <li>在非<code>pre</code>标签且没有<code>white-space:pre</code>时自动去除空白符</li>
  <li>压缩<code>style</code>属性的值，去除重复的属性和多余的空格</li>
  <li>移除不支持的属性和一些不支持的标签</li>
</ul>
<div style="margin-top:10px">
  通过设置<code>compress</code>属性，还可以实现以下压缩（在匹配完<code>style</code>标签中的样式后）：
</div>
<ul style="margin:10px 0 0 -15px">
  <li>移除所有<code>id</code>属性（将无法使用锚点）</li>
  <li>移除所有<code>class</code>属性（将无法匹配<code>wxss</code>中的样式）</li>
</ul>`,
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
      name: 'a',
      attrs: 'href, app-id, path'
    }, {
      name: 'ad',
      attrs: 'unit-id'
    }, {
      name: 'audio',
      attrs: 'author, autoplay, controls,\nloop, name, poster, src'
    }, {
      name: 'base',
      attrs: 'href'
    }, {
      name: 'embed',
      attrs: 'autostart, height, loop,\nsrc, type, width'
    }, {
      name: 'font',
      attrs: 'color, face, size'
    }, {
      name: 'source',
      attrs: 'src'
    }, {
      name: 'svg',
      attrs: 'svg 系列所有标签'
    }, {
      name: 'table',
      attrs: 'border, cellpadding,\ncellspacing, width'
    }, {
      name: 'video',
      attrs: 'autoplay, controls, height, loop,\nmuted, poster, src, unit-id, width'
    }],
    // 2.7.1 基础库以上才支持的标签
    newTags: [{
      name: 'bdi'
    }, {
      name: 'bdo',
      attrs: 'dir'
    }, {
      name: 'rp',
      attrs: '高版本不显示，可用于兼容'
    }, {
      name: 'rt'
    }, {
      name: 'ruby'
    }],
    // 事件
    eventsIntro: `<ol style="margin:10px 0 0 -15px">
  <li>链接点击事件
    <div>链接受到点击时，若<code>href</code>属性的值是网络链接，将自动复制链接；若是内部路径，则自动跳转页面；若设置了<code>app-id</code>和<code>path</code>，则将跳转其他小程序；同时触发<code>linkpress</code>事件，可进行自定义处理</div>
  </li>
  <li>图片点击事件
    <div>图片受到点击时，将自动进行预览（支持<code>base64</code>），同时触发<code>imgtap</code>事件，可进行自定义处理（对于装饰性图片，可以设置<code>ignore</code>属性，将无法预览）</div>
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
import jyfParser from "@/components/jyf-parser/jyf-parser";
export default {
  // HBuilderX 2.5.5+ 可以通过 easycom 自动引入
  components: {
    jyfParser
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
      name: 'html',
      type: 'String\nArray',
      notice: '要显示的 html 数据，格式同 rich-text'
    }, {
      name: 'autopause',
      type: 'Boolean',
      default: 'true',
      notice: '是否允许在播放视频时自动暂停其他视频'
    }, {
      name: 'autoscroll',
      type: 'Boolean',
      default: 'false',
      notice: '是否自动给 table 加一个滚动层（使表格可以单独滚动）'
    }, {
      name: 'autosetTitle',
      type: 'Boolean',
      default: 'true',
      notice: '是否自动将 title 标签的内容设置到页面标题'
    }, {
      name: 'compress',
      type: 'Number',
      default: '0',
      notice: '压缩等级，可以选择是否移除 id 和 class'
    }, {
      name: 'domain',
      type: 'String',
      notice: '主域名，设置后将给链接拼接上主域名或协议名'
    }, {
      name: 'lazy-load',
      type: 'Boolean',
      default: 'false',
      notice: '是否开启图片懒加载'
    }, {
      name: 'loading-img',
      type: 'String',
      notice: '图片加载完成前的占位图'
    }, {
      name: 'selectable',
      type: 'Boolean',
      default: 'false',
      notice: '是否允许长按复制内容'
    }, {
      name: 'show-with-\nanimation',
      type: 'Boolean',
      default: 'false',
      notice: '是否使用渐显动画效果'
    }, {
      name: 'tag-style',
      type: 'Object',
      notice: '标签的默认样式'
    }, {
      name: 'use-anchor',
      type: 'Boolean',
      default: 'false',
      notice: '是否使用页面内锚点'
    }, {
      name: 'use-cache',
      type: 'Boolean',
      default: 'false',
      notice: '是否使用缓存，设置后多次打开不用重复解析'
    }],
    // 事件
    events: [{
      name: 'bindparse',
      notice: '解析完成时触发，返回解析结果，对这个结果进行修改，将在渲染时生效'
    }, {
      name: 'bindload',
      notice: 'dom 结构加载完成时触发，无返回值，可以调用 api'
    }, {
      name: 'bindready',
      notice: '渲染完成时触发，返回组件框的位置大小信息（将等待所有图片加载完毕，延时较长）'
    }, {
      name: 'binderror',
      notice: '出错时触发，返回错误来源和信息'
    }, {
      name: 'bindlinkpress',
      notice: '链接受到点击时触发，返回链接地址和 ignore 函数，调用将不自动跳转'
    }, {
      name: 'bindimgtap',
      notice: '图片被点击时触发，返回图片地址和 ignore 函数，调用将不自动预览'
    }],
    // api
    apiCode: `<pre><code class="language-wxml"><parser id="article" html="{{html}}" bindload="load" /></code></pre>
<pre style="margin-top:15px"><code class="language-javascript">Page({
  load() {
    var context = this.selectComponent("#article");
    // 通过 context 调用 api 函数
  }
})</code></pre>
<ol style="margin-left:-15px">
  <div style="margin:10px 0 10px 25px">以下<code>api</code>必须在<code>load</code>事件中或之后使用</div>
  <li><code>getText</code>
    <div>功能：获取所有文本内容</div>
    <pre><code class="language-javascript">// context 为组件实例
var text = context.getText();
console.log(text)</code></pre>
  </li>
  <li><code>navigateTo</code>
    <div>功能：跳转锚点</div>
    <div>输入值：一个<code>object</code>，<code>id</code>是锚点的<code>id</code>（为空时将跳转到组件开头），<code>offset</code>是偏移量，<code>success</code>和<code>fail</code>是成功和失败回调（需要配合<code>use-anchor</code>属性使用）</div>
    <div>为确保跳转位置准确，建议在<code>ready</code>事件中或之后使用</div>
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
    <div>功能：获取所有图片数组（这是一个<strong>属性</strong>）</div>
    <div>另外，该数组还提供一个<code>each</code>方法，通过<code>return</code>可以改变数组中的值，该数组用于图片的预览，可以通过此方法设置预览时的大图</div>
    <pre><code class="language-javascript">// context 是组件实例
var imgList = context.imgList;
var cover = imgList[0]; // 首图作为转发封面
imgList.each((src, i, arr) => {
  console.log(src);
  // 若有 return 将改变原数组，可将缩略图链接替换为大图链接
  return src.replace("thumb", "");
})</code></pre>
  </li>
  <li><code>rect</code>
    <div>功能：获取富文本内容的大小和位置（这是一个<strong>属性</strong>）</div>
    <div>应在<code>ready</code>事件后使用，否则可能无法获取或不准确</div>
    <pre><code class="language-javascript">// context 是组件实例
var rect = context.rect;
console.log(rect.width); // 宽度
console.log(rect.height); // 高度</code></pre>
  </li>
  <div style="margin:10px 0 10px 25px">以下<code>api</code>可以立即使用</div>
  <li><code>setContent</code>
    <div>功能：解析和渲染<code>html</code>内容（功能上同<code>html</code>属性）</div>
    <div>说明：当<code>html</code>为<code>string</code>类型时无法直接渲染，需要经过解析后再次<code>setData</code>，因此通过此方法可以避免这次无用的<code>setData</code>，提高性能</div>
    <div>输入值：<code>html</code>是富文本字符串，<code>append</code>表示是否在尾部追加</div>
    <pre><code class="language-wxml"><parser id="article" /></code></pre>
    <pre style="margin-top:15px"><code class="language-javascript">Page({
  onLoad() {
    var html = "<div>Hello World!</div>";
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
    // 配置项示例代码
    configCode: `<ol style="margin-left:-15px">
  <li><code>errorImg</code>
    <div>图片出错时的占位图</div>
  </li>
  <li><code>filter</code>
    <div>功能：过滤器函数，可以对解析到的标签进行自定义处理，将在渲染时生效</div>
    <div>输入值：<code>node</code>为解析到的节点的结构体，<code>context</code>是解析器实例（可以获取一些解析选项和方法）</div>
    <div>返回值：若返回<code>false</code>，将移除此节点</div>
    <pre><code class="language-javascript">filter(node, ctx) {
  if(node.name == "xxx") return false; // 将移除 xxx 标签
  if(node.name == "yyy") ctx.bubble(); // 不能被 rich-text 包含的标签需要调用此方法
}</code></pre>
  </li>
  <li><code>highlight</code>
    <div>功能：处理代码高亮</div>
    <div>输入值：<code>content</code>为<code>pre</code>标签中的内容，<code>attrs</code>是<code>pre</code>标签的属性列表（可以记录语言信息）</div>
    <div>返回值：高亮处理后的结果</div>
    <pre><code class="language-javascript">highlight(content, attrs) {
  attrs["data-content"] = content; // 记录原始文本，可用于长按复制
  if(attrs.lan)
    return Prism.highlight(content, Prism.languages[attrs.lan], attrs.lan);
  else
    return content;
}</code></pre>
  </li>
  <li><code>onText</code>
    <div>功能：处理文本（解析到文本时触发，可以替换特殊符号）</div>
    <div>输入值：<code>text</code>是解析到的文本；<code>hasTag</code>是一个函数，若返回值中含有<code>html</code>标签（如图片）则需要调用，将重新解析这段文本</div>
    <div>返回值：若不为空将把这段文本设置成返回值</div>
    <pre><code class="language-javascript">onText(text, hasTag) {
  if(text.includes("$math$")) {
    hasTag();
    retrun text.replace("$math$", "<img src='xxx.jpg'>"); // 替换数学公式符号为图片
  }
}</code></pre>
  </li>
</ol>`,
    // document 扩展包示例代码
    documentCode: `<pre><code class="language-wxml"><parser id="article" html="{{html}}" binderror="error" /></code></pre>
<pre style="margin-top:15px"><code class="language-javascript">Page({
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
})</code></pre>`,
    // cssHandler 扩展包
    moreSelectors: [{
      name: '通配符',
      example: '*'
    }, {
      name: '后代选择器',
      example: '.the-class1 .the-class2'
    }, {
      name: '子选择器',
      example: '.the-class1>.the-class2'
    }, {
      name: '属性选择器',
      example: '[name="123"]'
    }, {
      name: 'before 伪类',
      example: '.the-class::before'
    }, {
      name: 'after 伪类',
      example: '.the-class::after'
    }, {
      name: '@media 查询',
      example: '@media(min-width:300px)'
    }],
    // parser-group 扩展包
    parserGroup: `<ol style="margin-left:-15px">
  <li>图片预览时可以通过左右滑动查看该<code>group</code>下所有图片</li>
  <li>一个<code>parser</code>标签中的<code>a</code>标签可以跳转另一个<code>parser</code>中的锚点（需开启<code>use-anchor</code>属性）</li>
  <li>播放一个视频时可以自动暂停该<code>group</code>下所有视频（需开启<code>antopause</code>属性）</li>
</ol>`,
    // audio 扩展包
    audio: `<ol style="margin-left:-15px">
  <li>其大小会根据屏幕宽度自动调整（原生<code>audio</code>大小不可变）</li>
  <li>支持<code>autoplay</code>属性</li>
  <li>增加了一个可以拖动的进度条</li>
  <li><code>autopause</code>属性可以控制到音频（即播放一个音频时，若再播放一个视频或音频，将自动暂停此音频）</li>
</ol>
<div style="text-align:center;margin:0.8em 0">
  <audio poster="https://6874-html-foe72-1259071903.tcb.qcloud.la/music.jpg?sign=fcc5ef3dc42d606ea54064f0291eb4b6&t=1584979825" name="致爱丽丝" author="暂无" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/music.mp3?sign=ee1a9895e9421d296cda186b17f0de22&t=1584979840" controls loop></audio>
</div>
<div>详细可见：<a href='https://jin-yufeng.github.io/Parser/#/instructions?id=扩展包'>扩展包</a></div>`,
    // 基础库要求
    versions: [{
      version: '<2.7.1',
      features: '不支持图片长按菜单\n不支持 bdi bdo ruby 标签',
      percent: '1.41%'
    }, {
      version: '<2.4.4',
      features: '不支持 a 标签的 visited 效果',
      percent: '0.23%'
    }, {
      version: '<2.2.5',
      features: '不支持部分实体编码',
      percent: '0.10%'
    }, {
      version: '<1.6.3',
      features: '无法使用',
      percent: '<0.01%'
    }],
    // 更新日志
    changelog: `<style>ol{margin-left:-20px}</style>
<ul style="margin-left:-10px">
  <li>2020.5.24
    <ol>
      <li><code>A</code> 增加<code>loading-img</code>属性，可以设置图片加载完成前的占位图</li>
      <li><code>A</code> 增加<code>errorImg</code>的配置项，可以设置图片出错时的占位图</li>
      <li><code>D</code> <code>error</code>事件中不再返回<code>context</code>对象</li>
    </ol>
  </li>
  </br>
  <li>2020.5.21
    <ol>
      <li><code>U</code> 支持<code>embed</code>标签（<code>type</code>中含<code>video</code>或后缀名为<code>.mp4</code> <code>.3gp</code> <code>.m3u8</code>的将被转为视频；<code>type</code>中含<code>audio</code>或后缀名为<code>.m4a</code> <code>.wav</code> <code>.mp3</code> <code>.aac</code>的将被转为音频；其余不支持）</li>
      <li><code>U</code> 音视频既没有设置<code>autoplay</code>也没有设置<code>controls</code>将自动设置<code>controls</code>，避免无法播放</li>
      <li><code>F</code> 修复了锚点无法跳转到<code>li</code>和<code>a</code>标签的问题</li>
      <li><code>F</code> 修复了部分情况下<code>svg</code>标签<code>style</code>中的<code>vertical-align</code>无法生效的问题</li>
      <li><code>F</code> 修复了未闭合的标签如果是<code>rich-text</code>不支持的标签可能无法显示的问题</li>
      <li><code>F</code> 修复了<code>error</code>事件中通过<code>setSrc</code>重设图片地址后无法预览的问题</li>
      <li><code>F</code> 修复了个别情况下可能出现<code>null is not an object</code>错误的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.5.13
    <ol>
      <li><code>A</code> 增加了<code>autoscroll</code>属性，可以给所有表格添加一个滚动层</li>
      <li><code>U</code> <code>a</code>标签可以跳转到<code>tabbar</code>页面</li>
      <li><code>U</code> 通过<code>stylelint</code>规范<code>css</code>的写法</li>
      <li><code>D</code> 去除了<code>gesture-zoom</code>属性</li>
      <li><code>D</code> 去除了<code>preLoad</code>的<code>api</code></li>
    </ol>
  </li>
  </br>
  <li>2020.5.11
    <ol>
      <li><code>F</code> 修复了电脑端<code>rpx</code>可能换算不正确的问题</li>
      <li><code>F</code> 修复了上一版本个别情况下可能出现<code>Cannot read property 'name' of undefined</code>的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.5.8
    <ol>
      <li><code>F</code> 修复了个别情况下空格被错误过滤的问题</li>
      <li><code>D</code> 移除了<code>xml</code>属性（<code>svg</code>标签默认按<code>xml</code>方式解析，可以以<code>&lt;svg /></code>方式结束）</li>
      <li><code>D</code> 取消对<code>picture</code>标签的支持</li>
    </ol>
  </li>
  </br>
  <li>2020.5.6
    <ol>
      <li><code>F</code> 修复了<code>CssHandler</code>扩展包后代选择器优先级低于<code>id</code>选择器的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.4.26
    <ol>
      <li><code>F</code> 修复了个别情况下图片表现不正常的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.4.25
    <ol>
      <li><code>U</code> 优化了图片的显示方式（可解决加载完毕时大小突变的问题，但不再支持云文件<code>ID</code>和<code>webp</code>图片）</li>
      <li><code>U</code> 支持在链接中使用实体编码</li>
      <li><code>U</code> 模拟实现的列表（内含图片链接）支持<code>list-style:none</code></li>
      <li><code>U</code> <code>navigateTo</code>的<code>api</code>增加一个<code>offset</code>参数，可设置偏移量</li>
      <li><code>F</code> 修复了个别情况下图片宽度过宽的问题</li>
      <li><code>F</code> 修复了<code>CssHandler</code>扩展包<code>class</code>匹配错误的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.4.13
    <ol>
      <li><code>F</code> 修复了自动移除空<code>div</code>导致换行失效的问题</li>
      <li><code>F</code> 修复了使用多个并列<code>rpx</code>时可能失效的问题</li>
      <li><code>F</code> 修复了<code>audio</code>扩展包音乐名太长会导致样式错乱的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.3.26
    <ol>
      <li><code>A</code> 增加了<code>xml</code>属性，可以以<code>xml</code>方式解析</li>
      <li><code>F</code> 修复了使用自闭合 <code>svg</code> 标签会导致死循环的问题</li>
      <li><code>F</code> 修复了设置<code>domain</code>属性时<code>data:image</code>和<code>cloud://</code>的链接会被错误填充的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.3.23
    <ol>
      <li><code>A</code> 增加了<code>audio</code>扩展包，用于解决原生<code>audio</code>被废弃的问题</li>
      <li><code>U</code> 通过<code>eslint</code>检查规范和修复了一些问题</li>
    </ol>
  </li>
  </br>
  <li>2020.3.21
    <ol>
      <li><code>U</code> 没有使用<code>colspan</code>和<code>rowspan</code>的表格里的链接可以点击</li>
    </ol>
  </li>
  </br>
  <li>2020.3.20
    <ol>
      <li><code>U</code> 将不用于渲染的属性声明为纯数据字段，可以提升性能</li>
      <li><code>U</code> 所有标签支持<code>align</code>属性</li>
      <li><code>F</code> 修复了设置<code>domain</code>时背景图片链接被错误填充的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.3.17 beta
    <ol>
      <li><code>U</code> 通过<code>image</code>（经过一些处理后）来显示图片（替代<code>rich-text</code>），可以实现以下优化：
        <ul style="margin-left:-20px">
          <li><code>2.3.0</code>起支持云文件<code>ID</code></li>
          <li><code>2.7.0</code>起支持长按弹出菜单（可以识别小程序码，同时去除了<code>imglongtap</code>事件）</li>
          <li><code>2.9.0</code>起支持<code>webp</code>图片</li>
          <li>使用<code>image</code>原生的<code>lazy-load</code>，可能具有更好的性能</li>
          <li>加载错误时能够触发<code>error</code>事件，且可以重设<code>src</code></li>
        </ul>
      </li>
      <li><code>U</code> <code>a</code>标签支持<code>:visited</code>效果（默认变为紫色）</li>
      <li><code>F</code> 修复了<code>a</code>标签所在段落若使用一些特殊实体编码可能被错误换行的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.3.12
    <ol>
      <li><code>A</code> 增加了<code>compress</code>属性，可以设置压缩等级</li>
      <li><code>A</code> 配置项中增加了<code>filter</code>和<code>onText</code>方法，可以在解析过程中进行一些自定义的处理</li>
      <li><code>A</code> 增加了<code>rect</code>的<code>api</code>，可以获取富文本内容大小和位置</li>
      <li><code>U</code> <code>setContent</code>的<code>api</code>支持传入<code>append</code>参数表示是否在尾部追加（用于加载更多）</li>
      <li><code>U</code> 支持通过<code>base</code>标签设置主域名（同<code>domain</code>属性，但优先级更低）</li>
      <li><code>F</code> 修复了在<code>ready</code>事件触发前再次设置数据会导致<code>ready</code>事件不停触发的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.3.7
    <ol>
      <li><code>A</code> 增加了<code>preLoad</code>的<code>api</code>，可以预加载富文本中的图片</li>
      <li><code>A</code> 增加<code>bindload</code>事件（<code>dom</code>加载完毕时触发，即原<code>ready</code>事件，<code>ready</code>事件更改为所有图片加载完毕时触发，可以获取准确大小）</li>
      <li><code>U</code> 优化了不开启<code>lazy-load</code>属性时图片的加载速度；另外开启懒加载时，首图（较大概率直接进入视野）也将不经过判断直接加载，避免因懒加载判断拖慢加载速度</li>
    </ol>
  </li>
  </br>
  <li>2020.3.1
    <ol>
      <li><code>U</code> 支持<code>picture</code>标签，可以在不同大小的屏幕上显示不同链接的图片</li>
      <li><code>U</code> 支持在<code>sub</code>、<code>sup</code>标签中使用<code>a</code>标签</li>
      <li><code>U</code> 给<code>document</code>扩展包增加和修改了一些方法</li>
      <li><code>F</code> 修复了由于自动压缩产生的一些问题（主要是<code>background-image</code>）</li>
      <li><code>F</code> 修复了使用<code>show-with-animation</code>属性时个别情况下可能出现白屏的问题</li>
    </ol>
  </li>
  </br>
  <li>2020.2.26
    <ol>
      <li><code>A</code> 添加了<code>parser-group</code>的扩展包</li>
      <li><code>F</code> 修复了部分情况下连续实体编码失效的问题</li>
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
  // 演示
  show() {
    this.setData({
      show: true
    })
  },
  // 切换章节
  changeSection(e) {
    this.setData({
      index: e.target.dataset.index
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  },
  // 页面分享
  onShareAppMessage() {
    return {
      title: '富文本插件' + this.data.titles[this.data.index],
      imageUrl: 'https://6874-html-foe72-1259071903.tcb.qcloud.la/share.png?sign=1d1c1938f23a3b1d8b34818599f9f0b4&t=1560250134',
      path: '/pages/docs/docs?index=' + this.data.index
    }
  }
})