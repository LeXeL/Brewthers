import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
//Librerias del proyecto
import * as api from '@/api/api'
import LoadingAlert from '@/components/general/LoadingAlert'
import BrewthersAlert from '@/components/general/Alert'
//Librerias extras
import './quasar'
import firebase from 'firebase/app'
import vueSmoothScroll from 'vue2-smooth-scroll'
import * as VueGoogleMaps from 'vue2-google-maps'

<<<<<<< HEAD
import BrewthersAlert from '@/components/general/Alert'

Vue.component('brewthers-alert', BrewthersAlert)
import LoadingAlert from '@/components/general/LoadingAlert'

=======
>>>>>>> Alert component and display handling
Vue.config.productionTip = false

Vue.component('brewthers-alert', BrewthersAlert)
Vue.component('loading-alert', LoadingAlert)

Vue.use(vueSmoothScroll)

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBQ9QbePVZeAjzIlUSyaT7fMUJZNLMFtwA',
        libraries: 'places', // necessary for places input
    },
})

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
