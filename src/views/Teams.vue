<template>
  <div class="teams">
    <md-table v-if="ready" v-model="searched">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
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
        <md-table-cell md-label="Actions">
          <md-button class="md-icon-button md-dense md-primary">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <div class="md-layout md-alignment-center-center">
      <md-button class="md-primary md-raised" @click="newTeam">
        Create new team
      </md-button>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      ready: false,
      search: null,
      searched: null,
      teams: []
    }
  },
  methods: {
    newTeam() {},
    async searchOnTable() {
      this.searched = searchByName(this.teams, this.search)
    },
    async loadTeams() {
      this.teams = (await this.$udaru.getTeams(this.organizationId)).data
      this.searched = this.teams
    }
  },
  async created() {
    await this.loadTeams()
    this.ready = true
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

.md-field {
  max-width: 200px;
}
</style>
