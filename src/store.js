import Vue from 'vue'
import Vuex from 'vuex'

import {
  loadOrganizations,
  loadOrganization,
  loadUsers,
  loadUser,
  loadTeams,
  loadPolicies,
  loadPolicy,
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
  setPolicies,
  setPolicy
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
    usersById: {},
    policiesById: {}
  },
  getters: {
    getOrganization: state => organizationid => state.organizationsById[organizationid],
    getUsers: state => organizationid => state.usersByOrganizationId[organizationid],
    getTeams: state => organizationid => state.teamsByOrganizationId[organizationid],
    getPolicies: state => organizationid => state.policiesByOrganizationId[organizationid],
    getUser: state => (organizationid, userId) =>
      state.usersById[organizationid] && state.usersById[organizationid][userId],
    getTeam: state => (organizationid, teamId) =>
      state.teamsById[organizationid] && state.teamsById[organizationid][teamId],
    getPolicy: state => (organizationid, policyId) =>
      state.policiesById[organizationid] && state.policiesById[organizationid][policyId]
  },
  mutations: mapMutations([
    setOrganizations,
    setOrganization,
    setUser,
    setUsers,
    setTeams,
    setTeam,
    setPolicies,
    setPolicy,
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
    loadPolicies,
    loadPolicy
  }
})