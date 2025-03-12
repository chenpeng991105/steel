import Vue from "vue"
import VueRouter from "vue-router"
import Login from '@/views/Login'
import Home from '@/views/Home'
import { getMessageTypeListApi } from "@/api/message"
import { Message } from "element-ui"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register')
  },
  {
    path: '/query',
    name: 'Query',
    component: () => import('@/views/Query/index.vue')
  },
  {
    path: '/update',
    name: 'Update',
    component: () => import('@/views/Update')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('@/views/Statistics')
  },
  {
    path: '/detail',
    name: 'StatisticsDetail',
    component: () => import('@/views/StatisticsDetail')
  },
  {
    path: '/product/:factoryId',
    name: 'Product',
    component: () => import('@/views/Product')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

const whiteList = ['/login', '/register']
router.beforeEach(async(to, from, next) => {
  const hasToken = localStorage.getItem('token')

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      try {
          await getMessageTypeListApi()
          next()
        } catch (error) {
          localStorage.clear()
          Message.error('登录过期，请重新登录')
          next('/login')
        }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router