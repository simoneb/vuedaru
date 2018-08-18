import Vue from 'vue'

import {
  setLoading,
  unsetLoading,
  setOrganizations,
  setOrganization,
  setUser,
  setUsers,
  setTeam,
  setTeams,
  setPolicies,
  setPolicy,
  setSnackbarMessage,
  setCurrentUser,
  setPolicyInstances
} from './mutations'
import {createAction} from './utils'

const patchContext = context => {
  const dispatch = context.dispatch

  context.dispatch = function(action, ...args) {
    if (typeof action === 'function' && typeof action.type === 'string') {
      return dispatch.call(context, action.type, ...args)
    }

    return dispatch.call(context, action, ...args)
  }

  return context
}

export const createLoadingAction = (type, action) => {
  return createAction(type, async function(context, ...args) {
    try {
      context.commit(setLoading())
      await action(patchContext(context), ...args)
    } finally {
      context.commit(unsetLoading())
    }
  })
}

export const loadOrganizations = createLoadingAction('loadOrganizations', async function({commit}) {
  const {data: organizations} = await Vue.udaru.getOrganizations()
  commit(setOrganizations({organizations}))
})

export const loadOrganization = createLoadingAction('loadOrganization', async function({commit}, organizationId) {
  const organization = await Vue.udaru.getOrganization(organizationId)
  commit(setOrganization({organizationId, organization}))
})

export const loadUsers = createLoadingAction('loadUsers', async function({commit}, organizationId) {
  const {data: users} = await Vue.udaru.getUsers(organizationId)
  commit(setUsers({organizationId, users}))
})

export const loadUser = createLoadingAction('loadUser', async function({commit}, {organizationId, userId}) {
  const user = await Vue.udaru.getUser(organizationId, userId)
  commit(setUser({organizationId, userId, user}))
})

export const loadTeams = createLoadingAction('loadTeams', async function({commit}, organizationId) {
  const {data: teams} = await Vue.udaru.getTeams(organizationId)
  commit(setTeams({organizationId, teams}))
})

export const loadTeam = createLoadingAction('loadTeam', async function({commit}, {organizationId, teamId}) {
  const team = await Vue.udaru.getTeam(organizationId, teamId)
  commit(setTeam({organizationId, teamId, team}))
})

export const loadPolicies = createLoadingAction('loadPolicies', async function({commit}, organizationId) {
  const {data: policies} = await Vue.udaru.getPolicies(organizationId)
  commit(setPolicies({organizationId, policies}))
})

export const loadPolicyInstances = createLoadingAction('loadPolicyInstances', async function(
  {commit},
  {organizationId, policyId}
) {
  const policyInstances = await Vue.udaru.loadPolicyInstances(organizationId, policyId)
  commit(setPolicyInstances({organizationId, policyId, policyInstances}))
})

export const loadPolicy = createLoadingAction('loadPolicy', async function({commit}, {organizationId, policyId}) {
  const policy = await Vue.udaru.getPolicy(organizationId, policyId)
  commit(setPolicy({organizationId, policyId, policy}))
})

export const addUserToTeam = createLoadingAction('addUserToTeam', async function(
  context,
  {organizationId, teamId, userId}
) {
  return await Vue.udaru.addUsersToTeam(organizationId, teamId, userId)
})

export const removeUserFromTeam = createLoadingAction('removeUserFromTeam', async function(
  context,
  {organizationId, teamId, userId}
) {
  return await Vue.udaru.removeUserFromTeam(organizationId, teamId, userId)
})

export const changeSnackbarMessage = createAction('changeSnackbarMessage', function({commit}, {message}) {
  commit(setSnackbarMessage({message}))
})

export const createTeam = createLoadingAction('createTeam', function(context, {organizationId, team}) {
  return Vue.udaru.createTeam(organizationId, team)
})

export const createUser = createLoadingAction('createUser', function(context, {organizationId, user}) {
  return Vue.udaru.createUser(organizationId, user)
})

export const createPolicy = createLoadingAction('createPolicy', function(
  context,
  {organizationId, policy, serviceKey}
) {
  return Vue.udaru.createPolicy(organizationId, policy, serviceKey)
})

export const createOrganization = createLoadingAction('createOrganization', function(context, {organization}) {
  return Vue.udaru.createOrganization(organization)
})

export const loadCurrentUser = createLoadingAction('loadCurrentUser', async function({commit}) {
  const currentUser = await Vue.udaru.getCurrentUser()
  commit(setCurrentUser({currentUser}))
})
