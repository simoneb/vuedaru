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

  <add-policy-association 
    :organizationId="organizationId" 
    :active.sync="addingAssociation" 
    @add-association="confirmAdd" 
  />
  
  <md-toolbar md-elevation="0">
    <span class="md-title" style="flex: 1">Policies</span>
    <md-button @click="addingAssociation = true">Assign policy</md-button>
  </md-toolbar>

  <md-table v-model="policies" md-model-id="">

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
      <md-table-cell md-label="Variables"><metadata :value="item.variables" /></md-table-cell>
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
import AddPolicyAssociation from '../components/AddPolicyAssociation'
import Metadata from '../components/Metadata'

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
    AddPolicyAssociation,
    Metadata
  },
  data() {
    return {
      addingAssociation: false,
      idToDelete: null
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
    async confirmAdd({id, variables}) {
      try {
        await this.addAssociation({id, variables})
        this.addingAssociation = null
        this.changeSnackbarMessage({message: 'Policy association addedd successfully'})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error adding policy association: ${err}`})
      }
    }
  }
}
</script>
