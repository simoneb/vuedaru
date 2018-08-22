<template>
  <div v-if="user">
    <user-details @submit="updateUser" :user="user" :organizationId="organizationId" />
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title" style="flex: 1">Teams</span>
        <team-select :selectedTeamId="selectedTeamId" @selected="teamId => selectedTeamId = teamId" :exclude="user.teams" :organizationId="organizationId"></team-select>
        <md-button :disabled="!selectedTeamId" @click="addToTeam(selectedTeamId)">Add to team</md-button>
      </md-toolbar>

      <md-table v-model="user.teams">
        <md-table-empty-state 
          md-label="No teams"
          md-description="The user doesn't belong to any teams">
        </md-table-empty-state>
        
        <md-table-row slot="md-table-row" slot-scope="{item}">
          <md-table-cell md-label="ID">
            <router-link :to="{name: 'team', params: {organizationId, teamId: item.id}}">
            {{item.id}}
            </router-link>
          </md-table-cell>
          <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
          <md-table-cell md-label="Actions">
            <md-button class="md-icon-button md-primary" @click="removeFromTeam(item.id)">
              <md-icon>delete</md-icon>
              <md-tooltip>Remove from team</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <policy-associations 
      :policies="user.policies" 
      :organizationId="organizationId" 
      :deleteAssociation="removePolicyInstance"
      :addAssociation="addPolicyInstance"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {mapActions} from '../state/utils'
import {loadUser, addUserToTeam, removeUserFromTeam, changeSnackbarMessage} from '../state/actions'
import PolicyAssociations from '../components/PolicyAssociations'
import TeamSelect from '../components/TeamSelect'
import UserDetails from '../components/UserDetails'

export default {
  name: 'user',
  props: {
    organizationId: String,
    userId: String
  },
  components: {
    PolicyAssociations,
    TeamSelect,
    UserDetails
  },
  data() {
    return {
      selectedTeamId: null
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    user() {
      return this.getUser(this.organizationId, this.userId)
    }
  },
  methods: {
    ...mapActions(loadUser, addUserToTeam, removeUserFromTeam, changeSnackbarMessage),
    async updateUser({name, metadata}) {
      try {
        await this.$udaru.updateUser(this.organizationId, this.userId, {name, metadata})
        this.changeSnackbarMessage({message: 'User saved!'})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error saving user: "${err}"`})
      }
      this.loadUserData()
    },
    async addToTeam(teamId) {
      await this.addUserToTeam({
        organizationId: this.organizationId,
        userId: this.userId,
        teamId
      })

      this.selectedTeamId = null
      this.loadUserData()
    },
    async removeFromTeam(teamId) {
      await this.removeUserFromTeam({
        organizationId: this.organizationId,
        userId: this.userId,
        teamId
      })

      this.selectedTeamId = null
      this.loadUserData()
    },
    async removePolicyInstance(policyId) {
      await this.$udaru.removeUserPolicy(this.organizationId, this.userId, policyId)
      await this.loadUserData()
    },
    async addPolicyInstance(policyInstance) {
      await this.$udaru.addOrUpdateUserPolicy(this.organizationId, this.userId, policyInstance)
      await this.loadUserData()
    },
    loadUserData() {
      this.loadUser({organizationId: this.organizationId, userId: this.userId})
    }
  },
  created() {
    this.loadUserData()
  }
}
</script>
