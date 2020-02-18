/* 配置文件 */
function makeMap(str) {
	var map = {},
		list = str.split(',');
	for (var i = list.length; i--;)
		map[list[i]] = true;
	return map;
}
// 信任的属性列表，不在列表中的属性将被移除 
const trustAttrs = makeMap(
	"align,alt,app-id,appId,"
	// #ifdef MP-BAIDU
	+
	"appid,apid,"
	// #endif
	+
	"author,autoplay,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,height,href,id,ignore,loop,muted,name,path,poster,rowspan,size,span,src,start,style,type,"
	// #ifdef MP-WEIXIN || MP-QQ
	+
	"unit-id,unitId,"
	// #endif
	+
	"width,xmlns"
);
// 信任的标签，将保持标签名不变 
const trustTags = makeMap(
	"a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,u,ul,video"
);
// 块级标签，将被转为 div
const blockTags = makeMap("address,article,aside,body,center,cite,footer,header,html,nav,pre,section");
// 行内标签
const inlineTags = makeMap("abbr,b,big,code,del,em,font,i,ins,label,mark,q,s,small,span,strong,u");
// 被移除的标签（其中 svg 系列标签会被转为图片） 
const ignoreTags = makeMap(
	"area,base,basefont,canvas,circle,command,ellipse,embed,frame,head,iframe,input,isindex,keygen,line,link,map,meta,param,path,polygon,rect,script,source,svg,textarea,track,use,wbr"
);
// 只能用 rich-text 显示的标签（其中图片不能预览、不能显示视频、音频等） 
const richOnlyTags = makeMap(
	"a,colgroup,fieldset,legend,sub,sup,table,tbody,td,tfoot,th,thead,tr");
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
	blockquote: "background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",
	center: "text-align:center",
	cite: "font-style:italic",
	dd: "margin-left:40px",
	img: "max-width:100%",
	mark: "background-color:yellow",
	pre: "font-family:monospace;white-space:pre;overflow:scroll",
	s: "text-decoration:line-through",
	u: "text-decoration:underline"
};
const screenWidth = wx.getSystemInfoSync().screenWidth;
// #ifdef MP-WEIXIN
// 版本兼容
if (wx.canIUse("editor")) {
	trustTags.bdi = true;
	trustTags.bdo = true;
	trustTags.caption = true;
	trustTags.rt = true;
	trustTags.ruby = true;
	ignoreTags.rp = true;
	trustTags.big = true;
	trustTags.small = true;
	trustTags.pre = true;
	richOnlyTags.bdi = true;
	richOnlyTags.bdo = true;
	richOnlyTags.caption = true;
	richOnlyTags.rt = true;
	richOnlyTags.ruby = true;
	richOnlyTags.pre = true;
	blockTags.pre = undefined;
} else
// #endif
{
	blockTags.caption = true;
	userAgentStyles.big = "display:inline;font-size:1.2em";
	userAgentStyles.small = "display:inline;font-size:0.8em";
}

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
	LabelAttrsHandler(node, Parser) {
		node.attrs.style = Parser.CssHandler.match(node.name, node.attrs, node) + (node.attrs.style || '');
		switch (node.name) {
			case "div":
			case 'p':
				if (node.attrs.align) {
					node.attrs.style = "text-align:" + node.attrs.align + ';' + node.attrs.style;
					node.attrs.align = undefined;
				}
				break;
			case "img":
				if (node.attrs["data-src"]) {
					node.attrs.src = node.attrs.src || node.attrs["data-src"];
					node.attrs["data-src"] = undefined;
				}
				// 当设置的宽度超过屏幕宽度时自动宽度自适应
				var styles = node.attrs.style.split(";");
				for (var i = styles.length, item; item = styles[--i];)
					if (item.includes("width") && !item.includes('%') && parseInt(item.split(':').pop()) > screenWidth) {
						node.attrs.style += ";height:auto !important";
						break;
					}
				if (node.attrs.width && parseInt(node.attrs.width) > screenWidth)
					node.attrs.style += ";height:auto !important";
				if (node.attrs.src && !node.attrs.ignore) {
					if (bubbling(Parser)) node.attrs.i = (Parser._imgNum++).toString();
					else node.attrs.ignore = "true";
				}
				break;
			case 'a':
			case "ad":
				bubbling(Parser);
				break;
			case "font":
				if (node.attrs.color) {
					node.attrs.style = "color:" + node.attrs.color + ';' + node.attrs.style;
					node.attrs.color = undefined;
				}
				if (node.attrs.face) {
					node.attrs.style = "font-family:" + node.attrs.face + ';' + node.attrs.style;
					node.attrs.face = undefined;
				}
				if (node.attrs.size) {
					var size = parseInt(node.attrs.size);
					if (size < 1) size = 1;
					else if (size > 7) size = 7;
					var map = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];
					node.attrs.style = "font-size:" + map[size - 1] + ';' + node.attrs.style;
					node.attrs.size = undefined;
				}
				break;
			case "video":
			case "audio":
				if (node.attrs.id) Parser['_' + node.name + "Num"]++;
				else node.attrs.id = (node.name + (++Parser['_' + node.name + "Num"]));
				if (node.name == "video") {
					node.attrs.style = node.attrs.style || '';
					if (node.attrs.width) {
						node.attrs.style = "width:" + parseFloat(node.attrs.width) + (node.attrs.width.includes('%') ? '%' : "px") +
							';' + node.attrs.style;
						node.attrs.width = undefined;
					}
					if (node.attrs.height) {
						node.attrs.style = "height:" + parseFloat(node.attrs.height) + (node.attrs.height.includes('%') ? '%' : "px") +
							';' + node.attrs.style;
						node.attrs.height = undefined;
					}
					if (Parser._videoNum > 3) node.lazyLoad = true;
				}
				node.attrs.source = [];
				if (node.attrs.src) node.attrs.source.push(node.attrs.src);
				if (!node.attrs.controls && !node.attrs.autoplay)
					console.warn("存在没有controls属性的 " + node.name + " 标签，可能导致无法播放", node);
				bubbling(Parser);
				break;
			case "source":
				var parent = Parser._STACK[Parser._STACK.length - 1];
				if (parent && (parent.name == "video" || parent.name == "audio")) {
					parent.attrs.source.push(node.attrs.src);
					if (!parent.attrs.src) parent.attrs.src = node.attrs.src;
				}
				break;
		}
		if (node.attrs.style.includes("url"))
			node.attrs.style = node.attrs.style.replace(/url\s*\(['"\s]*(.*?)['"]*\)/, function($, $1) {
				if ($1 && $1[0] == '/') {
					if ($1[1] == '/') return "url(" + Parser._protocol + ':' + $1 + ')';
					else if (Parser._domain) return "url(" + Parser._domain + $1 + ')';
				}
				return $;
			})
		if (node.attrs.style.includes("rpx"))
			node.attrs.style = node.attrs.style.replace(/[0-9.]*rpx/, function($) {
				return parseFloat($) * screenWidth / 750 + "px";
			})
		if (!node.attrs.style) node.attrs.style = undefined;
		if (Parser._useAnchor && node.attrs.id) bubbling(Parser);
	},
	trustAttrs,
	trustTags,
	blockTags,
	inlineTags,
	ignoreTags,
	selfClosingTags,
	blankChar,
	userAgentStyles,
	makeMap,
	// #ifdef H5
	rpx: screenWidth / 750,
	// #endif
}
