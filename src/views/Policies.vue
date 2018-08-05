<template>
  <div class="policies">
    <ul v-if="policies">
      <li v-for="policy in policies.data" v-bind:key="policy.id">
        {{policy.id}} - {{policy.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'policies',
  data() {
    return {
      policies: null
    }
  },
  async created() {
    this.policies = await this.$udaru.getPolicies()
  }
}
</script>
