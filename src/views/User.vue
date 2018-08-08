<template>
  <div class="user" v-if="ready">
    {{user | json}}
    <md-list>
      <md-list-item>{{user.id}}</md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'user',
  props: {
    organizationId: String,
    userId: String
  },
  data() {
    return {
      ready: false,
      user: null
    }
  },
  methods: {
    async loadUser() {
      this.user = await this.$udaru.getUser(this.organizationId, this.userId)
    }
  },
  async created() {
    await this.loadUser()
    this.ready = true
  }
}
</script>
