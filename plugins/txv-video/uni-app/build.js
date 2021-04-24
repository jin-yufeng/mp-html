module.exports = {
  template: '<txv-video v-if="n.name==\'txv-video\'" :vid="n.attrs.vid" :playerid="n.attrs.vid" :id="n.attrs.vid" :class="n.attrs.class" :style="n.attrs.style" controls :data-i="i" @play="play" @error="mediaError" />'
}
