<template>
  <div v-if="user">
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title">User</span>
      </md-toolbar>
      <md-content>
        <md-list>
      <md-list-item>
        <span class="md-body-2">ID: </span>
        <span class="md-body-1">{{user.id}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">Name: </span>
        <span class="md-body-1">{{user.name}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">OrganizationID: </span>
        <span class="md-body-1">{{user.organizationId}}</span>
      </md-list-item>
        </md-list>
      </md-content>
    </div>
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title" style="flex: 1">Teams</span>
        <div class="md-toolbar-section-end">
          <team-select :selectedTeamId="selectedTeamId" @selected="teamId => selectedTeamId = teamId" :exclude="user.teams" :organizationId="organizationId"></team-select>
          <md-button class="md-accent" :disabled="!selectedTeamId" @click="addToTeam(selectedTeamId)">Add to team</md-button>
        </div>
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
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <policy-instances :policies="user.policies" :organizationId="organizationId" />
    <test-user-access :organizationId="organizationId" :userId="userId"></test-user-access>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {loadUser, addUserToTeam, removeUserFromTeam} from '../state/actions'
import {mapActions} from '../state/utils'
import PolicyInstances from '../components/PolicyInstances'
import TestUserAccess from '../components/TestUserAccess'
import TeamSelect from '../components/TeamSelect'

export default {
  name: 'user',
  props: {
    organizationId: String,
    userId: String
  },
  components: {
    PolicyInstances,
    TestUserAccess,
    TeamSelect
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
    ...mapActions(loadUser, addUserToTeam, removeUserFromTeam),
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
    loadUserData() {
      this.loadUser({organizationId: this.organizationId, userId: this.userId})
    }
  },
  created() {
    this.loadUserData()
  }
}
</script>
