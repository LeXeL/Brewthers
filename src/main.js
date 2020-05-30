import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'

import vueSmoothScroll from 'vue2-smooth-scroll'

Vue.config.productionTip = false

Vue.use(vueSmoothScroll)

new Vue({
    router,
    store,
    render: function(h) {
        return h(App)
    },
}).$mount('#app')
