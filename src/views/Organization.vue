<template>
  <div class="organization">
    <code>
    {{JSON.stringify(organization, null, 2)}}
    </code>
  </div>
</template>

<script>
export default {
  name: 'organizations',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      organization: null
    }
  },
  async created() {
    this.organization = await this.$udaru.getOrganization(this.id)
  }
}
</script>
