import Vue from 'vue'
import Vuex from 'vuex'

import {loadOrganizations, loadOrganization, loadUsers} from './state/actions'
import {setOrganizations, setOrganization, setUsers} from './state/mutations'
import {mapMutations} from './state/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    organizations: [],
    organizationsById: {},
    usersByOrganizationId: {}
  },
  getters: {
    organization: state => organizationid => state.organizationsById[organizationid],
    users: state => organizationid => state.usersByOrganizationId[organizationid]
  },
  mutations: mapMutations([setOrganizations, setOrganization, setUsers]),
  actions: {
    loadOrganizations,
    loadOrganization,
    loadUsers
  }
})
