import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import * as api from '@/api/api'

import firebase from 'firebase/app'

import './quasar'

import vueSmoothScroll from 'vue2-smooth-scroll'

Vue.config.productionTip = false

Vue.use(vueSmoothScroll)

const configOptions = {
    apiKey: 'AIzaSyAVLt18TcglgsGFV2Z0ixaZnq-jIUNtmzw',
    authDomain: 'brewthers-374c0.firebaseapp.com',
    databaseURL: 'https://brewthers-374c0.firebaseio.com',
    projectId: 'brewthers-374c0',
    storageBucket: 'brewthers-374c0.appspot.com',
    messagingSenderId: '545233478991',
    appId: '1:545233478991:web:d4b8d225cbb86efcf5513a',
    measurementId: 'G-9YG0XVM4J4',
}

firebase.initializeApp(configOptions)

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
