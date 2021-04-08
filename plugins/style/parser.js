const blank = {
  ' ': true,
  '\n': true,
  '\t': true,
  '\r': true,
  '\f': true
}

function parser() {
  this.styles = []
  this.selectors = []
}

/**
 * @description 解析 css 字符串
 * @param {string} content css 内容
 */
parser.prototype.parse = function (content) {
  new lexer(this).parse(content)
  return this.styles
}

/**
 * @description 解析到一个选择器
 * @param {string} name 名称
 */
parser.prototype.onSelector = function (name) {
  // 不支持的选择器
  if (name.includes('[') || name.includes('*') || name.includes('@'))
    return
  var selector = {}
  // 伪类
  if (name.includes(':')) {
    var info = name.split(':'),
      pseudo = info.pop()
    if (pseudo == 'before' || pseudo == 'after') {
      selector.pseudo = pseudo
      name = info[0]
    } else
      return
  }

  // 分割交集选择器
  function splitItem(str) {
    var arr = []
    for (var i = 1, start = 0; i < str.length; i++) {
      if (str[i] == '.' || str[i] == '#') {
        arr.push(str.substring(start, i))
        start = i
      }
    }
    if (!arr.length)
      return str
    else {
      arr.push(str.substring(start, i))
      return arr
    }
  }

  // 后代选择器
  if (name.includes(' ')) {
    selector.list = []
    var list = name.split(' ')
    for (var i = 0; i < list.length; i++) {
      if (list[i].length) {
        // 拆分子选择器
        var arr = list[i].split('>')
        for (var j = 0; j < arr.length; j++) {
          selector.list.push(splitItem(arr[j]))
          if (j < arr.length - 1)
            selector.list.push('>')
        }
      }
    }
  } else
    selector.key = splitItem(name)

  this.selectors.push(selector)
}

/**
 * @description 解析到选择器内容
 * @param {string} content 内容
 */
parser.prototype.onContent = function (content) {
  // 并集选择器
  for (var i = 0; i < this.selectors.length; i++)
    this.selectors[i].style = content
  this.styles = this.styles.concat(this.selectors)
  this.selectors = []
}


/**
 * @description css 词法分析器
 * @param {object} handler 高层处理器
 */
function lexer(handler) {
  this.selector = ''
  this.style = ''
  this.handler = handler
}

lexer.prototype.parse = function (content) {
  this.i = 0
  this.content = content
  this.state = this.blank
  for (var len = content.length; this.i < len; this.i++)
    this.state(content[this.i])
}

lexer.prototype.comment = function () {
  this.i = this.content.indexOf('*/', this.i) + 1
  if (!this.i)
    this.i = this.content.length
}

lexer.prototype.blank = function (c) {
  if (!blank[c]) {
    if (c == '/' && this.content[this.i + 1] == '*')
      return this.comment()
    this.selector += c
    this.state = this.name
  }
}

lexer.prototype.name = function (c) {
  if (c == '/' && this.content[this.i + 1] == '*')
    return this.comment()
  if (c == '{' || c == ',' || c == ';') {
    this.handler.onSelector(this.selector.trimEnd())
    this.selector = ''
    if (c != '{')
      while (blank[this.content[++this.i]]);
    if (this.content[this.i] == '{') {
      this.floor = 1
      this.state = this.val
    } else
      this.selector += this.content[this.i]
  } else if (blank[c])
    this.selector += ' '
  else
    this.selector += c
}

lexer.prototype.val = function (c) {
  if (c == '/' && this.content[this.i + 1] == '*')
    return this.comment()
  if (c == '{')
    this.floor++
  else if (c == '}') {
    this.floor--
    if (!this.floor) {
      this.handler.onContent(this.style)
      this.style = ''
      this.state = this.blank
      return
    }
  }
  this.style += c
}

module.exports = parser
