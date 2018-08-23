<template>
  <div class="policies">
    <service-key-dialog :operation="serviceKeyOperation" @cancel="onCancel" />
    <div class="section">
      <md-toolbar md-elevation="0">
        <div class="md-title" style="flex: 1">Policies</div>
        <md-button :to="{name: 'policy-create', params: {organizationId}}">
          Create new policy
        </md-button>
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
          :md-description="search && `No policy found for this '${search}' query. Try a different search term or create a new policy.`">
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{item}">
          <md-table-cell md-label="ID">
            <router-link :to="{name: 'policy', params: {organizationId, policyId: item.id}}">
              {{item.id}}
            </router-link>
          </md-table-cell>
          <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
          <md-table-cell md-label="Statements">
            <ul v-if="item.statements.Statement">
              <li v-for="({Action, Effect, Resource}, index) in item.statements.Statement" :key="index">
                <strong>{{Effect}}</strong>
                <ul v-if="Action.length > 1 || Resource.length > 1">
                  <li>
                    action{{Action.length > 1 ? 's' : ''}} <code>{{Action.join(', ')}}</code>
                  </li>
                  <li>
                    on resource{{Resource.length > 1 ? 's' : ''}} <code>{{Resource.join(', ')}}</code>
                  </li>
                </ul>
                <span v-else>
                  action <code>{{Action[0]}}</code> on resource <code>{{Resource[0]}}</code>
                </span>
              </li>
            </ul>
            <span v-else> - </span>
          </md-table-cell>
          <md-table-cell md-label="Version" md-numeric>{{item.version}}</md-table-cell>
          <md-table-cell md-label="Actions">
            <md-button @click="deletePolicy(item.id)" class="md-icon-button md-dense md-primary">
              <md-icon>delete</md-icon>
              <md-tooltip>Delete policy</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {loadPolicies, changeSnackbarMessage} from '../state/actions'
import {mapActions} from '../state/utils'
import ServiceKeyDialog from '../components/ServiceKeyDialog'

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
  components: {
    ServiceKeyDialog
  },
  computed: {
    ...mapGetters(['getPolicies']),
    searched() {
      return this.searchResults || this.getPolicies(this.organizationId)
    }
  },
  data() {
    return {
      serviceKeyOperation: null,

      search: null,
      searchResults: null
    }
  },
  methods: {
    ...mapActions(loadPolicies, changeSnackbarMessage),
    searchOnTable() {
      this.searchResults = searchByName(this.getPolicies(this.organizationId), this.search)
    },
    deletePolicy(idToDelete) {
      this.serviceKeyOperation = serviceKey => this.onConfirm(idToDelete, serviceKey)
    },
    async onConfirm(idToDelete, serviceKey) {
      try {
        await this.$udaru.deletePolicy(this.organizationId, idToDelete, serviceKey)
        this.changeSnackbarMessage({message: 'Policy deleted'})
        this.loadPoliciesData()
      } catch (err) {
        this.changeSnackbarMessage({message: `Error deleting policy: ${err}`})
      } finally {
        this.serviceKeyOperation = null
      }
    },
    onCancel() {
      this.serviceKeyOperation = null
    },
    loadPoliciesData() {
      this.loadPolicies(this.organizationId)
    }
  },
  async mounted() {
    this.loadPoliciesData()
  }
}
</script>

<style scoped lang="scss">
.policies {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}

ul {
  list-style-type: none;
  margin: 0;
  padding-left: 5px;
}
</style>
