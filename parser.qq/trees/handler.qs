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
module.exports = {
  // 获取图片大小
  load: function (e) {
    if (e.target.dataset.auto)
      e.instance.setStyle({
        width: e.detail.width + 'px'
      })
  },
  // 链接点击态
  visited: function (e, owner) {
    if (!e.instance.hasClass('_visited'))
      e.instance.addClass('_visited')
    owner.callMethod('linkpress', e);
  },
  // 是否通过 rich-text 显示
  useRichText: function (item) {
    return !item.c && !inlineTags[item.name] && (item.attrs.style || '').indexOf('display:inline') == -1
  }
}