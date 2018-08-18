<template>
  <organization-details @submit="doCreateOrganization"></organization-details>
</template>

<script>
import {mapActions} from '../state/utils'
import {changeSnackbarMessage, createOrganization} from '../state/actions'
import OrganizationDetails from '../components/OrganizationDetails'

export default {
  name: 'organization-create',
  components: {
    OrganizationDetails
  },
  methods: {
    ...mapActions(createOrganization, changeSnackbarMessage),
    async doCreateOrganization(organization) {
      try {
        await this.createOrganization({organization})
        this.changeSnackbarMessage({message: 'Organization saved!'})
        this.$router.push({name: 'select-organization'})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error creating organization: ${err}`})
      }
    }
  }
}
</script>
