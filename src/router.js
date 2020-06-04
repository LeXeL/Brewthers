import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
//Layouts
import HomePage from './layouts/HomePage.vue'
import LoginPage from './layouts/LoginPage.vue'
import AdminPage from './layouts/AdminPage.vue'
//Views
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login/Login.vue'
import CreateAccount from './views/Login/CreateAccount.vue'

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
            beforeEnter: ifAuthenticated,
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
    ],
})
