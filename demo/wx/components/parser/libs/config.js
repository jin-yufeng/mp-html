/* 配置文件 */
const canIUse = wx.canIUse('editor'); // 高基础库标识，用于兼容
const Prism = require('./prism.js');
module.exports = {
  // 出错占位图
  errorImg: 'https://6874-html-foe72-1259071903.tcb.qcloud.la/error.jpg?sign=c224195f83974f1403f3e03aedc21149&t=1590221293',
  // 过滤器函数
  filter(node, cxt) {
    if (node.name == 'pre')
      cxt.bubble(); // 使得 pre 不被 rich-text 包含（为实现长按复制）
  },
  // 代码高亮函数
  highlight(content, attrs) {
    var info = content.match(/<code.*?language-([a-z-]+).*?>([\s\S]+)<\/code.*?>/m);
    if (!info) return content;
    var lan = info[1];
    content = info[2].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    attrs['data-content'] = content; // 记录原始内容，长按复制时使用
    switch (lan) {
      case 'js':
      case 'javascript':
        content = Prism.highlight(content, Prism.languages.javascript, 'javascript');
        break;
      case 'html':
      case 'html-editor':
      case 'wxml':
      case 'vue':
        content = Prism.highlight(content, Prism.languages.html, 'html');
        break;
      case 'json':
        content = Prism.highlight(content, Prism.languages.json, 'json');
        break;
      case 'md':
      case 'md-editor':
      case 'markdown':
        content = Prism.highlight(content, Prism.languages.markdown, 'markdown');
        break;
      case 'c':
      case 'cpp':
        content = Prism.highlight(content, Prism.languages.clike, 'clike');
    }
    // 增加语言显示
    if (!lan.includes('editor'))
      content = `<span style="position:absolute;top:3px;right:8px;font-size:.6rem;color:#808080;font-weight:bold">${lan}</span><div style='overflow:auto;max-width:100%;padding-bottom:1em'>${content}</div>`;
    return content;
  },
  // 文本处理函数
  onText: null,
  // 实体编码列表
  entities: {
    quot: '"',
    apos: "'",
    semi: ';',
    nbsp: '\xA0',
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…'
  },
  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  boolAttrs: makeMap('autoplay,autostart,controls,ignore,loop,muted'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,section' + (canIUse ? '' : ',pre')),
  // 将被移除的标签
  ignoreTags: makeMap('area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr' + (canIUse ? ',rp' : '')),
  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend,table' + (canIUse ? ',bdi,bdo,rt,ruby' : '')),
  // 自闭合的标签
  selfClosingTags: makeMap('area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),
  // 信任的标签
  trustTags: makeMap('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video' + (canIUse ? ',bdi,bdo,caption,pre,rt,ruby' : '')),
  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline'
  }
}

function makeMap(str) {
  var map = Object.create(null),
    list = str.split(',');
  for (var i = list.length; i--;)
    map[list[i]] = true;
  return map;
}