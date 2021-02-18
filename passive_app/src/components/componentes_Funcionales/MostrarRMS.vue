<template>
<div id="mostrarRMS">
<p v-for="(item,index) in rms" :key="index">
  {{ item }}
</p>
    <BotonCopiar :arrayDatos='rms'/>

</div>

</template>

<script>
import BotonCopiar from '../componentes_Funcionales/BotonCopiar'
export default {
props: {
    rms:Array 
  },
  components: {
    BotonCopiar,
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