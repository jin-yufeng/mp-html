String.prototype.splice = function(start = 0, deleteCount = 0, addStr = '') {
  if (start < 0) start = this.length + start;
  if (deleteCount < 0) deleteCount = 0;
  return this.substring(0, start) + addStr + this.substring(start + deleteCount);
}
const SDKVersion = wx.getSystemInfoSync().SDKVersion;
module.exports = {
  versionHigherThan(version = '') {
    var v1 = SDKVersion.split('.');
    var v2 = version.split('.');
    const len = Math.max(v1.length, v2.length);
    while (v1.length < len) {
      v1.push('0');
    }
    while (v2.length < len) {
      v2.push('0');
    }
    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i]);
      const num2 = parseInt(v2[i]);
      if (num1 > num2) {
        return true;
      } else if (num1 < num2) {
        return false;
      }
    }
    return true;
  },
  html2nodes(html, tagStyle) {
    const Parser = require('./Parser.js');
    return Parser(html, tagStyle);
  },
  css2object(style, tagStyle) {
    const CssTokenizer = require('./CssTokenizer.js');
    return new CssTokenizer(style, tagStyle).parse();
  }
}