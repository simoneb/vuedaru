<template>
  <div class="section">
    <md-toolbar md-elevation="0">
      <div class="md-title" style="flex: 1">Authorization check</div>
      <md-button :disabled="!canCheck" @click="checkAccess">Check access</md-button>
    </md-toolbar>
    <md-content>
      <div class="md-subheading description">Check if a user can perform an action on a resource</div>
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-size-50">
          <form novalidate autocomplete="off">
            <user-select :organizationId="organizationId" v-model="selectedUserId" />
            <md-autocomplete 
              :md-options="actions"
              v-model="selectedAction"
              :md-input-placeholder="actions.length ? 'Select an action' : 'No available actions'"
            />
            <md-autocomplete 
              :md-options="resources"
              v-model="selectedResource"
              :md-input-placeholder="resources.length ? 'Select a resource' : 'No available resources'"
            />
          </form>
        </div>
      </div>
      <div class="md-layout md-alignment-center-center result">
        <div class="md-item">
        <md-icon 
          :style="{visibility: access !== null ? 'visible' : 'hidden'}"
          :class="{'md-primary': access === true, 'md-accent': access === false}"
          class="md-size-4x">
            {{'thumb_' + upOrDown}}
        </md-icon>
        </div>
        <div class="md-item result-text md-display-2">
          {{access !== null ? `Access ${access ? 'granted' : 'denied'}` : ''}}
        </div>
      </div>
    </md-content>
  </div>
</template>
<script>
import {flow, flatMap, get, reduce, uniq} from 'lodash/fp'

import UserSelect from '../components/UserSelect'

export default {
  name: 'authorization-check',
  props: {
    organizationId: String
  },
  components: {
    UserSelect
  },
  data() {
    return {
      access: null,

      actions: [],
      resources: [],

      selectedAction: null,
      selectedResource: null,
      selectedUserId: null
    }
  },
  computed: {
    upOrDown() {
      return this.access ? 'up' : 'down'
    },
    canCheck() {
      return this.selectedUserId && this.selectedAction && this.selectedResource
    }
  },
  watch: {
    selectedAction() {
      this.access = null
    },
    selectedResource() {
      this.access = null
    }
  },
  methods: {
    async checkAccess() {
      const {access} = await this.$udaru.canAccess(
        this.organizationId,
        this.selectedUserId,
        this.selectedAction,
        this.selectedResource
      )
      this.access = access
    }
  },
  async created() {
    const organizationPolicies = (await this.$udaru.getPolicies(this.organizationId)).data

    const {actions, resources} = flow(
      flatMap(get('statements.Statement')),
      reduce(
        ({actions, resources}, {Action, Resource}) => ({
          actions: uniq([...actions, ...Action]),
          resources: uniq([...resources, ...Resource])
        }),
        {
          actions: [],
          resources: []
        }
      )
    )(organizationPolicies)

    this.actions = actions
    this.resources = resources
  }
}
</script>
<style lang="scss" scoped>
.description {
  margin: 0px 0 20px 20px;
}
.result {
  margin: 15px 0;
}

.result-text {
  margin-left: 10px;
}
</style>
