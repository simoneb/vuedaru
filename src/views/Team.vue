<template>
  <div v-if="team">
    <team-details @submit="updateTeam" :team="team" :organizationId="organizationId"></team-details>
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title" style="flex: 1">Users</span>
        <div class="md-toolbar-section-end">
          <user-select layout="box" v-model="selectedUserId" :exclude="team.users" :organizationId="organizationId"></user-select>
          <md-button :disabled="!selectedUserId" @click="addUser(selectedUserId)">Add user</md-button>
        </div>
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

    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title" style="flex: 1">Nested teams</span>
        <team-select 
          :selectedTeamId="selectedTeamId" 
          @selected="teamId => selectedTeamId = teamId" 
          :exclude="nestedTeams.concat(parentTeams).concat([team])" 
          :organizationId="organizationId" 
        />
        <md-button :disabled="!selectedTeamId" @click="addNestedTeam(selectedTeamId)">Add nested team</md-button>
      </md-toolbar>

      <md-table v-model="nestedTeams">
        <md-table-empty-state 
          md-label="No teams"
          md-description="The team doesn't have any nested teams">
        </md-table-empty-state>
        
        <md-table-row slot="md-table-row" slot-scope="{item}">
          <md-table-cell md-label="ID">
            <router-link :to="{name: 'team', params: {organizationId, teamId: item.id}}">
            {{item.id}}
            </router-link>
          </md-table-cell>
          <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
          <md-table-cell md-label="Actions">
            <md-button class="md-icon-button md-primary" @click="removeNestedTeam(item.id)">
              <md-icon>delete</md-icon>
              <md-tooltip>Remove nested team</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>

    <policy-associations 
      :policies="team.policies" 
      :organizationId="organizationId"
      :deleteAssociation="removePolicyInstance"
      :addAssociation="addPolicyInstance"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {defaultTo, flow, filter} from 'lodash/fp'

import {mapActions} from '../state/utils'
import {addUserToTeam, loadTeam, removeUserFromTeam, changeSnackbarMessage, loadTeams} from '../state/actions'
import PolicyAssociations from '../components/PolicyAssociations'
import UserSelect from '../components/UserSelect'
import TeamDetails from '../components/TeamDetails'
import TeamSelect from '../components/TeamSelect'

export default {
  name: 'team',
  props: {
    organizationId: String,
    teamId: String
  },
  components: {
    PolicyAssociations,
    UserSelect,
    TeamSelect,
    TeamDetails
  },
  data() {
    return {
      selectedUserId: null,
      selectedTeamId: null
    }
  },
  computed: {
    ...mapGetters(['getTeam', 'getTeams']),
    team() {
      return this.getTeam(this.organizationId, this.teamId)
    },
    nestedTeams() {
      return flow(
        defaultTo([]),
        filter(({id, path}) => path.includes(`${this.teamId}.${id}`))
      )(this.getTeams(this.organizationId))
    },
    parentTeams() {
      return flow(
        defaultTo([]),
        filter(({id}) => this.team.path.includes(`${id}.`))
      )(this.getTeams(this.organizationId))
    }
  },
  watch: {
    $route() {
      this.loadTeamData()
      this.loadTeamsData()
    }
  },
  methods: {
    ...mapActions([loadTeam, loadTeams, addUserToTeam, removeUserFromTeam, changeSnackbarMessage]),
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
        this.changeSnackbarMessage({message: 'User successfully removed from team'})
        this.loadTeamData()
      } catch (err) {
        this.changeSnackbarMessage({message: `Error removing user from team: ${err}`})
      }
    },
    async removePolicyInstance(policyId) {
      await this.$udaru.removeTeamPolicy(this.organizationId, this.teamId, policyId)
      await this.loadTeamData()
    },
    async addPolicyInstance(policyInstance) {
      await this.$udaru.addOrUpdateTeamPolicy(this.organizationId, this.teamId, policyInstance)
      await this.loadTeamData()
    },
    async removeNestedTeam(teamId) {
      await this.$udaru.removeNestedTeam(this.organizationId, teamId)
      await this.loadTeamData()
      await this.loadTeamsData()
    },
    async addNestedTeam(teamId) {
      await this.$udaru.addNestedTeam(this.organizationId, this.teamId, teamId)

      this.selectedTeamId = null

      await this.loadTeamData()
      await this.loadTeamsData()
    },
    loadTeamsData() {
      this.loadTeams(this.organizationId)
    },
    loadTeamData() {
      this.loadTeam({organizationId: this.organizationId, teamId: this.teamId})
    }
  },
  created() {
    this.loadTeamData()
    this.loadTeamsData()
  }
}
</script>
