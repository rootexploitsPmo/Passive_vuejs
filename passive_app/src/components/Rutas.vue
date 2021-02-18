<template>
  <div>
  
    <router-link to="/">Home</router-link> 
    <router-link to="/about">About</router-link>
    <router-view/>
</div>
</template>

<script>
import VueRouter from 'vue-router'
export default {
  name: 'Rutas',
  components: {
 VueRouter
  }
}
</script>

<style>

</style>