<template>
<div :class="['health-check', {error: this.error, fixed: this.fixed}]">
  <span v-show="error">Disconnected from server</span>
  <span v-show="fixed">Connected</span>
</div>
</template>

<script>
export default {
  name: 'health-check',
  data() {
    return {
      interval: null,
      error: null,
      fixed: null,
      count: 0
    }
  },
  methods: {
    async checkStatus() {
      try {
        await this.$udaru.ping()

        this.fixed = this.error
        this.error = false
      } catch (error) {
        this.fixed = false
        this.error = true
      }
    }
  },
  created() {
    this.interval = setInterval(() => this.checkStatus(), 5000)
    this.checkStatus()
  },
  destroyed() {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" scoped>
$height: 45px;

.health-check {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: $height;
  margin-top: -$height;

  &.error {
    animation: enter 0.4s forwards;
    background: red;
  }

  &.fixed {
    background: green;
    margin-top: 0;
    animation: exit 0.4s forwards;
    animation-delay: 2s;
  }
}

@keyframes enter {
  100% {
    margin-top: 0;
  }
}

@keyframes exit {
  100% {
    margin-top: -$height;
  }
}
</style>
