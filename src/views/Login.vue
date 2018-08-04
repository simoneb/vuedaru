<template>
  <div class="about">
    <form v-on:submit.prevent="login">
      <input autofocus v-model="userId" placeholder="User id">
      <button :disabled="!userId">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: ['auth'],
  data() {
    return {
      userId: null
    }
  },
  methods: {
    async login() {
      await this.auth.login(this.userId)
      this.$router.push('/')
    }
  }
}
</script>
