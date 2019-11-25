import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import i18n from './lang/index' 
Vue.prototype._i18n = i18n
const app = new Vue({
    i18n,
		...App
})
app.$mount()
