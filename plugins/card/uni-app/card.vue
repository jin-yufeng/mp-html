<template>
    <view class="card" @click="onClick" :style="[customStyle]" :data-i="$attrs['data-i']">
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
    export default {
        props: {
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
        data () {
            return {
                
            }
        },
        computed: {
            customStyle () {
                return {
                    'background-color': this.bgColor || '#a4d0ff',
                    border: this.border || '1px solid #FFF',
                    color: this.color || '#000'
                } 
            }
        },
        methods: {
            onClick (e) {
              if (this.url && this.url.trim().length > 6 && !this.mode) {
                  uni.navigateTo({ url: this.url })
              }
              this.$emit('click', e)
            }
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