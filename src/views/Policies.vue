<template>
  <div class="policies">
    <div class="section">
      <md-toolbar md-elevation="0">
        <div class="md-title">Policies</div>
      </md-toolbar>
      <md-table v-if="searched" v-model="searched">
        <md-table-toolbar>
          <div class="md-toolbar-section-end">
            <md-field md-clearable>
              <md-input placeholder="Search policies..." v-model="search" @input="searchOnTable" />
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
          </md-table-cell>
          <md-table-cell md-label="Actions">
            <md-button class="md-icon-button md-dense md-primary">
              <md-icon>delete</md-icon>
              <md-tooltip>Delete policy</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div class="md-layout md-alignment-center-center">
      <md-button class="md-primary md-raised" :to="{name: 'policy-create', params: {organizationId}}">
        Create new policy
      </md-button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from '../state/utils'
import {loadPolicies} from '../state/actions'

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
  computed: {
    ...mapGetters(['getPolicies']),
    searched() {
      return this.searchResults || this.getPolicies(this.organizationId)
    }
  },
  data() {
    return {
      search: null,
      searchResults: null
    }
  },
  methods: {
    ...mapActions([loadPolicies]),
    searchOnTable() {
      this.searchResults = searchByName(this.getPolicies(this.organizationId), this.search)
    }
  },
  async mounted() {
    await this.loadPolicies(this.organizationId)
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
