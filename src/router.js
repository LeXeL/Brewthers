import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
//Layouts
import HomePage from './layouts/HomePage.vue'
import LoginPage from './layouts/LoginPage.vue'
import AdminPage from './layouts/AdminPage.vue'
import MovingBeerPage from './layouts/MovingBeerPage.vue'
//Views
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login/Login.vue'
import CreateAccount from './views/Login/CreateAccount.vue'
import ResetPassword from './views/Login/ResetPassword.vue'
import MovingBeerIndex from './views/movingbeer/MovingBeerIndex.vue'
import MovingBeerCheckout from './views/movingbeer/MovingBeerCheckout.vue'
import MovingBeerAccount from './views/movingbeer/MovingBeerAccount.vue'
import MovingBeerHistory from './views/movingbeer/MovingBeerHistory.vue'

import AdminIndex from './views/admin/Index'
import AccountsManager from './views/admin/AccountsManager'
import AccountDetails from './views/admin/AccountDetails'

import {Store} from 'vuex'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
    } else next('/login')
}
const ifAuthenticatedAndAdmin = (to, from, next) => {
    if (store.getters.isAuthenticated && store.getters.isAdmin) {
        next()
    } else next('/')
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/admin',
            component: AdminPage,
            children: [
                {
                    path: '',
                    name: 'admin-index',
                    component: AdminIndex,
                },
                {
                    path: '/accounts-manager',
                    name: 'accounts-manager',
                    component: AccountsManager,
                },
                {
                    path: '/account-details',
                    name: 'account-details',
                    component: AccountDetails,
                },
            ],
        },
        {
            path: '/login',
            component: LoginPage,
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: Login,
                },
                {
                    path: '/createaccount',
                    name: 'create account',
                    component: CreateAccount,
                },
                {
                    path: '/resetpassword',
                    name: 'reset password',
                    component: ResetPassword,
                },
            ],
        },
        {
            path: '/',
            component: HomePage,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Home,
                },
                {
                    path: '/about',
                    name: 'about',
                    component: About,
                },
            ],
        },
        {
            path: '/movingbeer',
            component: MovingBeerPage,
            children: [
                {
                    path: '',
                    name: 'movingbeerindex',
                    component: MovingBeerIndex,
                },
                {
                    path: '/checkout',
                    name: 'movingbeercheckout',
                    component: MovingBeerCheckout,
                },
                {
                    path: '/mi-cuenta',
                    name: 'movingbeeraccount',
                    component: MovingBeerAccount,
                },
                {
                    path: '/historial',
                    name: 'movingbeerhistory',
                    component: MovingBeerHistory,
                },
            ],
        },
    ],
})
