import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import brewery from './modules/brewery'
import ui from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        brewery,
        ui,
    },
})
