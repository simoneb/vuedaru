<template>
<team-details @submit="createTeam"></team-details>
</template>

<script>
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
    async createTeam(team) {
      await this.$udaru.createTeam(this.organizationId, team)

      this.$router.push({name: 'teams', params: {organizationId: this.organizationId}})
    }
  }
}
</script>
