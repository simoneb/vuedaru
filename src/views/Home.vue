<template>
  <md-app>
    <md-app-toolbar>
      <div class="md-toolbar-section-start">
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
        <span class="md-title">Organization</span>
      </div>
      <div class="md-toolbar-section-end">
        <md-button v-if="$auth.isAuthenticated()" to="/logout">Logout</md-button>          
      </div>
    </md-app-toolbar>
    <md-app-drawer md-permanent="clipped">
        <md-list>
          <md-list-item :to="{name: 'organization', params: {organizationId}}">
            <md-icon>group_work</md-icon>
            <span class="md-list-item-text">Organization</span>
          </md-list-item>

          <md-list-item :to="{name: 'users', params: {organizationId}}">
            <md-icon>person_outline</md-icon>
            <span class="md-list-item-text">Users</span>
          </md-list-item>

          <md-list-item :to="{name: 'teams', params: {organizationId}}">
            <md-icon>group</md-icon>
            <span class="md-list-item-text">Teams</span>
          </md-list-item>

          <md-list-item :to="{name: 'policies', params: {organizationId}}">
            <md-icon>lock</md-icon>
            <span class="md-list-item-text">Policies</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
    <md-app-content>
      <router-view />
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: 'home',
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

<style lang="scss" scoped>
.md-drawer {
  width: 180px;
  max-width: calc(100vw - 125px);
}
</style>
