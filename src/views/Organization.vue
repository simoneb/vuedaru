<template>
  <div class="organization">
    <md-list>
      <md-list-item>
        <span class="md-body-2">ID</span>
        <span class="md-body-1">{{organization.id}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">Name</span>
        <span class="md-body-1">{{organization.name}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">Description</span>
        <span class="md-body-1">{{organization.description}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">Policies</span>
        <pre class="md-body-1">{{organization.policies}}</pre>
      </md-list-item>
    </md-list>
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
