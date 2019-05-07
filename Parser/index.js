const html2nodes = require('./Parser.js');
var imgList = [];
Component({
  properties: {
    'html': {
      type: null,
      value: '',
      observer: function(html) {
        if (!html) {
          this.setData({
            nodes: []
          })
        } else if (typeof html == 'string') {
          var that = this;
          html2nodes(html, this.data.tagStyle).then(function(e) {
            that.triggerEvent('parse', e);
            imgList = e.imgList;
            if (e.title) {
              wx.setNavigationBarTitle({
                title: e.title
              })
            }
            that.setData({
              nodes: e.nodes
            })
          });
        } else if (html.constructor == Array) {
          imgList = [];
          this.setData({
            nodes: html
          })
        } else if (typeof html == 'object') {
          imgList = html.imgList;
          if (html.title) {
            wx.setNavigationBarTitle({
              title: html.title
            })
          }
          this.setData({
            nodes: html.nodes
          })
        }
      }
    },
    'scroll': {
      type: Boolean,
      value: true
    },
    'selectable': {
      type: Boolean,
      value: true
    },
    'tagStyle': {
      type: Object,
      value: {}
    },
  },
  methods: {
    tapevent(e) {
      this.triggerEvent('linkpress', e.currentTarget.dataset.href)
    },
    copyhref(e) {
      if (this.data.selectable) {
        wx.setClipboardData({
          data: e.currentTarget.dataset.href,
          success: function(res) {
            wx.showToast({
              title: '内容已复制',
            })
          }
        })
      }
    },
    previewImg(e) {
      if (!e.target.dataset.hasOwnProperty('ignore')) {
        wx.previewImage({
          current: e.target.dataset.src,
          urls: imgList.length ? imgList : [e.target.dataset.src],
        })
      }
    }
  }
})