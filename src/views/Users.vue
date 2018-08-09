<template>
  <div class="users">
    <md-table v-if="ready" v-model="searched">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
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
    <div class="md-layout md-alignment-center-center">
      <md-button class="md-primary md-raised" :to="{name: 'user-create', params: {organizationId}}">
        Create new user
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
  name: 'users',
  props: {
    organizationId: String
  },
  data() {
    return {
      ready: false,
      search: null,
      searched: null,
      users: []
    }
  },
  methods: {
    async searchOnTable() {
      this.searched = searchByName(this.users, this.search)
    },
    async loadUsers() {
      this.users = (await this.$udaru.getUsers(this.organizationId)).data
      this.searched = this.users
    }
  },
  async created() {
    await this.loadUsers()
    this.ready = true
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

.md-field {
  max-width: 200px;
}
</style>
