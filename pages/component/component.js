// miniprogram/pages/component/component.js
Page({
  data:{
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
    //解析style标签示例代码，示例代码均来自后端解析结果
    stylecode: [{ "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "style", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "children": [{ "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": ".demo", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-selector-class" } }], "name": "span", "attrs": { "style": ";", "class": "css" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  font-style:italic;", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "xquery" } }, { "children": [{ "children": [{ "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "#demo2", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-selector-id" } }], "name": "span", "attrs": { "style": ";", "class": "css" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  font-weight:bold;", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "xquery" } }, { "children": [{ "children": [{ "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "p", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "undefined" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  text-align:center;", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  font-size:", "type": "text" }, { "children": [{ "text": "30", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-number" } }, { "text": "px;", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "xquery" } }, { "children": [{ "children": [{ "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "style", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "p", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "span", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "class", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"demo\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "text": "Hello ", "type": "text" }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "span", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "children": [{ "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "undefined" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "span", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "id", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"demo2\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "text": "World!", "type": "text" }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "span", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "children": [{ "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "p", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;", "class": "hljs" } }],
    //设置默认的标签样式示例代码
    tagStylecode: [{ "children": [{ "children": [{ "text": "data", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-selector-tag" } }, { "text": ":{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }, { "children": [{ "text": "tagStyle", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #0086b3;;", "class": "hljs-attribute" } }, { "text": ":{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "    code:", "type": "text" }, { "children": [{ "text": "\"font-style:italic;color:#005cc5\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  }", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;", "class": "hljs" } }, { "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "Parser", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "html", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"<code>test</code>\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "tagStyle", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "text": "{{tagStyle}}", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-template-variable" } }, { "children": [{ "children": [{ "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": " />", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    //设置整体容器样式样式代码
    htmlStylecode: [{ "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "Parser", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "html", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;" } }], "name": "span", "attrs": { "style": ";  color: #333333;;" } }], "name": "span", "attrs": { "style": ";" } }, { "children": [{ "text": "{{html}}", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;" } }, { "children": [{ "children": [{ "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "html-class", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"contain\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;" } }, { "text": " />", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;" } }], "name": "span", "attrs": { "style": ";" } }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;" } }, { "children": [{ "children": [{ "text": ".contain", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;" } }, { "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }, { "children": [{ "text": "margin", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #0086b3;;" } }, { "text": ":", "type": "text" }, { "children": [{ "text": "5px", "type": "text" }], "name": "span", "attrs": { "style": ";" } }, { "text": ";", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;" } }],
    loadingcode: [{ "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "Parser", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "html", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "text": "{{html}}", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-template-variable" } }, { "children": [{ "children": [{ "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "text": "加载中...", "type": "text" }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "Parser", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    //支持的标签列表
    media: [{
      name: 'img',
      attrs: 'alt, src, height, width, ignore'
    }, {
      name: 'video',
      attrs: 'src, controls, loop, height, width'
    }, {
      name: 'audio',
      attrs: 'src, controls, loop, \nposter, name, author'
    }],
    table: [{
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
      name: 'td',
      attrs: 'colspan, height, rowspan, width'
    }, {
      name: 'th',
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
    }],
    text: [{
      name: 'a',
      attrs: 'href'
    }, {
      name: 'abbr'
    }, {
      name: 'b'
    }, {
      name: 'blockquote'
    }, {
      name: 'br'
    }, {
      name: 'center'
    }, {
      name: 'code'
    }, {
      name: 'dd'
    }, {
      name: 'del'
    }, {
      name: 'div',
      attrs: 'align'
    }, {
      name: 'dl'
    }, {
      name: 'dt'
    }, {
      name: 'em'
    }, {
      name: 'font',
      attrs: 'face, color'
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
      name: 'p',
      attrs: 'align'
    }, {
      name: 'pre'
    }, {
      name: 'q'
    }, {
      name: 'section'
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
    default: [{
      name: 'html'
    }, {
      name: 'body'
    }, {
      name: 'style'
    }, {
      name: 'fieldset'
    }, {
      name: 'legend'
    }],
    //容错性示例代码
    errorcode: [{ "children": [{ "children": [{ "text": "<!--冒号不匹配-->", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #969896;;", "class": "hljs-comment" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "div", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "style", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"font-family:\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": "宋体\"\">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "text": "Hello", "type": "text" }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "div", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<!--标签首尾不匹配-->", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #969896;;", "class": "hljs-comment" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "div", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "text": " World!", "type": "text" }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "p", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<!--异形标签-->", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #969896;;", "class": "hljs-comment" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "o:p", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "o:p", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<!--缺少尾标签-->", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #969896;;", "class": "hljs-comment" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "div", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "text": "!", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    //使用方法示例代码
    json: [{ "children": [{ "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }, { "children": [{ "text": "\"usingComponents\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": ":{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "    ", "type": "text" }, { "children": [{ "text": "\"Parser\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": ":", "type": "text" }, { "children": [{ "text": "\"/Parser/index\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  }", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    wxml: [{ "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "Parser", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "html", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "text": "{{html}}", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-template-variable" } }, { "children": [{ "children": [{ "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": " />", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    js: [{ "children": [{ "text": "onLoad:", "type": "text" }, { "children": [{ "children": [{ "text": "function", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "children": [{ "text": "()", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-params" } }], "name": "span", "attrs": { "style": ";", "class": "hljs-function" } }, { "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }, { "children": [{ "text": "this", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "text": ".setData({", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "    html:", "type": "text" }, { "children": [{ "text": "'your html'", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  })", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    //属性
    attrs: [{
      name: 'html',
      type: 'String\nArray\nObject',
      notice: '见下方说明'
    }, {
      name: 'html-class',
      type: 'String',
      notice: '整个富文本容器的class样式'
    }, {
      name: 'autopause',
      type: 'Boolean',
      default: 'true',
      notice: '是否允许在播放视频时自动暂停其他视频'
    }, {
      name: 'selectable',
      type: 'Boolean',
      default: 'true',
      notice: '是否允许链接长按复制'
    }, {
      name: 'tagStyle',
      type: 'Object',
      notice: '自定义组件样式'
    }],
    //属性格式
    format:
    `<ul style="text-align:justify">
      <li>html格式
        <ol>
          <li><code>String</code>类型：一个html字符串，如："&lt;div&gt;Hello World!&lt;/div&gt;"</li>
          <li><code>Array</code>类型：格式基本同<code>rich-text</code>，对于节点下有图片、链接等的，需要将<code>continue</code>属性设置为<code>true</code>，否则将直接使用<code>rich-text</code>组件渲染，可能导致图片无法预览等问题（此格式传入将不能通过左右滑动查看所有图片）</li>
          <li><code>Object</code>类型：一个形如<code>{nodes: [Array], imgList: [Array], videoNum: Number, title: "String"}</code>的结构体，nodes数组的格式同上，imgList为所有图片地址的数组，videoNum为视频的数量（不必要，用于<code>autopause</code>属性）title为文章的标题（不必要，如果传入将设置到页面的标题上）回调函数<code>bindparse</code>的返回值就是该类型的结构体</li>
        </ol>
        <p style="margin-top:5px;">2，3格式传入可以节省解析时间，提高性能</p>
      </li>
      <br/>
      <li>tagStyle格式
        <p>一个形如<code>{ name:style }</code>的结构体，name为标签名，style为需要设置的样式</p>
      </li>
    </ul>`,
    //回调函数
    callback:
    `<ul style="text-align:justify">
      <li><code>bindparse</code><br/>
      当传入的<code>html</code>为字符串类型时，解析完成后调用；返回值是一个形如<code>{nodes: [Array], imgList: [Array], title: "String"}</code>的结构体，<code>nodes</code>是节点数组，<code>imgList</code>是所有图片地址的数组，<code>title</code>是页面标题（可用于转发）可以将该值保存后下次调用时直接作为属性<code>html</code>的值，可节省解析时间
      </li>
      <li style="margin-top:5px;"><code>bindready</code><br/>
      渲染完成时调用，返回<code>ok</code>
      </li>
      <li style="margin-top:5px;"><code>binderror</code><br/>
      解析出错或多媒体文件加载错误时调用，返回值为错误原因
      </li>
      <li style="margin-top:5px;"><code>bindlinkpress</code><br/>
      链接（<code>a</code>标签）受到点击时调用，返回值是被点击链接的<code>href</code>值，如果该链接不是简单的跳转，可以在此回调函数中进行进一步操作（如附件链接可以在这里下载和打开）
      </li>
    </ul>`,
    //基础库要求
    versions: [{
      version: ">=2.2.5",
      function: "完全正常",
      percent: "98.23%"
    }, {
      version: "1.9.90-2.2.4",
      function: "部分html实体无法显示",
      percent: "1.55%"
    }, {
      version: "1.6.6-1.9.90",
      function: "html-class属性无法使用；部分html实体无法显示",
      percent: "0.13%"
    }, {
      version: "<1.6.6",
      function: "无法使用",
      percent: "0.09%"
    }],
    //api
    api: [{ "children": [{ "children": [{ "text": "var", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;" } }, { "text": " html2nodes=", "type": "text" }, { "children": [{ "text": "require", "type": "text" }], "name": "span", "attrs": { "style": ";" } }, { "text": "(", "type": "text" }, { "children": [{ "text": "\"/Parser/Parser.js\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;" } }, { "text": ");", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "html2nodes(", "type": "text" }, { "children": [{ "text": "\"your html\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;" } }, { "text": ").then(", "type": "text" }, { "children": [{ "children": [{ "text": "function", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;" } }, { "text": "(", "type": "text" }, { "children": [{ "text": "res", "type": "text" }], "name": "span", "attrs": { "style": ";" } }, { "text": ")", "type": "text" }], "name": "span", "attrs": { "style": ";" } }, { "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }, { "children": [{ "text": "console", "type": "text" }], "name": "span", "attrs": { "style": ";" } }, { "text": ".log(res);", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "})", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;" } }],
    //更新日志
    update:
    `<ul>
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
        <li><code>A</code> 增加支持<audio>标签</li>
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
  gotop(){
    this.setData({
      top:0
    })
  },
  gosection(e){
    this.setData({
      section:e.currentTarget.dataset.section
    })
  },
})