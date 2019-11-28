//DomHandler.js
var emoji; // 使用emoji补丁包时将此句改为 const emoji = require('./emoji.js');
const CssHandler = require('./CssHandler.js');
// #ifdef MP-WEIXIN
const CanIUse = require('./api.js').versionHigherThan('2.7.1');
// #endif
const trustTag = {
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
	font: 1,
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
	li: 0,
	ol: 0,
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
	u: 1,
	ul: 0,
	video: 1
};
const blockTag = {
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
const ignoreTag = {
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
	stop: true,
	textarea: true,
	title: true,
	track: true,
	use: true,
	wbr: true
};
// #ifdef MP-WEIXIN
if (CanIUse) {
	trustTag.bdi = 0;
	trustTag.bdo = 0;
	trustTag.caption = 0;
	trustTag.rt = 0;
	trustTag.ruby = 0;
	ignoreTag.rp = true;
	trustTag.big = 1;
	trustTag.small = 1;
	trustTag.pre = 0;
	delete blockTag.pre;
} else blockTag.caption = true;
// #endif

function randomId() {
	var res = "";
	for (var i = 0; i < 5; i++) {
		let rand = parseInt(Math.random() * 52);
		if (rand < 26)
			res = res + String.fromCharCode(65 + rand);
		else
			res = res + String.fromCharCode(71 + rand);
	}
	return res;
}

function DomHandler(style, tagStyle = {}, imgMode) {
	this.imgList = [];
	this.imgIndex = 0;
	this.nodes = [];
	this.title = "";
	this._CssHandler = new CssHandler(style, tagStyle);
	this._tagStack = [];
	this._videoNum = 0;
	// #ifdef MP-BAIDU || MP-TOUTIAO || H5
	this._imgMode = imgMode;
	// #endif
	this._whiteSpace = false;
}
DomHandler.prototype._addDomElement = function(element) {
	if (element.name == 'pre' || (element.attrs && /white-space\s*:\s*pre/.test(element.attrs.style))) {
		this._whiteSpace = true;
		element.pre = true;
	}
	let parent = this._tagStack[this._tagStack.length - 1];
	let siblings = parent ? parent.children : this.nodes;
	siblings.push(element);
};
DomHandler.prototype._bubbling = function() {
	for (let i = this._tagStack.length - 1; i >= 0; i--) {
		if (trustTag[this._tagStack[i].name])
			this._tagStack[i].continue = true;
		else
			return this._tagStack[i].name;
	}
}
DomHandler.prototype.onopentag = function(name, attrs) {
	let element = {
		children: []
	};
	let matched = this._CssHandler.match(name, attrs, element);
	//处理属性
	switch (name) {
		case 'div':
		case 'p':
			if (attrs.align) {
				attrs.style += (';text-align:' + attrs.align);
				delete attrs.align;
			}
			break;
		case 'img':
			if (attrs.width) {
				attrs.style = 'width:' + attrs.width + (/[0-9]/.test(attrs.width[attrs.width.length - 1]) ? 'px' : '') + ';' +
					attrs.style;
				delete attrs.width;
			}
			if (attrs['data-src']) {
				attrs.src = attrs.src || attrs['data-src'];
				delete attrs['data-src'];
			}
			// #ifdef MP-BAIDU || MP-TOUTIAO || H5
			if (this._imgMode == "widthFix") attrs.style += ";height:auto !important;";
			// #endif
			if (!attrs.hasOwnProperty('ignore') && attrs.src) {
				if (this._bubbling() == 'a') {
					attrs.ignore = "true"; // 图片在链接中不可预览
					break;
				}
				var url = attrs.src;
				// #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU || MP-TOUTIAO
				// 去重，至多重试10次
				for (let i = 0; this.imgList.indexOf(url) != -1 && i < 10; i++) {
					// 网络链接
					if (/^http/.test(url)) {
						url = url.replace(/^(https*):\/\/([\S]+?)\//, function() {
							var domain = "";
							for (var c of arguments[2]) {
								if (/[a-zA-Z]/.test(c))
									domain += (Math.random() >= 0.5 ? c.toUpperCase() : c);
								else domain += c;
							}
							return (arguments[1] + '://' + domain + '/');
						})
					}
					// base64
					else if (/base64/.test(url)) {
						url = url.replace(/^data:(image\/\S+);base64,/, function() {
							var head = "";
							for (var c of arguments[1]) {
								if (/[a-zA-Z]/.test(c))
									head += (Math.random() >= 0.5 ? c.toUpperCase() : c);
								else head += c;
							}
							return ('data:' + head + ';base64,');
						})
					} else break;
				}
				// #endif
				element.current = this.imgList.length;
				this.imgList.push(url);
			} else
				attrs.ignore = "true";
			break;
		case 'font':
			name = 'span';
			if (attrs.color) {
				attrs.style += (';color:' + attrs.color);
				delete attrs.color;
			}
			if (attrs.face) {
				attrs.style += (";font-family:" + attrs.face);
				delete attrs.face;
			}
			if (attrs.size) {
				var size = parseInt(attrs.size);
				if (size < 1) size = 1;
				else if (size > 7) size = 7;
				let map = [10, 13, 16, 18, 24, 32, 48];
				attrs.style += (";font-size:" + map[size - 1] + "px");
				delete attrs.size;
			}
			break;
		case 'a':
		case 'ad':
			this._bubbling();
			break;
		case 'video':
		case 'audio':
			attrs.loop = attrs.hasOwnProperty('loop');
			attrs.controls = attrs.hasOwnProperty('controls');
			attrs.autoplay = attrs.hasOwnProperty('autoplay');
			if (name == 'video') {
				attrs.muted = attrs.hasOwnProperty('muted');
				if (attrs.width) {
					attrs.style = 'width:' + parseFloat(attrs.width) + 'px;' + attrs.style;
					delete attrs.width;
				}
				if (attrs.height) {
					attrs.style = 'height:' + parseFloat(attrs.height) + 'px;' + attrs.style;
					delete attrs.height;
				}
			}
			attrs.id = randomId() + (name == 'video' ? ++this._videoNum : '');
			attrs.source = [];
			if (attrs.src) attrs.source.push(attrs.src);
			if (!attrs.controls && !attrs.autoplay)
				console.warn('存在没有controls属性的' + name + '标签，可能导致无法播放', attrs);
			this._bubbling();
			break;
		case 'source':
			let parent = this._tagStack[this._tagStack.length - 1];
			if (parent && (parent.name == 'video' || parent.name == 'audio')) {
				parent.attrs.source.push(attrs.src);
				if (!parent.attrs.src) parent.attrs.src = attrs.src;
			}
			this._tagStack.push(element);
			return;
	}
	attrs.style = matched + attrs.style;
	if (blockTag[name]) name = 'div';
	else if (!trustTag.hasOwnProperty(name)) name = 'span';
	element.name = name;
	element.attrs = attrs;
	this._addDomElement(element);
	this._tagStack.push(element);
};
DomHandler.prototype.ontext = function(data) {
	if (!this._whiteSpace) {
		if (!/\S/.test(data))
			return;
		data = data.replace(/\s+/g, " ");
	}
	// #ifndef MP-WEIXIN || MP-QQ || APP-PLUS || H5
	let entities = {
		lt: "<",
		gt: ">",
		nbsp: "\u00A0",
		ensp: "\u2002",
		emsp: "\u2003",
		amp: "&",
		apos: "'",
		quot: '"',
		ndash: "–",
		mdash: "—",
		middot: "·",
		lsquo: "‘",
		rsquo: "’",
		ldquo: "“",
		rdquo: "”",
		bull: "•",
		hellip: "…",
		permil: "‰",
		copy: "©",
		reg: "®",
		trade: "™",
		times: "×",
		divide: "÷",
		cent: "￠",
		pound: "£",
		yen: "¥",
		euro: "€",
		sect: "§"
	};
	data = data.replace(/&(\S{1,8}?);/g, function() {
		if (entities[arguments[1]]) return entities[arguments[1]];
		return "";
	});
	// #endif
	let element = {
		type: 'text'
	};
	// #ifdef MP-WEIXIN || MP-QQ || H5 || APP-PLUS
	data = data.replace(/&nbsp;/g, '&#xA0;'); // 解决连续&nbsp;失效问题
	if (/&#*((?!sp|lt|gt).){2,8};/.test(data)) element.decode = true;
	// #endif
	if (emoji) data = emoji.parseEmoji(data);
	element.text = data;
	this._addDomElement(element);
};
DomHandler.prototype.onclosetag = function(name) {
	let element = this._tagStack.pop();
	let parent = this._tagStack.length ? this._tagStack[this._tagStack.length - 1].children : this.nodes;
	if (ignoreTag[name]) {
		if (name == 'title') {
			try {
				this.title = element.children[0].text;
			} catch (e) {}
		}
		parent.pop();
	}
	// 设置表格的边框
	if (name == 'table') {
		if (element.attrs.border)
			element.attrs.style += (";border:" + element.attrs.border + "px solid gray;");
		if (element.attrs.hasOwnProperty("cellspacing"))
			element.attrs.style += (";border-spacing:" + element.attrs.cellspacing + "px");

		function setBorder(node) {
			if (node.type == 'text') return;
			if (node.name == 'th' || node.name == 'td') {
				if (element.attrs.border)
					node.attrs.style += ";border:" + element.attrs.border + "px solid gray;";
				if (element.attrs.hasOwnProperty("cellpadding"))
					node.attrs.style += ";padding:" + element.attrs.cellpadding + "px";
			}
			for (var child of node.children)
				setBorder(child);
		}
		if (element.attrs.border || element.attrs.hasOwnProperty("cellpadding")) {
			for (var child of element.children)
				setBorder(child);
		}
	}
	// 合并一些不必要的层，减小节点深度
	if (element.children.length == 1 && element.name == 'div') {
		let child = element.children[0];
		if (child.name == 'div' && !(/padding/.test(element.attrs.style)) && !(/margin/.test(element.attrs.style) &&
				/margin/.test(child.attrs.style)) && !(/display/.test(element.attrs.style)) && !(/display/.test(child.attrs.style)) &&
			!(element.attrs.id && child.attrs.id) && !(element.attrs.class && child.attrs.class)) {
			if (/padding/.test(child.attrs.style))
				child.attrs.style = ";box-sizing:border-box;" + child.attrs.style;
			child.attrs.style = element.attrs.style + ";" + child.attrs.style;
			child.attrs.id = (child.attrs.id || "") + (element.attrs.id || "");
			child.attrs.class = (child.attrs.class || "") + (element.attrs.class || "");
			parent[parent.indexOf(element)] = child;
		}
	}
	if (element.pre) {
		this._whiteSpace = false;
		for (var ele of this._tagStack)
			if (ele.pre)
				this._whiteSpace = true;
		delete element.pre;
	}
	// 多层样式处理 
	if (this._CssHandler.pop)
		this._CssHandler.pop(element);
};
module.exports = DomHandler;
