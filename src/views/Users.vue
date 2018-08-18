<template>
  <div class="users">
    <md-dialog-confirm
      v-if="idToDelete"
      :md-active="!!idToDelete"
      md-title="Confirm delete"
      :md-content="'Delete user ' + idToDelete + '?'"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />

    <div class="section">
      <md-toolbar md-elevation="0">
        <div class="md-title" style="flex: 1">Users</div>
        <md-button :to="{name: 'user-create', params: {organizationId}}">
          Create new user
        </md-button>
      </md-toolbar>        
      <md-table v-if="searched" v-model="searched">
        <md-table-toolbar>
          <div class="md-toolbar-section-end">
            <md-field md-clearable>
              <md-input placeholder="Search users..." v-model="search" @input="searchOnTable" />
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
            <md-button @click="deleteUser(item.id)" class="md-icon-button md-dense md-primary">
              <md-icon>delete</md-icon>
              <md-tooltip>Delete user</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

import {mapActions} from '../state/utils'
import {loadUsers, changeSnackbarMessage, loadCurrentUser} from '../state/actions'

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
    ...mapState(['currentUser']),
    searched() {
      return this.searchResults || this.getUsers(this.organizationId)
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
    ...mapActions(loadUsers, changeSnackbarMessage, loadCurrentUser),
    searchOnTable() {
      this.searchResults = searchByName(this.getUsers(this.organizationId), this.search)
    },
    deleteUser(idToDelete) {
      if (this.isCurrentUser(idToDelete)) {
        return this.changeSnackbarMessage({message: 'You cannot delete yourself!'})
      }

      this.idToDelete = idToDelete
    },
    async onConfirm() {
      try {
        await this.$udaru.deleteUser(this.idToDelete)
        this.idToDelete = null
        this.changeSnackbarMessage({message: 'User deleted'})
        this.loadUsersData()
      } catch (err) {
        this.changeSnackbarMessage({message: `Error deleting user: ${err}`})
      }
    },
    onCancel() {
      this.idToDelete = null
    },
    isCurrentUser(userId) {
      return this.currentUser && this.currentUser.id === userId
    },
    loadUsersData() {
      this.loadUsers(this.organizationId)
    }
  },
  async mounted() {
    this.loadUsersData()
    this.loadCurrentUser()
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
