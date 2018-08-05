<template>
  <div class="organizations">
    <ul v-if="organizations">
      <li v-for="org in organizations.data" v-bind:key="org.id">
        <router-link :to="'/organizations/' + org.id">{{org.name}}</router-link>
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
  async created() {
    this.organizations = await this.$udaru.getOrganizations()
  }
}
</script>
