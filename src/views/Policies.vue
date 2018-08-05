<template>
  <div class="policies">
    <ul v-if="policies">
      <li v-for="policy in policies.data" v-bind:key="policy.id">
        <pre>{{JSON.stringify(policy, null, 2)}}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'policies',
  props: {
    organizationId: String
  },
  data() {
    return {
      policies: null
    }
  },
  async created() {
    this.policies = await this.$udaru.getPolicies(this.organizationId)
  }
}
</script>
