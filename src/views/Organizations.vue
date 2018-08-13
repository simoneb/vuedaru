<template>
  <md-app>
    <md-app-toolbar class="md-large md-dense">
      <div class="md-toolbar-row">
      <span class="md-title">Organizations</span>
      <div class="md-toolbar-section-end"> 
        <md-button v-if="$settings.isAuthenticated()" to="/logout">Logout</md-button>          
      </div>
      </div>
      <div class="md-layout md-toolbar-row md-alignment-center-center">
      <md-tabs class="md-transparent">
        <md-tab to="/organizations/select" md-icon="storage"></md-tab> 
        <md-tab to="/organizations/create" md-icon="add_box"></md-tab>
      </md-tabs>
      </div>
    </md-app-toolbar>
    <md-app-content>
      <router-view />
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: 'organizations'
}
</script>
