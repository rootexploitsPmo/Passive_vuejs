<template>
<div id="mostrarRMS">


<ContenedoresTexto v-for="(item,index) in rms" :key="index" :texto="item">
  
</ContenedoresTexto>

<BotonCopiar :arrayDatos='rms'/>

</div>

</template>

<script>
import BotonCopiar from '../componentes_Funcionales/BotonCopiar'
import ContenedoresTexto from './Contenedores_texto.vue'
export default {
props: {
    rms:Array,
    close:Boolean
  },
  components: {
    BotonCopiar,
    ContenedoresTexto
  },
}

</script>

<style>
#mostrarRMS{
text-align: center;
}
#mostrarRMS>p{
    background: #ff8787;
    padding: 20px;
    border-radius: 18px;
    font-size: 23px;   
     font-family: 'Roboto', sans-serif;
}
</style>