// miniprogram/pages/nodejs/nodejs.js
Page({
  data: {
    tagStyle: {
      code: "font-style: italic; color: #005cc5;margin-left:3px;margin-right:3px;"
    },
    //更多的style匹配模式
    stylesMore: [{
      mode: '通配符',
      example: '*',
      match: '所有'
    }, {
      mode: '单层不同类型',
      example: '.demo1#demo2',
      match: '<ele class="demo1" id="demo2">'
    }, {
      mode: '后代选择器',
      example: '.demo1 .demo2',
      match: '<ele class="demo1">\n ...\n <ele class="demo2">'
    }, {
      mode: '子选择器',
      example: '.demo1>.demo2',
      match: '<ele class="demo1">\n <ele class="demo2">'
    }],
    //支持更多的标签
    tags: [{
      name: 'frame',
      attrs: 'src, width, height, scrolling\nmarginwidth, marginheight'
    }, {
      name: 'iframe',
      attrs: 'src, width, height, scrolling\nmarginwidth, marginheight'
    }, {
      name: 'embed',
      attrs: 'src'
    }, {
      name: 'object',
      attrs: 'data'
    }, {
      name: 'param',
      attrs: 'name, value'
    }],
    //代码高亮示例代码，示例代码均来自后端解析结果
    codedemo: [{ "children": [{ "children": [{ "children": [{ "text": "function", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "test", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-title" } }, { "text": "(", "type": "text" }, { "children": [], "name": "span", "attrs": { "style": ";", "class": "hljs-params" } }, { "text": ")", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-function" } }, { "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }, { "children": [{ "text": "console", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-built_in" } }, { "text": ".log(", "type": "text" }, { "children": [{ "text": "\"Hello World!\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ");", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    webmode:
      `<ul>
      <li style="margin-top:5px;">静态网页模式：
        <p>速度快，可以直接使用，但<code>js</code>中动态加载的内容都会被忽略</p>
        <p>另外，针对微信推送网页做了以下优化，可基本正确显示：</p>
        <ul>
          <li>支持在图片没有<code>src</code>属性时自动将<code>data-src</code>属性赋给<code>src</code></li>
          <li>支持从视频的<code>iframe</code>标签解析出真实的视频源地址并进行播放</li>
          <li>支持从音频的<code>qqmusic</code>标签解析出真实的音频源地址并进行播放</li>
        </ul>
      </li>
      <li style="margin-top:5px;">动态网页模式： 
        <p>使用无头浏览器进行加载，速度较慢，需要额外安装本地依赖，可通过设置<code>mode</code>中的<code>engine</code>属性实现，支持的引擎有：</p>
        <ul>
          <li>puppeteer：
            <p>使用<code>Chromium</code>浏览器加载，<strong>使用前需要安装</strong><code>npm i puppeteer</code></p>
          </li>
          <li>phantom:
            <p>使用<code>phantom</code>浏览器加载，<strong>使用前需要安装</strong><code>npm i phantom</code></p>
          </li>
        </ul>
      </li>
    </ul>`,
    //website模式示例代码
    website: [{ "children": [{ "children": [{ "text": "//静态网页模式", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #969896;;" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "await ", "type": "text" }, { "children": [{ "text": "parser", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;" } }, { "children": [{ "text": "(", "type": "text" }, { "children": [{ "text": "\"https://example.com\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;" } }, { "text": ",", "type": "text" }, { "children": [{ "text": "\"website\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;" } }, { "text": ")", "type": "text" }], "name": "span", "attrs": { "style": ";" } }], "name": "span", "attrs": { "style": ";" } }, { "text": ";", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "//动态网页模式，需提前安装npm i phantom", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #969896;;" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "await ", "type": "text" }, { "children": [{ "text": "parser", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;" } }, { "children": [{ "text": "(", "type": "text" }, { "children": [{ "text": "\"https://example.com\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;" } }, { "text": ",", "type": "text" }, { "children": [{ "text": "\"website\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;" } }, { "text": ",{engine:", "type": "text" }, { "children": [{ "text": "\"phantom\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;" } }, { "text": "})", "type": "text" }], "name": "span", "attrs": { "style": ";" } }], "name": "span", "attrs": { "style": ";" } }, { "text": ";", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;" } }],
    //markdown模式示例代码
    markdown: [{ "children": [{ "text": "示例", "type": "text" }], "name": "h1", "attrs": { "style": ";", "id": "示例" } }, { "children": [{ "children": [{ "children": [{ "children": [{ "text": "标题1", "type": "text" }], "name": "th", "attrs": { "style": ";border:1px solid #ccc;padding: 6px 13px;", "align": "center" } }, { "children": [{ "text": "标题2", "type": "text" }], "name": "th", "attrs": { "style": ";border:1px solid #ccc;padding: 6px 13px;", "align": "center" } }], "name": "tr", "attrs": { "style": ";" } }], "name": "thead", "attrs": { "style": ";" } }, { "children": [{ "children": [{ "children": [{ "text": "栏目1", "type": "text" }], "name": "td", "attrs": { "style": ";border:1px solid #ccc;padding: 6px 13px;", "align": "center" } }, { "children": [{ "text": "栏目2", "type": "text" }], "name": "td", "attrs": { "style": ";border:1px solid #ccc;padding: 6px 13px;", "align": "center" } }], "name": "tr", "attrs": { "style": ";" } }], "name": "tbody", "attrs": { "style": ";" } }], "name": "table", "attrs": { "style": ";" } }],
    //使用步骤
    npm: [{ "children": [{ "text": "npm install parser-", "type": "text" }, { "children": [{ "text": "wxapp", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "children": [], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-title" } }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    node: [{ "children": [{ "children": [{ "text": "const", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "text": " parser=", "type": "text" }, { "children": [{ "text": "require", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-built_in" } }, { "text": "(", "type": "text" }, { "children": [{ "text": "'parser-node'", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ");", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "var", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "text": " html=", "type": "text" }, { "children": [{ "text": "\"<div>Hello World!</div>\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ";", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "parser(html).then(", "type": "text" }, { "children": [{ "children": [{ "text": "function", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "text": "(", "type": "text" }, { "children": [{ "text": "res", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-params" } }, { "text": ")", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-function" } }, { "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }, { "children": [{ "text": "console", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-built_in" } }, { "text": ".log(res);", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "})", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    //更新日志
    update: `<ul>
    <li>2019.5.31：
      <ol>
        <li><code>F</code> 修复了部分情况下<code>style</code>标签中样式匹配失败的问题
      </ol>
    </li>
    <br />
    <li>2019.5.24：
      <ol>
        <li><code>U</code> 解析设置中支持设置<code>maxDepth</code>来限制前端显示时的最大递归深度</li>
      </ol>
    </li>
    <br />
    <li>2019.5.17：
      <ol>
        <li><code>U</code> 支持自动移除<code>display</code>为<code>none</code>的节点，减小<code>nodes</code>数组的大小，加快传输速度和渲染速度</li>
      </ol>
    </li>
    <br />
    <li>2019.5.15：
      <ol>
        <li><code>U</code> 支持推送页面的腾讯视频<code>iframe</code>组件，可以自动解析出真实的视频地址</li>
        <li><code>U</code> 支持推送页面的<code>qqmusic</code>组件，可以自动解析出真实的音频地址；至此可以基本正确的解析出推送网页的各类内容（可在自定义测试页面选择“后端-网址模式”体验）</li>
      </ol>
    </li>
    <br />
    <li>2019.5.14：
      <ol>
        <li><code>A</code> 增加<code>file</code>模式，输入文件路径即可自动打开并解析（仅支持<code>html</code>文件或<code>md</code>文件）</li>
        <li><code>A</code> 增加支持<code>iframe</code>, <code>frame</code>, <code>embed</code>, <code>object</code>, <code>param</code>等标签</li>
        <li><code>A</code> 增加支持动态网页模式（使用无头浏览器进行加载）</li>
        <li><code>U</code> 支持自动补全多媒体标签的<code>src</code>属性（拼接上主域名）</li>
        <li><code>F</code> 修复子选择器<code>&gt;</code>前后有空格时无法匹配的问题</li>
      </ol>
    </li>`
  },
  gotop() {
    this.setData({
      top: 0
    })
  },
  gosection(e) {
    this.setData({
      section: e.currentTarget.dataset.section
    })
  }
})