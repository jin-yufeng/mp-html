/*
 trees 递归显示组件
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 author：JinYufeng
*/
// 提交错误事件
const triggerError = function (Top, source, target, errMsg, errCode) {
  Top.triggerEvent('error', {
    source,
    target,
    errMsg,
    errCode
  });
};
// 加载其他源（音视频）
const loadSource = function (Component, currentTarget) {
  if (!Component.data.controls[currentTarget.id] && currentTarget.source.length > 1) {
    Component.data.controls[currentTarget.id] = {
      play: false,
      index: 1
    };
    Component.setData({
      controls: Component.data.controls
    });
    return true;
  }
  else if (Component.data.controls[currentTarget.id] && currentTarget.source.length > Component.data.controls[currentTarget.id].index + 1) {
    Component.data.controls[currentTarget.id].index++;
    Component.setData({
      controls: Component.data.controls
    });
    return true;
  }
  return false;
};
Component({
  attached() {
    this._top = getApp()._Parser;
    for (let item of this.data.nodes) {
      if (item.name == 'video') {
        var context = swan.createVideoContext(item.attrs.id, this);
        context.id = item.attrs.id;
        this._top.videoContexts.push(context);
      }
      if (item.attrs && item.attrs.id)
        this._top.anchors.push({
          id: item.attrs.id,
          node: this
        })
    }
  },
  properties: {
    nodes: {
      type: Array,
      value: []
    },
    controls: {
      type: Object,
      value: {}
    }
  },
  methods: {
    // 视频播放事件
    playEvent(e) {
      if (this._top.videoContexts.length > 1 && this._top.data.autopause) {
        for (let video of this._top.videoContexts) {
          if (video.id == e.currentTarget.dataset.id) continue;
          video.pause();
        }
      }
    },
    // 图片预览事件
    previewEvent(e) {
      if (!e.target.dataset.hasOwnProperty('ignore')) {
        var preview = true;
        this._top.triggerEvent('imgtap', {
          id: e.target.id,
          src: e.currentTarget.dataset.src,
          ignore: () => preview = false
        });
        if (preview && this._top.data.autopreview) {
          swan.previewImage({
            current: e.currentTarget.dataset.src,
            urls: this._top.imgList.length ? this._top.imgList : [e.currentTarget.dataset.src]
          });
        }
      }
    },
    // 链接点击事件
    tapEvent(e) {
      var jump = true;
      this._top.triggerEvent('linkpress', {
        href: e.currentTarget.dataset.href,
        ignore: () => jump = false
      });
      if (jump && e.currentTarget.dataset.href) {
        if (e.currentTarget.dataset.href[0] == "#") {
          if (this._top.data.useAnchor)
            this._top.navigateTo({
              id: e.currentTarget.dataset.href.substring(1)
            })
        }
        else if (/^http/.test(e.currentTarget.dataset.href)) {
          if (this._top.data.autocopy)
            swan.setClipboardData({
              data: e.currentTarget.dataset.href,
              success() {
                swan.showToast({
                  title: '链接已复制'
                });
              }
            });
        } else
          swan.navigateTo({
            url: e.currentTarget.dataset.href
          });
      }
    },
    // 错误事件
    adError(e) {
      triggerError(this._top, "ad", e.currentTarget, "", e.detail.errorCode);
    },
    videoError(e) {
      if (!loadSource(this, e.currentTarget.dataset) && this._top)
        triggerError(this._top, "video", e.currentTarget, e.detail.errMsg, undefined, this._top.getVideoContext(e.currentTarget.id));
    },
    audioError(e) {
      if (!loadSource(this, e.currentTarget.dataset))
        triggerError(this._top, "audio", e.currentTarget, e.detail.errMsg);
    },
    // 加载视频
    loadVideo(e) {
      this.data.controls[e.currentTarget.dataset.id] = {
        play: true,
        index: 0
      };
      this.setData({
        controls: this.data.controls
      });
    }
  }
});