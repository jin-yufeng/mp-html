// miniprogram/pages/component/component.js
Page({
  data: {
    page: 1,
    //标签的默认样式
    tagStyle: {
      pre: "padding:5px 10px 5px 10px;margin:15px 0 15px 0;border-radius:5px;background:#f5f2f0;text-shadow: 0 1px white;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace",
      code: "background-color:#f0f0f0;font-size:85%;margin:0 3px 0 3px;padding:2px 5px 2px 5px;border-radius:2px;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace"
    },
    //支持的匹配模式
    styles: [{
      mode: '按class名匹配',
      example: '.demo',
      match: 'class="demo"'
    }, {
      mode: '按id名匹配',
      example: '#demo',
      match: 'id="demo"'
    }, {
      mode: '按标签名匹配',
      example: 'img',
      match: '<img>'
    }],
    //支持的标签列表
    mediaTags: [{
      name: 'img',
      attrs: 'alt, src, height, width, ignore'
    }, {
      name: 'video',
      attrs: 'src, controls, loop, autoplay, \nmuted, height, width, unit-id, \nposter'
    }, {
      name: 'audio',
      attrs: 'src, controls, loop, autoplay, \nposter, name, author'
    }, {
      name: 'source',
      attrs: 'src'
    }, {
      name: 'ad',
      attrs: 'unit-id'
    }],
    tableTags: [{
      name: 'table',
      attrs: 'border, cellpadding,\ncellspacing, width'
    }, {
      name: 'thead'
    }, {
      name: 'tbody'
    }, {
      name: 'tfoot'
    }, {
      name: 'tr'
    }, {
      name: 'th',
      attrs: 'colspan, height, rowspan, width'
    }, {
      name: 'td',
      attrs: 'colspan, height, rowspan, width'
    }, {
      name: 'col',
      attrs: 'span, width'
    }, {
      name: 'colgroup',
      attrs: 'span, width'
    }, {
      name: 'ol',
      attrs: 'start, type'
    }, {
      name: 'ul'
    }, {
      name: 'li'
    }, {
      name: 'dd'
    }, {
      name: 'dl'
    }, {
      name: 'dt'
    }],
    textTags: [{
      name: 'a',
      attrs: 'href, app-id, path'
    }, {
      name: 'abbr'
    }, {
      name: 'b'
    }, {
      name: 'big'
    }, {
      name: 'blockquote'
    }, {
      name: 'br'
    }, {
      name: 'center'
    }, {
      name: 'code'
    }, {
      name: 'del'
    }, {
      name: 'em'
    }, {
      name: 'font',
      attrs: 'size, face, color'
    }, {
      name: 'h1'
    }, {
      name: 'h2'
    }, {
      name: 'h3'
    }, {
      name: 'h4'
    }, {
      name: 'h5'
    }, {
      name: 'h6'
    }, {
      name: 'hr'
    }, {
      name: 'i'
    }, {
      name: 'ins'
    }, {
      name: 'label'
    }, {
      name: 'mark'
    }, {
      name: 'q'
    }, {
      name: 's'
    }, {
      name: 'small'
    }, {
      name: 'span'
    }, {
      name: 'strong'
    }, {
      name: 'sub'
    }, {
      name: 'sup'
    }, {
      name: 'u'
    }],
    blockTags: [{
      name: 'address'
    }, {
      name: 'article'
    }, {
      name: 'aside'
    }, {
      name: 'body'
    }, {
      name: 'cite'
    }, {
      name: 'div',
      attrs: 'align'
    }, {
      name: 'fieldset'
    }, {
      name: 'footer'
    }, {
      name: 'header'
    }, {
      name: 'html'
    }, {
      name: 'legend'
    }, {
      name: 'nav'
    }, {
      name: 'p',
      attrs: 'align'
    }, {
      name: 'pre'
    }, {
      name: 'section'
    }, {
      name: 'style'
    }],
    newTags: [{
      name: 'bdi'
    }, {
      name: 'bdo',
      attrs: 'dir'
    }, {
      name: 'caption',
    }, {
      name: 'rp',
      attrs: '高版本不显示，可用于兼容'
    }, {
      name: 'rt'
    }, {
      name: 'ruby'
    }],
    wxUse: `<li style="margin-bottom:5px">在原生框架中使用</li>
    <ol style="margin-left:5px">
      <li>下载<code>Parser</code>文件夹（<code>Parser.min</code>是压缩版本，功能相同）至小程序目录</li>
      <li>在需要使用页面的<code>json</code>文件中添加
        <pre lan="json" style="margin:8px 0 8px -5px">{
  "usingComponents": {
    "parser": "/Parser/index"
  }
}</pre>
      </li>
      <li>在需要使用页面的<code>wxml</code>文件中添加
        <pre lan="html" style="margin:8px 0 8px -5px"><parser html="&#123;{html}}" /></pre>
      </li>
      <li>在需要使用页面的<code>js</code>文件中添加
        <pre lan="js" style="margin:8px 0 8px -5px">onLoad(){
  this.setData({
    html: "<div>Hello World!</div>"
  })
}</pre>
      </li>
    </ol>`,
    uniUse: `<li style="margin-top:5px;margin-bottom:5px">在<code>uni-app</code>中使用</li>
    <ol style="margin-left:5px">
      <li>下载<code>Parser.uni</code>文件夹至<code>components</code>目录下（更名为<code>Parser</code>）</li>
      <li>在需要使用页面的<code>vue</code>文件中添加<pre lan="html" style="margin:8px 0 8px -5px"><template>
  <view>
    <jyf-parser :html="html"></jyf-parser>
  </view>
</template>
<script>
import parser from "@/components/jyf-parser/jyf-parser"; // HbuilderX 2.5.5 及以上可以不需要
export default {
  // HbuilderX 2.5.5 及以上可以不需要
  components: {
    "jyf-parser": parser
  },
  data() {
    return {
      html: "<div>Hello World!</div>"
    }
  }
}
</script></pre>
      </li>
    </ol>
    <li>可以直接通过<code>uni-app</code>插件市场引入：<a href='https://ext.dcloud.net.cn/plugin?id=805'>链接</a></li>
    <div style="margin-top:5px">在其他框架中使用可见：<a href="https://jin-yufeng.github.io/Parser/#/instructions?id=在其他框架中使用">在其他框架中使用</a></div>`,
    documentCode: `<pre lan="html"><parser id="article" html="{{html}}" binderror="error" /></pre>
    <pre lan="js">data: {
  html: "...<div id='adContainer'><ad unit-id='...'></ad></div>..."
}
error(e) {
  // 广告组件加载出错
  if(e.detail.source == "ad") {
    // 获取document
    var document = this.selectComponent("#article").document;
    // 查找广告框容器
    var adContainer = document.getElementById("adContainer");
    if(adContainer)
      res.data.setStyle("display", "none"); // 隐藏广告容器
  }
}</pre>`,
    //属性
    attrs: [{
      name: 'html',
      type: 'String\nArray\nObject',
      notice: '要显示的富文本数据'
    }, {
      name: 'tag-style',
      type: 'Object',
      notice: '标签的默认样式'
    }, {
      name: 'autocopy',
      type: 'Boolean',
      default: 'true',
      notice: '是否允许点击链接时自动复制链接地址（仅限http开头的网址链接）'
    }, {
      name: 'autopause',
      type: 'Boolean',
      default: 'true',
      notice: '是否允许在播放视频时自动暂停其他视频'
    }, {
      name: 'autopreview',
      type: 'Boolean',
      default: 'true',
      notice: '是否允许点击图片时自动预览'
    }, {
      name: 'autosetTitle',
      type: 'Boolean',
      default: 'true',
      notice: '是否自动将title标签中的内容设置到页面标题'
    }, {
      name: 'domain',
      type: 'String',
      default: '',
      notice: '主域名，设置后将自动给图片链接拼接上主域名或协议名'
    }, {
      name: 'gesture-zoom',
      type: 'Boolean',
      default: 'false',
      notice: '是否开启双击缩放'
    }, {
      name: 'img-mode',
      type: 'String',
      default: 'default',
      notice: '图片的显示模式'
    }, {
      name: 'lazy-load',
      type: 'Boolean',
      default: 'false',
      notice: '是否开启图片懒加载'
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
      name: 'use-anchor',
      type: 'Boolean',
      default: 'false',
      notice: '是否使用页面内锚点'
    }, {
      name: 'use-cache',
      type: 'Boolean',
      default: 'false',
      notice: '是否使用缓存，设置后将对解析结果进行缓存，多次打开不用重复解析'
    }],
    //回调函数
    callback: `<ul style="text-align:justify">
      <li><code>bindparse</code><br/>
      当传入的<code>html</code>为字符串类型时，解析完成后调用；返回解析结果（一个节点数组 <code>nodes</code>），对该结果进行自定义修改后将在渲染时生效
      </li>
      <li style="margin-top:5px;"><code>bindready</code><br/>
      渲染完成时调用，返回值是组件<code>boundingClientRect</code>查询的结果，包含宽高、位置等信息（每次传入的<code>html</code>修改后都会触发）
      </li>
      <li style="margin-top:5px;"><code>binderror</code><br/>
      出错时时调用，返回值为一个结构体，其中<code>source</code>是错误来源（可能是<code>ad</code>广告出错、<code>video</code>视频加载出错、<code>audio</code>音频加载出错以及<code>parse</code>解析过程中出错）；<code>errMsg</code>是错误原因；<code>errCode</code>是错误代码（仅<code>ad</code>）；<code>target</code>属性中含有出错标签的具体信息；<code>context</code>是该音频/视频的<code>context</code>对象
      </li>
      <li style="margin-top:5px;"><code>bindlinkpress</code><br/>
      链接（<code>a</code>标签）受到点击时调用，返回值是一个形如<code>{href, ignore}</code>的结构体，其中<code>href</code>是被点击链接的<code>href</code>值，如果该链接不是简单的跳转，可以在此回调函数中进行进一步操作（如附件链接可以在这里下载和打开）；在回调中调用<code>ignore</code>函数将不自动跳转/复制链接
      </li>
      <li style="margin-top:5px;"><code>bindimgtap</code><br/>
      图片被点击时调用，返回值是一个形如<code>{src, ignore}</code>的结构体，其中<code>src</code>是图片的链接；在回调中调用<code>ignore</code>函数将不自动预览；可用于阻挡<code>onShow</code>的调用
      </li>
      <li style="margin-top:5px;">备注：所有回调函数的返回值在<code>e.detail</code>中获取</li>
    </ul>`,
    selectors: [{
      mode: "*",
      match: "所有",
      notice: "通配符"
    }, {
      mode: ".a .b",
      match: '&lt;element class="a"&gt;\n&nbsp;...\n&nbsp;&nbsp;&lt;element class="b"&gt;',
      notice: "后代选择器"
    }, {
      mode: ".a>.b",
      match: '&lt;element class="a"&gt;\n&nbsp;&lt;element class="b"&gt;',
      notice: "子选择器"
    }, {
      mode: ".c:before",
      match: '&lt;element class="c" :before&gt;',
      notice: "before伪类"
    }, {
      mode: ".c:after",
      match: '&lt;element class="c" :after&gt;',
      notice: "after伪类"
    }],
    //基础库要求
    versions: [{
      version: ">=2.2.5",
      function: "完全正常",
      percent: "99.19%"
    }, {
      version: "1.9.3-2.2.4",
      function: "不支持部分html实体",
      percent: "0.68%"
    }, {
      version: "1.6.3-1.9.2",
      function: "不支持部分html实体\n不支持lazyload属性",
      percent: "0.05%"
    }, {
      version: "<1.6.3",
      function: "无法使用",
      percent: "0.05%"
    }],
    //更新日志
    update: `<ul>
    <li>2020.2.12:
      <ol>
        <li><code>A</code> 增加了<code>gesture-zoom</code> 属性，可以设置双击缩放（默认<code>false</code>）</li>
      </ol>
    </li>
    </br>
    <li>2020.1.23:
      <ol>
        <li><code>U</code> 支持<code>rpx</code>单位</li>
      </ol>
    </li>
    </br>
    <li>2020.1.20:
      <ol>
        <li><code>U</code> <code>video</code>增加支持<code>poster</code>属性</li>
        <li><code>F</code> 修复了部分情况下表格处理出错的问题</li>
        <li><code>F</code> 修复了使用单独的<code>&lt;/p></code>出错的问题</li>
      </ol>
    </li>
    </br>
    <li>2020.1.18:
      <ol>
        <li><code>U</code> <code>domain</code>属性支持自动填充所有<code>src</code>属性的值（包括视频、音频、图片；协议名默认<code>http</code>）</li>
        <li><code>U</code> 优化了实体的处理（支持所有形如<code>&amp;#123;</code>的实体编码）</li>
        <li><code>F</code> 修复了图片一开始裂开之后又好了的问题</li>
      </ol>
    </li>
    </br>
    <li>2020.1.7:
      <ol>
        <li><code>U</code> 支持模拟显示<code>li</code>, <code>ol</code>, <code>ul</code>标签（即可以在其中放图片、链接、视频等，支持<code>ol</code>的<code>type</code>属性，支持多层<code>ul</code>）</li>
        <li><code>D</code> 删除了<code>List</code>补丁包（已在主包中实现）</li>
        <li><code>F</code> 修复了传入的<code>html</code>为数组时预览会出现顺序颠倒的问题</li>
      </ol>
    </li>
    </br>
    <li>2020.1.5:
      <ol>
        <li><code>U</code> 精简和优化了一些代码</li>
      </ol>
    </li>
    </br>
    <li>2019.12.30:
      <ol>
        <li><code>A</code> 增加支持<code>svg</code>系列标签</li>
        <li><code>U</code> 减小了解析结果的大小（约<code>3%</code>），减小了插件包的大小</li>
        <li><code>U</code> <code>h1-6</code>标签支持通过组件递归显示（即可以在其中使用图片、链接等）</li>
        <li><code>U</code> 解决了<code>Audits</code>测评中<code>a</code>标签可点击元素的响应区域过小的问题</li>
        <li><code>F</code> 修复了一个样式优先级的错误</li>
      </ol>
    </li>
    </br>
    <li>2019.12.21:
      <ol>
        <li><code>F</code> 修复了使用<code>font</code>标签的<code>size</code>属性时出错的问题</li>
      </ol>
    </li>
    </br>
    <li>2019.12.15:
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
    <li>2019.12.10:
      <ol>
        <li><code>A</code> 增加了<code>cache-id</code>属性，可以将解析结果缓存到<code>globalData</code>中，多次打开不用重复解析</li> 
        <li><code>A</code> 增加了<code>getText</code>的<code>api</code>，可以获取到一个富文本中的所有文本内容</li>
        <li><code>A</code> 增加了<code>getVideoContext</code>的<code>api</code>，可以获取到视频的<code>context</code>对象，用于操作播放状态</li>
        <li><code>A</code> 增加了<code>highlight</code>代码高亮处理接口</li>
        <li><code>U</code> 重构了解析脚本，提高了解析速度，减小了包的大小</li>  
        <li><code>U</code> 解决了微信最新版开发者工具会报 <code>wx: key = "" does not look like a valid key name</code> 的警告的问题</li>  
        <li><code>U</code> <code>error</code>回调将返回该视频的<code>context</code>对象，可以修改播放源</li>
      </ol>
    </li>
    </br>
    <li>2019.12.3:
      <ol>
        <li><code>A</code> 增加了<code>domain</code>属性，设置后可以自动给图片链接拼接主域名或协议名</li>
        <li><code>A</code> 增加了<code>use-anchor</code>属性，可以选择是否使用页面内锚点</li>
        <li><code>U</code> <code>CssHandler</code>补丁包增加支持<code>before</code>和<code>after</code>伪类</li>
      </ol>
    </li>
    </br>
    <li>2019.11.29:
      <ol>
        <li><code>U</code> <code>linkpress</code>和<code>imgtap</code>回调增加<code>ignore</code>函数，在回调中调用此函数将不自动进行链接跳转/图片预览操作，可以屏蔽指定的链接/图片或进行自定义操作</li>
      </ol>
    </li>
    </br>
    <li>2019.11.28:
      <ol>
        <li><code>U</code> <code>table</code>标签支持了<code>border</code>, <code>cellpadding</code>, <code>cellspacing</code></li>
      </ol>
    </li>
  </ul>`
  },
  prev() {
    var section;
    if (this.data.page == 2)
      section = "introduction";
    else
      section = "usage";
    this.setData({
      page: this.data.page - 1,
      section
    })
  },
  next() {
    var section;
    if (this.data.page == 1)
      section = "usage";
    else
      section = "update";
    this.setData({
      page: this.data.page + 1,
      section
    })
  },
  gotop() {
    this.setData({
      top: 0
    })
  },
  gosection(e) {
    if (e.currentTarget.dataset.section == "introduction" && this.data.page != 1) {
      this.setData({
        page: 1,
        section: "catalogue"
      })
    } else if (e.currentTarget.dataset.section == "usage" && this.data.page != 2) {
      this.setData({
        page: 2,
        section: "catalogue"
      })
    } else if (e.currentTarget.dataset.section == "update" && this.data.page != 3) {
      this.setData({
        page: 3,
        section: "catalogue"
      })
    } else {
      this.setData({
        section: e.currentTarget.dataset.section
      })
    }
  },
})