<template>
  <md-snackbar :md-active.sync="showSnackbar">
    <span>{{snackbarMessage}}</span>
    <md-button class="md-primary" @click="showSnackbar = false">Ok</md-button>
  </md-snackbar>
</template>

<script>
import {mapState} from 'vuex'

import {changeSnackbarMessage} from '../state/actions'
import {mapActions} from '../state/utils'

export default {
  name: 'snackbar',
  computed: {
    ...mapState(['snackbarMessage']),
    showSnackbar: {
      get() {
        return !!this.snackbarMessage
      },
      set(value) {
        if (!value) {
          this.changeSnackbarMessage({message: null})
        }
      }
    }
  },
  methods: {
    ...mapActions(changeSnackbarMessage)
  }
}
</script>
