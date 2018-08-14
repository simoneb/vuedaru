<template>
<div>
  <team-details @submit="createTeam"></team-details>
  <snackbar />
</div>
</template>

<script>
import {mapActions} from '../state/utils'
import {changeSnackbarMessage} from '../state/actions'
import TeamDetails from '../components/TeamDetails'
import Snackbar from '../components/Snackbar'

export default {
  name: 'team-create',
  props: {
    organizationId: String
  },
  components: {
    TeamDetails,
    Snackbar
  },
  methods: {
    ...mapActions(changeSnackbarMessage),
    async createTeam(team) {
      try {
        await this.$udaru.createTeam(this.organizationId, team)
        this.changeSnackbarMessage({message: 'Team saved!'})
        this.$router.push({name: 'teams', params: {organizationId: this.organizationId}})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error creating team: "${err}"`})
      }
    }
  }
}
</script>
