<template>
  <div class="md-layout md-alignment-center-center">
    <md-dialog-confirm
      v-if="idToDelete"
      :md-active="!!idToDelete"
      md-title="Confirm delete"
      :md-content="'Delete organization ' + idToDelete + '?'"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
    <div class="md-layout-item md-size-60">
    <md-list class="md-double-line">
      <template v-for="{id, name} in organizations">
        <md-list-item
          :class="{'md-inset': !isCurrentOrganization(id)}"
          :key="id + 'item'" 
          :to="{name: 'organization', params: {organizationId: id}}">
          <template v-if="isCurrentOrganization(id)">
            <md-icon class="md-primary">check_circle_outline</md-icon>
            <md-tooltip>Current user organization</md-tooltip>
          </template>
          <div class="md-list-item-text">
            <span>{{id}}</span>
            <span>{{name}}</span>
          </div>
          <md-button @click.prevent="deleteOrganization(id)" class="md-icon-button md-list-action md-primary">
            <md-icon>delete</md-icon>
            <md-tooltip>Delete organization</md-tooltip>
          </md-button>
        </md-list-item>
        <md-divider  :key="id + 'divider'"></md-divider>
      </template>
    </md-list>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import {mapActions} from 'vuex-function-actions'
import {loadOrganizations, loadCurrentUser, changeSnackbarMessage} from '../state/actions'

export default {
  name: 'organizations',
  data() {
    return {
      idToDelete: null
    }
  },
  created() {
    this.loadOrganizations()
    this.loadCurrentUser()
  },
  computed: {
    ...mapState(['organizations', 'currentUser'])
  },
  methods: {
    ...mapActions(loadOrganizations, loadCurrentUser, changeSnackbarMessage),
    deleteOrganization(idToDelete) {
      if (this.isCurrentOrganization(idToDelete)) {
        return this.changeSnackbarMessage({message: 'You cannot delete the organization you belong to!'})
      }

      this.idToDelete = idToDelete
    },
    async onConfirm() {
      try {
        await this.$udaru.deleteOrganization(this.idToDelete)
        this.idToDelete = null
        this.changeSnackbarMessage({message: 'Organization deleted'})
        this.loadOrganizations()
      } catch (err) {
        this.changeSnackbarMessage({message: `Error deleting organization: ${err}`})
      }
    },
    onCancel() {
      this.idToDelete = null
    },
    isCurrentOrganization(organizationId) {
      return this.currentUser && this.currentUser.organizationId === organizationId
    }
  }
}
</script>
