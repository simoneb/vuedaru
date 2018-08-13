<template>
<form @submit.prevent="$emit('submit', localTeam)" autocomplete="off">
  <div class="section">
    <md-toolbar md-elevation="0">
      <span class="md-title" style="flex: 1">{{creating ? 'Create team' : 'Team'}}</span>
      <md-button type="submit" class="">{{creating ? 'Create' : 'Save'}}</md-button>
    </md-toolbar>
    <md-content>
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-size-50">
          <div>
            <md-field>
              <label for="id">Team id</label>
              <md-input id="id" autofocus :disabled="!creating" v-model="localTeam.id" />
            </md-field>
          </div>
          <div>
            <md-field>
              <label for="name">Team name</label>
              <md-input id="name" v-model="localTeam.name" />
            </md-field>
          </div>
          <div>
            <md-field>
              <label for="name">Team description</label>
              <md-input id="name" v-model="localTeam.description" />
            </md-field>
          </div>
          <div>
            <md-field>
              <label for="metadata">Metadata</label>
              <md-textarea id="metadata" v-model="localTeam.metadata" />
            </md-field>
          </div>
        </div>
      </div>
    </md-content>
  </div>
</form>
</template>

<script>
export default {
  name: 'team-details',
  props: {
    team: {
      type: Object,
      default: () => ({
        id: null,
        name: null,
        description: null,
        metadata: {}
      })
    }
  },
  computed: {
    creating() {
      return !this.team.id
    }
  },
  data() {
    return {
      localTeam: {...this.team, metadata: JSON.stringify(this.team.metadata, null, 2)}
    }
  }
}
</script>
