<template>
<md-field>
  <label for="team-selector">Select team</label>
  <md-select md-dense @md-selected="value => $emit('selected', value)">
    <md-option v-for="team in teams" :key="team.id" :value="team.id">{{team.name}}</md-option>
  </md-select>
  </md-field>
</template>

<script>
import {mapGetters} from 'vuex'

import {mapActions} from '../state/utils'
import {loadTeams} from '../state/actions'

export default {
  name: 'team-select',
  props: {
    organizationId: String
  },
  computed: {
    ...mapGetters(['getTeams']),
    teams() {
      return this.getTeams(this.organizationId)
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
