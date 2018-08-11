export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true

  Vue.prototype.$udaru = Vue.udaru = {
    async checkUserForLogin(userId) {
      const {data} = await Vue.axios.get(`/authorization/users/${encodeURIComponent(userId)}`, {
        headers: {authorization: userId}
      })

      return data
    },
    async getOrganizations() {
      const {data} = await Vue.axios.get('/authorization/organizations')
      return data
    },
    async getOrganization(id) {
      const {data} = await Vue.axios.get(`/authorization/organizations/${encodeURIComponent(id)}`)
      return data
    },
    async deleteOrganization(id) {
      const {data} = await Vue.axios.delete(`/authorization/organizations/${encodeURIComponent(id)}`)
      return data
    },
    async createOrganization(organization) {
      const {data} = await Vue.axios.post(`/authorization/organizations`, organization)
      return data
    },
    async createUser(organizationId, user) {
      const {data} = await Vue.axios.post(`/authorization/users`, user, {headers: {org: organizationId}})
      return data
    },
    async createTeam(organizationId, team) {
      const {data} = await Vue.axios.post(`/authorization/teams`, team, {headers: {org: organizationId}})
      return data
    },
    async getUsers(organizationId) {
      const {data} = await Vue.axios.get('/authorization/users', {headers: {org: organizationId}})
      return data
    },
    async getTeams(organizationId) {
      const {data} = await Vue.axios.get('/authorization/teams', {headers: {org: organizationId}})
      return data
    },
    async getUser(organizationId, userId) {
      const {data} = await Vue.axios.get(`/authorization/users/${encodeURIComponent(userId)}`, {
        headers: {org: organizationId}
      })
      return data
    },
    async canAccess(organizationId, userId, action, resource) {
      const {data} = await Vue.axios.get(
        `/authorization/access/${encodeURIComponent(userId)}/${encodeURIComponent(action)}/${encodeURIComponent(
          resource
        )}`,
        {
          headers: {org: organizationId}
        }
      )
      return data
    },
    async listUserActionsOnResources(organizationId, userId, resources) {
      const {data} = await Vue.axios.get(`/authorization/list/${encodeURIComponent(userId)}`, {
        headers: {org: organizationId},
        params: {resources}
      })
      return data
    },
    async listUserActionsOnResource(organizationId, userId, resource) {
      const {data} = await Vue.axios.get(
        `/authorization/list/${encodeURIComponent(userId)}/${encodeURIComponent(resource)}`,
        {
          headers: {org: organizationId}
        }
      )
      return data
    },
    async getTeam(organizationId, teamId) {
      const {data} = await Vue.axios.get(`/authorization/teams/${encodeURIComponent(teamId)}`, {
        headers: {org: organizationId}
      })
      return data
    },
    async getCurrentUser() {
      const {data} = await Vue.axios.get(`/authorization/users/${encodeURIComponent(Vue.auth.getUserId())}`)
      return data
    },
    async getPolicies(organizationId) {
      const {data} = await Vue.axios.get('/authorization/policies', {headers: {org: organizationId}})
      return data
    },
    async getPolicy(organizationId, policyId) {
      const {data} = await Vue.axios.get(`/authorization/policies/${encodeURIComponent(policyId)}`, {
        headers: {org: organizationId}
      })
      return data
    },
    async addUsersToTeam(organizationId, teamId, ...userIds) {
      const {data} = await Vue.axios.put(
        `/authorization/teams/${encodeURIComponent(teamId)}/users`,
        {users: userIds},
        {
          headers: {org: organizationId}
        }
      )
      return data
    },
    async removeUserFromTeam(organizationId, teamId, userId) {
      const {data} = await Vue.axios.delete(
        `/authorization/teams/${encodeURIComponent(teamId)}/users/${encodeURIComponent(userId)}`,
        {
          headers: {org: organizationId}
        }
      )
      return data
    }
  }
}
