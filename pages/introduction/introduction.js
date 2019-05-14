// pages/introduction/introduction.js
Page({
  data: {
    tagStyle: {
      code: "font-style: italic; color: #005cc5;margin-left:3px;margin-right:3px;"
    },
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
    stylecode: [{ "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "style", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "children": [{ "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": ".demo", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-selector-class" } }], "name": "span", "attrs": { "style": ";", "class": "css" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  font-style:italic;", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "xquery" } }, { "children": [{ "children": [{ "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "#demo2", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-selector-id" } }], "name": "span", "attrs": { "style": ";", "class": "css" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  font-weight:bold;", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "xquery" } }, { "children": [{ "children": [{ "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "p", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "undefined" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  text-align:center;", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  font-size:", "type": "text" }, { "children": [{ "text": "30", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-number" } }, { "text": "px;", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "xquery" } }, { "children": [{ "children": [{ "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "style", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "p", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "span", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "class", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"demo\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "text": "Hello ", "type": "text" }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "span", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "children": [{ "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "undefined" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "span", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "id", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"demo2\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "text": "World!", "type": "text" }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "span", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "children": [{ "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "p", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;", "class": "hljs" } }],
    tagStylecode1: [{ "children": [{ "children": [{ "text": "data", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-selector-tag" } }, { "text": ":{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }, { "children": [{ "text": "tagStyle", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #0086b3;;", "class": "hljs-attribute" } }, { "text": ":{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "    code:", "type": "text" }, { "children": [{ "text": "\"font-style:italic;color:#005cc5\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  }", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;", "class": "hljs" } }],
    tagStylecode2: [{ "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "Parser", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "html", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"<code>test</code>\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "tagStyle", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "text": "{{tagStyle}}", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-template-variable" } }, { "children": [{ "children": [{ "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": " />", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    loadingcode: [{ "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "Parser", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "html", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "text": "{{html}}", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-template-variable" } }, { "children": [{ "children": [{ "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "text": "加载中...", "type": "text" }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "Parser", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
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
    errorcode: [{ "children": [{ "children": [{ "text": "<!--冒号不匹配-->", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #969896;;", "class": "hljs-comment" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "div", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "style", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"font-family:\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": "宋体\"\">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "text": "Hello", "type": "text" }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "div", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<!--标签首尾不匹配-->", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #969896;;", "class": "hljs-comment" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "div", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "text": " World!", "type": "text" }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "p", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<!--异形标签-->", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #969896;;", "class": "hljs-comment" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "o:p", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "children": [{ "text": "</", "type": "text" }, { "children": [{ "text": "o:p", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<!--缺少尾标签-->", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #969896;;", "class": "hljs-comment" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "div", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": ">", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }, { "text": "!", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
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
    tags: [{
      name: 'frame',
      attrs: 'src, width, height, scrolling\nmarginwidth, marginheight'
    }, {
      name: 'iframe',
      attrs: 'src, width, height, scrolling\nmarginwidth, marginheight'
    }, {
      name: 'source',
      attrs: 'src'
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
    codedemo: [{ "children": [{ "children": [{ "children": [{ "text": "function", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "test", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-title" } }, { "text": "(", "type": "text" }, { "children": [], "name": "span", "attrs": { "style": ";", "class": "hljs-params" } }, { "text": ")", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-function" } }, { "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }, { "children": [{ "text": "console", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-built_in" } }, { "text": ".log(", "type": "text" }, { "children": [{ "text": "\"Hello World!\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ");", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    website: [{ "children": [{ "children": [{ "text": "await ", "type": "text" }, { "children": [{ "text": "parser", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-title" } }, { "children": [{ "text": "(", "type": "text" }, { "children": [{ "text": "\"http://example.com\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ",", "type": "text" }, { "children": [{ "text": "\"website\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ")", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-params" } }], "name": "span", "attrs": { "style": ";", "class": "hljs-function" } }, { "text": ";", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    markdown: [{ "children": [{ "text": "示例", "type": "text" }], "name": "h1", "attrs": { "style": ";", "id": "示例" } }, { "children": [{ "children": [{ "children": [{ "children": [{ "text": "标题1", "type": "text" }], "name": "th", "attrs": { "style": ";border:1px solid #ccc;padding: 6px 13px;", "align": "center" } }, { "children": [{ "text": "标题2", "type": "text" }], "name": "th", "attrs": { "style": ";border:1px solid #ccc;padding: 6px 13px;", "align": "center" } }], "name": "tr", "attrs": { "style": ";" } }], "name": "thead", "attrs": { "style": ";" } }, { "children": [{ "children": [{ "children": [{ "text": "栏目1", "type": "text" }], "name": "td", "attrs": { "style": ";border:1px solid #ccc;padding: 6px 13px;", "align": "center" } }, { "children": [{ "text": "栏目2", "type": "text" }], "name": "td", "attrs": { "style": ";border:1px solid #ccc;padding: 6px 13px;", "align": "center" } }], "name": "tr", "attrs": { "style": ";" } }], "name": "tbody", "attrs": { "style": ";" } }], "name": "table", "attrs": { "style": ";" } }]
  }
})