<template>
  <div class="ContenedorPrincipal">
        <div class="rutas">
  PRINCIPAL
  </div>
   <div class="respuesta">
      RESPUESTA
      
       </div> 
       <router-link to="/" class="home">home </router-link>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
export default {
    
components: {
 VueRouter
},
}
</script>

<style>

.respuesta{
grid-column: 2;
    grid-row: 1/11;
    display: flex;
    justify-content: center;
        padding-top: 111px;
}

</style>