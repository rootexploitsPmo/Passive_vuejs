<template>
  <div class="contenedor_buttom">
       <router-link class="botonHerramientas" :to="item.url"  v-for="(item,index) in nombre" :key="index">
      <BotonesHover  :url="item.url" :texto="item.titulo"/>
     </router-link> 

  </div>
</template>

<script>
import BotonesHover from './BotonesHover'
import VueRouter from 'vue-router'
export default {
    components: {
        BotonesHover,
        VueRouter
    },
data() {
    return {
        
    }
},props: {
    nombre: Array,
   
      },
      methods: {     
      },computed: {
       
      }

}

</script>

<style>
.contenedor_buttom{
    display: flex;
    width: 100%;
}
</style>