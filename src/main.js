// 外部套件要先放前面
import Vue from 'vue'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// jquery
import $ from 'jquery'
// 這一行是關鍵，若不這樣寫是無法在全域下使用

// vee-validate
import { ValidationObserver, ValidationProvider, configure, extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zhTW from 'vee-validate/dist/locale/zh_TW.json' // 語系檔案

// bootstrap
import 'bootstrap'

// Loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import App from './App.vue'
import router from './router'

import moneyFilter from './filters/money'

// jquery 全域注冊
window.$ = $
// 在使用 jq 的頁面加上： /* global $ */
// 解決 Eslint 的錯誤

// 套件加入到 Vue 的藍圖內 (原型內)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

// filter
Vue.filter('money', moneyFilter)

// 元件，全域注冊
Vue.use(Loading)
Vue.component('Loading', Loading)

// vee-validate
// install rules and localization
// 所有驗證規則
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
// Class 設定檔案
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
localize('tw', zhTW)
// Install components globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// event bus
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
