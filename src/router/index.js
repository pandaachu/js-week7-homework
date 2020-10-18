import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Home from '../views/user/Shop.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/admin/Login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/layout/Dashboard.vue'),
    redirect: '/admin/products',
    children: [ // 巢狀結構
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/admin/Products.vue')
      },
      {
        path: 'order/:id',
        name: 'AdminOrder',
        component: () => import('../views/admin/Order.vue')
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../views/admin/Orders.vue')
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: () => import('../views/admin/Coupons.vue')
      },
      {
        path: 'storages',
        name: 'AdminStorages',
        component: () => import('../views/admin/Storages.vue')
      }
    ]
  },
  // 路徑輸入錯誤導回首頁
  { // * -> 代表全部
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
