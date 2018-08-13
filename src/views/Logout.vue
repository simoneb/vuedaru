<template>
  <h1>We're logging you out...</h1>
</template>

<script>
export default {
  name: 'logout',
  mounted() {
    this.$settings.logout()
    this.$router.push('/')
  }
}
</script>
