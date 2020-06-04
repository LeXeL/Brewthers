import Vue from 'vue'
import Router from 'vue-router'
//Layouts
import HomePage from './layouts/HomePage.vue'
import LoginPage from './layouts/LoginPage.vue'
//Views
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login/Login.vue'
import CreateAccount from './views/Login/CreateAccount.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
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
