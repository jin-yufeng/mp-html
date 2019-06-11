// Parser/trees/trees.js
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
    errorEvent(e) {
      //尝试加载其他源
      if (!this.data.controls[e.currentTarget.dataset.id] && e.currentTarget.dataset.source.length > 1) {
        this.data.controls[e.currentTarget.dataset.id] = {
          play: false,
          index: 1
        }
      } else if (this.data.controls[e.currentTarget.dataset.id] && e.currentTarget.dataset.source.length > (this.data.controls[e.currentTarget.dataset.id].index + 1)) {
        this.data.controls[e.currentTarget.dataset.id].index++;
      }
      this.setData({
        controls: this.data.controls
      })
      this.triggerEvent('error', {
        target: e.currentTarget,
        message: e.detail.errMsg
      }, {
        bubbles: true,
        composed: true
      });
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