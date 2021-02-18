<template>
  <div id="app">
      <router-view/> 

<!--  <Standar/> -->
  </div>
</template>
<script>
import Home from './views/Home'
import  Standar from './views/Standar'
export default {
  name: 'App',
  components:{
    Home,Standar
  }
}
</script>
<style>

</style>
