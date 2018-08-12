<template>
<div class="section">
  <md-toolbar md-elevation="0">
    <span class="md-title">Create user</span>
  </md-toolbar>
  <md-content>
  <form @submit.prevent="createUser" autocomplete="off">
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-size-50">
        <div>
          <md-field>
            <label for="id">User id</label>
            <md-input id="id" autofocus v-model="id" />
          </md-field>
        </div>
        <div>
          <md-field>
            <label for="name">User name</label>
            <md-input id="name" v-model="name" />
          </md-field>
        </div>
        <div>
          <md-field>
            <label for="metadata">Metadata</label>
            <md-textarea id="metadata" v-model="metadata" />
          </md-field>
        </div>
        <div class="md-layout md-alignment-center-center">
          <md-button type="submit" class="md-primary md-raised">Create</md-button>
        </div>
      </div>
    </div>
  </form>
  </md-content>
</div>
</template>

<script>
export default {
  name: 'user-create',
  props: {
    organizationId: String
  },
  data() {
    return {
      id: null,
      name: null,
      metadata: JSON.stringify({}, null, 2)
    }
  },
  methods: {
    async createUser() {
      await this.$udaru.createUser(this.organizationId, {
        id: this.id,
        name: this.name,
        metadata: this.metadata ? JSON.parse(this.metadata) : null
      })

      this.$router.push({name: 'users', params: {organizationId: this.organizationId}})
    }
  }
}
</script>
