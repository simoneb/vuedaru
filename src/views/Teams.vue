<template>
  <div class="teams">
    <ul v-if="teams">
      <li v-for="team in teams.data" v-bind:key="team.id">
        <pre>{{JSON.stringify(team, null, 2)}}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'teams',
  props: {
    organizationId: String
  },
  data() {
    return {
      teams: null
    }
  },
  async created() {
    this.teams = await this.$udaru.getTeams(this.organizationId)
  }
}
</script>
