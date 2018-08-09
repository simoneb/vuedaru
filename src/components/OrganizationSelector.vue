<template>
  <md-menu>
    <md-button md-menu-trigger>{{organizationId}}</md-button>
    <md-menu-content>
      <md-menu-item 
        v-for="organization in organizations" 
        :to="{name: 'organization', params: {organizationId: organization.id}}"
        :key="organization.id">
        {{organization.id}}
      </md-menu-item>
      <md-divider></md-divider>
      <md-menu-item to="/">
        <md-icon>home</md-icon>
        <span>Organizations manager</span>
      </md-menu-item>
    </md-menu-content>
  </md-menu>
</template>

<script>
export default {
  name: 'organization-selector',
  data() {
    return {
      organizations: []
    }
  },
  props: {
    organizationId: String
  },
  async created() {
    this.organizations = (await this.$udaru.getOrganizations()).data
  }
}
</script>
