<template>
  <div class="organization" v-if="currentOrganization">
    <md-list>
      <md-list-item>
        <span class="md-body-2">ID</span>
        <span class="md-body-1">{{currentOrganization.id}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">Name</span>
        <span class="md-body-1">{{currentOrganization.name}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">Description</span>
        <span class="md-body-1">{{currentOrganization.description}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">Policies</span>
        <pre class="md-body-1">{{currentOrganization.policies}}</pre>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {mapActions} from '../state/utils'
import {loadOrganization} from '../state/actions'

export default {
  name: 'organization',
  props: {
    organizationId: String
  },
  computed: {
    ...mapGetters(['getOrganization']),
    currentOrganization() {
      return this.getOrganization(this.organizationId)
    }
  },
  methods: {
    ...mapActions(loadOrganization)
  },
  watch: {
    $route() {
      this.loadOrganization(this.organizationId)
    }
  },
  async created() {
    await this.loadOrganization(this.organizationId)
  }
}
</script>
