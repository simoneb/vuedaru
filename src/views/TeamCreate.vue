<template>
  <team-details @submit="doCreateTeam" :organizationId="organizationId" />
</template>

<script>
import {mapActions} from 'vuex-function-actions'
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
        this.changeSnackbarMessage({message: 'Team created!'})
        this.$router.push({name: 'teams', params: {organizationId: this.organizationId}})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error creating team: "${err}"`})
      }
    }
  }
}
</script>
