<template>
  <div class="section">
    <md-toolbar md-elevation="0">
      <div class="md-title">Authorization check</div>
    </md-toolbar>
    <md-content>
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-size-50">
      <form @submit.prevent="checkAccess">
        <md-field>
          <label for="actions"></label>
            <md-select 
              required 
              id="actions" 
              v-model="selectedAction" 
              placeholder="Select an Action">
              <md-option v-for="action in actions" :key="action" :value="action">{{action}}</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label for="resources"></label>
            <md-select 
              required 
              id="resources" 
              v-model="selectedResource" 
              placeholder="Select a Resource">
              <md-option v-for="resource in resources" :key="resource" :value="resource">{{resource}}</md-option>
          </md-select>
        </md-field>
        <md-button class="md-primary md-raised" type="submit">Check access</md-button>
      <md-icon 
        v-show="access !== null" 
        :class="{'md-primary': access === true, 'md-accent': access === false}"
        class="md-size-2x">
          {{'thumb_' + upOrDown}}
        </md-icon>
      </form>
        </div>
        </div>
    </md-content>
  </div>
</template>
<script>
import {flow, flatMap, get, reduce, uniq} from 'lodash/fp'

export default {
  name: 'authorization-check',
  props: {
    organizationId: String,
    userId: String
  },
  data() {
    return {
      selectedAction: null,
      actions: [],
      selectedResource: null,
      resources: [],
      access: null
    }
  },
  computed: {
    upOrDown() {
      return this.access ? 'up' : 'down'
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
        this.userId,
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
