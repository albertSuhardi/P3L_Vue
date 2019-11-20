import Vue from 'vue'
import Router from 'vue-router'


const DashboardLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue')

function loadView(view) {
    return () => import( /* webpackChunkName: "view[request]" */ `../components/dashboardContents/${view}.vue`)
}

const routes = [{
    path: '/dashboard',

    component: DashboardLayout,
    children: [
    {
        name: 'UserController',
        path: '/user',
        component: loadView('userController')
    },
    {
        name: 'cabangController',
        path: '/branches',
        component: loadView('cabangController')
    },
    {
        name: 'Login',
        path: '/',
        component: Login,
    }
    ]
}, ]
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: routes
})

export default router