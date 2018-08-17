<template>
<form @submit.prevent="validate" novalidate autocomplete="off">
  <div class="section">
    <md-toolbar md-elevation="0">
      <span class="md-title" style="flex: 1">{{creating ? 'Create user' : 'User'}}</span>
      <md-button :disabled="!isFormChanged" type="submit">{{creating ? 'Create' : 'Save'}}</md-button>
    </md-toolbar>
    <md-content>
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-size-50">
          <div>
            <md-field :class="{'md-invalid': errors.has('id')}">
              <label for="id">User ID</label>
              <md-input 
                id="id" 
                name="id"
                v-validate="'required|udaru_id'" 
                autofocus 
                :disabled="!creating" 
                v-model="localUser.id" 
              />
              <span class="md-error">{{errors.first('id')}}</span>
            </md-field>
          </div>
          <div>
            <md-field :class="{'md-invalid': errors.has('name')}">
              <label for="name">User name</label>
              <md-input 
                id="name" 
                name="name" 
                v-validate="'required'" 
                v-model="localUser.name" 
              />
              <span class="md-error">{{errors.first('name')}}</span>
            </md-field>
          </div>
          <div>
            <md-field :class="{'md-invalid': errors.has('metadata')}">
              <label for="metadata">Metadata</label>
              <md-textarea 
                id="metadata" 
                name="metadata" 
                v-validate="'json'" 
                v-model="localUser.metadata" 
                />
              <span class="md-error">{{errors.first('metadata')}}</span>
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
  name: 'user-details',
  mixins: [validationMixin],
  props: {
    user: {
      type: Object,
      default: () => ({
        id: null,
        name: null,
        metadata: {}
      })
    }
  },
  computed: {
    creating() {
      return !this.user.id
    }
  },
  methods: {
    async validate() {
      if (await this.$validator.validateAll()) {
        this.$emit('submit', this.localUser)
      }
    }
  },
  data() {
    return {
      localUser: {...this.user, metadata: JSON.stringify(this.user.metadata, null, 2)}
    }
  }
}
</script>
