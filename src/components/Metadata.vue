<template>
  <ul v-if="value && Object.keys(value).length > 0">
    <li v-for="(value, key) in value" :key="key">
      <code>{{key}}</code>: <strong><code>{{value}}</code></strong>
    </li>
  </ul>
  <span v-else> - </span>
</template>

<script>
export default {
  name: 'metadata',
  props: {
    value: Object
  }
}
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
