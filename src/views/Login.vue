<template>
  <div class="about">
    <form @submit.prevent="login">
      <input autofocus v-model="userId" placeholder="User id">
      <button :disabled="!userId">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userId: null
    }
  },
  methods: {
    async login() {
      await this.$auth.login(this.userId)
      this.$router.push('/')
    }
  }
}
</script>
