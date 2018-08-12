<template>
<div class="section">
  <md-toolbar md-elevation="0">
    <span class="md-title">Create team</span>
  </md-toolbar>
  <md-content>
    <form @submit.prevent="createTeam" autocomplete="off">
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-size-50">
          <div>
            <md-field>
              <label for="id">Team id</label>
              <md-input id="id" autofocus v-model="id" />
            </md-field>
          </div>
          <div>
            <md-field>
              <label for="name">Team name</label>
              <md-input id="name" v-model="name" />
            </md-field>
          </div>
          <div>
            <md-field>
              <label for="name">Team description</label>
              <md-input id="name" v-model="description" />
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
  name: 'team-create',
  props: {
    organizationId: String
  },
  data() {
    return {
      id: null,
      name: null,
      description: null,
      metadata: JSON.stringify({}, null, 2)
    }
  },
  methods: {
    async createTeam() {
      await this.$udaru.createTeam(this.organizationId, {
        id: this.id,
        name: this.name,
        description: this.description,
        metadata: this.metadata ? JSON.parse(this.metadata) : null
      })

      this.$router.push({name: 'teams', params: {organizationId: this.organizationId}})
    }
  }
}
</script>
