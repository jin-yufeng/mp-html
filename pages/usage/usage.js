// pages/usage/usage.js
Page({
  data: {
    json: [{ "children": [{ "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }, { "children": [{ "text": "\"usingComponents\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": ":{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "    ", "type": "text" }, { "children": [{ "text": "\"Parser\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": ":", "type": "text" }, { "children": [{ "text": "\"../../Parser/index\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  }", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    wxml: [{ "children": [{ "children": [{ "children": [{ "text": "<", "type": "text" }, { "children": [{ "text": "Parser", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #63a35c;;", "class": "hljs-name" } }, { "text": " ", "type": "text" }, { "children": [{ "text": "html", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-attr" } }, { "text": "=", "type": "text" }, { "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }, { "children": [{ "text": "{{html}}", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-template-variable" } }, { "children": [{ "children": [{ "children": [{ "text": "\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": " />", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #333333;;", "class": "hljs-tag" } }], "name": "span", "attrs": { "style": ";", "class": "xml" } }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    js: [{ "children": [{ "text": "onLoad:", "type": "text" }, { "children": [{ "children": [{ "text": "function", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "children": [{ "text": "()", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-params" } }], "name": "span", "attrs": { "style": ";", "class": "hljs-function" } }, { "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }, { "children": [{ "text": "this", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "text": ".setData({", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "    html:", "type": "text" }, { "children": [{ "text": "'your html'", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  })", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "}", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    tagStyle: {
      code: "font-style: italic; color: #005cc5;margin-left:3px;margin-right:3px;"
    },
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
    npm: [{ "children": [{ "text": "npm install parser-", "type": "text" }, { "children": [{ "text": "wxapp", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "children": [], "name": "span", "attrs": { "style": ";  color: #795da3;;", "class": "hljs-title" } }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
    node: [{ "children": [{ "children": [{ "text": "const", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "text": " parser=", "type": "text" }, { "children": [{ "text": "require", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-built_in" } }, { "text": "(", "type": "text" }, { "children": [{ "text": "'parser-node'", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ");", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "children": [{ "text": "var", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "text": " html=", "type": "text" }, { "children": [{ "text": "\"<div>Hello World!</div>\"", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #df5000;;", "class": "hljs-string" } }, { "text": ";", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "parser(html).then(", "type": "text" }, { "children": [{ "children": [{ "text": "function", "type": "text" }], "name": "span", "attrs": { "style": ";  color: #a71d5d;;", "class": "hljs-keyword" } }, { "text": "(", "type": "text" }, { "children": [{ "text": "res", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-params" } }, { "text": ")", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-function" } }, { "text": "{", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "  ", "type": "text" }, { "children": [{ "text": "console", "type": "text" }], "name": "span", "attrs": { "style": ";", "class": "hljs-built_in" } }, { "text": ".log(res);", "type": "text" }, { "children": [], "name": "br", "attrs": { "style": ";" } }, { "text": "})", "type": "text" }], "name": "div", "attrs": { "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;", "class": "hljs" } }],
  },
})