<template>
  <div class="policy" v-if="ready">
    <md-list>
      <md-list-item>
        <span class="md-body-2">ID</span>
        <span class="md-body-1">{{policy.id}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">Name</span>
        <span class="md-body-1">{{policy.name}}</span>
      </md-list-item>
      <md-list-item>
        <span class="md-body-2">Version</span>
        <span class="md-body-1">{{policy.version}}</span>
      </md-list-item>
    </md-list>
    <md-table v-model="policy.statements.Statement">
      <md-table-toolbar>
        <span class="md-title">Statements</span>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{item}">
        <md-table-cell md-label="Actions">
          {{item.Action.join(', ')}}
        </md-table-cell>
        <md-table-cell md-label="Effect">
          {{item.Effect}}
        </md-table-cell>
        <md-table-cell md-label="Resources">
          {{item.Resource.join(', ')}}
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: 'policy',
  props: {
    organizationId: String,
    policyId: String
  },
  data() {
    return {
      ready: false,
      policy: null
    }
  },
  methods: {
    async loadPolicy() {
      this.policy = await this.$udaru.getPolicy(this.organizationId, this.policyId)
    }
  },
  async created() {
    await this.loadPolicy()
    this.ready = true
  }
}
</script>
