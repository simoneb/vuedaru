<template>
  <md-dialog :md-active="!!operation">
    <md-dialog-title>Service key required</md-dialog-title>
    <md-dialog-content>
      <p>This operation requires a service key. Please enter it below to proceed.</p>
      <form @submit.prevent="validate" autocomplete="off" novalidate>
        <md-field :class="{'md-invalid': errors.has('serviceKey')}">
          <label for="serviceKey">Service key</label>
          <md-input type="password" id="serviceKey" name="serviceKey" v-model="serviceKey" v-validate="'required'" />
          <span class="md-error">{{errors.first('serviceKey')}}</span>
        </md-field>
        <md-checkbox id="remember" name="remember" v-model="remember">Remember</md-checkbox>
      </form>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button @click="$emit('cancel')">Cancel</md-button>
      <md-button @click="validate" class="md-primary">Proceed</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>
<script>
export default {
  name: 'service-key-operation',
  props: {
    operation: {
      type: Function
    }
  },
  data() {
    return {
      remember: true,
      serviceKey: sessionStorage.getItem('serviceKey')
    }
  },
  methods: {
    async validate() {
      if (await this.$validator.validateAll()) {
        if (this.remember) {
          sessionStorage.setItem('serviceKey', this.serviceKey)
        }
        this.operation(this.serviceKey)
      }
    }
  }
}
</script>
