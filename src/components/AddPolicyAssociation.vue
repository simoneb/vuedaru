<template>
  <md-dialog :md-active.sync="localActive">
    <md-dialog-title class="md-primary">Add policy</md-dialog-title>
    <md-dialog-content>
      <policy-select :organizationId="organizationId" @selected="policy => selectedPolicy = policy" />
      <form novalidate autocomplete="false" v-if="variableNames.length">
        <div class="md-subheading">Variables</div>
        <div class="md-caption">This policy contains variables</div>
        <md-field v-for="variable in variableNames" :key="variable" :class="{'md-invalid': errors.has(variable)}">
          <label :for="variable">{{variable}}</label>
          <md-input :id="variable" :name="variable" v-validate="'required'" v-model="variables[variable]" />
        </md-field>
      </form>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button @click="localActive = false">Cancel</md-button>
      <md-button class="md-raised md-primary" @click="confirm">Ok</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import {compact, uniq, flow, map, flatMap, get, pick, values, flatten} from 'lodash/fp'

import PolicySelect from './PolicySelect'

function* parseVariable(string) {
  const variableRegex = /\{(\w+)\}?/g

  let match

  while ((match = variableRegex.exec(string))) {
    yield match[1]
  }
}

const parseVariables = flow(
  get('statements.Statement'),
  flatMap(
    flow(
      pick(['Action', 'Resource']),
      values,
      flatten
    )
  ),
  map(
    flow(
      parseVariable,
      Array.from
    )
  ),
  flatten,
  compact,
  uniq
)
export default {
  name: 'add-policy-association',
  props: {
    active: {
      type: Boolean
    },
    organizationId: {
      type: String,
      required: true
    }
  },
  components: {
    PolicySelect
  },
  data() {
    return {
      selectedPolicy: null,
      variables: {}
    }
  },
  computed: {
    localActive: {
      get() {
        return this.active
      },
      set(value) {
        this.$emit('update:active', value)
      }
    },
    variableNames() {
      return parseVariables(this.selectedPolicy)
    }
  },
  methods: {
    async confirm() {
      if (!(await this.$validator.validateAll())) return

      this.$emit('add-association', {id: this.selectedPolicy.id, variables: this.variables})
    }
  }
}
</script>
