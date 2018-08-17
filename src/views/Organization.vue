<template>
  <div v-if="organization">
    <organization-details @submit="updateOrganization" :organization="organization"></organization-details>
    <policy-instances :policies="organization.policies" :organizationId="organizationId" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {mapActions} from '../state/utils'
import {loadOrganization, changeSnackbarMessage} from '../state/actions'
import PolicyInstances from '../components/PolicyInstances'
import OrganizationDetails from '../components/OrganizationDetails'

export default {
  name: 'organization',
  props: {
    organizationId: String
  },
  components: {
    OrganizationDetails,
    PolicyInstances
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
