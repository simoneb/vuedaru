<template>
  <div class="users">
    <ul v-if="users">
      <li v-for="user in users.data" v-bind:key="user.id">
        {{user.id}} - {{user.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'users',
  data() {
    return {
      users: null
    }
  },
  async created() {
    this.users = await this.$udaru.getUsers()
  }
}
</script>
