<template>
  <div class="policies">
    <md-table v-if="ready" v-model="searched">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <md-field md-clearable>
            <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
          </md-field>
        </div>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No policies found"
        :md-description="`No policy found for this '${search}' query. Try a different search term or create a new policy.`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{item}">
        <md-table-cell md-label="ID">
          <router-link :to="{name: 'policy', params: {organizationId, policyId: item.id}}">
            {{item.id}}
          </router-link>
        </md-table-cell>
        <md-table-cell md-label="Version">{{item.version}}</md-table-cell>
        <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
        <md-table-cell md-label="Statements">
          <textarea readonly :value="item.statements | json"></textarea>
          <md-tooltip md-direction="top">{{item.statements | json}}</md-tooltip>
        </md-table-cell>
        <md-table-cell md-label="Actions">
          <md-button class="md-icon-button md-dense md-primary">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <div class="md-layout md-alignment-center-center">
      <md-button class="md-primary md-raised" @click="newPolicy">
        Create new policy
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
  name: 'policies',
  props: {
    organizationId: String
  },
  data() {
    return {
      ready: false,
      search: null,
      searched: null,
      policies: []
    }
  },
  methods: {
    newPolicy() {},
    async searchOnTable() {
      this.searched = searchByName(this.policies, this.search)
    },
    async loadPolicies() {
      this.policies = (await this.$udaru.getPolicies(this.organizationId)).data
      this.searched = this.policies
    }
  },
  async created() {
    await this.loadPolicies()
    this.ready = true
  }
}
</script>

<style scoped>
.policies {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}
</style>
