//Parser组件
var Document;
try {
    Document = require("./document.js");
} catch (e) { }
const html2nodes = require('./Parser.js');
const initData = function (Component) {
    setTimeout(() => {
        Component.createSelectorQuery().select('#contain' + Component.id).boundingClientRect(res => {
            Component.triggerEvent('ready', res);
        }).exec();
    }, 50);
};
Component({
    attached() {
        getApp()._Parser = this;
    },
    properties: {
        'html': {
            type: null,
            value: '',
            observer: function (html) {
                let hideAnimation = {},
                    showAnimation = {};
                if (this.data.showWithAnimation) {
                    hideAnimation = swan.createAnimation({
                        duration: this.data.animationDuration,
                        timingFunction: "ease"
                    }).opacity(0).step().export();
                    showAnimation = swan.createAnimation({
                        duration: this.data.animationDuration,
                        timingFunction: "ease"
                    }).opacity(1).step().export();
                }
                if (!html) {
                    this.setData({
                        nodes: []
                    });
                } else if (typeof html == 'string') {
                    html2nodes(html, this.data.tagStyle, this.data.imgMode).then(res => {
                        this.setData({
                            nodes: res.nodes,
                            controls: {},
                            showAnimation,
                            hideAnimation
                        }, initData(this));
                        if (Document) this.document = new Document("nodes", res.nodes, this);
                        this.videoContext = [];
                        if (res.title && this.data.autosetTitle) {
                            swan.setNavigationBarTitle({
                                title: res.title
                            });
                        }
                        this.imgList = res.imgList;
                        this.triggerEvent('parse', res);
                    }).catch(err => {
                        this.triggerEvent('error', {
                            source: "parse",
                            errMsg: err
                        });
                    });
                } else if (html.constructor == Array) {
                    this.setData({
                        controls: {},
                        showAnimation,
                        hideAnimation
                    }, initData(this));
                    if (Document) this.document = new Document("html", html, this);
                    this.videoContext = [];
                    this.imgList = [];
                } else if (typeof html == 'object') {
                    if (!html.nodes || html.nodes.constructor != Array) {
                        if (html.name && html.children && html.attrs || html.type == "text") return;
                        this.triggerEvent('error', {
                            source: "parse",
                            errMsg: "传入的nodes数组格式不正确！应该传入的类型是array，实际传入的类型是：" + typeof html.nodes
                        });
                        return;
                    }
                    this.setData({
                        controls: {},
                        showAnimation,
                        hideAnimation
                    }, initData(this));
                    if (Document) this.document = new Document("html.nodes", html.nodes, this);
                    this.videoContext = [];
                    if (html.title && this.data.autosetTitle) swan.setNavigationBarTitle({
                        title: html.title
                    });
                    this.imgList = html.imgList || [];
                } else {
                    this.triggerEvent('error', {
                        source: "parse",
                        errMsg: "错误的html类型：" + typeof html
                    });
                }
            }
        },
        'autocopy': {
            type: Boolean,
            value: true
        },
        'autopause': {
            type: Boolean,
            value: true
        },
        'autopreview': {
            type: Boolean,
            value: true
        },
        'autosetTitle': {
            type: Boolean,
            value: true
        },
        'imgMode': {
            type: String,
            value: "default"
        },
        'selectable': {
            type: Boolean,
            value: false
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
    }
});