<template>
  <div class="organizations">
    <ul v-if="organizations">
      <li v-for="org in organizations.data" v-bind:key="org.id">
        <router-link :to="'/organizations/' + org.id">{{org.name}}</router-link>
        <button @click="deleteOrganization(org)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'organizations',
  data() {
    return {
      organizations: null
    }
  },
  created() {
    this.load()
  },
  methods: {
    async load() {
      this.organizations = await this.$udaru.getOrganizations()
    },
    async deleteOrganization(org) {
      if (confirm(`Are you sure you want to delete organization "${org.id}"?`)) {
        const user = await this.$udaru.getCurrentUser()

        if (user.organizationId === org.id) {
          return alert('You cannot delete the organization you belong to')
        }

        await this.$udaru.deleteOrganization(org.id)
        this.load()
      }
    }
  }
}
</script>
