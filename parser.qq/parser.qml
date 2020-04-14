<!--parser 主组件-->
<slot qq:if="{{!html[0].name&&!html[0].type}}" />
<trees class="top" style="{{selectable?'user-select:text;-webkit-user-select:text;':''}}{{showAm}}" animation="{{scaleAm}}" lazy-load="{{lazyLoad}}" nodes="{{html[0].name||html[0].type?html:[]}}" bindtap="_tap" bindtouchstart="_touchstart" bindtouchmove="_touchmove" />
<image qq:for="{{imgs}}" qq:key="index" id="{{index}}" src="{{item}}" hidden bindload="_load" />