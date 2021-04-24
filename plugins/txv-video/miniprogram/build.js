module.exports = {
  template: '<txv-video wx:if="{{n.name==\'txv-video\'}}" vid="{{n.attrs.vid}}" playerid="{{n.attrs.vid}}" id="{{n.attrs.vid}}" class="{{n.attrs.class}}" style="{{n.attrs.style}}" controls data-i="{{i}}" bindplay="play" binderror="mediaError" />',
  usingComponents: {
    'txv-video': 'plugin://tencentvideo/video'
  }
}
