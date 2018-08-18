<template>
  <div class="teams">
    <md-dialog-confirm
      v-if="idToDelete"
      :md-active="!!idToDelete"
      md-title="Confirm delete"
      :md-content="'Delete team ' + idToDelete + '?'"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title" style="flex: 1">Teams</span>
        <md-button :to="{name: 'team-create', params: {organizationId}}">
          Create new team
        </md-button>
      </md-toolbar>
      <md-table v-if="searched" v-model="searched">
        <md-table-toolbar>
          <div class="md-toolbar-section-end">
            <md-field md-clearable>
              <md-input placeholder="Search teams..." v-model="search" @input="searchOnTable" />
            </md-field>
          </div>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No teams found"
          :md-description="`No team found for this '${search}' query. Try a different search term or create a new team.`">
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{item}">
          <md-table-cell md-label="ID">
            <router-link :to="{name: 'team', params: {organizationId, teamId: item.id}}">
              {{item.id}}
            </router-link>
          </md-table-cell>
          <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
          <md-table-cell md-label="Organization ID">{{item.organizationId}}</md-table-cell>
          <md-table-cell md-label="# Users" md-numeric>{{item.usersCount || '-'}}</md-table-cell>
          <md-table-cell md-label="Actions">
            <md-button @click="deleteTeam(item.id)" class="md-icon-button md-dense md-primary">
              <md-icon>delete</md-icon>
              <md-tooltip>Delete team</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {loadTeams, changeSnackbarMessage} from '../state/actions'
import {mapActions} from '../state/utils'

const toLower = text => text.toString().toLowerCase()

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }

  return items
}

export default {
  name: 'teams',
  props: {
    organizationId: String
  },
  computed: {
    ...mapGetters(['getTeams']),
    searched() {
      return this.searchResults || this.getTeams(this.organizationId)
    }
  },
  data() {
    return {
      idToDelete: null,
      search: null,
      searchResults: null
    }
  },
  methods: {
    ...mapActions(loadTeams, changeSnackbarMessage),
    searchOnTable() {
      this.searchResults = searchByName(this.getTeams(this.organizationId), this.search)
    },
    deleteTeam(idToDelete) {
      this.idToDelete = idToDelete
    },
    async onConfirm() {
      try {
        await this.$udaru.deleteTeam(this.idToDelete)
        this.idToDelete = null
        this.changeSnackbarMessage({message: 'Team deleted'})
        this.loadTeamsData()
      } catch (err) {
        this.changeSnackbarMessage({message: `Error deleting team: ${err}`})
      }
    },
    onCancel() {
      this.idToDelete = null
    },
    loadTeamsData() {
      this.loadTeams(this.organizationId)
    }
  },
  async mounted() {
    this.loadTeamsData()
  }
}
</script>
<style scoped>
.teams {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}
</style>
