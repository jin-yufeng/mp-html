module.exports = {
  template: `<txv-video wx:if="{{n.name=='txv-video'}}" vid="{{n.attrs.id}}" playerid="{{n.attrs.id}}" id="{{n.attrs.id}}" class="{{n.attrs.class}}" style="{{n.attrs.style}}" controls data-i="{{i}}" bindplay="play" binderror="mediaError" />`,
  usingComponents: {
    "txv-video": "plugin://tencentvideo/video"
  }
}