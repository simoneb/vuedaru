<template>
  <div class="user" v-if="ready">
    <md-list>
      <md-list-item>
        <span class="md-body-2">ID</span>
        <span class="md-body-1">{{user.id}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">Name</span>
        <span class="md-body-1">{{user.name}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">OrganizationID</span>
        <span class="md-body-1">{{user.organizationId}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">Teams</span>
        <pre class="md-body-1">{{user.teams}}</pre>
      </md-list-item>
    </md-list>
    <md-table v-model="user.policies">
      <md-table-toolbar>
        <span class="md-title">Policies</span>
      </md-table-toolbar>

      <md-table-empty-state 
        md-label="No policies"
        md-description="The user doesn't have any associated policies">
        <md-button class="md-accent md-raised">Add new policy</md-button>
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
  </div>
</template>

<script>
export default {
  name: 'user',
  props: {
    organizationId: String,
    userId: String
  },
  data() {
    return {
      a: [],
      ready: false,
      user: null
    }
  },
  methods: {
    async loadUser() {
      this.user = await this.$udaru.getUser(this.organizationId, this.userId)
    }
  },
  async created() {
    await this.loadUser()
    this.ready = true
  }
}
</script>
