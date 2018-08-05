<template>
  <div class="organizations">
    <form @submit.prevent="createOrganization">
      <input autofocus v-model="id" placeholder="Organization id">
      <input v-model="name" placeholder="Organization name">
      <input v-model="description" placeholder="Organization description">
      <textarea v-model="metadata" placeholder="{ ... }"></textarea>
      <input v-model="userId" placeholder="User id">  
      <input v-model="userName" placeholder="User name">  
      <button>Create</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'organizations',
  data() {
    return {
      id: null,
      name: null,
      description: null,
      metadata: JSON.stringify({}),
      userId: null,
      userName: null,

      organizations: null
    }
  },
  async created() {
    this.organizations = await this.$udaru.getOrganizations()
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
    }
  }
}
</script>
