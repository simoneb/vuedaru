<template>
<div class="section" v-if="instances">
  <md-toolbar md-elevation="0">
    <span class="md-title" style="flex: 1">Policy instances</span>
  </md-toolbar>
  <md-table v-model="instances">
    <md-table-empty-state 
      md-label="No instances"
      md-description="Assign to Organizations, Teams or Users to create instances of this policy.">
    </md-table-empty-state>
    
    <md-table-row slot="md-table-row" slot-scope="{item}">
      <md-table-cell md-label="Entity ID">
        <router-link :to="{name: item.entityType, params: {organizationId, [`${item.entityType}Id`]: item.entityId}}">
        {{item.entityId}}
        </router-link>
      </md-table-cell>
      <md-table-cell md-label="Entity type">
        <md-icon>{{mapEntityTypeToIcon(item.entityType)}}</md-icon>
        <span class="entity-type"> {{item.entityType}}</span>
      </md-table-cell>
      <md-table-cell md-label="Variables">
        <metadata :value="item.variables" />
      </md-table-cell>
      <md-table-cell md-label="Instance" md-numeric>{{item.instance}}</md-table-cell>
    </md-table-row>
  </md-table>
</div>
</template>
<script>
import {mapGetters} from 'vuex'

import {loadPolicyInstances} from '../state/actions'
import {mapActions} from '../state/utils'
import Metadata from './Metadata'

export default {
  name: 'policy-instances',
  props: {
    organizationId: {
      type: String,
      required: true
    },
    policyId: {
      type: String,
      required: true
    }
  },
  components: {
    Metadata
  },
  computed: {
    ...mapGetters(['getPolicyInstances']),
    instances() {
      return this.getPolicyInstances(this.organizationId, this.policyId)
    }
  },
  methods: {
    ...mapActions(loadPolicyInstances),
    mapEntityTypeToIcon(entityType) {
      switch (entityType) {
        case 'organization':
          return 'group_work'
        case 'team':
          return 'group'
        case 'user':
          return 'person_outline'
      }
    }
  },
  created() {
    this.loadPolicyInstances({
      organizationId: this.organizationId,
      policyId: this.policyId
    })
  }
}
</script>

<style lang="scss" scoped>
.entity-type {
  text-transform: capitalize;
  margin-left: 5px;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
