<template>
  <div class="team" v-if="team">
    <div class="md-layout">
      <div class="md-layout-item">
        <span class="md-body-2">ID: </span>
        <span class="md-body-1">{{team.id}}</span>
      </div>
      <div class="md-layout-item">
        <span class="md-body-2">Name: </span>
        <span class="md-body-1">{{team.name}}</span>
      </div>
      <div class="md-layout-item">
        <span class="md-body-2">OrganizationID: </span>
        <span class="md-body-1">{{team.organizationId}}</span>
      </div>
    </div>
    <md-content>
      <md-card>
        <md-table v-model="team.users">
          <md-table-toolbar>
            <span class="md-title">Users</span>
          </md-table-toolbar>

          <md-table-empty-state 
            md-label="No users"
            md-description="The team doesn't have any users">
            <user-select @selected="userId => selectedUserId = userId" :organizationId="organizationId"></user-select>
            <md-button class="md-accent md-raised" @click="addUser(selectedUserId)">Add user</md-button>
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
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-card>
      <md-card>
        <md-table v-model="team.policies">
          <md-table-toolbar>
            <span class="md-title">Policies</span>
          </md-table-toolbar>

          <md-table-empty-state 
            md-label="No policies"
            md-description="The team doesn't have any associated policies">
            <md-button class="md-accent md-raised">Add policy</md-button>
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
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {mapActions} from '../state/utils'
import {addUserToTeam, loadTeam, removeUserFromTeam} from '../state/actions'
import UserSelect from '../components/UserSelect'

export default {
  name: 'team',
  props: {
    organizationId: String,
    teamId: String
  },
  components: {
    UserSelect
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
    ...mapActions([loadTeam, addUserToTeam, removeUserFromTeam]),
    async addUser(userId) {
      await this.addUserToTeam({
        organizationId: this.organizationId,
        teamId: this.teamId,
        userId
      })
      this.loadTeamData()
    },
    async removeUser(userId) {
      await this.removeUserFromTeam({
        organizationId: this.organizationId,
        teamId: this.teamId,
        userId
      })
      this.loadTeamData()
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
