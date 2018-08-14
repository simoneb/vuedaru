import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import OrganizationSelect from './views/OrganizationSelect'
import OrganizationCreate from './views/OrganizationCreate'
import Organization from './views/Organization'
import Organizations from './views/Organizations'
import Team from './views/Team'
import TeamCreate from './views/TeamCreate'
import Teams from './views/Teams'
import User from './views/User'
import UserCreate from './views/UserCreate'
import Users from './views/Users'
import Policies from './views/Policies'
import Policy from './views/Policy'
import Login from './views/Login'
import Logout from './views/Logout'
import AuthorizationCheck from './views/AuthorizationCheck'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/organizations',
      component: Organizations,
      meta: {requiresAuthentication: true},
      children: [
        {path: '', redirect: {name: 'select-organization'}},
        {
          path: 'select',
          name: 'select-organization',
          component: OrganizationSelect
        },
        {
          path: 'create',
          name: 'create-organization',
          component: OrganizationCreate
        }
      ]
    },
    {
      path: '/',
      component: Home,
      props: true,
      meta: {requiresAuthentication: true},
      children: [
        {path: '', redirect: {name: 'select-organization'}},
        {
          path: 'organizations/:organizationId',
          redirect: ({params}) => ({name: 'organization', params})
        },
        {
          path: 'organizations/:organizationId/details',
          name: 'organization',
          props: true,
          component: Organization
        },
        {
          path: 'organizations/:organizationId/users',
          name: 'users',
          props: true,
          component: Users
        },
        {
          path: 'organizations/:organizationId/teams',
          name: 'teams',
          props: true,
          component: Teams
        },
        {
          path: 'organizations/:organizationId/policies',
          name: 'policies',
          props: true,
          component: Policies
        },
        {
          path: 'organizations/:organizationId/users/create',
          name: 'user-create',
          props: true,
          component: UserCreate
        },
        {
          path: 'organizations/:organizationId/teams/create',
          name: 'team-create',
          props: true,
          component: TeamCreate
        },
        {
          path: 'organizations/:organizationId/users/:userId',
          name: 'user',
          props: true,
          component: User
        },
        {
          path: 'organizations/:organizationId/teams/:teamId',
          name: 'team',
          props: true,
          component: Team
        },
        {
          path: 'organizations/:organizationId/policies/:policyId',
          name: 'policy',
          props: true,
          component: Policy
        },
        {
          path: 'organizations/:organizationId/authorization-check',
          name: 'authorization-check',
          props: true,
          component: AuthorizationCheck
        }
      ]
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

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(m => m.meta.requiresAuthentication) && !Vue.settings.isAuthenticated()) {
    return next({name: 'login'})
  }

  next()
})

export default router
