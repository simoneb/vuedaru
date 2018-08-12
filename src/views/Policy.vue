<template>
  <div class="policy" v-if="policy">
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title" style="flex: 1">Policy</span>
        <md-button>Save</md-button>
      </md-toolbar>
      <md-content>
        <md-list>
          <md-list-item>
            <span class="md-body-2">ID</span>
            <span class="md-body-1">{{policy.id}}</span>
          </md-list-item>
          <md-list-item>
            <span class="md-body-2">Name</span>
            <span class="md-body-1"><md-field><input v-model="policy.name"></md-field></span>
          </md-list-item>
          <md-list-item>
            <span class="md-body-2">Version</span>
            <span class="md-body-1">{{policy.version}}</span>
          </md-list-item>
        </md-list>
        </md-content>
    </div>
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title">Statements</span>
      </md-toolbar>
      <md-table v-model="policy.statements.Statement">
        <md-table-row slot="md-table-row" slot-scope="{item}">
          <md-table-cell md-label="Actions">
            <md-chips v-model="item.Action"></md-chips>
          </md-table-cell>
          <md-table-cell md-label="Effect">
            <md-field>
              <md-select v-model="item.Effect">
                <md-option value="Allow">Allow</md-option>
                <md-option value="Deny">Deny</md-option>
              </md-select>
            </md-field>
          </md-table-cell>
          <md-table-cell md-label="Resources">
            <md-chips v-model="item.Resource"></md-chips>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {mapActions} from '../state/utils.js'
import {loadPolicy} from '../state/actions.js'

export default {
  name: 'policy',
  props: {
    organizationId: String,
    policyId: String
  },
  computed: {
    ...mapGetters(['getPolicy']),
    policy() {
      return this.getPolicy(this.organizationId, this.policyId)
    }
  },
  methods: {
    ...mapActions(loadPolicy)
  },
  async created() {
    await this.loadPolicy({organizationId: this.organizationId, policyId: this.policyId})
  }
}
</script>
