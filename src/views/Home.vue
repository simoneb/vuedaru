<template>
  <div class="home">
    <div id="nav">
      <router-link :to="{name: 'users', params: {organizationId}}">Users</router-link> | 
      <router-link :to="{name: 'teams', params: {organizationId}}">Teams</router-link> | 
      <router-link :to="{name: 'policies', params: {organizationId}}">Policies</router-link> | 
      <router-link v-if="$auth.isAuthenticated()" to="/logout">Logout</router-link>
      <router-link v-else to="/login">Login</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'home',
  props: {
    organizationId: String
  }
}
</script>
