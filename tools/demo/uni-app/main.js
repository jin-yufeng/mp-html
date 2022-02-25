import App from './App'

// #ifndef VUE3
import Vue from 'vue' // eslint-disable-line
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue' // eslint-disable-line
export function createApp () {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
