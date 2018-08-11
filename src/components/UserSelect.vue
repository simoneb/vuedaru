<template>
<md-field>
  <label for="user-selector">Select user</label>
  <md-select md-dense @md-selected="value => $emit('selected', value)">
    <md-option v-for="user in users" :key="user.id" :value="user.id">{{user.name}}</md-option>
  </md-select>
  </md-field>
</template>

<script>
import {mapGetters} from 'vuex'

import {mapActions} from '../state/utils'
import {loadUsers} from '../state/actions'

export default {
  name: 'user-select',
  props: {
    organizationId: String
  },
  computed: {
    ...mapGetters(['getUsers']),
    users() {
      return this.getUsers(this.organizationId)
    }
  },
  methods: {
    ...mapActions([loadUsers])
  },
  async created() {
    this.loadUsers(this.organizationId)
  }
}
</script>
