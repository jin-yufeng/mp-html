/**
 * @fileoverview card 组件
 */
Component({
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
  },
  beforeDestroy() {
  },
  methods: {
      onClick(e) {
          // this.$emit("onClick", this.type, this.oid);
          this.mode == 1 && uni.navigateTo({url: this.url})
          this.$emit("click", e)
      },
  }
})
