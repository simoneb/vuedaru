<template>
  <md-app>
    <md-app-toolbar class="md-transparent">
      <div class="md-toolbar-section-start">
        <organization-selector :organizationId="organizationId"></organization-selector>
        <img class="logo" src="https://nearform.github.io/udaru/logo.jpg">
      </div>
      <div class="md-toolbar-section-end">
        <md-progress-spinner v-show="loading" class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        <md-button v-if="$settings.isAuthenticated()" to="/logout">Logout</md-button>          
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

        <md-divider></md-divider>

        <md-list-item :to="{name: 'authorization-check', params: {organizationId}}">
          <md-icon>lock</md-icon>
          <span class="md-list-item-text">Authorization check</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>
    <md-app-content>
      <router-view />
    </md-app-content>
  </md-app>
</template>

<script>
import {mapState} from 'vuex'

import OrganizationSelector from '../components/OrganizationSelector'

export default {
  name: 'home',
  props: {
    organizationId: String
  },
  computed: mapState(['loading']),
  components: {
    OrganizationSelector
  }
}
</script>

<style lang="scss" scoped>
.md-drawer {
  width: 220px;
  max-width: calc(100vw - 125px);
}

.logo {
  height: 28px;
  align-self: flex-start;
  margin-left: 10px;
}
</style>
