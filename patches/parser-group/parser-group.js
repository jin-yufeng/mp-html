/*
  parser-group 补丁包
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
*/
// 图片链接去重
function deduplicate(src) {
  if (src.substring(0, 4) != "http") return src;
  var newSrc = '';
  for (var j = 0; j < src.length; j++) {
    newSrc += Math.random() >= 0.5 ? src[j].toUpperCase() : src[j].toLowerCase();
    if (src[j] == '/' && src[j - 1] != '/' && src[j + 1] != '/') break;
  }
  newSrc += src.substring(j + 1);
  return newSrc;
}
Component({
  relations: {
    "../parser/parser": {
      type: "descendant",
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
          for (var j = 0; j < cImgList.length; j++) {
            if (!imgList.includes(cImgList[j])) imgList.push(cImgList[j]);
            else imgList.push(deduplicate(cImgList[j]));
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
          errMsg: "Label not found"
        })
    }
  }
})