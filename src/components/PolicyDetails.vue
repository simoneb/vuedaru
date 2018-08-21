<template>
<form @submit.prevent="validate" novalidate autocomplete="off">
  <div class="section">
    <md-toolbar md-elevation="0">
      <span class="md-title" style="flex: 1">{{creating ? 'Create policy' : 'Policy'}}</span>
      <md-button @click="$router.go(-1)">Cancel</md-button>
      <md-button :disabled="!isFormChanged" type="submit">{{creating ? 'Create' : 'Save'}}</md-button>
    </md-toolbar>
    <md-content>
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-size-50">
          <div>
            <md-field :class="{'md-invalid': errors.has('id')}">
              <label for="id">Policy ID</label>
              <md-input 
                id="id" 
                name="id"
                v-validate="'required|udaru_id'" 
                autofocus 
                :readonly="!creating" 
                v-model="localPolicy.id" 
              />
              <span class="md-error">{{errors.first('id')}}</span>
            </md-field>
          </div>
          <div>
            <md-field :class="{'md-invalid': errors.has('name')}">
              <label for="name">Policy name</label>
              <md-input 
                id="name" 
                name="name" 
                v-validate="'required'" 
                v-model="localPolicy.name" 
              />
              <span class="md-error">{{errors.first('name')}}</span>
            </md-field>
          </div>
          <div>
            <md-field :class="{'md-invalid': errors.has('version')}">
              <label for="version">Policy version</label>
              <md-input 
                id="version" 
                name="version"  
                v-validate="'required'" 
                v-model="localPolicy.version" 
              />
              <span class="md-error">{{errors.first('version')}}</span>
            </md-field>
          </div>
        </div>
      </div>
    </md-content>
  </div>
</form>
</template>

<script>
import validationMixin from '../mixins/validationMixin'

export default {
  name: 'policy-details',
  mixins: [validationMixin],
  props: {
    policy: {
      type: Object,
      default: () => ({
        id: null,
        version: null,
        name: null,
        statements: {}
      })
    }
  },
  computed: {
    creating() {
      return !this.policy.id
    }
  },
  methods: {
    async validate() {
      if (await this.$validator.validateAll()) {
        this.$emit('submit', this.localPolicy)
      }
    }
  },
  data() {
    return {
      localPolicy: {...this.policy}
    }
  }
}
</script>
