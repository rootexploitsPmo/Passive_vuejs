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
.ContenedorPrincipal-component {
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 69%;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: repeat(10,1fr);
    font-size: 40px;
}
</style>
