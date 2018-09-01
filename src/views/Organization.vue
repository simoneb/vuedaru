<template>
  <div v-if="organization">
    <organization-details @submit="updateOrganization" :organization="organization"></organization-details>
    <policy-associations 
      :policies="organization.policies" 
      :organizationId="organizationId" 
      :deleteAssociation="removePolicyInstance"
      :addAssociation="addPolicyInstance"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {mapActions} from 'vuex-function-actions'
import {loadOrganization, changeSnackbarMessage} from '../state/actions'
import PolicyAssociations from '../components/PolicyAssociations'
import OrganizationDetails from '../components/OrganizationDetails'

export default {
  name: 'organization',
  props: {
    organizationId: String
  },
  components: {
    OrganizationDetails,
    PolicyAssociations
  },
  computed: {
    ...mapGetters(['getOrganization']),
    organization() {
      return this.getOrganization(this.organizationId)
    }
  },
  methods: {
    ...mapActions(loadOrganization, changeSnackbarMessage),
    async updateOrganization({name, description, metadata}) {
      try {
        await this.$udaru.updateOrganization(this.organizationId, {name, description, metadata})
        this.changeSnackbarMessage({message: 'Organization saved!'})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error saving organization: "${err}"`})
      }
      this.loadOrganizationData()
    },
    async removePolicyInstance(policyId) {
      await this.$udaru.removeOrganizationPolicy(this.organizationId, policyId)
      await this.loadOrganizationData()
    },
    async addPolicyInstance(policyInstance) {
      await this.$udaru.addOrUpdateOrganizationPolicy(this.organizationId, policyInstance)
      await this.loadOrganizationData()
    },
    async loadOrganizationData() {
      await this.loadOrganization(this.organizationId)
    }
  },
  watch: {
    $route() {
      this.loadOrganization(this.organizationId)
    }
  },
  created() {
    this.loadOrganizationData()
  }
}
</script>
