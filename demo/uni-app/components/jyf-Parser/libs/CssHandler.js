/*
 解析和匹配 Css 的选择器
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 author：JinYufeng
*/
const config = require("./config.js");
class CssHandler {
	constructor(tagStyle) {
		this.styles = tagStyle;
	};
	getStyle(data) {
		var style = '';
		data = data.replace(/<style[\s\S]*?>([\s\S]*?)<\/style[\s\S]*?>/g, function() {
			style += arguments[1];
			return '';
		})
		this.styles = new CssParser(style, this.styles).parse();
		return data;
	};
	parseCss = (css) => new CssParser(css, {}, true).parse();
	match(name, attrs) {
		let matched = (this.styles[name] || '') + ';';
		if (attrs.class) {
			var classes = attrs.class.split(' ')
			for (var i = 0; i < classes.length; i++)
				matched += ((this.styles['.' + classes[i]] || '') + ';');
		}
		if (attrs.id)
			matched += ((this.styles['#' + attrs.id] || '') + ';');
		return matched == ';' ? '' : matched;
	};
}
module.exports = CssHandler;

function isBlankChar(c) {
	return c == ' ' || c == '\u00A0' || c == '\t' || c == '\r' || c == '\n' || c == '\f';
};
class CssParser {
	constructor(data, tagStyle = {}, api) {
		this.data = data;
		this.res = api ? tagStyle : this.merge(tagStyle);
		this._floor = 0;
		this._i = 0;
		this._list = [];
		this._comma = false;
		this._sectionStart = 0;
		this._stateHandler = this.SpaceHandler;
	};
	merge(tagStyle) {
		var res = JSON.parse(JSON.stringify(config.userAgentStyles));
		for (var key in tagStyle)
			res[key] = (res[key] || '') + tagStyle[key];
		return res;
	};
	parse() {
		for (; this._i < this.data.length; this._i++)
			this._stateHandler(this.data[this._i]);
		return this.res;
	};
	SpaceHandler(c) {
		if (c == '.' || c == '#' || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
			this._sectionStart = this._i;
			this._stateHandler = this.StyleNameHandler;
		} else if (c == '/' && this.data[this._i + 1] == '*')
			this.CommentHandler();
		else if (!isBlankChar(c) && c != ';')
			this._stateHandler = this.IgnoreHandler;
	};
	CommentHandler() {
		this._i = this.data.indexOf("*/", this._i);
		if (this._i == -1) this._i = this.data.length;
		this._i++;
		this._stateHandler = this.SpaceHandler;
	};
	IgnoreHandler(c) {
		if (c == '{') this._floor++;
		else if (c == '}' && --this._floor <= 0) {
			this._list = [];
			this._stateHandler = this.SpaceHandler;
		}
	};
	StyleNameHandler(c) {
		if (isBlankChar(c)) {
			this._list.push(this.data.substring(this._sectionStart, this._i));
			this._stateHandler = this.NameSpaceHandler;
		} else if (c == '{') {
			this._list.push(this.data.substring(this._sectionStart, this._i));
			this._floor = 1;
			this._sectionStart = this._i + 1;
			this.ContentHandler();
		} else if (c == ',') {
			this._list.push(this.data.substring(this._sectionStart, this._i));
			this._sectionStart = this._i + 1;
			this._comma = true;
		} else if (!(c >= 'a' && c <= 'z') && !(c >= 'A' && c <= 'Z') && !(c >= '0' && c <= '9') && c != '.' && c != '#' &&
			c != '-' && c != '_')
			this._stateHandler = this.IgnoreHandler;
	};
	NameSpaceHandler(c) {
		if (c == '{') {
			this._floor = 1;
			this._sectionStart = this._i + 1;
			this.ContentHandler();
		} else if (c == ',') {
			this._comma = true;
			this._sectionStart = this._i + 1;
			this._stateHandler = this.StyleNameHandler;
		} else if (!isBlankChar(c)) {
			if (this._comma) {
				this._stateHandler = this.StyleNameHandler;
				this._sectionStart = this._i;
				this._i--;
				this._comma = false;
			} else this._stateHandler = this.IgnoreHandler;
		}
	};
	ContentHandler() {
		this._i = this.data.indexOf('}', this._i);
		if (this._i == -1) this._i = this.data.length;
		// 去除空白符
		var flag = false,
			pos, content = this.data.substring(this._sectionStart, this._i);
		for (var i = 0; i < content.length; i++) {
			if (isBlankChar(content[i])) {
				if (!flag) {
					pos = i;
					flag = true;
				}
			} else {
				if (flag) {
					if (pos == 0) content = content.substring(i);
					else if (i - pos > 1) content = content.substring(0, pos) + ' ' + content.substring(i);
					i = pos;
					flag = false;
				}
			}
		}
		if (flag) content = content.substring(0, pos);
		for (var i = 0; i < this._list.length; i++)
			this.res[this._list[i]] = (this.res[this._list[i]] || '') + content;
		this._list = [];
		this._stateHandler = this.SpaceHandler;
	}
}
