// miniprogram/pages/component/component.js
const code = require('./code.js');
Page({
  data: {
    page: 1,
    //标签的默认样式
    tagStyle: {
      code: "font-style: italic; color: #005cc5;margin-left:3px;margin-right:3px;"
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
      example: 'body',
      match: '<body>...</body>'
    }, {
      mode: '单层多个class',
      example: '.demo1.demo2',
      match: 'class="demo1 demo2"'
    }, {
      mode: '多个并列',
      example: '.demo1,.demo2',
      match: 'class="demo1"\nclass="demo2"'
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
      attrs: 'width'
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
    api: [{
      name: "getText()",
      notice: "获取文本内容（仅直接包含文本的标签可用）"
    }, {
      name: "setText(text)",
      notice: "修改文本内容（仅直接包含文本的标签可用）"
    }, {
      name: "addChildren(nodes,i)",
      notice: "在第i个位置添加子节点，nodes为一个结构体，格式同rich-text"
    }, {
      name: "removeChildren(i)",
      notice: "移除第i个子节点"
    }, {
      name: "getChildren(i)",
      notice: "获取第i个子节点的element实例"
    }, {
      name: "getAttr(key)",
      notice: "获取某个属性值"
    }, {
      name: "setAttr(key,value)",
      notice: "设置某个属性值"
    }, {
      name: "getElementById(id)",
      notice: "在子节点中按照id查找element"
    }, {
      name: "update()",
      notice: "若修改了element.nodes需要调用此方法同步到UI"
    }],
    //示例代码
    apicode: code.apicode,
    errorcode: code.errorcode,
    json: code.json,
    wxml: code.wxml,
    js: code.js,
    json2: code.json2,
    vue: code.vue,
    uni: code.uni,
    wepy:code.wepy,
    emoji: code.emoji,
    listJson: code.listJson,
    listJson2: code.listJson2,
    listWxml: code.listWxml,
    //属性
    attrs: [{
      name: 'html',
      type: 'String\nArray\nObject',
      notice: '见下方说明'
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
    }],
    //属性格式
    format: `<ul style="text-align:justify">
      <li>html格式
        <ol>
          <li><code>String</code>类型：一个html字符串，如："&lt;div&gt;Hello World!&lt;/div&gt;"</li>
          <li><code>Array</code>类型：格式基本同<code>rich-text</code>，对于节点下有图片、链接等的，需要将<code>continue</code>属性设置为<code>true</code>，否则将直接使用<code>rich-text</code>组件渲染，可能导致图片无法预览等问题（此格式传入将不能通过左右滑动查看所有图片）</li>
          <li><code>Object</code>类型：一个形如<code>{nodes: [Array], imgList: [Array], title: "String"}</code>的结构体，nodes数组的格式同上，imgList为所有图片地址的数组，title为文章的标题（不必要，如果传入将设置到页面的标题上）回调函数<code>bindparse</code>的返回值就是该类型的结构体</li>
        </ol>
        <ul>
          <li style="margin-top:5px;">备注：<code>Array</code>和<code>Object</code>类型传入可以节省解析时间，提高性能</li>
        </ul>
      </li>
      <br/>
      <li>img-mode格式
        <p>默认<code>default</code>，在没有设置宽高时，按图片原大小显示；设置了宽或高时，按比例进行缩放；同时设置了宽高时，按设置的宽高进行缩放。在同时设置了宽高的情况下，宽度可能因为<code>max-width:100%</code>的限制而缩短导致图片变形，此时可将模式设置为<code>widthFix</code>，即保持宽度不变，高度自动变化（会导致设置的高度无效）</p>
      </li>
      <br/>
      <li>tag-style格式
        <p>一个形如<code>{ name:style }</code>的结构体，name为标签名，style为需要设置的样式；该属性仅传入的<code>html</code>为<code>String</code>类型时有效（在解析过程中设置）</p>
      </li>
    </ul>`,
    //回调函数
    callback: `<ul style="text-align:justify">
      <li><code>bindparse</code><br/>
      当传入的<code>html</code>为字符串类型时，解析完成后调用；返回值是一个形如<code>{nodes: [Array], imgList: [Array], title: "String"}</code>的结构体，<code>nodes</code>是节点数组，<code>imgList</code>是所有图片地址的数组，<code>title</code>是页面标题（可用于转发）可以将该值保存后下次调用时直接作为属性<code>html</code>的值，可节省解析时间
      </li>
      <li style="margin-top:5px;"><code>bindready</code><br/>
      渲染完成时调用，返回值是整个组件的<code>NodesRef</code>结构体，包含宽度、高度、位置等信息（每次传入的<code>html</code>修改后都会触发）
      </li>
      <li style="margin-top:5px;"><code>binderror</code><br/>
      出错时时调用，返回值为一个结构体，其中<code>source</code>是错误来源（可能是<code>ad</code>广告出错、<code>video</code>视频加载出错、<code>audio</code>音频加载出错以及<code>parse</code>解析过程中出错）；<code>errMsg</code>是错误原因；<code>errCode</code>是错误代码（仅<code>ad</code>）；<code>target</code>属性中含有出错标签的具体信息
      </li>
      <li style="margin-top:5px;"><code>bindlinkpress</code><br/>
      链接（<code>a</code>标签）受到点击时调用，返回值是一个形如<code>{href: ...}</code>的结构体，其中<code>href</code>是被点击链接的<code>href</code>值，如果该链接不是简单的跳转，可以在此回调函数中进行进一步操作（如附件链接可以在这里下载和打开）
      </li>
      <li style="margin-top:5px;"><code>bindimgtap</code><br/>
      图片被点击时调用，返回值是一个形如<code>{src: ...}</code>的结构体，其中<code>src</code>是图片的链接，可用于阻挡<code>onShow</code>的调用
      </li>
      <li style="margin-top:5px;">备注：所有回调函数的返回值在<code>e.detail</code>中获取</li>
    </ul>`,
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
    //示例代码
    html2nodes: code.html2nodes,
    css2object: code.css2object,
    VersionHigherThan: code.VersionHigherThan,
    StrSplice: code.StrSplice,
    //更新日志
    update: `<ul>
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
    <br />
    <li>2019.8.22:
      <ol>
        <li><code>U</code> 支持了<code>font</code>标签的<code>size</code>属性</li>
      </ol>
    </li>
    <br />
    <li>2019.8.21:
      <ol>
        <li><code>F</code> 修复了部分情况下实体编码内容无法显示的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.8.17:
      <ol>
        <li><code>F</code> 修复了形如<code>class="a&nbsp;b"</code>（多个<code>class</code>）时样式匹配失效的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.8.10：
      <ol>
        <li><code>U</code> 优化了<code>a</code>标签的点击效果</li>
        <li><code>F</code> 修复了部分情况下<code>span</code>标签样式出错的情况</li>
      </ol>
    </li>
    <br />
    <li>2019.8.2：
      <ol>
        <li><code>F</code> 修复了部分情况下<code>display:flex</code>显示出错的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.7.24：
      <ol>
        <li><code>A</code> 增加了<code>autosetTitle</code>属性（默认<code>true</code>），支持设置是否自动将<code>title</code>标签里的内容设置到页面标题</li>
        <li><code>F</code> 修复了<code>margin:auto</code>不生效的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.6.15：
      <ol>
        <li><code>F</code> 修复了部分情况下<code>br</code>标签换行格式不正确的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.6.10：
      <ol>
        <li><code>A</code> 适配了<code>rich-text</code>组件在2.7.1基础库新增加的标签，其中<code>big</code>、<code>small</code>、<code>mark</code>、<code>cite</code>、<code>s</code>等标签在低版本都可以兼容；<code>bdi</code>、<code>bdo</code>、<code>caption</code>、<code>rt</code>、<code>ruby</code>标签必须基础库2.7.1及以上才能正常显示，低版本会被转为<code>span</code></li>
        <li><code>A</code> 增加了<code>html2nodes</code>（解析<code>html</code>）、<code>css2object</code>（解析<code>css</code>）、<code>versionHigherThan</code>（比较和判断基础库版本）、<code>String.splice</code>（对字符串指定位置进行删改）等<code>api</code>函数</li>
        <li><code>A</code> 增加了<code>img-mode</code>属性，可以设置为<code>default</code>或<code>widthFix</code>，设置为<code>widthFix</code>时，宽度不变，高度自动变化，可用于解决部分情况下图片变形的问题（但设置的高度会失效）</li>
        <li><code>U</code> 优化了样式匹配的优先级：<code>tag-style</code>&lt;<code>style</code>标签&lt;内联<code>style</code>样式</li>
        <li><code>F</code> 修复了<code>style</code>标签中<code>,</code>前后有空格时导致该样式被忽略的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.6.3：
      <ol>
        <li><code>A</code> 增加了<code>autocopy</code>属性，用于控制是否允许<code>a</code>标签受到点击时自动复制链接（仅限<code>http</code>开头的网址链接；默认<code>true</code>；接近于原<code>selectable</code>属性的功能)</li>
        <li><code>U</code> 可以通过设置<code>selectable</code>属性控制是否允许长按复制任意内容（默认<code>false</code>）</li>
        <li><code>F</code> 修复了<code>style</code>标签内容过长时安卓机可能出现栈溢出的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.6.1：
      <ol>
        <li><code>F</code> 修复了部分情况下<code>width</code>设置为百分比时失效的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.5.24：
      <ol>
        <li><code>U</code> 通过以自定义组件递归的方式替代了模板循环，精简包的大小至<code>28.1KB</code>，且不再受层数限制</li>
        <li><code>D</code> 删除了<code>html-class</code>和<code>html-style</code>属性，支持直接对<code>Parser</code>标签设置<code>class</code>和<code>style</code>，默认的<code>display</code>是<code>block</code></li>
        <li><code>F</code> 修复了部分情况下节点的<code>display</code>和<code>float</code>可能不生效的问题</li>
        <li><code>F</code> 修复了背景音乐无法播放的问题(设置<code>autoplay</code>)，并支持对多个<code>audio</code>标签设置<code>autoplay</code></li>
      </ol>
    </li>
    <br />
    <li>2019.5.22：
      <ol>
        <li><code>U</code> <code>bindready</code>回调将返回整个组件的<code>NodesRef</code>结构体，包含了宽度、高度、位置等信息</li>
        <li><code>U</code> 提高了传入的<code>html</code>类型为<code>Array</code>或<code>Object</code>时的渲染速度（约10%）</li>
        <li><code>U</code> 解析时若存在<code>video</code>或<code>audio</code>组件既没有<code>controls</code>属性也没有<code>autoplay</code>属性时会向控制台打印“可能无法播放”的警告</li>
      </ol>
    </li>
    <br />
    <li>2019.5.20：
      <ol>
        <li><code>A</code> 增加支持<code>source</code>标签（仅限用于<code>video</code>和<code>audio</code>标签中），当设置了多个<code>source</code>时，将按照顺序进行加载，若前面的资源加载失败，则自动加载后面的资源</li>
        <li><code>U</code> 增加支持<code>video</code>标签的<code>autoplay</code>和<code>muted</code>属性</li>
        <li><code>U</code> 增加支持<code>audio</code>标签的<code>autoplay</code>属性（自动播放的音乐仅限一首，否则只会自动播放第一首）</li>
        <li><code>F</code> 修复了超过3个视频时后面的视频无法播放的问题</li>
      </ol>
    </li>
    <br />
    <li>2019.5.19：
      <ol>
        <li><code>A</code> 增加了<code>html-style</code>属性，可以对整个富文本容器设置样式，且可以通过<code>wxml</code>中的数据绑定动态设置</li>
        <li><code>A</code> 增加了<code>show-with-animation</code>和<code>animation-duration</code>属性，支持设置是否使用显示时的渐显动画以及动画持续时间</li>
      </ol>
    </li>
    <br />
    <li>2019.5.17：
      <ol>
        <li><code>A</code> 增加了<code>bindready</code>回调，在渲染完成时调用</li>
        <li><code>A</code> 增加了<code>binderror</code>回调，在解析出错或加载多媒体文件出错时调用</li>
      </ol>
    </li>
    <br />
    <li>2019.5.15：
      <ol>
        <li><code>F</code> 修复了一个页面存在多个<code>Parser</code>组件时，<code>imgList</code>被覆盖而导致图片预览失效的问题
        <li><code>F</code> 修复了图片设置<code>float</code>无效的问题
      </ol>
    </li>
    <br />
    <li>2019.5.14：
      <ol>
        <li><code>A</code> 增加了<code>html-class</code>属性，可以对整个富文本容器设置样式，包括<code>display</code>、<code>margin</code>、<code>padding</code>等</li>
        <li><code>D</code> 删除了<code>scroll</code>属性，默认当内容宽度超出页面宽度时允许横向滚动，如要禁止滚动可以在<code>html-class</code>中设置<code>overflow: hidden !important</li>
        <li><code>F</code> 修复了实体编码的空格<code>&amp;nbsp;</code>在部分情况下失效的问题
      </ol>
    </li>
    <br />
    <li>2019.5.10：
      <ol>
        <li><code>A</code> 增加了<code>autopause</code>属性，可以选择是否允许在播放视频时自动暂停其他视频（默认<code>true</code>）</li>
        <li><code>U</code> 支持在视频数量超过3个时只加载前3个，其余用图片替代，在受到点击时再进行加载和播放，避免页面卡死</li>
        <li><code>U</code> 在样式匹配完成后移除了节点的<code>class</code>和<code>id</code>属性，减小了<code>nodes</code>数组大小，加快渲染速度</li>
      </ol>
    </li>
    <br />
    <li>2019.5.6： 
      <ol>
        <li><code>A</code> 发布了后端<code>node.js</code>加强包，具有更加强大的解析能力，提供了<code>html</code>、<code>website</code>、<code>markdown</code>等多种模式
        <li><code>U</code> 在<code>Parser</code>标签内可以放入加载提示或动画，会在未加载完成或内容为空时显示，加载完成后自动隐藏</li>
      </ol>
    </li>
    <br />
    <li>2019.4.29：
      <ol>
        <li><code>A</code> 增加支持将<code>title</code>标签中的内容设置到页面标题上，并在<code>bindparse</code>回调中返回（可用于转发分享）</li>
        <li><code>A</code> 增加<code>scroll</code>属性，可以选择是否允许页面横向滚动</li>
        <li><code>U</code><code>style</code>标签中的样式支持更多匹配模式(包括单层多个<code>.demo1.demo2</code>和多个并列<code>.demo1,.demo2</code>等，另外对于伪类、多层的以及含有@或*的将直接忽略)</li>
        <li><code>F</code> 修复了已知<code>bug</code></li>
      </ol>
    </li>
    <br />
    <li>2019.4.28：
      <ol>
        <li><code>U</code> 优化图片显示效果，对没有设置宽高的图片，按原大小显示（最大不超过100%）；设置了宽度或高度之一的，按比例进行缩放；同时设置了宽度和高度的，按设置的值进行拉伸；图片无法显示时，可以显示<code>alt</code>属性中的文本；但由于这些特性需要通过<code>rich-text</code>显示，因此取消了<code>lazyload</code>属性</li>
        <li><code>U</code> 优化了<code>a</code>标签的内联效果</li>
      </ol>
    </li>
    <br />
    <li>2019.4.26：
      <ol>
        <li><code>A</code> 增加支持<code>pre</code>, <code>u</code>, <code>center</code>, <code>source</code>等标签</li>
        <li><code>A</code> 增加<code>bindlinkpress</code>回调函数，在链接受到点击时触发，开发者可以在此回调中进行进一步操作（如下载和打开文档等）</li>
        <li><code>U</code> 对于不在支持列表中的标签，除个别直接移除外，都会被转为<code>div</code>标签，因此可以使用一些语义化标签，如<code>article</code>, <code>address</code>等</li>
        <li><code>U</code> 提高了解析效率和渲染效率（约10%）</li>
        <li><code>D</code> 删除了<code>preview</code>，默认允许图片预览</li>
        <li><code>D</code> 删除了<code>space</code>属性，由于设置连续空格会使得标签间的空格都被显示，导致错误的效果，因此取消了这一属性；如需要显示连续空格，请使用实体编码的空格或设置<code>white-space</code>属性</li>
        <li><code>F</code> 修复了已知<code>bug</code></li>
      </ol>
    </li>
    <br />
    <li>2019.4.21：
      <ol>
        <li><code>A</code> 增加了<code>tagStyle</code>属性，支持对标签设置自定义样式</li>
        <li><code>A</code> 发布了<code>demo</code>小程序</li>
        <li><code>U</code> 降低了最低基础库的要求</li>
        <li><code>F</code> 修复了已知<code>bug</code></li>
      </ol>
    </li>
    <br />
    <li>2019.4.18：
      <ol>
        <li><code>A</code> 增加支持<code>audio</code>标签</li>
        <li><code>A</code> 增加<code>lazyload</code>属性（图片懒加载）</li>
        <li><code>U</code> 优化<code>a</code>, <code>code</code>, <code>blockquote</code>标签的显示效果</li>
        <li><code>F</code> 修复了已知<code>bug</code></li>
      </ol>
    </li>
    <br />
    <li>2019.4.16：
      <ol>
        <li><code>U</code> 精简包的大小</li>
        <li><code>F</code> 修复了已知<code>bug</code></li>
      </ol>
    </li>
    <br />
    <li>2019.4.14：
      <ol>
        <li><code>U</code> <code>style</code>标签中的样式支持按标签名匹配，如<code>body{Object}</code></li>
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