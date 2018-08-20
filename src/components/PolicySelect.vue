<template>
<md-field class="policy-select-field">
  <md-select 
    :disabled="!anyPolicies" 
    @md-selected="policySelected" 
    :placeholder="anyPolicies ? 'Select a policy' : 'No available policies'"
    v-model="selectedPolicyId">
    <md-option v-for="policy in policies" :key="policy.id" :value="policy.id">{{policy.name}}</md-option>
  </md-select>
</md-field>
</template>

<script>
import {mapGetters} from 'vuex'
import {differenceBy} from 'lodash/fp'

import {mapActions} from '../state/utils'
import {loadPolicies} from '../state/actions'

export default {
  name: 'policy-select',
  props: {
    organizationId: String
  },
  data() {
    return {
      selectedPolicyId: null
    }
  },
  computed: {
    ...mapGetters(['getPolicies']),
    policies() {
      return differenceBy('id', this.getPolicies(this.organizationId))(this.exclude)
    },
    anyPolicies() {
      return !!this.policies.length
    },
    selectedPolicy() {
      return this.selectedPolicyId && this.policies.find(({id}) => id === this.selectedPolicyId)
    }
  },
  methods: {
    ...mapActions([loadPolicies]),
    policySelected() {
      this.$emit('selected', this.selectedPolicy)
    }
  },
  async created() {
    this.loadPolicies(this.organizationId)
  }
}
</script>
<style lang="scss">
.md-field.policy-select-field {
  width: auto;
}
</style>
