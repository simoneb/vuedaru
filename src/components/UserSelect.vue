<template>
  <md-autocomplete 
    :disabled="!anyUsers"
    md-dense
    :md-options="users.map(({id}) => id)"
    v-model="localValue"
    :md-layout="layout"
    :md-input-placeholder="anyUsers ? 'Select a user' : 'No available users'"
  />
</template>

<script>
import {mapGetters} from 'vuex'
import {differenceBy} from 'lodash/fp'

import {mapActions} from 'vuex-function-actions'
import {loadUsers} from '../state/actions'

export default {
  name: 'user-select',
  props: {
    organizationId: String,
    value: String,
    layout: {
      type: String
    },
    exclude: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapGetters(['getUsers']),
    users() {
      return differenceBy('id', this.getUsers(this.organizationId))(this.exclude)
    },
    anyUsers() {
      return !!this.users.length
    },
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
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
