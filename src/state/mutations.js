import {createMutation} from './utils'

export const setOrganizations = createMutation('organizations', (state, {organizations}) => {
  state.organizations = organizations
})

export const setOrganization = createMutation('organization', (state, {organizationId, organization}) => {
  state.organizationsById = {...state.organizationsById, [organizationId]: organization}
})

export const setUsers = createMutation('users', (state, {organizationId, users}) => {
  state.usersByOrganizationId = {...state.usersByOrganizationId, [organizationId]: users}
})

export const setTeams = createMutation('teams', (state, {organizationId, teams}) => {
  state.teamsByOrganizationId = {...state.teamsByOrganizationId, [organizationId]: teams}
})

export const setTeam = createMutation('team', (state, {organizationId, teamId, team}) => {
  state.teamsById = {...state.teamsById, [organizationId]: {...state.teamsById[organizationId], [teamId]: team}}
})

export const setUser = createMutation('user', (state, {organizationId, userId, user}) => {
  state.usersById = {...state.usersById, [organizationId]: {...state.usersById[organizationId], [userId]: user}}
})

export const setPolicy = createMutation('policy', (state, {organizationId, policyId, policy}) => {
  state.policiesById = {
    ...state.policiesById,
    [organizationId]: {...state.policiesById[organizationId], [policyId]: policy}
  }
})

export const setPolicies = createMutation('policies', (state, {organizationId, policies}) => {
  state.policiesByOrganizationId = {...state.policiesByOrganizationId, [organizationId]: policies}
})

export const setLoading = createMutation('setLoading', state => {
  state.loading++
})

export const unsetLoading = createMutation('unsetLoading', state => {
  // make sure we never go below 0
  state.loading = Math.max(0, state.loading - 1)
})
