<template>
  <team-details @submit="doCreateTeam"></team-details>
</template>

<script>
import {mapActions} from '../state/utils'
import {changeSnackbarMessage, createTeam} from '../state/actions'
import TeamDetails from '../components/TeamDetails'

export default {
  name: 'team-create',
  props: {
    organizationId: String
  },
  components: {
    TeamDetails
  },
  methods: {
    ...mapActions(createTeam, changeSnackbarMessage),
    async doCreateTeam(team) {
      try {
        await this.createTeam({organizationId: this.organizationId, team})
        this.changeSnackbarMessage({message: 'Team saved!'})
        this.$router.push({name: 'teams', params: {organizationId: this.organizationId}})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error creating team: "${err}"`})
      }
    }
  }
}
</script>
