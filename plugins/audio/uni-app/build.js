module.exports = {
  template: '<my-audio v-if="n.name==\'audio\'" :class="n.attrs.class" :style="n.attrs.style" :aid="n.attrs.id" :author="n.attrs.author" :controls="n.attrs.controls" :autoplay="n.attrs.autoplay" :loop="n.attrs.loop" :name="n.attrs.name" :poster="n.attrs.poster" :src="n.src[ctrl[i]||0]" :data-i="i" data-source="audio" @play="play" @error="mediaError" />'
}
