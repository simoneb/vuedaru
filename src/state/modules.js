import {mapMutations} from './utils'
import {setUsers} from './mutations'
import {loadUsers} from './actions'

export const OrganizationModule = {
  namespaced: true,
  state() {
    return {
      teams: [],
      users: [],
      policies: []
    }
  },
  mutations: mapMutations([setUsers]),
  actions: {
    loadUsers
  }
}
