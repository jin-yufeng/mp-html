// 示例代码均来自后端解析结果
module.exports = {
  // 代码高亮示例代码
  codedemo: [{
    "children": [{
      "children": [{
        "children": [{
          "text": "function",
          "type": "text"
        }],
        "name": "span",
        "attrs": {
          "style": ";  color: #a71d5d;;",
          "class": "hljs-keyword"
        }
      }, {
        "text": " ",
        "type": "text"
      }, {
        "children": [{
          "text": "test",
          "type": "text"
        }],
        "name": "span",
        "attrs": {
          "style": ";  color: #795da3;;",
          "class": "hljs-title"
        }
      }, {
        "text": "(",
        "type": "text"
      }, {
        "children": [],
        "name": "span",
        "attrs": {
          "style": ";",
          "class": "hljs-params"
        }
      }, {
        "text": ")",
        "type": "text"
      }],
      "name": "span",
      "attrs": {
        "style": ";",
        "class": "hljs-function"
      }
    }, {
      "text": "{",
      "type": "text"
    }, {
      "children": [],
      "name": "br",
      "attrs": {
        "style": ";"
      }
    }, {
      "text": "  ",
      "type": "text"
    }, {
      "children": [{
        "text": "console",
        "type": "text"
      }],
      "name": "span",
      "attrs": {
        "style": ";",
        "class": "hljs-built_in"
      }
    }, {
      "text": ".log(",
      "type": "text"
    }, {
      "children": [{
        "text": "\"Hello World!\"",
        "type": "text"
      }],
      "name": "span",
      "attrs": {
        "style": ";  color: #df5000;;",
        "class": "hljs-string"
      }
    }, {
      "text": ");",
      "type": "text"
    }, {
      "children": [],
      "name": "br",
      "attrs": {
        "style": ";"
      }
    }, {
      "text": "}",
      "type": "text"
    }],
    "name": "div",
    "attrs": {
      "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;",
      "class": "hljs"
    }
  }],
  // markdown模式示例代码
  markdown: [{
    "children": [{
      "text": "示例",
      "type": "text"
    }],
    "name": "h1",
    "attrs": {
      "style": ";"
    }
  }, {
    "children": [{
      "children": [{
        "children": [{
          "children": [{
            "text": "标题1",
            "type": "text"
          }],
          "name": "th",
          "attrs": {
            "style": ";border-right:1px solid #ccc;border-bottom:1px solid #ccc;padding:6px 13px;",
            "align": "center"
          }
        }, {
          "children": [{
            "text": "标题2",
            "type": "text"
          }],
          "name": "th",
          "attrs": {
            "style": ";border-right:1px solid #ccc;border-bottom:1px solid #ccc;padding:6px 13px;",
            "align": "center"
          }
        }],
        "name": "tr",
        "attrs": {
          "style": ";"
        }
      }],
      "name": "thead",
      "attrs": {
        "style": ";"
      }
    }, {
      "children": [{
        "children": [{
          "children": [{
            "text": "内容1",
            "type": "text"
          }],
          "name": "td",
          "attrs": {
            "style": ";border-right:1px solid #ccc;border-bottom:1px solid #ccc;padding:6px 13px;",
            "align": "center"
          }
        }, {
          "children": [{
            "text": "内容2",
            "type": "text"
          }],
          "name": "td",
          "attrs": {
            "style": ";border-right:1px solid #ccc;border-bottom:1px solid #ccc;padding:6px 13px;",
            "align": "center"
          }
        }],
        "name": "tr",
        "attrs": {
          "style": ";"
        }
      }],
      "name": "tbody",
      "attrs": {
        "style": ";"
      }
    }],
    "name": "table",
    "attrs": {
      "style": ";border-collapse:collapse;border-left:1px solid #ccc;border-top:1px solid #ccc;;"
    }
  }]
}