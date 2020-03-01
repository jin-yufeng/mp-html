/* 配置文件 */
function makeMap(str, obj = {}) {
	var map = obj,
		list = str.split(',');
	for (var i = list.length; i--;)
		map[list[i]] = true;
	return map;
}
// 信任的属性列表，不在列表中的属性将被移除 
const trustAttrs = makeMap(
	"align,allowfullscreen,alt,app-id,appid,apid,author,autoplay,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,frameborder,height,href,id,ignore,loop,media,muted,name,path,poster,rowspan,size,span,src,start,style,type,unit-id,unitId,width,xmlns"
);
// 信任的标签，将保持标签名不变 
const trustTags = makeMap(
	"a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,u,ul,video"
	// #ifdef APP-PLUS
	+
	",embed,iframe"
	// #endif
);
// 块级标签，将被转为 div
const blockTags = makeMap("address,article,aside,body,center,cite,footer,header,html,nav,pre,section");
// 被移除的标签（其中 svg 系列标签会被转为图片） 
const ignoreTags = makeMap(
	"area,base,basefont,canvas,circle,command,ellipse,frame,head,input,isindex,keygen,line,link,map,meta,param,path,polygon,rect,script,source,svg,textarea,track,use,wbr"
	// #ifndef APP-PLUS
	+
	",embed,iframe"
	// #endif
);
// 只能用 rich-text 显示的标签（其中图片不能预览、不能显示视频、音频等） 
const richOnlyTags = makeMap("a,colgroup,fieldset,legend,picture,table,tbody,td,tfoot,th,thead,tr");
// 自闭合标签
const selfClosingTags = makeMap(
	"area,base,basefont,br,col,circle,ellipse,embed,frame,hr,img,input,isindex,keygen,line,link,meta,param,path,polygon,rect,source,track,use,wbr"
);
// 空白字符
const blankChar = makeMap(" ,\u00A0,\t,\r,\n,\f");
// 默认的标签样式
var userAgentStyles = {
	a: "color:#366092;word-break:break-all;padding:1.5px 0 1.5px 0",
	address: "font-style:italic",
	big: "display:inline;font-size:1.2em",
	blockquote: "background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",
	center: "text-align:center",
	cite: "font-style:italic",
	dd: "margin-left:40px",
	img: "max-width:100%",
	mark: "background-color:yellow",
	picture: "max-width:100%",
	pre: "font-family:monospace;white-space:pre;overflow:scroll",
	s: "text-decoration:line-through",
	small: "display:inline;font-size:0.8em",
	u: "text-decoration:underline"
};
const screenWidth = wx.getSystemInfoSync().screenWidth;
// #ifdef MP-WEIXIN
// 版本兼容
if (wx.canIUse("editor")) {
	makeMap("bdi,bdo,caption,rt,ruby,pre", trustTags);
	makeMap("bdi,bdo,caption,rt,ruby,pre", richOnlyTags);
	ignoreTags.rp = true;
	blockTags.pre = undefined;
} else
	// #endif
	blockTags.caption = true;

function bubbling(Parser) {
	for (var i = Parser._STACK.length; i--;) {
		if (!richOnlyTags[Parser._STACK[i].name])
			Parser._STACK[i].c = 1;
		else return false;
	}
	return true;
}
module.exports = {
	// 高亮处理函数
	highlight: null,
	// 处理标签的属性，需要通过组件递归方式显示的标签需要调用 bubbling(Parser)
	LabelHandler(node, Parser) {
		var attrs = node.attrs;
		attrs.style = Parser.CssHandler.match(node.name, attrs, node) + (attrs.style || '');
		switch (node.name) {
			case "div":
			case 'p':
				if (attrs.align) {
					attrs.style = `text-align:${attrs.align};${attrs.style}`;
					attrs.align = void 0;
				}
				break;
			case "img":
				if (attrs["data-src"]) {
					attrs.src = attrs.src || attrs["data-src"];
					attrs["data-src"] = void 0;
				}
				if (attrs.width && parseInt(attrs.width) > screenWidth)
					attrs.style += ";height:auto !important";
				if (attrs.src && !attrs.ignore) {
					if (bubbling(Parser)) attrs.i = (Parser._imgNum++).toString();
					else attrs.ignore = 'T';
				}
				break;
			case 'a':
			case "ad":
				// #ifdef APP-PLUS
			case "iframe":
			case "embed":
				// #endif
				bubbling(Parser);
				break;
			case "font":
				if (attrs.color) {
					attrs.style = `color:${attrs.color};${attrs.style}`;
					attrs.color = void 0;
				}
				if (attrs.face) {
					attrs.style = `font-family:${attrs.face};${attrs.style}`;
					attrs.face = void 0;
				}
				if (attrs.size) {
					var size = parseInt(attrs.size);
					if (size < 1) size = 1;
					else if (size > 7) size = 7;
					var map = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];
					attrs.style = `font-size:${map[size - 1]};${attrs.style}`;
					attrs.size = void 0;
				}
				break;
			case "video":
			case "audio":
				if (attrs.id) Parser[`_${node.name}Num`]++;
				else attrs.id = (node.name + (++Parser[`_${node.name}Num`]));
				if (node.name == "video") {
					attrs.style = attrs.style || '';
					if (attrs.width) {
						attrs.style = `width:${parseFloat(attrs.width) + attrs.width.includes('%') ? '%' : "px"};${attrs.style}`;
						attrs.width = void 0;
					}
					if (attrs.height) {
						attrs.style = `height:${parseFloat(attrs.height) + attrs.height.includes('%') ? '%' : "px"};${attrs.style}`;
						attrs.height = void 0;
					}
					if (Parser._videoNum > 3) node.lazyLoad = true;
				}
				attrs.source = [];
				if (attrs.src) attrs.source.push(attrs.src);
				if (!attrs.controls && !attrs.autoplay)
					console.warn(`存在没有 controls 属性的 ${node.name} 标签，可能导致无法播放`, node);
				bubbling(Parser);
				break;
			case "source":
				var i, parent = Parser._STACK[Parser._STACK.length - 1];
				if (!parent || !attrs.src) break;
				if (parent.name == "video" || parent.name == "audio")
					parent.attrs.source.push(attrs.src);
				else {
					var i, media = attrs.media;
					if (parent.name == "picture" && !parent.attrs.src && (!media || (media.includes("px") &&
							(((i = media.indexOf("min-width")) != -1 && (i = media.indexOf(':', i + 8)) != -1 &&
									screenWidth > parseInt(media.substring(i + 1))) ||
								((i = media.indexOf("max-width")) != -1 && (i = media.indexOf(':', i + 8)) != -1 &&
									screenWidth < parseInt(media.substring(i + 1)))))))
						parent.attrs.src = attrs.src;
				}
		}
		// 压缩 style
		var styles = attrs.style.split(';'),
			compressed = {};
		attrs.style = "";
		for (var i = 0, len = styles.length; i < len; i++) {
			var info = styles[i].split(':');
			if (info.length < 2) continue;
			var key = info[0].trim().toLowerCase(),
				value = info.slice(1).join(':').trim();
			// 填充链接
			if (value.includes("url")) {
				var j = value.indexOf('(');
				if (j++ != -1) {
					while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) j++;
					if (value[j] == '/') {
						if (value[j + 1] == '/') value = value.substring(0, j) + Parser._protocol + ':' + value.substring(j);
						else if (Parser._domain) value = value.substring(0, j) + Parser._domain + value.substring(j);
					}
				}
			}
			// 转换 rpx
			else if (value.includes("rpx"))
				value = value.replace(/[0-9.]*rpx/g, function($) {
					return parseFloat($) * screenWidth / 750 + "px";
				})
			if (value.includes("-webkit") || value.includes("-moz") || value.includes("-ms") || value.includes("-o") || value.includes(
					"safe"))
				attrs.style += `;${key}:${value}`;
			else if (!compressed[key] || value.includes("import") || !compressed[key].includes("import"))
				compressed[key] = value;
		}
		if (node.name == "img" && compressed.width && compressed.width.includes("%") && parseInt(compressed.width) >
			screenWidth)
			compressed.height = "auto !important";
		for (var key in compressed)
			attrs.style += `;${key}:${compressed[key]}`;
		attrs.style = attrs.style.substr(1);
		if (!attrs.style) attrs.style = void 0;
		if (Parser._useAnchor && attrs.id) bubbling(Parser);
	},
	trustAttrs,
	trustTags,
	blockTags,
	ignoreTags,
	selfClosingTags,
	blankChar,
	userAgentStyles,
	screenWidth
}
