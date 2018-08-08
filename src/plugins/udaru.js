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
    async getCurrentUser() {
      const {data} = await Vue.axios.get(`/authorization/users/${encodeURIComponent(Vue.auth.getUserId())}`)
      return data
    },
    async getPolicies(organizationId) {
      const {data} = await Vue.axios.get('/authorization/policies', {headers: {org: organizationId}})
      return data
    }
  }
}
