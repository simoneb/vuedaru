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
