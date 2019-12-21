/* 配置文件 */
// 信任的属性列表，不在列表中的属性将被移除
const trustAttrs = {
	align: true,
	alt: true,
	"app-id": true,
	appId: true,
	// #ifdef MP-BAIDU
	appid: true,
	apid: true,
	// #endif
	author: true,
	autoplay: true,
	border: true,
	cellpadding: true,
	cellspacing: true,
	class: true,
	color: true,
	colspan: true,
	controls: true,
	"data-src": true,
	dir: true,
	face: true,
	height: true,
	href: true,
	id: true,
	ignore: true,
	loop: true,
	muted: true,
	name: true,
	path: true,
	poster: true,
	rowspan: true,
	size: true,
	span: true,
	src: true,
	start: true,
	style: true,
	type: true,
	// #ifdef MP-WEIXIN || MP-QQ
	"unit-id": true,
	unitId: true,
	// #endif
	width: true
};
// 信任的标签列表，1 表示可以用 trees 组件模拟并继续递归显示
const trustTags = {
	a: 0,
	abbr: 1,
	ad: 0,
	audio: 0,
	b: 1,
	blockquote: 1,
	br: 0,
	code: 1,
	col: 0,
	colgroup: 0,
	dd: 1,
	del: 1,
	dl: 1,
	dt: 1,
	div: 1,
	em: 1,
	fieldset: 0,
	h1: 0,
	h2: 0,
	h3: 0,
	h4: 0,
	h5: 0,
	h6: 0,
	hr: 0,
	i: 1,
	img: 1,
	ins: 1,
	label: 1,
	legend: 0,
	li: 1,
	ol: 1,
	p: 1,
	q: 1,
	source: 0,
	span: 1,
	strong: 1,
	sub: 0,
	sup: 0,
	table: 0,
	tbody: 0,
	td: 0,
	tfoot: 0,
	th: 0,
	thead: 0,
	tr: 0,
	title: 0,
	u: 1,
	ul: 1,
	video: 1
};
// 块级标签，将被转为 div
const blockTags = {
	address: true,
	article: true,
	aside: true,
	body: true,
	center: true,
	cite: true,
	footer: true,
	header: true,
	html: true,
	nav: true,
	pre: true,
	section: true
};
// 被移除的标签
const ignoreTags = {
	area: true,
	base: true,
	basefont: true,
	canvas: true,
	circle: true,
	command: true,
	ellipse: true,
	embed: true,
	frame: true,
	head: true,
	iframe: true,
	input: true,
	isindex: true,
	keygen: true,
	line: true,
	link: true,
	map: true,
	meta: true,
	param: true,
	path: true,
	polygon: true,
	polyline: true,
	rect: true,
	script: true,
	source: true,
	textarea: true,
	track: true,
	use: true,
	wbr: true
};
// 自闭合标签
const selfClosingTags = {
	area: true,
	base: true,
	basefont: true,
	br: true,
	col: true,
	circle: true,
	ellipse: true,
	embed: true,
	frame: true,
	hr: true,
	img: true,
	input: true,
	isindex: true,
	keygen: true,
	line: true,
	link: true,
	meta: true,
	param: true,
	path: true,
	polygon: true,
	polyline: true,
	rect: true,
	source: true,
	track: true,
	use: true,
	wbr: true
};
// 默认的标签样式
var userAgentStyles = {
	a: "display:inline;color:#366092;word-break:break-all;",
	address: "font-style:italic;",
	blockquote: "background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px;",
	center: "text-align:center;",
	cite: "font-style:italic;",
	code: "padding:0 1px 0 1px;margin-left:2px;margin-right:2px;background-color:#f8f8f8;border-radius:3px;",
	dd: "margin-left:40px;",
	img: "max-width:100%;",
	mark: "display:inline;background-color:yellow;",
	pre: "font-family:monospace;white-space:pre;overflow:scroll;",
	s: "display:inline;text-decoration:line-through;",
	u: "display:inline;text-decoration:underline;"
};
const SDKVersion = wx.getSystemInfoSync().SDKVersion;
var versionHigherThan = (version = '') => {
	var v1 = SDKVersion.split('.');
	var v2 = version.split('.');
	const len = Math.max(v1.length, v2.length);
	while (v1.length < len)
		v1.push('0');
	while (v2.length < len)
		v2.push('0');
	for (let i = 0; i < len; i++) {
		const num1 = parseInt(v1[i]);
		const num2 = parseInt(v2[i]);
		if (num1 > num2) return true;
		if (num1 < num2) return false;
	}
	return true;
};
// #ifdef MP-WEIXIN || MP-QQ
// 版本兼容
if (versionHigherThan("2.7.1")) {
	trustTags.bdi = 0;
	trustTags.bdo = 0;
	trustTags.caption = 0;
	trustTags.rt = 0;
	trustTags.ruby = 0;
	ignoreTags.rp = true;
	trustTags.big = 1;
	trustTags.small = 1;
	trustTags.pre = 0;
	delete blockTags.pre;
} else {
	blockTags.caption = true;
	userAgentStyles.big = "display:inline;font-size:1.2em;";
	userAgentStyles.small = "display:inline;font-size:0.8em;";
}
// #endif
module.exports = {
	// 高亮处理函数
	highlight: null,
	// 处理标签的属性，需要通过组件递归方式显示的标签需要调用 Parser.bubbling()
	LabelAttrsHandler(node, Parser) {
		node.attrs.style = node.attrs.style || '';
		switch (node.name) {
			case "div":
			case 'p':
				if (node.attrs.align) {
					node.attrs.style = "text-align:" + node.attrs.align + ';' + node.attrs.style;
					delete node.attrs.align;
				}
				break;
			case "img":
				if (node.attrs["data-src"]) {
					node.attrs.src = node.attrs.src || node.attrs["data-src"];
					delete node.attrs["data-src"];
				}
				// #ifdef MP-BAIDU || MP-TOUTIAO
				if (Parser._imgMode == "widthFix") node.attrs.style = node.attrs.style + ";height:auto !important;";
				// #endif
				if (node.attrs.src) {
					if (!node.attrs.ignore) {
						node.attrs.i = (Parser._imgNum++).toString();
						if (Parser.bubbling() == 'a') node.attrs.ignore = "true"; // 图片在链接中不可预览
					}
					if (Parser._domain && node.attrs.src[0] == '/') {
						if (node.attrs.src[1] == '/') node.attrs.src = Parser._protocol + ":" + node.attrs.src;
						else node.attrs.src = Parser._domain + node.attrs.src;
					}
				}
				break;
			case 'a':
			case "ad":
				Parser.bubbling();
				break;
			case "font":
				if (node.attrs.color) {
					node.attrs.style = "color:" + node.attrs.color + ';' + node.attrs.style;
					delete node.attrs.color;
				}
				if (node.attrs.face) {
					node.attrs.style = "font-family:" + node.attrs.face + ';' + node.attrs.style;
					delete node.attrs.face;
				}
				if (node.attrs.size) {
					var size = parseInt(node.attrs.size);
					if (size < 1) size = 1;
					else if (size > 7) size = 7;
					let map = [10, 13, 16, 18, 24, 32, 48];
					node.attrs.style = "font-size:" + map[size - 1] + "px;" + node.attrs.style;
					delete node.attrs.size;
				}
				break;
			case "video":
			case "audio":
				if (node.attrs.id) Parser['_' + node.name + "Num"]++;
				else node.attrs.id = (node.name + (++Parser['_' + node.name + "Num"]));
				if (node.name == "video") {
					node.attrs.style = node.attrs.style || '';
					if (node.attrs.width) {
						node.attrs.style = "width:" + parseFloat(node.attrs.width) + (node.attrs.height.includes('%') ? '%' : "px") +
							';' + node.attrs.style;
						delete node.attrs.width;
					}
					if (node.attrs.height) {
						node.attrs.style = "height:" + parseFloat(node.attrs.height) + (node.attrs.height.includes('%') ? '%' : "px") +
							';' + node.attrs.style;
						delete node.attrs.height;
					}
					if (Parser._videoNum > 3) node.lazyLoad = true;
				}
				node.attrs.source = [];
				if (node.attrs.src) node.attrs.source.push(node.attrs.src);
				if (!node.attrs.controls && !node.attrs.autoplay)
					console.warn("存在没有controls属性的 " + node.name + " 标签，可能导致无法播放", node);
				Parser.bubbling();
				break;
			case "source":
				var parent = Parser._STACK[Parser._STACK.length - 1];
				if (parent && (parent.name == "video" || parent.name == "audio")) {
					parent.attrs.source.push(node.attrs.src);
					if (!parent.attrs.src) parent.attrs.src = node.attrs.src;
				}
				break;
		}
		node.attrs.style = Parser.CssHandler.match(node.name, node.attrs, node) + node.attrs.style;
		if (Parser._domain && node.attrs.style.includes("url"))
			node.attrs.style = node.attrs.style.replace(/url\s*\(['"\s]*(\S*?)['"\s]*\)/, function() {
				var src = arguments[1];
				if (src && src[0] == '/') {
					if (src[1] == '/') return "url(" + Parser._protocol + ':' + src + ')';
					else return "url(" + Parser._domain + src + ')';
				} else return arguments[0];
			})
		if (!node.attrs.style) delete node.attrs.style;
		if (Parser._useAnchor && node.attrs.id) Parser.bubbling();
	},
	trustAttrs,
	trustTags,
	blockTags,
	ignoreTags,
	selfClosingTags,
	userAgentStyles,
	versionHigherThan
}
