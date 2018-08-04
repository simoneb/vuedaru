<template>
  <h1>We're logging you out...</h1>
</template>

<script>
export default {
  name: 'logout',
  props: ['auth'],
  mounted () {
    this.auth.logout()
    this.$router.push('/')
  }
}
</script>
