// Parser/trees/trees.js
// 提交错误事件
const triggerError = function(Component, source, target, errMsg, errCode) {
  Component.triggerEvent('error', {
    source,
    target,
    errMsg,
    errCode
  }, {
    bubbles: true,
    composed: true
  });
}
// 加载其他源（音视频）
const loadSource = function (Component, currentTarget) {
  if (!Component.data.controls[currentTarget.id] && currentTarget.source.length > 1) {
    Component.data.controls[currentTarget.id] = {
      play: false,
      index: 1
    }
  } else if (Component.data.controls[currentTarget.id] && currentTarget.source.length > (Component.data.controls[currentTarget.id].index + 1)) {
    Component.data.controls[currentTarget.id].index++;
  }
  Component.setData({
    controls: Component.data.controls
  })
}
Component({
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
    //冒泡事件
    playEvent(e) {
      this.triggerEvent('play', e.currentTarget.dataset.id, {
        bubbles: true,
        composed: true
      });
    },
    previewEvent(e) {
      if (!e.target.dataset.hasOwnProperty('ignore')) {
        this.triggerEvent('preview', e.currentTarget.dataset.src, {
          bubbles: true,
          composed: true
        });
      }
    },
    tapEvent(e) {
      this.triggerEvent('linkpress', e.currentTarget.dataset.href, {
        bubbles: true,
        composed: true
      });
    },
    adError(e) {
      triggerError(this, "ad", e.currentTarget, e.detail.errMsg, e.detail.errCode);
    },
    videoError(e) {
      loadSource(this,e.currentTarget.dataset);
      triggerError(this, "video", e.currentTarget, e.detail.errMsg);
    },
    audioError(e){
      loadSource(this, e.currentTarget.dataset);
      triggerError(this, "audio", e.currentTarget, e.detail.errMsg);
    },
    //内部方法：加载视频
    _loadVideo(e) {
      this.data.controls[e.currentTarget.dataset.id] = {
        play: true,
        index: 0
      }
      this.setData({
        controls: this.data.controls
      })
    },
  }
})