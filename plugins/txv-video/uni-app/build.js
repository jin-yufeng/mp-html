module.exports = {
  template: `<txv-video v-if="n.name=='txv-video'" :vid="n.attrs.id" :playerid="n.attrs.id" :id="n.attrs.id" :class="n.attrs.class" :style="n.attrs.style" controls :data-i="i" @play="play" @error="mediaError" />`
}