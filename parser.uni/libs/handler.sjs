var inlineTags = {
	abbr: 1,
	b: 1,
	big: 1,
	code: 1,
	del: 1,
	em: 1,
	i: 1,
	ins: 1,
	label: 1,
	q: 1,
	small: 1,
	span: 1,
	strong: 1
}
export default {
	// 从 rich-text 顶层标签的样式中取出一些给 rich-text
	getStyle: function(style, display) {
		if (style) {
			var i, j, res = "";
			if ((i = style.indexOf("display")) != -1)
				res = style.substring(i, (j = style.indexOf(';', i)) == -1 ? style.length : j);
			else res = "display:" + display;
			if (style.indexOf("flex") != -1) res += ';' + style.match(getRegExp("flex[:-][^;]+/g")).join(';');
			return res;
		} else return "display:" + display;
	},
	getNode: function(item) {
		return [item];
	},
	// 是否通过 rich-text 显示
	useRichText: function(item) {
		// rich-text 不支持 inline
		if (item.c || inlineTags[item.name] || (item.attrs.style && item.attrs.style.indexOf("display:inline") != -1))
			return false;
		return true;
	}
}
