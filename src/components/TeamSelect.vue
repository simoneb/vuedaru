<template>
<md-field class="team-select-field">
  <md-select 
    :disabled="!anyTeams" 
    md-dense 
    @md-selected="value => $emit('selected', value)" 
    :placeholder="anyTeams ? 'Select a team' : 'No available teams'"
    :value="selectedTeamId">
    <md-option v-for="team in teams" :key="team.id" :value="team.id">{{team.name}}</md-option>
  </md-select>
</md-field>
</template>

<script>
import {mapGetters} from 'vuex'
import {differenceBy} from 'lodash/fp'

import {mapActions} from 'vuex-function-actions'
import {loadTeams} from '../state/actions'

export default {
  name: 'team-select',
  props: {
    organizationId: String,
    exclude: Array,
    selectedTeamId: String
  },
  computed: {
    ...mapGetters(['getTeams']),
    teams() {
      return differenceBy('id', this.getTeams(this.organizationId))(this.exclude)
    },
    anyTeams() {
      return !!this.teams.length
    }
  },
  methods: {
    ...mapActions([loadTeams])
  },
  async created() {
    this.loadTeams(this.organizationId)
  }
}
</script>
<style lang="scss">
.md-field.team-select-field {
  width: auto;
}
</style>
