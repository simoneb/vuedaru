<template>
<md-app>
  <md-app-toolbar class="md-transparent">
    <div class="md-toolbar-section-start">
      <toolbar-logo />
      <span class="md-title">Settings</span>
    </div>
  </md-app-toolbar>
  <md-app-content>
    <div class="section">
      <md-toolbar md-elevation="0">
        <span class="md-title">Configuration wizard</span>
      </md-toolbar>
      <md-content>
        <div style="display: flex; justify-content: center">
        <md-steppers :md-active-step.sync="activeStep" md-vertical md-linear>
          <md-step 
            :id="STEPS.server" 
            :md-label="checkingUrl ? 'Checking server...' :  'Configure server'" 
            :md-error="urlError" 
            :md-done="urlDone"
          >
            <form novalidate autocomplete="off" @submit.prevent="configureServer">
              <md-field :class="{'md-invalid': errors.has('url')}">
                <label for="url">Server url</label>
                <md-input 
                  id="url"  
                  name="url" 
                  v-validate="'required'"
                  type="url" 
                  v-model="url"
                />
                <span class="md-helper-text">We need to know where your Udaru server is</span>
                <span class="md-error">{{errors.first('url')}}</span>
              </md-field>
              <div class="divider" />
              <md-button type="submit" class="md-raised md-primary">Save and continue</md-button>
            </form>
          </md-step>

          <md-step 
            :id="STEPS.user" 
            :md-label="checkingUserId ? 'Checking user...' :  'Configure user'" 
            :md-error="userIdError" 
            :md-done="userIdDone"
          >
            <form novalidate autocomplete="off" @submit.prevent="configureUser">
              <md-field :class="{'md-invalid': errors.has('userId')}">
                <label for="userId">User ID</label>
                <md-input 
                  id="userId"  
                  name="userId" 
                  v-validate="'required'"
                  v-model="userId"
                />
                <span class="md-helper-text">The user should be a super admin</span>
                <span class="md-error">{{errors.first('userId')}}</span>
              </md-field>
              <div class="divider" />
              <md-button type="submit" class="md-raised md-primary">Save and continue</md-button>
            </form>
          </md-step>

          <md-step :id="STEPS.done" md-label="Done!" :md-done="urlDone && userIdDone">
            <div style="display: flex; align-items: center;">
              <div style="margin-right: 20px">
                <p class="md-title">Configuration complete!</p>
                <p class="md-body-1">You can now start using the application</p>
              </div>
              <md-button class="md-raised md-primary" :to="{name: 'select-organization'}">Go to application</md-button>
            </div>
          </md-step>
        </md-steppers>
        </div>
      </md-content>
    </div>
  </md-app-content>
</md-app>
</template>

<script>
const STEPS = {
  server: 'server',
  user: 'user',
  done: 'done'
}

import Axios from 'axios'

import ToolbarLogo from '../components/ToolbarLogo'

export default {
  name: 'settings',
  components: {
    ToolbarLogo
  },
  data: () => ({
    STEPS,
    activeStep: STEPS.server,
    userId: null,
    userIdError: null,
    userIdSuccess: false,
    url: null,
    urlError: null,
    urlSuccess: false,
    checkingUrl: false,
    checkingUserId: false
  }),
  computed: {
    urlDone() {
      return this.urlSuccess && !this.checkingUrl
    },
    userIdDone() {
      return this.urlDone && this.userIdSuccess && !this.checkingUserId
    }
  },
  async created() {
    this.url = this.$settings.getUrl()
    this.userId = this.$settings.getUserId()

    if (this.url) {
      await this.configureServer()
    }
    if (!this.urlError && this.userId) {
      await this.configureUser()
    }
  },
  methods: {
    async configureServer() {
      if (this.errors.has('url')) return

      // trim trailing slash because we use rooted API paths
      this.url = this.url.replace(/\/+$/g, '')

      try {
        this.checkingUrl = true
        this.$settings.setUrl(this.url)
        await Axios.get(`${this.url}/ping`)

        this.urlError = null
        this.urlSuccess = true
        this.activeStep = STEPS.user
      } catch (err) {
        this.urlError = err.message || 'Cannot reach server'
        this.urlSuccess = false
      } finally {
        this.checkingUrl = false
      }
    },
    async configureUser() {
      if (this.errors.has('userId')) return

      try {
        this.checkingUserId = true
        this.$settings.setUserId(this.userId)

        const {
          data: {access}
        } = await Axios.get(`${this.url}/authorization/access/${encodeURIComponent(this.userId)}/*/*`, {
          headers: {authorization: this.userId}
        })

        if (!access) {
          throw new Error('User does not have sufficient privileges')
        }

        this.userIdError = null
        this.userIdSuccess = true
        this.activeStep = STEPS.done
      } catch (err) {
        this.userIdError = err.message || 'Cannot log in with the specified user'
        this.userIdSuccess = false
      } finally {
        this.checkingUserId = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.divider {
  margin-top: 40px;
}
</style>
