//示例代码均来自后端解析结果
module.exports = {
  //代码高亮示例代码
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
  //website模式示例代码
  website: [{
    "children": [{
      "children": [{
        "text": "//静态网页模式",
        "type": "text"
      }],
      "name": "span",
      "attrs": {
        "style": ";  color: #969896;;"
      }
    }, {
      "children": [],
      "name": "br",
      "attrs": {
        "style": ";"
      }
    }, {
      "children": [{
        "text": "await ",
        "type": "text"
      }, {
        "children": [{
          "text": "parser",
          "type": "text"
        }],
        "name": "span",
        "attrs": {
          "style": ";  color: #795da3;;"
        }
      }, {
        "children": [{
          "text": "(",
          "type": "text"
        }, {
          "children": [{
            "text": "\"https://example.com\"",
            "type": "text"
          }],
          "name": "span",
          "attrs": {
            "style": ";  color: #df5000;;"
          }
        }, {
          "text": ",",
          "type": "text"
        }, {
          "children": [{
            "text": "\"website\"",
            "type": "text"
          }],
          "name": "span",
          "attrs": {
            "style": ";  color: #df5000;;"
          }
        }, {
          "text": ")",
          "type": "text"
        }],
        "name": "span",
        "attrs": {
          "style": ";"
        }
      }],
      "name": "span",
      "attrs": {
        "style": ";"
      }
    }, {
      "text": ";",
      "type": "text"
    }, {
      "children": [],
      "name": "br",
      "attrs": {
        "style": ";"
      }
    }, {
      "children": [{
        "text": "//动态网页模式，需提前安装npm i phantom",
        "type": "text"
      }],
      "name": "span",
      "attrs": {
        "style": ";  color: #969896;;"
      }
    }, {
      "children": [],
      "name": "br",
      "attrs": {
        "style": ";"
      }
    }, {
      "children": [{
        "text": "await ",
        "type": "text"
      }, {
        "children": [{
          "text": "parser",
          "type": "text"
        }],
        "name": "span",
        "attrs": {
          "style": ";  color: #795da3;;"
        }
      }, {
        "children": [{
          "text": "(",
          "type": "text"
        }, {
          "children": [{
            "text": "\"https://example.com\"",
            "type": "text"
          }],
          "name": "span",
          "attrs": {
            "style": ";  color: #df5000;;"
          }
        }, {
          "text": ",",
          "type": "text"
        }, {
          "children": [{
            "text": "\"website\"",
            "type": "text"
          }],
          "name": "span",
          "attrs": {
            "style": ";  color: #df5000;;"
          }
        }, {
          "text": ",{engine:",
          "type": "text"
        }, {
          "children": [{
            "text": "\"phantom\"",
            "type": "text"
          }],
          "name": "span",
          "attrs": {
            "style": ";  color: #df5000;;"
          }
        }, {
          "text": "})",
          "type": "text"
        }],
        "name": "span",
        "attrs": {
          "style": ";"
        }
      }],
      "name": "span",
      "attrs": {
        "style": ";"
      }
    }, {
      "text": ";",
      "type": "text"
    }],
    "name": "div",
    "attrs": {
      "style": "background-color:#f6f8fa;padding:5px;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;"
    }
  }],
  //markdown模式示例代码
  markdown: [{
    "children": [{
      "text": "示例",
      "type": "text"
    }],
    "name": "h1",
    "attrs": {
      "style": ";",
      "id": "示例"
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
            "style": ";border:1px solid #ccc;padding: 6px 13px;",
            "align": "center"
          }
        }, {
          "children": [{
            "text": "标题2",
            "type": "text"
          }],
          "name": "th",
          "attrs": {
            "style": ";border:1px solid #ccc;padding: 6px 13px;",
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
            "text": "栏目1",
            "type": "text"
          }],
          "name": "td",
          "attrs": {
            "style": ";border:1px solid #ccc;padding: 6px 13px;",
            "align": "center"
          }
        }, {
          "children": [{
            "text": "栏目2",
            "type": "text"
          }],
          "name": "td",
          "attrs": {
            "style": ";border:1px solid #ccc;padding: 6px 13px;",
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
      "style": ";"
    }
  }],
  //使用步骤
  npm: [{
    "children": [{
      "text": "npm install parser-",
      "type": "text"
    }, {
      "children": [{
        "text": "wxapp",
        "type": "text"
      }],
      "name": "span",
      "attrs": {
        "style": ";  color: #a71d5d;;",
        "class": "hljs-keyword"
      }
    }, {
      "children": [],
      "name": "span",
      "attrs": {
        "style": ";  color: #795da3;;",
        "class": "hljs-title"
      }
    }],
    "name": "div",
    "attrs": {
      "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;",
      "class": "hljs"
    }
  }],
  node: [{
    "children": [{
      "children": [{
        "text": "const",
        "type": "text"
      }],
      "name": "span",
      "attrs": {
        "style": ";  color: #a71d5d;;",
        "class": "hljs-keyword"
      }
    }, {
      "text": " parser=",
      "type": "text"
    }, {
      "children": [{
        "text": "require",
        "type": "text"
      }],
      "name": "span",
      "attrs": {
        "style": ";",
        "class": "hljs-built_in"
      }
    }, {
      "text": "(",
      "type": "text"
    }, {
      "children": [{
        "text": "'parser-node'",
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
      "children": [{
        "text": "var",
        "type": "text"
      }],
      "name": "span",
      "attrs": {
        "style": ";  color: #a71d5d;;",
        "class": "hljs-keyword"
      }
    }, {
      "text": " html=",
      "type": "text"
    }, {
      "children": [{
        "text": "\"<div>Hello World!</div>\"",
        "type": "text"
      }],
      "name": "span",
      "attrs": {
        "style": ";  color: #df5000;;",
        "class": "hljs-string"
      }
    }, {
      "text": ";",
      "type": "text"
    }, {
      "children": [],
      "name": "br",
      "attrs": {
        "style": ";"
      }
    }, {
      "text": "parser(html).then(",
      "type": "text"
    }, {
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
        "text": "(",
        "type": "text"
      }, {
        "children": [{
          "text": "res",
          "type": "text"
        }],
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
      "text": ".log(res);",
      "type": "text"
    }, {
      "children": [],
      "name": "br",
      "attrs": {
        "style": ";"
      }
    }, {
      "text": "})",
      "type": "text"
    }],
    "name": "div",
    "attrs": {
      "style": "background-color:#f6f8fa;padding:5px;margin:5px 0 5px 0;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll;  display: block;  background: white;  padding: 0.5em;  color: #333333;  overflow-x: auto;;",
      "class": "hljs"
    }
  }],
}