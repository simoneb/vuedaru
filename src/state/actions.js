import Vue from 'vue'

import {setOrganizations, setOrganization, setUsers} from './mutations'
import {createAction} from './utils'

export const loadOrganizations = createAction('loadOrganizations', async function({commit}) {
  const {data: organizations} = await Vue.udaru.getOrganizations()
  commit(setOrganizations({organizations}))
})

export const loadOrganization = createAction('loadOrganization', async function({commit}, organizationId) {
  const organization = await Vue.udaru.getOrganization(organizationId)
  commit(setOrganization({organizationId, organization}))
})

export const loadUsers = createAction('loadUsers', async function({commit}, organizationId) {
  const {data: users} = await Vue.udaru.getUsers(organizationId)
  commit(setUsers({organizationId, users}))
})
