import Vue from 'vue'
import Router from 'vue-router'


//const DashboardUserLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/dashboardUserLayout.vue')
const HomePageLayout = () => import('../components/homePageLayout.vue')
const DashboardAdminLayout = () => import('../components/dashboardAdminLayout.vue')
const DashboardPegawaiLayout = () => import('../components/dashboardPegawaiLayout.vue')
const DashboardKasirLayout = () => import('../components/dashboardKasirLayout.vue')

// function loadView(view) {
//     return () => import( /* webpackChunkName: "view[request]" */ `../components/dashboardUserContents/${view}.vue`)
// }

function loadHomePage(view){
    return () => import(`../components/homePageContents/${view}.vue`)
}

function loadAdminPage(view){
    return () => import(`../components/dashboardAdminContents/${view}.vue`)
}

function loadPegawaiPage(view){
    return () => import(`../components/dashboardPegawaiContents/${view}.vue`)
}

function loadKasirPage(view){
  return () => import(`../components/dashboardKasirContents/${view}.vue`)
}
// router.beforeEach((to, from, next) => {
//     if(localStorage.getItem('login') != 'true') next({ name: 'login'})
//     next
// })
Vue.use(Router)   

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
{
    path: '/dashboardAdmin', 
    component: DashboardAdminLayout,
    meta: { requiresAuth: true },   
    children: [ 
        { 
            path: '/dashboardAdmin',            
            name: 'addPegawaiController', 
            meta: { requiresAdmin: true},
            component: loadAdminPage('addPegawaiController'),
        },
        { 
            path: '/dashboardAdmin/addProduk',            
            name: 'addProdukListController', 
            component: loadAdminPage('addProdukListController') 
        },
        { 
            path: '/dashboardAdmin/addLayanan',            
            name: 'addLayananController', 
            meta: { requiresAdmin: true},
            component: loadAdminPage('addLayananController') 
        },
        { 
            path: '/dashboardAdmin/HewanControl',            
            name: 'HewanController', 
            meta: { requiresAdmin: true},
            component: loadAdminPage('HewanController')
        },
        { 
            path: '/dashboardAdmin/addJenis',            
            name: 'addJenisListController', 
            meta: { requiresAdmin: true},
            component: loadAdminPage('addJenisListController') 
        },
        { 
            path: '/dashboardAdmin/addUkuran',            
            name: 'addUkuranListController', 
            meta: { requiresAdmin: true},
            component: loadAdminPage('addUkuranListController')
        },
        { 
            path: '/dashboardAdmin/addMember',            
            name: 'addMemberController', 
            meta: { requiresAdmin: true},
            component: loadAdminPage('addMemberController')
        },
        { 
            path: '/dashboardAdmin/addSupplier',            
            name: 'addSupplierListController', 
            meta: { requiresAdmin: true},
            component: loadAdminPage('addSupplierListController')
        },
        { 
          path: '/dashboardAdmin/StockProduct',            
          name: 'StockProductController', 
          meta: { requiresAdmin: true},
          component: loadAdminPage('StockProductController')
        },
        { 
          path: '/dashboardAdmin/ShowStock',            
          name: 'ShowStockDataProduct', 
          meta: { requiresAdmin: true},
          component: loadAdminPage('ShowStockDataProduct')
        },
        { 
          path: '/dashboardAdmin/AddStock',            
          name: 'addStockProductController', 
          meta: { requiresAdmin: true},
          component: loadAdminPage('addStockProductController')
        }
    ] 
}, 
{
    path: '/dashboardPegawai', 
    component: DashboardPegawaiLayout, 
    meta: {requiresAuth: true},
    children: [ 
        { 
            path: '/dashboardPegawai',            
            name: 'addAccountController',
            meta: { requiresCS: true}, 
            component: loadPegawaiPage('addAccountController') 
        },
        { 
          path: '/dashboardPegawai/addProdukCS',            
          name: 'addProdukCSController',
          meta: { requiresCS: true}, 
          component: loadPegawaiPage('addProdukCSController') 
        },
        { 
          path: '/dashboardPegawai/addLayananCS',            
          name: 'addLayananCSController',
          meta: { requiresCS: true}, 
          component: loadPegawaiPage('addLayananCSController') 
        },
        { 
          path: '/dashboardPegawai/addHewanCS',            
          name: 'addDataHewanCSController',
          meta: { requiresCS: true}, 
          component: loadPegawaiPage('addDataHewanCSController') 
        },
        { 
          path: '/dashboardPegawai/addMemberCS',            
          name: 'addMemberCSController',
          meta: { requiresCS: true}, 
          component: loadPegawaiPage('addMemberCSController') 
        },
        { 
          path: '/dashboardPegawai/JualProdukCS',            
          name: 'addPenjualanProdukController',
          meta: { requiresCS: true}, 
          component: loadPegawaiPage('addPenjualanProdukController') 
        },
        { 
          path: '/dashboardPegawai/TransaksiCS',            
          name: 'addDetailPenjualanCSController',
          meta: { requiresCS: true}, 
          component: loadPegawaiPage('addDetailPenjualanCSController') 
        },
        { 
          path: '/dashboardPegawai/LayananCS',            
          name: 'addPenjualanLayanan',
          meta: { requiresCS: true}, 
          component: loadPegawaiPage('addPenjualanLayanan') 
        },
        { 
          path: '/dashboardPegawai/ServiceCS',            
          name: 'addTransaksiPenjualanCSController',
          meta: { requiresCS: true},
          component: loadPegawaiPage('addTransaksiPenjualanCSController') 
        }
    ] 
},
{
  path: '/dashboardKasir', 
  component: DashboardKasirLayout, 
  meta: {requiresAuth: true},
  children: [ 
      { 
          path: '/dashboardKasir',            
          name: 'accountKasirController',
          meta: { requiresKasir: true}, 
          component: loadKasirPage('accountKasirController') 
      }
  ] 
},
]

Vue.use(Router) 

//const router = new Router({mode: 'history', routes: routes}) 
const router = new Router({mode: 'history',  base: process.env.BASE_URL, routes: routes, scrollBehavior () {
    return { x: 0, y: 0 }
  }}) 
    
export default router

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!(localStorage.getItem('masuk'))) {
        next({
          path: '/signDual',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else{
      next() // make sure to always call next()!
    }
  })
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if ((localStorage.getItem('role'))!= 'OWNER') {
      next({ path : '/dashboardAdmin' })
    } else {
      next()
    }
  } else{
    next() // make sure to always call next()!
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresCS)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if ((localStorage.getItem('role'))!= 'CS' ) {
      next({ path : '/dashboardPegawai' })
    } else {
      next()
    }
  } else{
    next() // make sure to always call next()!
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresKasir)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if ((localStorage.getItem('role'))!= 'KASIR' ) {
      next({ path : '/dashboardKasir' })
    } else {
      next()
    }
  } else{
    next() // make sure to always call next()!
  }
})