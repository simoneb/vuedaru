<template>
<md-field class="user-select-field">
  <md-select 
    :disabled="!anyUsers" 
    md-dense 
    @md-selected="userId => $emit('selected', userId)" 
    :placeholder="anyUsers ? 'Select a user' : 'No available users'"
    :value="selectedUserId">
    <md-option v-for="user in users" :key="user.id" :value="user.id">{{user.name}}</md-option>
  </md-select>
</md-field>
</template>

<script>
import {mapGetters} from 'vuex'
import {differenceBy} from 'lodash/fp'

import {mapActions} from '../state/utils'
import {loadUsers} from '../state/actions'

export default {
  name: 'user-select',
  props: {
    organizationId: String,
    exclude: {
      type: Array,
      default() {
        return []
      }
    },
    selectedUserId: String
  },
  computed: {
    ...mapGetters(['getUsers']),
    users() {
      return differenceBy('id', this.getUsers(this.organizationId))(this.exclude)
    },
    anyUsers() {
      return !!this.users.length
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
<style lang="scss">
.md-field.user-select-field {
  width: auto;
}
</style>
