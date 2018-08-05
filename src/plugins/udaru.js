export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true

  Vue.prototype.$udaru = Vue.udaru = {
    async checkUserForLogin(userId) {
      const {data} = await Vue.axios.get(
        `/authorization/users/${encodeURIComponent(userId)}`,
        {headers: {authorization: userId}}
      )

      return data
    },
    async getOrganizations() {
      const {data} = await Vue.axios.get('/authorization/organizations')
      return data
    },
    async getOrganization(id) {
      const {data} = await Vue.axios.get(
        `/authorization/organizations/${encodeURIComponent(id)}`
      )
      return data
    },
    async getUsers() {
      const {data} = await Vue.axios.get('/authorization/users')
      return data
    },
    async getPolicies() {
      const {data} = await Vue.axios.get('/authorization/policies')
      return data
    }
  }
}
