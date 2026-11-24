// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import VModal from 'vue-js-modal'
import VueAwesomeCountdown from 'vue-awesome-countdown'

import App from './App'
import router from './router'
import { detectLang, saveLang, allMessages } from './i18n'

import 'semantic-css'
import 'semantic'

Vue.config.productionTip = true
Vue.use(VueResource)
Vue.use(VueI18n)
Vue.use(VModal, {
  dialog: true
})

Vue.use(VueAwesomeCountdown, 'vac')

// get browser lang and init locales
var messages = {}
var userLang = navigator.language || navigator.userLanguage;
userLang = userLang.replace('-', '_').split('_')[0];

// Nexwall: pt-BR default, es/en selectable (see ./i18n/index.js)
userLang = detectLang()
messages = allMessages()
saveLang(userLang)

// configure i18n
var i18n = new VueI18n({
  locale: userLang,
  fallbackLocale: 'pt',
  messages,
})

// init Vue app
new Vue({
  el: '#app',
  router,
  i18n,
  components: {
    App
  },
  template: '<App/>',
  hotspot: {
    digest: '',
    uuid: '',
    sessionid: '',
    uamip: '',
    uamport: '',
    onError: false,
    preferences: {},
    socials: {},
    voucherValidated: false
  }
})
