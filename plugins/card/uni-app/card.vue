<template>
    <view class="card" @click="onClick" :style="customStyle" :data-i="$attrs['data-i']">
        <image class="card-img" mode="aspectFill" :src="src" />
        <view class="text-wrap text-wrap-width" v-if="!!desc">
            <view class="title one-t">{{title}}</view>
            <view class="desc one-t">{{desc}}</view>
        </view>
        <view v-else class="text-wrap-width title more-t">{{title}}</view>
        <image class="card-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAABCFBMVEUAAAC/v7+qqqqZmZmLi6KJnZ2ImZmHlpaGlKGMjJmSkp6Li5eQkJuKlZ+Pj5mOjpeJkpuNjZ6IkJmHj5eLi5uKkpmGjZqJj5uLi5eIjpmIjZiKj5qKj5mJjpiHjJqJjZaGj5iKj5eIjJmKjpqHi5eGjZeIi5eHjZiIi5eHjJiIjpaHjJeIjZiGjJeIjZiGjJaGjJeIi5aGjJeHi5eHi5aHjJeHjJaHjJeGi5eHjJaHjJeGi5aGi5aHjJeHjJaGjJeGjJeHjJaHi5eGi5eHjJaHjJeGjJaGjJeHi5aHjJeHjJeHi5aGjJeHi5aGjJaHi5eGjJaHi5eHjJaGi5eGi5aHjJeGi5aGi5apAvjmAAAAV3RSTlMABAYKCw0PERMUFRYXGBkbHB0eICEjJiksLS8wMjQ1ODk7PD9ATFZXWFlaW1xdXl+Hi6msu7/Dx8vMzs/R0tTV19na3N3f4uTn6evs7e7v8PHy9PX7/P18cCTXAAABEklEQVRo3u2YWU5CQRQFn4qCM4LzhIoDAorzrIgCigiCimf/O/Gj3UIlmJxaQFXSea/T90aRMcYYY4zpG0ZPu9cZMnAi6SsLBjqS9LnJBcqSpC53Sjs/kqSPNaxwGAqtFbrQXKILjQW68DpPF17m6EI9TRdqM3TheZouVCbpQnkcK5RC4T5BF27jdOFqhC5cDtOFixhdOB+iC2cDdOEoggttLrDbk6QW5/+WJB1T/r1e+FAHWT/2q/35scsiF/w3cdZ/R13Y+8H/MMb6Hycgfz74n6ZYfzXJ+mspyF8I/vos68cep0X4eV2EB4SD4H9bZP3vy+yTtL3KjrGddXgQ34BXCVvwMmT7P69zjDHGGGP6gF83lHISOctsKQAAAABJRU5ErkJggg=="></image>
    </view>
</template>

<script>
    // import context from './context';
    export default {
        props: {
            mode: [Number, String],
            type: [Number, String],
            oid: String,
            src: String,
            title: String,
            desc: String,
            url: String,
            color: String,
            bgColor: String
        },
        data() {
            return {
                
            };
        },
        computed: {
            customStyle() {
                return {
                    "background-color": this.bgColor,
                    "color": this.color
                } 
            }
        },
        mounted() {
            // console.log("this.oid: ", this.oid);
            // context.set(this.oid, this)
            
        },
        beforeDestroy() {
            // context.remove(this.oid)
        },
        methods: {
            onClick(e) {
                // this.$emit("onClick", this.type, this.oid);
                if(this.url != null && this.url != undefined && this.url.trim().length > 6) {
                    this.mode == 1 && uni.navigateTo({url: this.url})
                }
                this.$emit("onClick", e)
            },
        }
    }
</script>

<style lang="scss">
    .one-t {
    	overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    	transition: all linear 0.2s;
    }
    
    .more-t {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break:break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        transition: all linear 0.2s;
    }
    
    .card {
        
        width: 80%;
        margin: 10rpx auto;
        max-width: 700rpx;
        max-height: 140rpx;
        
        box-sizing: border-box;
        overflow: hidden;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        padding: 20rpx 0 20rpx 10rpx;
        border-radius: 12rpx;
        
        // color: #323233;
        @include _border(cal-main-color);
        @include _color(cal-reverse-color);
        // background-color: #fff;
        @include _background_color("cal-theme-light-color");
        @include _border_bottom_color("cal-theme-color");
        
        &-img {
            width: 96rpx;
            height: 96rpx;
            border-radius: 12rpx;
            flex: 0 0 96rpx;
        }
        
        &-icon {
            width: 30rpx;
            height: 96rpx;
        }
        
        .text-wrap {
            
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            
            &-width {
                width: 72%;
            }
        }
        
        .title {
            font-weight: bold;
            font-size: 34rpx;
            line-height: 48rpx;
        }
        
        .desc {
            font-size: 27rpx;
            line-height: 37rpx;
        }
    }
</style>