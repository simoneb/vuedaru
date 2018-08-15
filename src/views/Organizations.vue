<template>
  <md-app>
    <md-app-toolbar class="md-large md-dense md-transparent">
      <div class="md-toolbar-row">
      <div class="md-toolbar-section-start"> 
        <toolbar-logo />
        <span class="md-title">Organizations</span>
      </div>
      <div class="md-toolbar-section-end"> 
        <md-button class="md-icon-button" :to="{name: 'settings'}"><md-icon>settings</md-icon></md-button>
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
import ToolbarLogo from '../components/ToolbarLogo'

export default {
  name: 'organizations',
  components: {
    ToolbarLogo
  }
}
</script>
