const html2nodes = require('./Parser.js');
Component({
  externalClasses: ['html-class'],
  properties: {
    'html': {
      type: null,
      value: '',
      observer: function(html) {
        if (!html) {
          this.setData({
            nodes: [],
            videoControl: {}
          })
        } else if (typeof html == 'string') {
          var that = this;
          html2nodes(html, this.data.tagStyle).then(function(e) {
            that.setData({
              nodes: e.nodes,
              videoControl: {}
            },function(){
              that.imgList = e.imgList;
              that.videoNum = e.videoNum;
              if (e.videoNum > 1) {
                for (var i = 1; i <= e.videoNum; i++) {
                  that['video' + i] = wx.createVideoContext('video' + i, that);
                }
              }
            })
            if (e.title) {
              wx.setNavigationBarTitle({
                title: e.title
              })
            }
            that.triggerEvent('parse', e);
          });
        } else if (html.constructor == Array) {
          this.setData({
            nodes: html,
            videoControl: {}
          })
          this.imgList = [];
          this.videoNum = 0;
        } else if (typeof html == 'object') {
          var that=this;
          this.setData({
            nodes: html.nodes,
            videoControl: {}
          }, function () {
            that.imgList = html.imgList;
            that.videoNum = html.videoNum ? html.videoNum : 0;
            if (that.videoNum > 1) {
              for (var i = 1; i <= that.videoNum; i++) {
                that['video' + i] = wx.createVideoContext('video' + i, that);
              }
            }
          })
          if (html.title) {
            wx.setNavigationBarTitle({
              title: html.title
            })
          }
        }
      }
    },
    'autopause': {
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
    _loadVideo(e) {
      this.data.videoControl[e.currentTarget.dataset.id] = true;
      this.setData({
        videoControl: this.data.videoControl
      })
    },
    _playVideo(e) {
      if (this.videoNum > 1 && this.data.autopause) {
        for (var i = 1; i <= this.videoNum; i++) {
          var id = 'video' + i;
          if (id == e.currentTarget.dataset.id) continue;
          this[id].pause();
        }
      }
    },
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
          urls: this.imgList.length ? this.imgList : [e.target.dataset.src],
        })
      }
    }
  }
})