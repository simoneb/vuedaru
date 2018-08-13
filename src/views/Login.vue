<template>
  <div class="login">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Udaru UI</span>
      </md-app-toolbar>
      <md-app-content>
        <div class="md-layout md-alignment-center-center">
          <md-card>
            <md-card-header>
              <md-card-header-text>
              <div class="md-title">Login</div>
              <div class="md-subhead">Use super admin account</div>
              </md-card-header-text>
              <md-card-media>
                <img src="https://nearform.github.io/udaru/logo.jpg">
              </md-card-media>
            </md-card-header>
            <md-card-content>
              <form @submit.prevent="login">
                <md-field>
                  <label>User ID</label>
                  <md-input autofocus v-model="userId"></md-input>
                </md-field>
              </form>
            </md-card-content>
            <md-card-actions>
              <md-button class="md-primary">Login</md-button>
            </md-card-actions>
          </md-card>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userId: null
    }
  },
  methods: {
    async login() {
      await this.$settings.login(this.userId)
      this.$router.push('/')
    }
  }
}
</script>
