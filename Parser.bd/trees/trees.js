// Parser/trees/trees.js
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
    } else if (Component.data.controls[currentTarget.id] && currentTarget.source.length > Component.data.controls[currentTarget.id].index + 1) {
        Component.data.controls[currentTarget.id].index++;
    }
    Component.setData({
        controls: Component.data.controls
    });
};
Component({
    attached() {
        this._top = getApp()._Parser;
        for (let item of this.data.nodes) {
            if (item.name == 'video') {
                this._top.videoContext.push({
                    id: item.attrs.id,
                    context: swan.createVideoContext(item.attrs.id, this)
                });
            }
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
        playEvent(e) {
            if (this._top.videoContext.length > 1 && this._top.data.autopause) {
                for (let video of this._top.videoContext) {
                    if (video.id == e.currentTarget.dataset.id) continue;
                    video.context.pause();
                }
            }
        },
        previewEvent(e) {
            if (!e.target.dataset.hasOwnProperty('ignore')) {
                if (this._top.data.autopreview) {
                    swan.previewImage({
                        current: e.currentTarget.dataset.src,
                        urls: this._top.imgList.length ? this._top.imgList : [e.currentTarget.dataset.src]
                    });
                }
                this._top.triggerEvent('imgtap', { src: e.currentTarget.dataset.src });
            }
        },
        tapEvent(e) {
            if (this._top.data.autocopy && e.currentTarget.dataset.href && /^http/.test(e.currentTarget.dataset.href)) {
                swan.setClipboardData({
                    data: e.currentTarget.dataset.href,
                    success() {
                        swan.showToast({
                            title: '链接已复制'
                        });
                    }
                });
            }
            this._top.triggerEvent('linkpress', { href: e.currentTarget.dataset.href });
        },
        adError(e) {
            console.log(e);
            triggerError(this._top, "ad", e.currentTarget, "", e.detail.errorCode);
        },
        videoError(e) {
            loadSource(this, e.currentTarget.dataset);
            triggerError(this._top, "video", e.currentTarget, e.detail.errMsg);
        },
        audioError(e) {
            loadSource(this, e.currentTarget.dataset);
            triggerError(this._top, "audio", e.currentTarget, e.detail.errMsg);
        },
        //内部方法：加载视频
        _loadVideo(e) {
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