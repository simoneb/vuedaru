<template>
  <div class="users">
    <ul v-if="users">
      <li v-for="user in users.data" v-bind:key="user.id">
        <pre>{{JSON.stringify(user, null, 2)}}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'users',
  props: {
    organizationId: String
  },
  data() {
    return {
      users: null
    }
  },
  async created() {
    this.users = await this.$udaru.getUsers(this.organizationId)
  }
}
</script>
