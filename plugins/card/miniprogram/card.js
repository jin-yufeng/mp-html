/**
 * @fileoverview card 组件
 */
Component({
  props: {
      mode: {
          type: [Number, String],
          default: "0",
      },
      type: [Number, String],
      oid: String,
      src: String,
      title: String,
      desc: String,
      url: String,
      color: {
          type: String,
          default: "#000"
      },
      bgColor: {
          type: String,
          default: "#a4d0ff"
      },
      border: {
          type: String,
          default: "1px solid #FFF"
      }
  },
  data() {
      return {
          
      };
  },
  computed: {
      customStyle() {
          return {
              "background-color": this.bgColor,
              "border": this.border,
              "color": this.color
          }
      }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
      onClick(e) {
          // this.$emit("onClick", this.type, this.oid);
          if(this.url != null && this.url != undefined && this.url.trim().length > 6) {
              this.mode == 1 && uni.navigateTo({url: this.url})
          }
          this.$emit("click", e)
      },
  }
})
