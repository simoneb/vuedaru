<template>
  <div class="organization">
    <code>
    {{JSON.stringify(organization, null, 2)}}
    </code>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'organization',
  props: {
    organizationId: {
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
    this.organization = await this.$udaru.getOrganization(this.organizationId)
  }
}
</script>
