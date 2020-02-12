var inlineTags = {
	abbr: true,
	b: true,
	big: true,
	code: true,
	del: true,
	em: true,
	font: true,
	i: true,
	ins: true,
	label: true,
	mark: true,
	q: true,
	s: true,
	small: true,
	span: true,
	strong: true,
	u: true
}
export default {
	getStyle: function(style, display) {
		var tmp, res = "";
		if (style) {
			style = style.toLowerCase();
			if (style.indexOf("float") != -1) res += style.match(getRegExp("float[^;]+(?![\s\S]*?float)"))[0];
			if (style.indexOf("margin") != -1) res += (';' + style.match(getRegExp("margin[^;]+", "g")).join(';'));
			if (style.indexOf("display") != -1 && (tmp = style.match(getRegExp("display\s*:\s*([^;]*)(?![\s\S]*?display)")),
					tmp[1].indexOf("flex") == -1)) res += (';' + tmp[0]);
			else res += (';display:' + display);
			tmp = style.match(getRegExp("flex[^;]*:[^;]+", "g"));
			if (tmp) res += (';' + tmp.join(';'));
			if (style.indexOf("width") != -1) res += (';' + style.match(getRegExp("[^;\s]*width[^;]+", "g")).join(';'));
		} else res = ("display:" + display);
		return res;
	},
	setImgStyle: function(item, imgMode) {
		if (item.attrs.style)
			item.attrs.style = item.attrs.style.toLowerCase().replace(getRegExp("width[^;]*?%", "g"), "width:100%").replace(
				getRegExp('margin[^;]+', "g"), "");
		if (imgMode == "widthFix") item.attrs.style = (item.attrs.style || '') + ";height:auto !important";
		return [item];
	},
	setStyle: function(item) {
		if (item.attrs.style)
			item.attrs.style = item.attrs.style.toLowerCase().replace(getRegExp("width[^;]*?%", "g"), "width:100%").replace(
				getRegExp('margin[^;]+', "g"), "");
		return [item];
	},
	isInlineTag: function(name) {
		return !!inlineTags[name];
	}
}
