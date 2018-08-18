<template>
  <div v-if="team">
    <team-details @submit="updateTeam" :team="team"></team-details>
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title" style="flex: 1">Users</span>
          <user-select :selectedUserId="selectedUserId" @selected="userId => selectedUserId = userId" :exclude="team.users" :organizationId="organizationId"></user-select>
          <md-button :disabled="!selectedUserId" @click="addUser(selectedUserId)">Add user</md-button>
      </md-toolbar>

      <md-table v-model="team.users">    
        <md-table-empty-state 
          md-label="No users"
          md-description="The team doesn't have any users">
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{item}">
          <md-table-cell md-label="ID">
            <router-link :to="{name: 'user', params: {organizationId, userId: item.id}}">
            {{item.id}}
            </router-link>
          </md-table-cell>
          <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
          <md-table-cell md-label="Actions">
            <md-button class="md-icon-button md-primary" @click="removeUser(item.id)">
              <md-icon>delete</md-icon>
              <md-tooltip>Remove user from team</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <policy-instances :policies="team.policies" :organizationId="organizationId" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {mapActions} from '../state/utils'
import {addUserToTeam, loadTeam, removeUserFromTeam, changeSnackbarMessage} from '../state/actions'
import PolicyInstances from '../components/PolicyInstances'
import UserSelect from '../components/UserSelect'
import TeamDetails from '../components/TeamDetails'

export default {
  name: 'team',
  props: {
    organizationId: String,
    teamId: String
  },
  components: {
    PolicyInstances,
    UserSelect,
    TeamDetails
  },
  data() {
    return {
      selectedUserId: null
    }
  },
  computed: {
    ...mapGetters(['getTeam']),
    team() {
      return this.getTeam(this.organizationId, this.teamId)
    }
  },
  methods: {
    ...mapActions([loadTeam, addUserToTeam, removeUserFromTeam, changeSnackbarMessage]),
    async updateTeam({name, description, metadata}) {
      try {
        await this.$udaru.updateTeam(this.organizationId, this.teamId, {name, description, metadata})
        this.changeSnackbarMessage({message: 'Team saved!'})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error saving team: "${err}"`})
      }
      this.loadTeamData()
    },
    async addUser(userId) {
      try {
        await this.addUserToTeam({
          organizationId: this.organizationId,
          teamId: this.teamId,
          userId
        })
        this.selectedUserId = null
        this.changeSnackbarMessage({message: 'User successfully added to team'})
        this.loadTeamData()
      } catch (err) {
        this.changeSnackbarMessage({message: `Error adding user to team: ${err}`})
      }
    },
    async removeUser(userId) {
      try {
        await this.removeUserFromTeam({
          organizationId: this.organizationId,
          teamId: this.teamId,
          userId
        })
        this.selectedUserId = null
        this.changeSnackbarMessage({message: 'User successfully removed from team'})
        this.loadTeamData()
      } catch (err) {
        this.changeSnackbarMessage({message: `Error removing user from team: ${err}`})
      }
    },
    loadTeamData() {
      this.loadTeam({organizationId: this.organizationId, teamId: this.teamId})
    }
  },
  created() {
    this.loadTeamData()
  }
}
</script>
