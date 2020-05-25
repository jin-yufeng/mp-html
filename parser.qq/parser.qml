<!--parser 主组件-->
<slot qq:if="{{!html[0].name&&!html[0].type}}" />
<trees class="top" style="{{selectable?'user-select:text;-webkit-user-select:text;':''}}{{showAm}}" lazyLoad="{{lazyLoad}}" loading="{{loadingImg}}" nodes="{{html[0].name||html[0].type?html:[]}}" />