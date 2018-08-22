<template>
  <user-details @submit="doCreateUser" :organizationId="organizationId" />
</template>

<script>
import {mapActions} from '../state/utils'
import {changeSnackbarMessage, createUser} from '../state/actions'
import UserDetails from '../components/UserDetails'

export default {
  name: 'user-create',
  props: {
    organizationId: String
  },
  components: {
    UserDetails
  },
  methods: {
    ...mapActions(createUser, changeSnackbarMessage),
    async doCreateUser(user) {
      try {
        await this.createUser({organizationId: this.organizationId, user})
        this.changeSnackbarMessage({message: 'User created!'})
        this.$router.push({name: 'users', params: {organizationId: this.organizationId}})
      } catch (err) {
        this.changeSnackbarMessage({message: `Error creating user: "${err}"`})
      }
    }
  }
}
</script>
