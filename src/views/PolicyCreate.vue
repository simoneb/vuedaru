<template>
<div>
  <service-key-dialog :operation="serviceKeyOperation" @cancel="onCancel" />
  <policy-details @submit="doCreatePolicy" :organizationId="organizationId" />
</div>
</template>

<script>
import {mapActions} from '../state/utils'
import {changeSnackbarMessage, createPolicy} from '../state/actions'
import PolicyDetails from '../components/PolicyDetails'
import ServiceKeyDialog from '../components/ServiceKeyDialog'

export default {
  name: 'policy-create',
  props: {
    organizationId: String
  },
  components: {
    PolicyDetails,
    ServiceKeyDialog
  },
  data() {
    return {
      serviceKeyOperation: null
    }
  },
  methods: {
    ...mapActions(createPolicy, changeSnackbarMessage),
    doCreatePolicy(policy) {
      this.serviceKeyOperation = serviceKey => this.onConfirm(policy, serviceKey)
    },
    async onConfirm(policy, serviceKey) {
      try {
        await this.createPolicy({organizationId: this.organizationId, policy, serviceKey})
        this.changeSnackbarMessage({message: 'Policy created'})
        this.$router.push({name: 'policies', params: {organizationId: this.organizationId}})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error creating policy: ${err}`})
      } finally {
        this.serviceKeyOperation = null
      }
    },
    onCancel() {
      this.serviceKeyOperation = null
    }
  }
}
</script>
