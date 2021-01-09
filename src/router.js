import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
//Layouts
import HomePage from './layouts/HomePage.vue'
import LoginPage from './layouts/LoginPage.vue'
import AdminPage from './layouts/AdminPage.vue'
import AdminBreweryPage from './layouts/AdminBreweryPage.vue'
import MovingBeerPage from './layouts/MovingBeerPage.vue'
import BlogPage from './layouts/BlogPage'
import TermsAndConditionsPage from './layouts/TermsAndConditionsPage'
//Views
import Login from './views/Login/Login.vue'
import CreateAccount from './views/Login/CreateAccount.vue'
import CreateBrewingHouseAccount from './views/Login/CreateBrewingHouseAccount'
import ResetPassword from './views/Login/ResetPassword.vue'
import ForgotPassword from './views/Login/ForgotPassword.vue'
import MovingBeerIndex from './views/movingbeer/MovingBeerIndex.vue'
import MovingBeerCheckout from './views/movingbeer/MovingBeerCheckout.vue'
import MovingBeerAccount from './views/movingbeer/MovingBeerAccount.vue'
import MovingBeerHistory from './views/movingbeer/MovingBeerHistory.vue'

import AdminIndex from './views/admin/Index'
import BreweryAdminIndex from './views/admin/BreweryIndex'
import AccountsManager from './views/admin/AccountsManager'
import AccountDetails from './views/admin/AccountDetails'
import BrewingHouses from './views/admin/BrewingHouses'
import InventoryManager from './views/admin/InventoryManager'
import ItemDetails from './views/admin/ItemDetails'
import OrdersManager from './views/admin/OrdersManager'
import OrderDetails from './views/admin/OrderDetails'
import AdminReports from './views/admin/AdminReports'
import BlogManager from './views/admin/BlogManager'
import BlogWriter from './views/admin/BlogWriter'
import ExclusivenessAndPrices from './views/admin/ExclusivenessAndPrices'
import ExclusivenessAndPricesDetails from './views/admin/ExclusivenessAndPricesDetails'

import MyInventory from '@/views/BrewingHouse/MyInventory'
import Clients from '@/views/BrewingHouse/Clients'
import ClientPrices from '@/views/BrewingHouse/ClientPrices'

import BlogIndex from './views/Blog/BlogIndex'
import BlogView from './views/Blog/BlogView'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
    } else next('/login')
}
const ifAuthenticatedAndAdmin = (to, from, next) => {
    if (store.getters.isAuthenticated && store.getters.role === 'admin') {
        next()
    } else next('/')
}
const ifAuthenticatedAndBrewery = (to, from, next) => {
    if (store.getters.isAuthenticated && store.getters.role === 'brewery') {
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
            beforeEnter: ifAuthenticatedAndAdmin,
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
                    path: '/account-details/:id',
                    name: 'account-details',
                    component: AccountDetails,
                },
                {
                    path: '/brewing-houses',
                    name: 'brewing-houses',
                    component: BrewingHouses,
                },
                {
                    path: '/inventory-manager',
                    name: 'inventory-manager',
                    component: InventoryManager,
                },
                {
                    path: '/item-details/:id',
                    name: 'item-details',
                    component: ItemDetails,
                },
                {
                    path: '/orders-manager',
                    name: 'orders-manager',
                    component: OrdersManager,
                },
                {
                    path: '/order-details/:id',
                    name: 'order-details',
                    component: OrderDetails,
                },
                {
                    path: '/admin-reports',
                    name: 'admin-reports',
                    component: AdminReports,
                },
                {
                    path: '/blog-manager',
                    name: 'blog-manager',
                    component: BlogManager,
                },
                {
                    path: '/blog-writer/:id?',
                    name: 'blog-writer',
                    component: BlogWriter,
                },
                {
                    path: '/exclusiveness-and-prices',
                    name: 'exclusiveness-and-prices',
                    component: ExclusivenessAndPrices,
                },
                {
                    path: '/exclusiveness-and-prices/:id',
                    name: 'exclusiveness-and-prices-details',
                    component: ExclusivenessAndPricesDetails,
                },
            ],
        },
        {
            path: '/brewery-admin',
            component: AdminBreweryPage,
            beforeEnter: ifAuthenticatedAndBrewery,
            children: [
                {
                    path: '',
                    name: 'brewery-admin-index',
                    component: BreweryAdminIndex,
                },
                {
                    path: '/my-inventory',
                    name: 'my-inventory',
                    component: MyInventory,
                },
                {
                    path: '/brewery-admin/item-details/:id',
                    name: 'brewery-item-details',
                    component: ItemDetails,
                },
                {
                    path: '/clients',
                    name: 'clients',
                    component: Clients,
                },
                {
                    path: '/clients/:id',
                    name: 'client-prices',
                    component: ClientPrices,
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
                    path: '/create-account-brewing-house',
                    name: 'create account brewing house',
                    component: CreateBrewingHouseAccount,
                },
                {
                    path: '/resetpassword',
                    name: 'reset password',
                    component: ResetPassword,
                },
                {
                    path: '/forgotpassword',
                    name: 'forgot password',
                    component: ForgotPassword,
                },
            ],
        },
        {
            path: '/',
            component: HomePage,
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
        {
            path: '/blog',
            component: BlogPage,
            children: [
                {
                    path: '',
                    name: 'blog-index',
                    component: BlogIndex,
                },
                {
                    path: '/blog/:id',
                    name: 'blog-view',
                    component: BlogView,
                },
            ],
        },
        {
            path: '/terminos-y-condiciones',
            component: TermsAndConditionsPage,
            name: 'terms-and-conditions',
        },
    ],
})
