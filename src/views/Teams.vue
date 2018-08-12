<template>
  <div class="teams">
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title">Teams</span>
      </md-toolbar>
      <md-table v-if="searched" v-model="searched">
        <md-table-toolbar>
          <div class="md-toolbar-section-end">
            <md-field md-clearable>
              <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
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
          <md-table-cell md-label="# Users">{{item.usersCount}}</md-table-cell>
          <md-table-cell md-label="Actions">
            <md-button class="md-icon-button md-dense md-primary">
              <md-icon>delete</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div class="md-layout md-alignment-center-center">
      <md-button class="md-primary md-raised" :to="{name: 'team-create', params: {organizationId}}">
        Create new team
      </md-button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {loadTeams} from '../state/actions'
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
      search: null,
      searchResults: null
    }
  },
  methods: {
    ...mapActions([loadTeams]),
    searchOnTable() {
      this.searchResults = searchByName(this.trams(this.organizationId), this.search)
    }
  },
  async created() {
    await this.loadTeams(this.organizationId)
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
