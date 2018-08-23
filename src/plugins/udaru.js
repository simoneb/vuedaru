export default {
  install(Vue) {
    Vue.prototype.$udaru = Vue.udaru = {
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
      async updateOrganization(organizationId, organization) {
        const {data} = await Vue.axios.put(
          `/authorization/organizations/${encodeURIComponent(organizationId)}`,
          organization,
          {
            headers: {org: organizationId}
          }
        )
        return data
      },
      async createUser(organizationId, user) {
        const {data} = await Vue.axios.post(`/authorization/users`, user, {headers: {org: organizationId}})
        return data
      },
      async deleteUser(id) {
        const {data} = await Vue.axios.delete(`/authorization/users/${encodeURIComponent(id)}`)
        return data
      },
      async createTeam(organizationId, team) {
        const {data} = await Vue.axios.post(`/authorization/teams`, team, {headers: {org: organizationId}})
        return data
      },
      async createPolicy(organizationId, policy, serviceKey) {
        const {data} = await Vue.axios.post(`/authorization/policies`, policy, {
          headers: {org: organizationId},
          params: {sig: serviceKey}
        })
        return data
      },
      async updatePolicy(organizationId, policyId, policy, serviceKey) {
        const {data} = await Vue.axios.put(`/authorization/policies/${encodeURIComponent(policyId)}`, policy, {
          headers: {org: organizationId},
          params: {sig: serviceKey}
        })
        return data
      },
      async deleteTeam(id) {
        const {data} = await Vue.axios.delete(`/authorization/teams/${encodeURIComponent(id)}`)
        return data
      },
      async updateTeam(organizationId, teamId, team) {
        const {data} = await Vue.axios.put(`/authorization/teams/${encodeURIComponent(teamId)}`, team, {
          headers: {org: organizationId}
        })
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
      async updateUser(organizationId, userId, user) {
        const {data} = await Vue.axios.put(`/authorization/users/${encodeURIComponent(userId)}`, user, {
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
        const {data} = await Vue.axios.get(`/authorization/users/${encodeURIComponent(Vue.settings.getUserId())}`)
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
      async deletePolicy(organizationId, id, serviceKey) {
        const {data} = await Vue.axios.delete(`/authorization/policies/${encodeURIComponent(id)}`, {
          params: {sig: serviceKey},
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
      },
      async removeUserPolicy(organizationId, userId, policyId) {
        const {data} = await Vue.axios.delete(
          `/authorization/users/${encodeURIComponent(userId)}/policies/${encodeURIComponent(policyId)}`,
          {
            headers: {org: organizationId}
          }
        )
        return data
      },
      async addOrUpdateUserPolicy(organizationId, userId, policyInstance) {
        const {data} = await Vue.axios.put(
          `/authorization/users/${encodeURIComponent(userId)}/policies`,
          {policies: [policyInstance]},
          {
            headers: {org: organizationId}
          }
        )
        return data
      },
      async removeTeamPolicy(organizationId, teamId, policyId) {
        const {data} = await Vue.axios.delete(
          `/authorization/teams/${encodeURIComponent(teamId)}/policies/${encodeURIComponent(policyId)}`,
          {
            headers: {org: organizationId}
          }
        )
        return data
      },
      async addOrUpdateTeamPolicy(organizationId, teamId, policyInstance) {
        const {data} = await Vue.axios.put(
          `/authorization/teams/${encodeURIComponent(teamId)}/policies`,
          {policies: [policyInstance]},
          {
            headers: {org: organizationId}
          }
        )
        return data
      },
      async removeNestedTeam(organizationId, nestedTeamId) {
        const {data} = await Vue.axios.put(`/authorization/teams/${encodeURIComponent(nestedTeamId)}/unnest`, {
          headers: {org: organizationId}
        })
        return data
      },
      async addNestedTeam(organizationId, teamId, nestedTeamId) {
        const {data} = await Vue.axios.put(
          `/authorization/teams/${encodeURIComponent(nestedTeamId)}/nest`,
          {parentId: teamId},
          {
            headers: {org: organizationId}
          }
        )
        return data
      },
      async removeOrganizationPolicy(organizationId, policyId) {
        const {data} = await Vue.axios.delete(
          `/authorization/organizations/${encodeURIComponent(organizationId)}/policies/${encodeURIComponent(policyId)}`,
          {
            headers: {org: organizationId}
          }
        )
        return data
      },
      async addOrUpdateOrganizationPolicy(organizationId, policyInstance) {
        const {data} = await Vue.axios.put(
          `/authorization/organizations/${encodeURIComponent(organizationId)}/policies`,
          {policies: [policyInstance]},
          {
            headers: {org: organizationId}
          }
        )
        return data
      },
      async loadPolicyInstances(organizationId, policyId) {
        const {data} = await Vue.axios.get(`/authorization/policies/${encodeURIComponent(policyId)}/instances`, {
          headers: {org: organizationId}
        })
        return data
      },
      ping() {
        return Vue.axios.get('/ping')
      }
    }
  }
}
