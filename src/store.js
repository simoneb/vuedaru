import Vue from 'vue'
import Vuex from 'vuex'

import {
  createOrganization,
  loadOrganizations,
  loadOrganization,
  createUser,
  loadUsers,
  loadUser,
  createTeam,
  loadTeams,
  loadPolicies,
  loadPolicy,
  loadTeam,
  addUserToTeam,
  removeUserFromTeam,
  changeSnackbarMessage,
  loadCurrentUser
} from './state/actions'
import {
  setLoading,
  unsetLoading,
  setSnackbarMessage,
  setOrganizations,
  setOrganization,
  setUser,
  setUsers,
  setTeams,
  setTeam,
  setPolicies,
  setPolicy,
  setCurrentUser
} from './state/mutations'
import {mapMutations} from './state/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: 0,
    snackbarMessage: null,
    currentUser: null,

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
    unsetLoading,
    setSnackbarMessage,
    setCurrentUser
  ]),
  actions: {
    createOrganization,
    loadOrganizations,
    loadOrganization,
    createUser,
    loadUser,
    loadUsers,
    loadTeams,
    loadTeam,
    createTeam,
    addUserToTeam,
    removeUserFromTeam,
    loadPolicies,
    loadPolicy,
    changeSnackbarMessage,
    loadCurrentUser
  }
})
