import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    props: true,
  },
  {
    path: '/products',
    name: 'Products',
    component: () =>
      import(/* webpackChunkName: "products" */ '../views/ProductList.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/products/new',
    name: 'NewProduct',
    component: () =>
      import(/* webpackChunkName: "products" */ '../views/ProductForm.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  /**
   * Validación ad-hoc solo en el cliente.
   * Login es la única que no requiere autenticación
   */
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')
  if (to.name !== 'Login' && (!user?.active || !token)) {
    next({
      path: '/',
    })
  } else {
    next()
  }
})

export default router
