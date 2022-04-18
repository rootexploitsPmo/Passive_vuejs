<template>
  <div class="ContenedorPrincipal-component">
        <div class="rutas">
  <InputData @accion='GetData'/>
  </div>
   <div class="respuesta_indra">
      <ContenedoresTexto v-for="(item,index) in array_hecho" :key='index' :texto='item'/>
     <div class="cCopiars">
      <BotonCopiar  :arrayDatos='array_hecho'/>
      </div>
       </div> 
       <router-link to="/" class="home">home </router-link>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import InputData from '../componentes_Funcionales/InputData'
import KitPassive from '../../modulos/KitPassive'
import ContenedoresTexto from '../componentes_Funcionales/Contenedores_texto'
import BotonCopiar from '.././componentes_Funcionales/BotonCopiar'
export default {
    data() {
        return {
            array_hecho:[]
        }
    },
components: {
 VueRouter,
 InputData,
 ContenedoresTexto,
 BotonCopiar
},methods: {
    GetData(dato) {

       var valor_Textoarea=dato;
        //limpiamos el array para no a comular peticiones anteriores
          this.array_hecho=[];
        //--fin
       //PRIMER RM 
      var rm_pscpet_valor=KitPassive.buscar_Match(/C\d{10,}(?=\n)/,valor_Textoarea)
      var rm_pscpet_result="RM*PSCPETVIAJE-"+rm_pscpet_valor
        this.array_hecho.push(rm_pscpet_result)
  //SEGUNDO RM      
        var rm_acc_valor=KitPassive.buscar_Match(/(?<=C\d{5})\d{8}/,rm_pscpet_result) 
        var rm_acc_result="RM*ACC"+rm_acc_valor
        this.array_hecho.push(rm_acc_result)
   // TERCER RM 
       var rmy_tops_valor=KitPassive.buscar_Match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})/,valor_Textoarea) 
       var validador=KitPassive.buscar_Match(/\n[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})/,valor_Textoarea)
       //Los distintos correos 
       var rmy_tops_valora=valor_Textoarea.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})/g)
      if(validador!=undefined){
        if(rmy_tops_valora[1]!=undefined){
          if(rmy_tops_valora[0]!=rmy_tops_valora[1]){
            var rmy_tops_result =rmy_tops_valor.replace("@",".AT.")
            this.array_hecho.push("RMY/BKSP-"+rmy_tops_result)
            this.array_hecho.push("APE-"+rmy_tops_valor)
           }
        }
        
      }

       
    
   
   

      // CUARTO RM
   var rm_solicitud_valor=KitPassive.buscar_Match(/(?<=\W)\d{10}(?=\n)/,valor_Textoarea)
   var rm_solicitud_result="RM*ACECRM/SOLICITUD-"+rm_solicitud_valor;
   var rm_CC_result="RM*ACC"+rm_solicitud_valor;
      if(rm_solicitud_valor!=undefined){
        if(rm_solicitud_valor.length>0){
          this.array_hecho.push(rm_solicitud_result)
          this.array_hecho.push(rm_CC_result)
        }
      }
     
   // QUINTO RM
   var rm_proyecto_valor=KitPassive.buscar_Match(/(?<=PROYECTO\s)\S{0,}/,valor_Textoarea);   
   console.log(rm_proyecto_valor)
   var rm_proyecto_result="RM*ACECRM/PROYECTO-"+rm_proyecto_valor;
   if(rm_proyecto_valor!=undefined){
    if(rm_proyecto_valor.length>0){
      this.array_hecho.push(rm_proyecto_result)
    }
   }
  
  
   
        
    }
},
}
</script>

<style>
.cCopiars{
    text-align: center;
}
.respuesta_indra{
grid-column: 2;
    grid-row: 1/11;
 
    justify-content: center;
        padding-top: 111px;
}

</style>