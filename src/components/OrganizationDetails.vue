<template>
  <form @submit.prevent="validate" novalidate autocomplete="off">
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title" style="flex: 1">{{creating ? 'Create organization' : 'Organization'}}</span>
        <md-button :disabled="!isFormChanged" type="submit">{{creating ? 'Create' : 'Save'}}</md-button>
      </md-toolbar>
      <md-content>
        <div class="md-layout md-alignment-center-center">
          <div class="md-layout-item md-size-50">
            <div>
              <md-field :class="{'md-invalid': errors.has('id')}">
                <label for="id">Orgnanization ID</label>
                <md-input 
                  id="id" 
                  name="id"
                  v-validate="{required: true, udaru_id: true, excluded: organizationIds}"
                  autofocus 
                  :readonly="!creating"
                  v-model="localOrganization.id" 
                />
                <span class="md-error">{{errors.first('id')}}</span>
              </md-field>
            </div>
            <div>
              <md-field :class="{'md-invalid': errors.has('name')}">
                <label for="name">Organization name</label>
                <md-input 
                  id="name" 
                  name="name" 
                  v-validate="'required'" 
                  v-model="localOrganization.name" 
                />
                <span class="md-error">{{errors.first('name')}}</span>
              </md-field>
            </div>
            <div>
              <md-field :class="{'md-invalid': errors.has('description')}">
                <label for="description">Organization description</label>
                <md-input 
                  id="description" 
                  name="description"  
                  v-validate="'required'" 
                  v-model="localOrganization.description" 
                />
                <span class="md-error">{{errors.first('description')}}</span>
              </md-field>
            </div>
            <div>
              <md-field :class="{'md-invalid': errors.has('metadata')}">
                <label for="metadata">Metadata</label>
                <md-textarea 
                  id="metadata" 
                  name="metadata" 
                  v-validate="'json'" 
                  v-model="localOrganization.metadata" 
                  />
                <span class="md-error">{{errors.first('metadata')}}</span>
              </md-field>
            </div>
            <div v-if="creating">
              <md-field :class="{'md-invalid': errors.has('userId')}">
                <label for="userId">Administrator ID</label>
                <md-input 
                  id="userId" 
                  name="userId"
                  v-validate="'udaru_id'"
                  autofocus 
                  :readonly="!creating"
                  v-model="localOrganization.user.id" 
                />
                <span class="md-error">{{errors.first('userId')}}</span>
              </md-field>
            </div>
            <div v-if="creating">
              <md-field :class="{'md-invalid': errors.has('userName')}">
                <label for="userName">Administrator name</label>
                <md-input 
                  id="userName" 
                  name="userName" 
                  v-model="localOrganization.user.name" 
                />
                <span class="md-error">{{errors.first('userName')}}</span>
              </md-field>
            </div>            
          </div>
        </div>
      </md-content>
    </div>
  </form>
</template>

<script>
import {mapState} from 'vuex'

import validationMixin from '../mixins/validationMixin'
import {mapActions} from '../state/utils'
import {loadOrganizations} from '../state/actions'

export default {
  name: 'organization-details',
  mixins: [validationMixin],
  props: {
    organization: {
      type: Object,
      default: () => ({
        id: null,
        name: null,
        description: null,
        metadata: {},
        user: {}
      })
    }
  },
  computed: {
    ...mapState(['organizations']),
    organizationIds() {
      return this.creating && (this.organizations || []).map(({id}) => id)
    },
    creating() {
      return !this.organization.id
    }
  },
  methods: {
    ...mapActions(loadOrganizations),
    async validate() {
      if (await this.$validator.validateAll()) {
        const organization = {...this.localOrganization}

        // TODO in theory only username would be enough, udaru will generate an id for the user
        if (this.creating && (!this.localOrganization.user.id || !this.localOrganization.user.name)) {
          delete organization.user
        }

        this.$emit('submit', organization)
      }
    }
  },
  data() {
    return {
      localOrganization: {
        ...this.organization,
        metadata: JSON.stringify(this.organization.metadata, null, 2)
      }
    }
  },
  created() {
    this.loadOrganizations()
  }
}
</script>
