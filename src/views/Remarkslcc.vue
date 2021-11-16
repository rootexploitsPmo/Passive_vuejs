<template>
 <div>
     
 <Header titulo="REMARKS LCC"/>
 <div id="alertSeleccion" :style="reactivo">
    <p @click="ryanair">Ryanair</p>
    <p  @click="vueling">Vueling</p>
 </div>
 <BodyRyanair v-if="seleccionado==='ryanair' "/>
 <RemarksVueling v-if="seleccionado==='vueling'"/>
 </div>

</template>

<script>
 import BodyRyanair from  '../components/remarkslcc/BodyRyanair' 
 import Header from "../components/Header"
 import RemarksVueling from "../components/remarkslcc/RemarksVueling.vue"

export default {
    data() {
        return {
            seleccionado: "",
            estado:true
        }
    },
  
components: {
 BodyRyanair,
 Header,
 RemarksVueling
},
methods: {
    ryanair() {
        this.seleccionado="ryanair"
        this.ocultarSeleccion()
    },
    vueling(){
    this.seleccionado="vueling"
    this.ocultarSeleccion()
    },
    ocultarSeleccion(){
this.estado=false
    }
},
computed: {
    reactivo() {
       if(this.estado===true){
        return "display:flex"
       }else{
           return "display:none"
       }
    }
},
}
</script>

<style>
#alertSeleccion{
        position: absolute;
    border: 1px solid;
    width: 100vw;
    height: 100vh;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    display: flex;
    flex-direction: row;
}
#alertSeleccion>p{
        border: solid 1px white;
    padding: 27px;
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    cursor: pointer;
    font-family: 'Heebo', sans-serif;
}
</style>