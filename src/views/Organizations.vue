<template>
  <div class="organizations">
    <div id="title"><h1>Organizations manager</h1></div>
    <div id="nav">
      <router-link to="/organizations/select">Organizations</router-link> | 
      <router-link to="/organizations/create">Create</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'organizations'
}
</script>
