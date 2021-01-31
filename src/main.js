import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
//Librerias del proyecto
import * as api from '@/api/api'
import LoadingAlert from '@/components/general/LoadingAlert'
import BrewthersAlert from '@/components/general/Alert'
import Confirm from '@/components/general/Confirm'
//Librerias extras
import './quasar'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

import vueSmoothScroll from 'vue2-smooth-scroll'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.config.productionTip = false

Vue.component('brewthers-alert', BrewthersAlert)
Vue.component('loading-alert', LoadingAlert)
Vue.component('confirm-dialog', Confirm)

Vue.use(vueSmoothScroll)

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyARu8fqFprNvVeM2d4I8zy3outjv3G92ko',
        libraries: 'places', // necessary for places input
    },
})

let configOptions = {
    apiKey: 'AIzaSyCrNwUC-Qae_iVNrkKHxPkQtmhFszGsnv8',
    authDomain: 'brewthers-91a52.firebaseapp.com',
    databaseURL: 'https://brewthers-91a52.firebaseio.com',
    projectId: 'brewthers-91a52',
    storageBucket: 'brewthers-91a52.appspot.com',
    messagingSenderId: '802948873878',
    appId: '1:802948873878:web:5410f25803629ded258cb7',
    measurementId: 'G-FSTF3WL646',
}
firebase.initializeApp(configOptions)

if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'testing'
) {
    firebase.auth().useEmulator('http://localhost:9099/')
    firebase.firestore().useEmulator('localhost', 8081)
}

firebase.analytics()
firebase.auth().onAuthStateChanged(user => {
    // store.dispatch('fetchUser', user)
    if (user && store.getters.user === '') {
        store.dispatch('setCurrentUser', user)
        api.getuserinformationbyid({uid: user.uid}).then(response => {
            store.commit('SET_USER', response.data.data)
        })
    }
})

new Vue({
    router,
    store,
    render: function(h) {
        return h(App)
    },
}).$mount('#app')
