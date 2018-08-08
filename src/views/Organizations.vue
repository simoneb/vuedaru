<template>
  <div class="organizations">
    <md-app>
      <md-app-toolbar class="md-primary md-large md-dense">
        <div class="md-toolbar-row">
          <span class="md-title">Udaru Organization Manager</span>
        </div>
        <div class="md-toolbar-row">
          <md-tabs md-sync-route class="md-primary">
            <md-tab to="/organizations/select" md-icon="storage" md-label="Organizations"></md-tab> 
            <md-tab to="/organizations/create" md-icon="add_box" md-label="Create"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'organizations'
}
</script>
