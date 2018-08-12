<template>
  <div class="organization" v-if="organization">
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title">Organization</span>
      </md-toolbar>
      <md-content>
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
        </md-list>
      </md-content>
    </div>
    <policy-instances :policies="organization.policies" :organizationId="organizationId" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {mapActions} from '../state/utils'
import {loadOrganization} from '../state/actions'
import PolicyInstances from '../components/PolicyInstances'

export default {
  name: 'organization',
  props: {
    organizationId: String
  },
  components: {
    PolicyInstances
  },
  computed: {
    ...mapGetters(['getOrganization']),
    organization() {
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
