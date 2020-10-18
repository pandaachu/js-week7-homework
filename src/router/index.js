import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Home from '../views/user/Shop.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 對應的路徑
    // name: 'Home', // 元件呈現的名稱
    // component: Home, // 對應的元件
    component: () => import('../views/user/layout/Shop.vue'),
    // redirect: '',
    children: [ // 巢狀結構
      {
        path: '', // 首頁
        name: 'Home',
        component: () => import('../views/user/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/user/About.vue')
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/user/Products.vue')
      },
      { // 動態路由，後面加參數
        path: '/product/:id',
        name: 'Product',
        component: () => import('../views/user/Product.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/user/Cart.vue')
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('../views/user/Checkout.vue')
      },
      {
        path: '/checkout-success/:id',
        name: 'CheckoutSuccess',
        component: () => import('../views/user/CheckoutSuccess.vue')
      },
      {
        path: '/collections-oil',
        name: 'CollectionsOil',
        component: () => import('../views/user/collections/CollectionsOil.vue')
      },
      {
        path: '/collections-candle',
        name: 'CollectionsCandle',
        component: () => import('../views/user/collections/CollectionsCandle.vue')
      }
    ]
  },
  {
    path: '/admin/login',
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
