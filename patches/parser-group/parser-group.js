/*
  parser-group 补丁包
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
*/
Component({
  relations: {
    '../parser/parser': {
      type: 'descendant',
      linked(target) {
        target.i = this.groups.length;
        this.groups.push(target);
        target.group = this;
      },
      unlinked(target) {
        this.groups[target.i] = undefined;
      }
    }
  },
  created() {
    this.groups = [];
  },
  methods: {
    // 图片预览
    preview(comI, imgI) {
      var imgList = [],
        index = 0;
      for (var i = 0; i < this.groups.length; i++) {
        if (this.groups[i]) {
          var cImgList = this.groups[i].imgList;
          for (var j = 0, src; src = cImgList[j]; j++) {
            if (!imgList.includes(src) || src.substring(0, 4) != 'http') imgList.push(src);
            else {
				var newSrc = '';
				for (var k = 0; k < src.length; k++) {
					newSrc += Math.random() >= 0.5 ? src[k].toUpperCase() : src[k].toLowerCase();
					if (src[k] == '/' && src[k - 1] != '/' && src[k + 1] != '/') break;
				}
				newSrc += src.substring(k + 1);
				imgList.push(newSrc);
			}
          }
          if (i < comI)
            index += cImgList.length;
        }
      }
      index += parseInt(imgI);
      wx.previewImage({
        current: imgList[index],
        urls: imgList,
      })
    },
    // 暂停播放其他视频
    pause(comI) {
      for (var i = 0; i < this.groups.length; i++) {
        if (i != comI && this.groups[i] && this.groups[i].data.autopause)
          for (var j = this.groups[i].videoContexts.length; j--;)
            this.groups[i].videoContexts[j].pause();
      }
    },
    // 锚点跳转
    navigateTo(comI, obj) {
      var i = 0;
      const navigate = () => {
        if (i < this.groups.length) {
          if (i == comI || !this.groups[i]) navigate(++i);
          this.groups[i].navigateTo({
            id: obj.id,
            success: obj.success,
            fail() {
              navigate(++i);
            }
          })
        }
      };
      navigate();
      if (i == this.groups.length)
        obj.fail && obj.fail({
          errMsg: 'Label not found'
        })
    }
  }
})