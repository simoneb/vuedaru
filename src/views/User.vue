<template>
  <div class="user" v-if="user">
    <div class="md-layout">
      <div class="md-layout-item">
        <span class="md-body-2">ID: </span>
        <span class="md-body-1">{{user.id}}</span>
      </div>
      <div class="md-layout-item">
        <span class="md-body-2">Name: </span>
        <span class="md-body-1">{{user.name}}</span>
      </div>
      <div class="md-layout-item">
        <span class="md-body-2">OrganizationID: </span>
        <span class="md-body-1">{{user.organizationId}}</span>
      </div>
    </div>
    <md-content>
      <md-card>
        <md-table v-model="user.teams">
          <md-table-toolbar>
            <span class="md-title">Teams</span>
          </md-table-toolbar>

          <md-table-empty-state 
            md-label="No teams"
            md-description="The user doesn't belong to any teams">
            <team-select @selected="teamId => selectedTeamId = teamId" :organizationId="organizationId"></team-select>
            <md-button class="md-accent md-raised" @click="addToTeam(selectedTeamId)">Add user</md-button>
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
      </md-card>
      <md-card>
        <md-table v-model="user.policies">
          <md-table-toolbar>
            <span class="md-title">Policies</span>
          </md-table-toolbar>

          <md-table-empty-state 
            md-label="No policies"
            md-description="The user doesn't have any associated policies">
            <md-button class="md-accent md-raised">Add new policy</md-button>
          </md-table-empty-state>
          
          <md-table-row slot="md-table-row" slot-scope="{item}">
            <md-table-cell md-label="ID">
              <router-link :to="{name: 'policy', params: {organizationId, policyId: item.id}}">
              {{item.id}}
              </router-link>
            </md-table-cell>
            <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
            <md-table-cell md-label="Version">{{item.version}}</md-table-cell>
            <md-table-cell md-label="Variables"><pre>{{item.variables}}</pre></md-table-cell>
            <md-table-cell md-label="Instance">{{item.instance}}</md-table-cell>
            <md-table-cell md-label="Actions">
              <md-button class="md-icon-button md-primary">
                <md-icon>delete</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-card>
    </md-content>
    <test-user-access :organizationId="organizationId" :userId="userId"></test-user-access>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {loadUser, addUserToTeam, removeUserFromTeam} from '../state/actions'
import {mapActions} from '../state/utils'
import TestUserAccess from '../components/TestUserAccess'
import TeamSelect from '../components/TeamSelect'

export default {
  name: 'user',
  props: {
    organizationId: String,
    userId: String
  },
  components: {
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
      this.loadUserData()
    },
    async removeFromTeam(teamId) {
      await this.removeUserFromTeam({
        organizationId: this.organizationId,
        userId: this.userId,
        teamId
      })
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
