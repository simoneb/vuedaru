<template>
  <div class="app">
    <health-check />
    <router-view/>
    <snackbar />
    <github-corner />
  </div>
</template>

<script>
import HealthCheck from './components/HealthCheck.vue'
import Snackbar from './components/Snackbar.vue'
import GithubCorner from './components/GithubCorner.vue'

export default {
  name: 'app',
  components: {
    HealthCheck,
    Snackbar,
    GithubCorner
  }
}
</script>
<style lang="scss" scoped>
.app {
  position: relative;
}
</style>
