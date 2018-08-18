import Vue from 'vue'
import Router from 'vue-router'

import App from './App.vue'
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
import PolicyCreate from './views/PolicyCreate'
import Settings from './views/Settings'
import AuthorizationCheck from './views/AuthorizationCheck'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: App,
      meta: {requiresSettings: true},
      children: [
        {path: '', redirect: {name: 'select-organization'}},
        {
          path: 'organizations',
          component: Organizations,
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
          path: '/organizations/:organizationId',
          component: Home,
          props: true,
          children: [
            {
              path: '',
              redirect: ({params}) => ({name: 'organization', params})
            },
            {
              path: 'details',
              name: 'organization',
              props: true,
              component: Organization
            },
            {
              path: 'users',
              name: 'users',
              props: true,
              component: Users
            },
            {
              path: 'teams',
              name: 'teams',
              props: true,
              component: Teams
            },
            {
              path: 'policies',
              name: 'policies',
              props: true,
              component: Policies
            },
            {
              path: 'users/create',
              name: 'user-create',
              props: true,
              component: UserCreate
            },
            {
              path: 'teams/create',
              name: 'team-create',
              props: true,
              component: TeamCreate
            },
            {
              path: 'user/:userId',
              name: 'user',
              props: true,
              component: User
            },
            {
              path: 'team/:teamId',
              name: 'team',
              props: true,
              component: Team
            },
            {
              path: 'policies/create',
              name: 'policy-create',
              props: true,
              component: PolicyCreate
            },
            {
              path: 'policy/:policyId',
              name: 'policy',
              props: true,
              component: Policy
            },
            {
              path: 'authorization-check',
              name: 'authorization-check',
              props: true,
              component: AuthorizationCheck
            }
          ]
        }
      ]
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(m => m.meta.requiresSettings) && !Vue.settings.isConfigured()) {
    return next({name: 'settings'})
  }

  next()
})

export default router
