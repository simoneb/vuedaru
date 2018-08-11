<template>
  <div class="md-layout md-alignment-center-center">
    <md-dialog-confirm
      v-if="organizationToDelete"
      :md-active="!!organizationToDelete"
      :md-content="'Delete organization ' + organizationToDelete.id + '?'"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
    <md-dialog-alert
      :md-active.sync="deleteError"
      md-content="You cannot delete the organization you belong to!"
      md-confirm-text="Ok" />
    <div class="md-layout-item md-size-60">
    <md-list v-if="organizations">
      <template v-for="org in organizations">
        <md-list-item :key="org.id + 'item'" :to="'/organizations/' + org.id">
        <span class="md-list-item-text">{{org.name}}</span>
        <md-button @click.prevent="deleteOrganization(org)" class="md-icon-button md-list-action md-dense">
          <md-icon>delete</md-icon>
        </md-button>
      </md-list-item>
      <md-divider :key="org.id + 'divider'"></md-divider>
      </template>
    </md-list>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapActions} from '../state/utils'
import {loadOrganizations} from '../state/actions'

export default {
  name: 'organizations',
  data() {
    return {
      deleteError: null,
      organizationToDelete: null
    }
  },
  created() {
    this.loadOrganizations()
  },
  computed: {
    ...mapState(['organizations'])
  },
  methods: {
    ...mapActions([loadOrganizations]),
    deleteOrganization(org) {
      this.organizationToDelete = org
    },
    async onConfirm() {
      const user = await this.$udaru.getCurrentUser()

      if (user.organizationId === this.organizationToDelete.id) {
        this.organizationToDelete = null
        this.deleteError = true
        return
      }

      await this.$udaru.deleteOrganization(this.organizationToDelete.id)
      this.organizationToDelete = null

      this.loadOrganizations()
    },
    onCancel() {
      this.organizationToDelete = null
    }
  }
}
</script>
