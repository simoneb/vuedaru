<template>
  <div class="app">
    <health-check />
    <router-view/>
    <snackbar />
  </div>
</template>

<script>
import HealthCheck from './components/HealthCheck.vue'
import Snackbar from './components/Snackbar.vue'

export default {
  name: 'app',
  components: {
    HealthCheck,
    Snackbar
  }
}
</script>
<style lang="scss" scoped>
.app {
  position: relative;
}
</style>
