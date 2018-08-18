<template>
  <div v-if="policy">
    <service-key-dialog :operation="serviceKeyOperation" @cancel="onCancel" />
    <policy-details @submit="doUpdatePolicy" :policy="policy" />
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title" style="flex: 1">Statements</span>
        <md-button @click="addStatement">Add statement</md-button>
        <md-button @click="doUpdatePolicy(policy)" type="submit">Save</md-button>
      </md-toolbar>
      <md-table v-if="!!policy.statements.Statement" v-model="policy.statements.Statement">
        <md-table-empty-state 
          md-label="No statements"
          md-description="No policy statements.">
          <md-button @click="addStatement" class="md-primary">Add statement</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{item}">
          <md-table-cell md-label="Actions">
            <md-chips v-model="item.Action"></md-chips>
          </md-table-cell>
          <md-table-cell md-label="Effect">
            <md-field>
              <md-select v-model="item.Effect">
                <md-option value="Allow">Allow</md-option>
                <md-option value="Deny">Deny</md-option>
              </md-select>
            </md-field>
          </md-table-cell>
          <md-table-cell md-label="Resources">
            <md-chips v-model="item.Resource"></md-chips>
          </md-table-cell>
          <md-table-cell>
            <md-button @click="removeStatement(item)" class="md-icon-button md-dense md-primary">
              <md-icon>delete</md-icon>
              <md-tooltip>Remove statement</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <policy-instances :organization-id="organizationId" :policy-id="policyId" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import PolicyDetails from '../components/PolicyDetails.vue'
import PolicyInstances from '../components/PolicyInstances.vue'
import ServiceKeyDialog from '../components/ServiceKeyDialog.vue'
import {mapActions} from '../state/utils.js'
import {loadPolicy, changeSnackbarMessage} from '../state/actions.js'

export default {
  name: 'policy',
  props: {
    organizationId: String,
    policyId: String
  },
  components: {
    PolicyDetails,
    PolicyInstances,
    ServiceKeyDialog
  },
  data() {
    return {
      serviceKeyOperation: null
    }
  },
  computed: {
    ...mapGetters(['getPolicy']),
    policy() {
      return this.getPolicy(this.organizationId, this.policyId)
    }
  },
  watch: {
    policy() {
      if (!this.policy.statements.Statement) {
        this.$set(this.policy.statements, 'Statement', [])
      }
    }
  },
  methods: {
    ...mapActions(loadPolicy, changeSnackbarMessage),
    doUpdatePolicy(policy) {
      this.serviceKeyOperation = serviceKey => this.onConfirm(policy, serviceKey)
    },
    async onConfirm({id, ...policy}, serviceKey) {
      // if there are no statements delete the Statement property
      // or Udaru validation will fail
      if (this.policy.statements.Statement.length === 0) {
        this.$delete(this.policy.statements, 'Statement')
      }

      try {
        await this.$udaru.updatePolicy(this.organizationId, id, policy, serviceKey)
        this.changeSnackbarMessage({message: 'Policy saved'})
        this.loadPolicyData()
      } catch (err) {
        this.changeSnackbarMessage({message: `Error saving policy: ${err}`})
      } finally {
        this.serviceKeyOperation = null
      }
    },
    onCancel() {
      this.serviceKeyOperation = null
    },
    loadPolicyData() {
      return this.loadPolicy({organizationId: this.organizationId, policyId: this.policyId})
    },
    addStatement() {
      this.policy.statements.Statement.push({
        Action: [],
        Effect: 'Allow',
        Resource: []
      })
    },
    removeStatement(statement) {
      this.policy.statements.Statement.splice(this.policy.statements.Statement.indexOf(statement), 1)
    }
  },
  created() {
    this.loadPolicyData()
  }
}
</script>
