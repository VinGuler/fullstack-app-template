import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Socket
import VueSocketIO from 'vue-socket.io'
const options = { withCredentials: true }
const socket = new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  options,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
})
Vue.use(socket)

import { upper } from './filters'
Vue.filter('upper', upper)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: function(h) {
    return h(App)
  }
}).$mount('#app')
