<template>
<div class="section">
  <md-dialog-confirm
      v-if="idToDelete"
      :md-active="!!idToDelete"
      md-title="Confirm remove"
      :md-content="'Remove policy association ' + idToDelete + '?'"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  <md-toolbar md-elevation="0">
    <span class="md-title" style="flex: 1">Policies</span>
    <md-button>Assign policy</md-button>
  </md-toolbar>
  <md-table v-model="policies">
    <md-table-empty-state 
      md-label="No policies"
      md-description="No associated policies">
      <md-button class="md-primary">Assign policy</md-button>
    </md-table-empty-state>
    
    <md-table-row slot="md-table-row" slot-scope="{item}">
      <md-table-cell md-label="ID">
        <router-link :to="{name: 'policy', params: {organizationId, policyId: item.id}}">
        {{item.id}}
        </router-link>
      </md-table-cell>
      <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
      <md-table-cell md-label="Version">{{item.version}}</md-table-cell>
      <md-table-cell md-label="Variables"><pre>{{item.variables}}</pre></md-table-cell>
      <md-table-cell md-label="Instance">{{item.instance}}</md-table-cell>
      <md-table-cell md-label="Actions">
        <md-button class="md-icon-button md-primary" @click="removePolicyInstance(item.id)">
          <md-icon>delete</md-icon>
          <md-tooltip>Remove policy association</md-tooltip>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</div>
</template>
<script>
import {changeSnackbarMessage} from '../state/actions'
import {mapActions} from '../state/utils'

export default {
  name: 'policy-associations',
  props: {
    policies: {
      type: Array,
      required: true
    },
    organizationId: {
      type: String,
      required: true
    },
    deleteAssociation: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      idToDelete: null
    }
  },
  methods: {
    ...mapActions(changeSnackbarMessage),
    removePolicyInstance(instanceId) {
      this.idToDelete = instanceId
    },
    async onConfirm() {
      try {
        await this.deleteAssociation(this.idToDelete)
        this.idToDelete = null
        this.changeSnackbarMessage({message: 'Policy association removed successfully'})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error removing policy association: ${err}`})
      }
    },
    onCancel() {
      this.idToDelete = null
    }
  }
}
</script>
