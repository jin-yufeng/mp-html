/*
  CssHandler 补丁包
  github地址：https://github.com/jin-yufeng/Parser
  文档地址：https://jin-yufeng.github.io/Parser
  author：JinYufeng
*/
const config = require("./config.js");
// 匹配 class
function matchClass(match, selector) {
  if (!match || !match.length || !selector || !selector.length) return false;
  if (match.length == 1 && selector.length == 1) return match[0] == selector[0];
  if (match.length < selector.length) return false;
  for (var i = selector; i--;) {
    var matched = false;
    for (var j = match.length; j--;)
      if (match[j] == selector[i]) matched = true;
    if (!matched) return false;
  }
  return true;
}
// 匹配样式
function matchStyle(match_name, match_class, match_id, selector) {
  if (selector == '*') return 0;
  var selector_name = selector.match(/^[^\.#\s]+/);
  var selector_class = selector.match(/\.[^\.#\s]+/g);
  var selector_id = selector.match(/#[^\.#\s]+/);
  if (selector_id) {
    if (match_id == selector_id) {
      if ((selector_class && !matchClass(match_class, selector_class)) || (selector_name && match_name != selector_name[0])) return -1;
      else return 2;
    } else return -1;
  } else if (selector_class) {
    if (matchClass(match_class, selector_class)) {
      if (selector_name && match_name != selector_name[0]) return -1;
      else return 1;
    } else return -1;
  } else if (selector_name && match_name == selector_name[0]) return 0;
  return -1;
}
class CssHandler {
  constructor(tagStyle = {}) {
    this.styles = Object.assign({}, tagStyle);
  };
  getStyle(data) {
    var style = '';
    data = data.replace(/<[sS][tT][yY][lL][eE][\s\S]*?>([\s\S]*?)<\/[sS][tT][yY][lL][eE][\s\S]*?>/g, function ($, $1) {
      style += $1;
      return '';
    })
    this.styles = parseCss(style, this.styles);
    return data;
  };
  match(name, attrs, element) {
    var match_class = [];
    if (attrs.class) {
      var match = attrs.class.split(/\s+/);
      for (var i = match.length; i--;)
        match_class.unshift('.' + match[i]);
    }
    var matchedName = '',
      matchedClass = '',
      matchedId = '',
      key, flag = false; // 子选择器标识
    element.i = [];
    element.index = [];
    element.pseudo = [];
    for (var i = 0, item; item = this.styles[i]; i++) {
      if (item.key[0] == '>') {
        key = item.key.substring(1);
        flag = true;
      } else {
        key = item.key;
        flag = false;
      }
      var matchRes = matchStyle(name, match_class, attrs.id ? '#' + attrs.id : '', key);
      if (matchRes != -1) {
        if (!item.hasOwnProperty('index') || item.index == item.list.length - 1) {
          var matchAttr = true;
          if (item.attr) {
            for (var j = 0; j < item.attr.length; j++) {
              if (!item.attr[j].hasOwnProperty("value")) {
                if (!attrs.hasOwnProperty(item.attr[j].name)) matchAttr = false;
              } else if (attrs[item.attr[j].name] != item.attr[j].value) matchAttr = false;
            }
          }
          if (matchAttr) {
            if (item.pseudo) element.pseudo.push(item);
            else if (matchRes == 0) matchedName += ';' + item.content;
            else if (matchRes == 1) matchedClass += ';' + item.content;
            else matchedId += ';' + item.content;
          }
        } else {
          element.i.push(i);
          element.index.push(item.index);
          item.index++;
          item.key = item.list[item.index];
        }
      }
      if (flag) {
        element.i.push(i);
        element.index.push(item.index);
        item.index--;
        item.key = item.list[item.index];
      }
    }
    if (!element.i.length) {
      element.i = undefined;
      element.index = undefined;
    }
    if (!element.pseudo.length)
      element.pseudo = undefined;
    return matchedName + ';' + matchedClass + ";" + matchedId + ";";
  };
  pop(element) {
    // 多层class匹配标记
    if (element.i) {
      for (var i = 0; i < element.i.length; i++) {
        var j = element.i[i];
        this.styles[j].key = this.styles[j].list[element.index[i]];
        this.styles[j].index = element.index[i];
      }
      element.i = undefined;
      element.index = undefined;
    }
    // 伪类
    if (element.pseudo) {
      for (var item of element.pseudo) {
        var content;
        var style = item.content.replace(/content:([^;\n]*)/, function ($, $1) {
          // 转换 attr
          content = $1.replace(/attr\((.+?)\)/, function ($, $1) {
            return element.attrs[$1.trim()] || '';
          }).replace(/\s*['"](.*?)['"]\s*/g, "$1")
            // 转换 \xxx
            .replace(/\\(\w{4})/, function ($, $1) {
              return String.fromCharCode(parseInt($1, 16));
            });
          return '';
        })
        var child = {
          name: "span",
          attrs: {
            style
          },
          children: [{
            type: "text",
            text: content
          }]
        }
        if (item.pseudo == "before")
          element.children.unshift(child);
        else
          element.children.push(child);
      }
    }
  }
}

function parseCss(data, tagStyle) {
  var keys = [];
  for (var item in config.userAgentStyles) {
    if (tagStyle[item]) tagStyle[item] = config.userAgentStyles[item] + ';' + tagStyle[item];
    else tagStyle[item] = config.userAgentStyles[item];
  }
  for (var key in tagStyle) {
    keys.push({
      key,
      content: tagStyle[key]
    })
  }
  var j, i = 0;

  function ignore() {
    var floor = 1;
    for (var k = j + 1; k < data.length; k++) {
      if (data[k] == '{') floor++;
      else if (data[k] == '}')
        if (--floor == 0) break;
    }
    i = k + 1;
  }
  data = data.replace(/\/\*[\s\S]*?\*\//g, '');
  while (i < data.length) {
    j = data.indexOf('{', i);
    if (j == -1) break;
    var name = data.substring(i, j);
    if (name[0] == '@') {
      // @media 查询
      if (name.substring(0, 6) == "@media") {
        var info = name.match(/\((.+?):(.+?)\)/);
        if (info && info[2].includes("px")) {
          var value = parseInt(info[2]);
          if ((info[1] == "min-width" && config.screenWidth > value) || (info[1] == "max-width" && config.screenWidth < value)) {
            i = j + 1;
            continue;
          }
          ignore();
        }
      } else
        ignore();
      continue;
    }
    name = name.trim();
    if (name[0] == '}') name = name.substring(1);
    if (name[0] != '.' && name[0] != '#' && name[0] != '[' && name[0] != '*' && !(name >= 'a' && name <= 'z') && !(name >= 'A' && name <= 'Z')) {
      ignore();
      continue;
    }
    var list = name.split(',')
    i = j + 1;
    j = data.indexOf('}', i);
    if (j == -1) break;
    var content = data.substring(i, j);
    i = j + 1;
    for (var k = 0; k < list.length; k++) {
      var item = {
        key: list[k].trim(),
        content
      }
      // 伪类
      if (item.key.includes(':')) {
        var info = item.key.split(':');
        item.key = info[0].trim();
        item.pseudo = info.pop();
        if (item.pseudo != "before" && item.pseudo != "after") continue;
      }
      // 属性选择器
      if (item.key.includes('[')) {
        item.attr = [];
        item.key = item.key.replace(/\[(.+?)\]/g, function ($, $1) {
          if ($1.includes('=')) {
            var info = $1.split('=');
            var value = info[1].trim();
            if ((value[0] == '"' && value[value.length - 1] == '"') || (value[0] == "'" && value[value.length - 1] == "'")) value = value.substring(1, value.length - 1);
            item.attr.push({
              name: info[0].trim(),
              value
            })
          } else
            item.attr.push({
              name: $1.trim()
            })
          return '';
        }).trim()
        if (!item.key) item.key = '*';
      }
      // 后代选择器
      if (item.key.includes(' ') || item.key.includes('>')) {
        var tmp = item.key.replace(/\s*>\s*/g, ' >').split(/\s+/);
        item.list = tmp;
        item.key = tmp[0];
        item.index = 0;
      }
      keys.push(item)
    }
  }
  return keys;
}
module.exports = CssHandler;