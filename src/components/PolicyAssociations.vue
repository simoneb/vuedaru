<template>
<div class="section">
  <md-dialog-confirm
      v-if="idToDelete"
      :md-active="!!idToDelete"
      md-title="Confirm remove"
      :md-content="'Remove policy association ' + idToDelete + '?'"
      @md-cancel="cancelRemove"
      @md-confirm="confirmRemove" 
  />

  <md-dialog :md-active.sync="addingAssociation">
    <md-dialog-title>Add policy</md-dialog-title>
    <md-dialog-content>
      <policy-select :organizationId="organizationId" @selected="policy => selectedPolicy = policy" />
    </md-dialog-content>
    <md-dialog-actions>
      <md-button @click="addingAssociation = false">Cancel</md-button>
      <md-button class="md-raised md-primary" @click="confirmAdd">Ok</md-button>
    </md-dialog-actions>
  </md-dialog>
  
  <md-toolbar md-elevation="0">
    <span class="md-title" style="flex: 1">Policies</span>
    <md-button @click="addingAssociation = true">Assign policy</md-button>
  </md-toolbar>
  <md-table v-model="policies">

    <md-table-empty-state 
      md-label="No policies"
      md-description="No associated policies">
      <md-button class="md-primary" @click="addingAssociation = true">Assign policy</md-button>
    </md-table-empty-state>
    
    <md-table-row slot="md-table-row" slot-scope="{item}">
      <md-table-cell md-label="ID">
        <router-link :to="{name: 'policy', params: {organizationId, policyId: item.id}}">
        {{item.id}}
        </router-link>
      </md-table-cell>
      <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
      <md-table-cell md-label="Variables"><pre>{{item.variables}}</pre></md-table-cell>
      <md-table-cell md-label="Version" md-numeric>{{item.version}}</md-table-cell>
      <md-table-cell md-label="Instance" md-numeric>{{item.instance}}</md-table-cell>
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
import PolicySelect from '../components/PolicySelect'

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
    },
    addAssociation: {
      type: Function,
      required: true
    }
  },
  components: {
    PolicySelect
  },
  data() {
    return {
      addingAssociation: false,
      idToDelete: null,
      selectedPolicy: null
    }
  },
  methods: {
    ...mapActions(changeSnackbarMessage),
    removePolicyInstance(instanceId) {
      this.idToDelete = instanceId
    },
    async confirmRemove() {
      try {
        await this.deleteAssociation(this.idToDelete)
        this.idToDelete = null
        this.changeSnackbarMessage({message: 'Policy association removed successfully'})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error removing policy association: ${err}`})
      }
    },
    cancelRemove() {
      this.idToDelete = null
    },
    async confirmAdd() {
      try {
        await this.addAssociation(this.selectedPolicy)
        this.addingAssociation = null
        this.selectedPolicy = null
        this.changeSnackbarMessage({message: 'Policy association addedd successfully'})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error adding policy association: ${err}`})
      }
    }
  }
}
</script>
