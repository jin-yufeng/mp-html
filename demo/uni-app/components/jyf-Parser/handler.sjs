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
		var res = "";
		var reg = getRegExp("float\s*:\s*[^;]*", "i");
		if (reg.test(style)) res += reg.exec(style)[0];
		reg = getRegExp("margin[^;]*", "gi");
		var margin = reg.exec(style);
		while (margin) {
			res += (';' + margin[0]);
			margin = reg.exec(style);
		}
		reg = getRegExp("display\s*:\s*([^;]*)", "i");
		if (reg.test(style) && reg.exec(style)[1] != "flex") res += (';' + reg.exec(style)[0]);
		else res += (';display:' + display);
		reg = getRegExp("flex\s*:[^;]*", "i");
		if (reg.test(style)) res += (';' + reg.exec(style)[0]);
		reg = getRegExp("[^;\s]*width[^;]*", "ig");
		var width = reg.exec(style);
		while (width) {
			res += (';' + width[0]);
			width = reg.exec(style);
		}
		return res;
	},
	setImgStyle: function(item, imgMode) {
		if (imgMode == "widthFix")
			item.attrs.style = (item.attrs.style || '') + ";height:auto !important";
		if (getRegExp("[^-]width[^pev;]+").test(";" + item.attrs.style))
			item.attrs.style = (item.attrs.style || '') + ";width:100%";
		if (item.attrs.style)
			item.attrs.style = item.attrs.style.replace(getRegExp('margin[^;]*', "gi"), "");
		return [item];
	},
	setStyle: function(item) {
		if (item.attrs.style)
			item.attrs.style = item.attrs.style.replace(getRegExp("width[^;]*?%", "gi"), "width:100%").replace(getRegExp(
				'margin[^;]+', "gi"), "");
		return [item];
	},
	notContinue: function(item) {
		if (item.name == 'a') return true;
		return !(item["continue"] || inlineTags[item.name]);
	}
}
