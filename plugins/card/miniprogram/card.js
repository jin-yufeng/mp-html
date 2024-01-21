/**
 * @fileoverview card 组件
 */
Component({
  properties: {
    mode: {
      type: Boolean,
      default: false
    },
    src: String,
    title: String,
    desc: String,
    url: String,
    color: String,
    bgcolor: String,
    border: String
  },
  data: {},
  methods: {
    onClick (e) {
      if (this.properties.url && this.properties.url.trim().length > 6 && !this.properties.mode) {
        wx.navigateTo({ url: this.properties.url })
      }
    }
  }
})
