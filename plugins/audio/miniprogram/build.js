module.exports = {
  template: '<my-audio wx:if="{{n.name==\'audio\'}}" id="{{n.attrs.id}}" class="{{n.attrs.class}}" style="{{n.attrs.style}}" author="{{n.attrs.author}}" controls="{{n.attrs.controls}}" autoplay="{{n.attrs.autoplay}}" loop="{{n.attrs.loop}}" name="{{n.attrs.name}}" poster="{{n.attrs.poster}}" src="{{n.src[ctrl[i]||0]}}" data-i="{{i}}" data-source="audio" bindplay="play" binderror="mediaError" />'
}
