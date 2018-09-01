<template>
  <div v-if="policy">
    <service-key-dialog :operation="serviceKeyOperation" @cancel="onCancel" />
    <policy-details @submit="doUpdatePolicy" :policy="policy" :organizationId="organizationId" />
    <policy-statements @submit="doUpdatePolicy" :policy="policy" />
    <policy-instances :organization-id="organizationId" :policy-id="policyId" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex-function-actions'

import PolicyDetails from '../components/PolicyDetails.vue'
import PolicyStatements from '../components/PolicyStatements.vue'
import PolicyInstances from '../components/PolicyInstances.vue'
import ServiceKeyDialog from '../components/ServiceKeyDialog.vue'
import {loadPolicy, changeSnackbarMessage} from '../state/actions.js'

export default {
  name: 'policy',
  props: {
    organizationId: String,
    policyId: String
  },
  components: {
    PolicyDetails,
    PolicyStatements,
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
  methods: {
    ...mapActions(loadPolicy, changeSnackbarMessage),
    doUpdatePolicy(policy) {
      this.serviceKeyOperation = serviceKey => this.onConfirm(policy, serviceKey)
    },
    async onConfirm({id, ...policy}, serviceKey) {
      // if there are no statements delete the Statement property
      // or Udaru validation will fail
      if (policy.statements.Statement.length === 0) {
        this.$delete(policy.statements, 'Statement')
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
    }
  },
  created() {
    this.loadPolicyData()
  }
}
</script>
