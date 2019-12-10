// miniprogram/pages/component/component.js
const code = require('./code.js');
Page({
  data: {
    page: 1,
    //标签的默认样式
    tagStyle: {
      code: "font-style:italic;color:#005cc5;margin-left:3px;margin-right:3px;background-color:white"
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
    //示例代码
    stylecode: code.stylecode,
    tagStylecode: code.tagStylecode,
    loadingcode: code.loadingcode,
    sourcecode: code.sourcecode,
    //支持的标签列表
    mediaTags: [{
      name: 'img',
      attrs: 'alt, src, height, width, ignore'
    }, {
      name: 'video',
      attrs: 'src, controls, loop, autoplay, \nmuted, height, width, unit-id'
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
      attrs: 'href'
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
    //示例代码
    errorcode: code.errorcode,
    json: code.json,
    wxml: code.wxml,
    js: code.js,
    uni: code.uni,
    emoji: code.emoji,
    apicode: code.apicode,
    listJson: code.listJson,
    listJson2: code.listJson2,
    listWxml: code.listWxml,
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
      name: 'cache-id',
      type: 'String',
      default: '',
      notice: '缓存 id，设置后将把解析结果进行缓存，下次直接使用'
    },{
      name: 'domain',
      type: 'String',
      default: '',
      notice: '主域名，设置后将自动给图片链接拼接上主域名或协议名'
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
      name: 'animation-\nduration',
      type: 'Number',
      default: '400',
      notice: '动画持续时间（单位ms）'
    }, {
      name: 'use-anchor',
      type: 'Boolean',
      default: 'false',
      notice: '是否使用页面内锚点'
    }],
    //回调函数
    callback: `<ul style="text-align:justify">
      <li><code>bindparse</code><br/>
      当传入的<code>html</code>为字符串类型时，解析完成后调用；返回值是一个形如<code>{nodes, imgList, title}</code>的结构体，<code>nodes</code>是节点数组，<code>imgList</code>是所有图片地址的数组，<code>title</code>是页面标题（可用于转发）可以将该值保存后下次调用时直接作为属性<code>html</code>的值，可节省解析时间
      </li>
      <li style="margin-top:5px;"><code>bindready</code><br/>
      渲染完成时调用，返回值是整个组件的<code>NodesRef</code>结构体，包含宽度、高度、位置等信息（每次传入的<code>html</code>修改后都会触发）
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
    <li>2019.12.9:
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
    <br />
    <li>2019.12.3:
      <ol>
        <li><code>A</code> 增加了<code>domain</code>属性，设置后可以自动给图片链接拼接主域名或协议名</li>
        <li><code>A</code> 增加了<code>use-anchor</code>属性，可以选择是否使用页面内锚点</li>
        <li><code>U</code> <code>CssHandler</code>补丁包增加支持<code>before</code>和<code>after</code>伪类</li>
      </ol>
    </li>
    <br />
    <li>2019.11.29:
      <ol>
        <li><code>U</code> <code>linkpress</code>和<code>imgtap</code>回调增加<code>ignore</code>函数，在回调中调用此函数将不自动进行链接跳转/图片预览操作，可以屏蔽指定的链接/图片或进行自定义操作</li>
      </ol>
    </li>
    <br />
    <li>2019.11.28:
      <ol>
        <li><code>U</code> <code>table</code>标签支持了<code>border</code>, <code>cellpadding</code>, <code>cellspacing</code></li>
      </ol>
    </li>
    <br />
    <li>2019.10.29:
      <ol>
        <li><code>F</code> 修复了部分行内标签被错误换行的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.10.27:
      <ol>
        <li><code>F</code> 修复了部分情况下多张相同的图片仅第一张可显示的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.10.24:
      <ol>
        <li><code>U</code><code>uni-app</code>包支持在<code>APP</code>端使用</li>
      </ol>
    </li>
    <br />
    <li>2019.10.17:
      <ol>
        <li><code>A</code> 增加了<code>CssHandler</code>补丁包（可支持多层的<code>css</code>选择器）</li>
        <li><code>U</code> <code>uni-app</code>包支持在<code>H5</code>端使用</li>
      </ol>
    </li>
    <br />
    <li>2019.9.28:
      <ol>
        <li><code>A</code> 增加了<code>lazy-load</code>属性（可用于图片懒加载）</li>
      </ol>
    </li>
    <br />
    <li>2019.9.25:
      <ol>
        <li><code>A</code> 增加了<code>uni-app</code>插件包</li>
        <li><code>F</code> 修复了部分情况下显示样式出错的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.9.22:
      <ol>
        <li><code>U</code> 支持引入<code>wxss</code>文件中的外部样式</li>
      </ol>
    </li>
    <br />
    <li>2019.9.21:
      <ol>
        <li><code>A</code> 增加了对百度小程序的支持</li>
        <li style='word-break:break-all'><code>U</code> 为与百度小程序包统一，所有事件的返回值改为<code>object</code>类型（影响<code>bindimgtap</code>和<code>bindlinkpress</code>）</li>
        <li><code>U</code> 优化了补丁包的引入方式</li>
        <li><code>F</code> 修复了<code>autopause</code>属性在某些情况下会失效的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.9.18:
      <ol>
        <li><code>A</code> 增加了在<code>wepy</code>中的使用方法</li>
        <li><code>F</code> 修复了部分情况下<code>style</code>标签解析结果缺少<code>;</code>导致匹配失效的问题</code>
        <li><code>F</code> 修复了<code>0917</code>版本中<code>a</code>标签失效的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.9.17:
      <ol>
        <li><code>A</code> 增加了<code>List</code>补丁包（可用于模拟列表）</li>
        <li><code>A</code> <code>video</code>组件增加支持<code>unit-id</code>属性（前贴视频广告）</li>
        <li><code>F</code> 修复了部分情况下图片可能被<code>text-indent</code>错误缩进的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.9.15:
      <ol>
        <li><code>A</code> 增加了<code>document</code>补丁包（可用于动态操作<code>DOM</code>）</li>
        <li><code>A</code> 增加支持<code>ad</code>小程序广告组件，可以在文中插入广告</li>
      </ol>
    </li>
    <br />
    <li>2019.9.13:
      <ol>
        <li><code>A</code> 增加了<code>emoji</code>补丁包（可用于解析小表情）</li>
        <li><code>A</code> 增加了<code>autopreview</code>属性（可用于控制点击图片时是否自动预览，默认<code>true</code>）和<code>imgtap</code>事件（图片被点击时触发）</li>
        <li><code>A</code> 增加了一个<code>min</code>版本（<code>27.3KB</code>，功能相同）</li>
        <li><code>U</code> 缩小了节点深度（约15%~35%，主要是通过合并一些只有一个子节点的标签以及优化排版方式），优化了性能</li>
        <li><code>U</code> 缩小了解析结果的大小（约3%~5%）</li>
        <li><code>F</code> 修复了解析完成后传入的<code>tagStyle</code>会被修改的问题</li>
        <li><code>F</code> 修复了存在多张相同<code>url</code>的图片时，预览会出现定位错误的问题</li>
        <li><code>F</code> 修复了部分情况下<code>html</code>中的换行符会被显示的问题</li>
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
    },()=>{
      this.setData({
        section
      })
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