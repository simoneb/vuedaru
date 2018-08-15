<template>
  <div class="app">
    <health-check />
    <router-view/>
  </div>
</template>

<script>
import HealthCheck from './components/HealthCheck.vue'

export default {
  name: 'app',
  components: {
    HealthCheck
  }
}
</script>
<style lang="scss" scoped>
.app {
  position: relative;
}
</style>
