<!--trees 递归子组件-->
<qs module="handler" src="./handler.qs" />
<block qq:for="{{nodes}}" qq:key="index" qq:for-item="n">
  <rich-text qq:if="{{n.en||n.svg||n.err}}" class="_svg" nodes="{{[n]}}" />
  <!--图片-->
  <image qq:elif="{{n.name=='img'}}" class="_img" style="{{n.attrs.style}}" src="{{n.attrs.src}}" lazy-load="{{lazyLoad}}" mode="{{n.mode||'widthFix'}}" data-attrs="{{n.attrs}}" data-i="{{index}}" data-auto="{{n.auto}}" data-source="img" bindtap="imgtap" bindload="{{handler.load}}" binderror="error" />
  <!--文本-->
  <text qq:elif="{{n.type=='text'}}" decode>{{n.text}}</text>
  <text qq:elif="{{n.name=='br'}}">\n</text>
  <!--链接-->
  <view qq:elif="{{n.name=='a'}}" class="_a {{n.attrs.class}}" hover-class="_hover" style="{{n.attrs.style}}" data-attrs="{{n.attrs}}" bindtap="{{handler.visited}}">
    <trees nodes="{{n.children}}" />
  </view>
  <!--视频-->
  <block qq:elif="{{n.name=='video'}}">
    <view qq:if="{{n.lazyLoad}}" id="{{n.attrs.id}}" class="_video {{n.attrs.class}}" style="{{n.attrs.style}}" data-i="{{index}}" bindtap="loadVideo" />
    <video qq:else id="{{n.attrs.id}}" class="{{n.attrs.class}}" style="{{n.attrs.style}}" autoplay="{{n.attrs.autoplay}}" controls="{{n.attrs.controls}}" loop="{{n.attrs.loop}}" muted="{{n.attrs.muted}}" poster="{{n.attrs.poster}}" src="{{n.attrs.source[n.i||0]}}" unit-id="{{n.attrs['unit-id']}}" data-i="{{index}}" data-source="video" binderror="error" bindplay="play" />
  </block>
  <!--音频-->
  <audio qq:elif="{{n.name=='audio'}}" id="{{n.attrs.id}}" class="{{n.attrs.class}}" style="{{n.attrs.style}}" author="{{n.attrs.author}}" autoplay="{{n.attrs.autoplay}}" controls="{{n.attrs.controls}}" loop="{{n.attrs.loop}}" name="{{n.attrs.name}}" poster="{{n.attrs.poster}}" src="{{n.attrs.source[n.i||0]}}" data-i="{{index}}" data-source="audio" binderror="error" bindplay="play" />
  <!--广告-->
  <ad qq:elif="{{n.name=='ad'}}" class="{{n.attrs.class}}" style="{{n.attrs.style}}" unit-id="{{n.attrs['unit-id']}}" data-source="ad" binderror="error" />
  <!--列表-->
  <view qq:elif="{{n.name=='li'}}" class="{{n.attrs.class}}" style="{{n.attrs.style}};display:flex">
    <view qq:if="{{n.type=='ol'}}" class="_ol-bef">{{n.num}}</view>
    <view qq:else class="_ul-bef">
      <view qq:if="{{n.floor%3==0}}" class="_ul-p1">█</view>
      <view qq:elif="{{n.floor%3==2}}" class="_ul-p2" />
      <view qq:else class="_ul-p1" style="border-radius:50%">█</view>
    </view>
    <trees class="_node _li" lazy-load="{{lazyLoad}}" nodes="{{n.children}}" />
  </view>
  <!--富文本-->
  <rich-text qq:elif="{{handler.useRichText(n)}}" id="{{n.attrs.id}}" class="_p __{{n.name}}" nodes="{{[n]}}" />
  <!--继续递归-->
  <trees qq:else id="{{n.attrs.id}}" class="_node _{{n.name}} {{n.attrs.class}}" style="{{n.attrs.style}}" lazy-load="{{lazyLoad}}" nodes="{{n.children}}" />
</block>