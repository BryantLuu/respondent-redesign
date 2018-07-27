import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(faSearch, faLightbulb)
require('./filters.js')

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
