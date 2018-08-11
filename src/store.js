import Vue from 'vue'
import Vuex from 'vuex'

import {
  loadOrganizations,
  loadOrganization,
  loadUsers,
  loadUser,
  loadTeams,
  loadPolicies,
  loadTeam,
  addUserToTeam,
  removeUserFromTeam
} from './state/actions'
import {
  setLoading,
  unsetLoading,
  setOrganizations,
  setOrganization,
  setUser,
  setUsers,
  setTeams,
  setTeam,
  setPolicies
} from './state/mutations'
import {mapMutations} from './state/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: 0,
    organizations: [],
    organizationsById: {},
    usersByOrganizationId: {},
    teamsByOrganizationId: {},
    policiesByOrganizationId: {},
    teamsById: {},
    usersById: {}
  },
  getters: {
    getOrganization: state => organizationid => state.organizationsById[organizationid],
    getUsers: state => organizationid => state.usersByOrganizationId[organizationid],
    getTeams: state => organizationid => state.teamsByOrganizationId[organizationid],
    getTeam: state => (organizationid, teamId) =>
      state.teamsById[organizationid] && state.teamsById[organizationid][teamId],
    getUser: state => (organizationid, userId) =>
      state.usersById[organizationid] && state.usersById[organizationid][userId],
    getPolicies: state => organizationid => state.policiesByOrganizationId[organizationid]
  },
  mutations: mapMutations([
    setOrganizations,
    setOrganization,
    setUser,
    setUsers,
    setTeams,
    setTeam,
    setPolicies,
    setLoading,
    unsetLoading
  ]),
  actions: {
    loadOrganizations,
    loadOrganization,
    loadUser,
    loadUsers,
    loadTeams,
    loadTeam,
    addUserToTeam,
    removeUserFromTeam,
    loadPolicies
  }
})
