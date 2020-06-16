<!--parser 主组件-->
<slot qq:if="{{!nodes.length}}" />
<trees class="top" style="{{selectable?'user-select:text;-webkit-user-select:text;':''}}{{showAm}}" lazyLoad="{{lazyLoad}}" loading="{{loadingImg}}" nodes="{{nodes}}" />