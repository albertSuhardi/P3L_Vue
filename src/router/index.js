import Vue from 'vue'
import Router from 'vue-router'

//const DashboardUserLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/dashboardUserLayout.vue')
const HomePageLayout = () => import('../components/homePageLayout.vue')
const DashboardAdminLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/dashboardAdminLayout.vue')

// function loadView(view) {
//     return () => import( /* webpackChunkName: "view[request]" */ `../components/dashboardUserContents/${view}.vue`)
// }

function loadHomePage(view){
    return () => import(`../components/homePageContents/${view}.vue`)
}

function loadAdminPage(view){
    return () => import(`../components/dashboardAdminContents/${view}.vue`)
}

const routes = [
{
    path: '/',
    component: HomePageLayout,
    children: [
        {
            path: '/',
            name: 'home',
            component: loadHomePage('home')
        }, 
        {
            path: '/showProduk',
            name: 'showProduk',
            component: loadHomePage('showProduk')
        }, 
        {
            path: '/signDual',
            name: 'signDual',
            component: loadHomePage('signDual')
        }
    ]
},
// {
//     path: '/dashboardUser', 
//     component: DashboardUserLayout, 
//     children: [ 
//         { 
//             path: '/dashboardUser',            
//             name: 'borrowBookController', 
//             component: loadView('borrowBookController') 
//         },
//         { 
//             path: '/dashboardUser/borrowList',            
//             name: 'borrowListController', 
//             component: loadView('borrowListController') 
//         },
//         { 
//             path: '/dashboardUser/requestBook',            
//             name: 'requestBookController', 
//             component: loadView('requestBookController') 
//         },
//         { 
//             path: '/dashboardUser/bookReview',            
//             name: 'reviewController', 
//             component: loadView('reviewController') 
//         },
//         { 
//             path: '/dashboardUser/userAccount',            
//             name: 'accountController', 
//             component: loadView('accountController') 
//         },
//     ] 
// }, 
{
    path: '/dashboardAdmin', 
    component: DashboardAdminLayout, 
    children: [ 
        { 
            path: '/dashboardAdmin',            
            name: 'addPegawaiController', 
            component: loadAdminPage('addPegawaiController') 
        },
        { 
            path: '/dashboardAdmin/addProduk',            
            name: 'addProdukListController', 
            component: loadAdminPage('addProdukListController') 
        },
        { 
            path: '/dashboardAdmin/addLayanan',            
            name: 'addLayananController', 
            component: loadAdminPage('addLayananController') 
        },
        { 
            path: '/dashboardAdmin/addJenis',            
            name: 'addJenisListController', 
            component: loadAdminPage('addJenisListController') 
        },
        { 
            path: '/dashboardAdmin/addUkuran',            
            name: 'addUkuranListController', 
            component: loadAdminPage('addUkuranListController')
        },
        { 
            path: '/dashboardAdmin/addMember',            
            name: 'addMemberController', 
            component: loadAdminPage('addMemberController')
        },
        { 
            path: '/dashboardAdmin/addSupplier',            
            name: 'addSupplierListController', 
            component: loadAdminPage('addSupplierListController')
        }
    ] 
}, 
]

Vue.use(Router) 

const router = new Router({mode: 'history', routes: routes}) 
    
export default router