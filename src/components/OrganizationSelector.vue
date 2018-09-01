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
import {mapState} from 'vuex'

import {mapActions} from 'vuex-function-actions'
import {loadOrganizations} from '../state/actions'

export default {
  name: 'organization-selector',
  props: {
    organizationId: String
  },
  computed: {
    ...mapState(['organizations'])
  },
  methods: {
    ...mapActions([loadOrganizations])
  },
  async created() {
    this.loadOrganizations()
  }
}
</script>
