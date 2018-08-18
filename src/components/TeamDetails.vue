<template>
<form @submit.prevent="validate" novalidate autocomplete="off">
  <div class="section">
    <md-toolbar md-elevation="0">
      <span class="md-title" style="flex: 1">{{creating ? 'Create team' : 'Team'}}</span>
      <md-button :disabled="!isFormChanged" type="submit">{{creating ? 'Create' : 'Save'}}</md-button>
    </md-toolbar>
    <md-content>
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-size-50">
          <div>
            <md-field :class="{'md-invalid': errors.has('id')}">
              <label for="id">Team ID</label>
              <md-input 
                id="id" 
                name="id"
                v-validate="'required|udaru_id'" 
                autofocus 
                :readonly="!creating" 
                v-model="localTeam.id" 
              />
              <span class="md-error">{{errors.first('id')}}</span>
            </md-field>
          </div>
          <div>
            <md-field :class="{'md-invalid': errors.has('name')}">
              <label for="name">Team name</label>
              <md-input 
                id="name" 
                name="name" 
                v-validate="'required'" 
                v-model="localTeam.name" 
              />
              <span class="md-error">{{errors.first('name')}}</span>
            </md-field>
          </div>
          <div>
            <md-field :class="{'md-invalid': errors.has('description')}">
              <label for="description">Team description</label>
              <md-input 
                id="description" 
                name="description"  
                v-validate="'required'" 
                v-model="localTeam.description" 
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
                v-model="localTeam.metadata" 
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
                  v-model="localTeam.user.id" 
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
                  v-model="localTeam.user.name" 
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
import validationMixin from '../mixins/validationMixin'

export default {
  name: 'team-details',
  mixins: [validationMixin],
  props: {
    team: {
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
    creating() {
      return !this.team.id
    }
  },
  methods: {
    async validate() {
      if (await this.$validator.validateAll()) {
        const team = {...this.localTeam}

        // TODO in theory only username would be enough, udaru will generate an id for the user
        if (this.creating && (!this.localTeam.user.id || !this.localTeam.user.name)) {
          delete team.user
        }

        this.$emit('submit', team)
      }
    }
  },
  data() {
    return {
      localTeam: {...this.team, metadata: JSON.stringify(this.team.metadata, null, 2)}
    }
  }
}
</script>
