<template>
  <div class="users">
    <div class="section">
      <md-toolbar md-elevation="0">
        <div class="md-title">Users</div>
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
          md-label="No users found"
          :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{item}">
          <md-table-cell md-label="ID">
            <router-link :to="{name: 'user', params: {organizationId, userId: item.id}}">
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
    </div>
    <div class="md-layout md-alignment-center-center">
      <md-button class="md-primary md-raised" :to="{name: 'user-create', params: {organizationId}}">
        Create new user
      </md-button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from '../state/utils'
import {loadUsers} from '../state/actions'

const toLower = text => text.toString().toLowerCase()

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }

  return items
}

export default {
  name: 'users',
  props: {
    organizationId: String
  },
  computed: {
    ...mapGetters(['getUsers']),
    searched() {
      return this.searchResults || this.getUsers(this.organizationId)
    }
  },
  data() {
    return {
      search: null,
      searchResults: null
    }
  },
  methods: {
    ...mapActions([loadUsers]),
    searchOnTable() {
      this.searchResults = searchByName(this.getUsers(this.organizationId), this.search)
    }
  },
  async mounted() {
    await this.loadUsers(this.organizationId)
  }
}
</script>
<style scoped>
.users {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}
</style>
