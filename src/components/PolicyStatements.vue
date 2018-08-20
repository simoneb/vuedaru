<template>
  <form @submit.prevent="validate" novalidate autocomplete="off">
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title" style="flex: 1">Statements</span>
        <md-button @click="addStatement">Add statement</md-button>
        <md-button  @click="validate">Save</md-button>
      </md-toolbar>
      <md-table v-if="!!localPolicy.statements.Statement" v-model="localPolicy.statements.Statement">
        <md-table-empty-state 
          md-label="No statements"
          md-description="No policy statements.">
          <md-button @click="addStatement" class="md-primary">Add statement</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{item}">
          <md-table-cell md-label="Actions">
            <md-chips v-model="item.Action" />
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
          <md-table-cell>
            <md-button @click="removeStatement(item)" class="md-icon-button md-dense md-primary">
              <md-icon>delete</md-icon>
              <md-tooltip>Remove statement</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </form>
</template>

<script>
import {cloneDeep} from 'lodash/fp'

export default {
  name: 'policy-statements',
  props: {
    policy: {
      type: Object,
      required: true
    }
  },
  methods: {
    addStatement() {
      this.localPolicy.statements.Statement.push({
        Action: [],
        Effect: 'Allow',
        Resource: []
      })
    },
    removeStatement(statement) {
      this.localPolicy.statements.Statement.splice(this.localPolicy.statements.Statement.indexOf(statement), 1)
    },
    async validate() {
      if (await this.$validator.validateAll()) {
        this.$emit('submit', this.localPolicy)
      }
    }
  },
  data() {
    return {
      localPolicy: {
        ...this.policy,
        statements: {
          Statement: this.policy.statements.Statement ? cloneDeep(this.policy.statements.Statement) : []
        }
      }
    }
  }
}
</script>
