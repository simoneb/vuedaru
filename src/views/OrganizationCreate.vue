<template>
  <form @submit.prevent="createOrganization" novalidate autocomplete="off">
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-size-50">
        <div>
          <md-field>
            <label for="id">Orgnanization id</label>
            <md-input id="id" autofocus v-model="id" />
          </md-field>
        </div>
        <div>
          <md-field>
            <label for="name">Organization name</label>
            <md-input id="name" v-model="name" />
          </md-field>
        </div>
        <div>
          <md-field>
            <label for="description">Organization description</label>
            <md-input id="description" v-model="description" />
          </md-field>
        </div>
        <div>
          <md-field>
            <label for="metadata">Metadata</label>
            <md-textarea id="metadata" v-model="metadata" />
          </md-field>
        </div>
        <div>
          <md-field>
            <label for="userId">Organization administrator id</label>
            <md-input id="userId" v-model="userId" />
          </md-field>
        </div>
        <div>
          <md-field>
            <label for="userName">Organization administrator name</label>
            <md-input id="userName" v-model="userName" />
          </md-field>
        </div>
        <div class="md-layout md-alignment-center-center">
          <md-button type="submit" class="md-primary md-raised">Create</md-button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'organization-create',
  data() {
    return {
      id: null,
      name: null,
      description: null,
      metadata: JSON.stringify({}, null, 2),
      userId: null,
      userName: null
    }
  },
  methods: {
    async createOrganization() {
      await this.$udaru.createOrganization({
        id: this.id,
        name: this.name,
        description: this.description,
        metadata: this.metadata ? JSON.parse(this.metadata) : null,
        user:
          this.userId || this.userName
            ? {
                id: this.userId,
                name: this.userName
              }
            : undefined
      })

      this.$router.push({name: 'select-organization'})
    }
  }
}
</script>
