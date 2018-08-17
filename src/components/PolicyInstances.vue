<template>
<div class="section">
  <md-toolbar md-elevation="0">
    <span class="md-title" style="flex: 1">Policies</span>
    <md-button>Assign policy</md-button>
  </md-toolbar>
  <md-table v-model="policies">
    <md-table-empty-state 
      md-label="No policies"
      md-description="No associated policies">
      <md-button class="md-primary">Assign policy</md-button>
    </md-table-empty-state>
    
    <md-table-row slot="md-table-row" slot-scope="{item}">
      <md-table-cell md-label="ID">
        <router-link :to="{name: 'policy', params: {organizationId, policyId: item.id}}">
        {{item.id}}
        </router-link>
      </md-table-cell>
      <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
      <md-table-cell md-label="Version">{{item.version}}</md-table-cell>
      <md-table-cell md-label="Variables"><pre>{{item.variables}}</pre></md-table-cell>
      <md-table-cell md-label="Instance">{{item.instance}}</md-table-cell>
      <md-table-cell md-label="Actions">
        <md-button class="md-icon-button md-primary">
          <md-icon>delete</md-icon>
          <md-tooltip>Remove policy association</md-tooltip>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</div>
</template>
<script>
export default {
  name: 'policy-instances',
  props: {
    policies: {
      type: Array,
      required: true
    },
    organizationId: {
      type: String,
      required: true
    }
  }
}
</script>
