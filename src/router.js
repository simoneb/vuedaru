import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Organizations from './views/Organizations'
import Organization from './views/Organization'
import Users from './views/Users'
import Policies from './views/Policies'
import Login from './views/Login'
import Logout from './views/Logout'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/organizations',
      name: 'organizations',
      component: Organizations
    },
    {
      path: '/organizations/:id',
      name: 'organization',
      props: true,
      component: Organization
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/policies',
      name: 'policies',
      component: Policies
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !Vue.auth.isAuthenticated()) {
    return next('/login')
  }

  next()
})

export default router
