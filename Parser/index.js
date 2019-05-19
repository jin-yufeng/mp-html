const html2nodes = require('./Parser.js');
Component({
  externalClasses: ['html-class'],
  properties: {
    'html': {
      type: null,
      value: '',
      observer: function(html) {
        var showAnimation = wx.createAnimation({
          duration: this.data["animationDuration"],
          timingFunction:"ease"
        });
        var hideAnimation = wx.createAnimation({
          duration: this.data["animationDuration"],
          timingFunction: "ease"
        });
        if (this.data["showWithAnimation"]) {
          hideAnimation.opacity(0).step();
          showAnimation.opacity(1).step();
        }
        var that=this;
        if (!html) {
          this.setData({
            nodes: [],
            videoControl: {}
          })
        } else if (typeof html == 'string') {
          html2nodes(html, this.data.tagStyle).then(res => {
            that.setData({
              nodes: res.nodes,
              showAnimation: showAnimation.export(),
              hideAnimation: hideAnimation.export(),
              videoControl: {}
            },function(){
              that.imgList = res.imgList;
              that.videoNum = res.videoNum;
              if (res.videoNum > 1) {
                for (var i = 1; i <= res.videoNum; i++) {
                  that['video' + i] = wx.createVideoContext('video' + i, that);
                }
              }
              that.triggerEvent('ready', 'ok');
            })
            if (res.title) {
              wx.setNavigationBarTitle({
                title: res.title
              })
            }
            that.triggerEvent('parse', res);
          }).catch(err => {
            that.triggerEvent('error', err);
          })
        } else if (html.constructor == Array) {
          this.setData({
            nodes: html,
            showAnimation: showAnimation.export(),
            hideAnimation: hideAnimation.export(),
            videoControl: {}
          },function(){
            that.triggerEvent('ready', 'ok');
          })
          this.imgList = [];
          this.videoNum = 0;
        } else if (typeof html == 'object') {
          var that=this;
          this.setData({
            nodes: html.nodes,
            showAnimation: showAnimation.export(),
            hideAnimation: hideAnimation.export(),
            videoControl: {}
          }, function () {
            that.imgList = html.imgList;
            that.videoNum = html.videoNum ? html.videoNum : 0;
            if (that.videoNum > 1) {
              for (var i = 1; i <= that.videoNum; i++) {
                that['video' + i] = wx.createVideoContext('video' + i, that);
              }
            }
            that.triggerEvent('ready', 'ok');
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
    'htmlStyle': {
      type: String,
      value: ''
    },
    'tagStyle': {
      type: Object,
      value: {}
    },
    'showWithAnimation': {
      type: Boolean,
      value: false
    },
    'animationDuration': {
      type: Number,
      value: 400
    }
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
    error(e) {
      this.triggerEvent('error', e);
    }, 
    tapevent(e) {
      this.triggerEvent('linkpress', e.currentTarget.dataset.href);
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