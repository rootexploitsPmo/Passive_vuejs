<template>
    <div>
<Header titulo="REPSOL"></Header>
     <div class="ContenedorPrincipal">
        <div class="rutas">
  <InputData @accion='GetData'/>
  </div>
   <div class="respuesta">
      <MostrarRMS :rms='array_rms'/>
      
     </div> 
       <router-link to="/" class="home">home </router-link>
  </div>
    </div>
</template>

<script>

import InputData from '../components/componentes_Funcionales/InputData.vue'
import MostrarRMS from '../components/componentes_Funcionales/MostrarRMS.vue'
import Header from "../components/Header.vue"
import KitPassive from '../modulos/KitPassive'
    export default {
        data(){
                return{
  array_rms: []
                }
        },
        components: {
            
            Header,
            InputData,
            MostrarRMS,
           
        },
        methods: {
             GetData(data) {

       let texto_valor=data;
       
       
    
    //reseteamos el array para no concatenar información de los futuras ejecuciones
    this.array_rms=[]
let crearRM= (textrm,exprm)=>{
let buscarmatch=KitPassive.buscar_Match(exprm,texto_valor);
let crearRM=textrm+buscarmatch
console.log(buscarmatch)
this.array_rms.push(crearRM);
}

      //RM *ACECRM/SOLICITUD-inicio      
   
      crearRM('RM *ACECRM/SOLICITUD-',/(?<=Identificador\s{0,}de\s{0,}solicitud\s{0,})\w{1,}(?=\n)/)

      //RM *ACECRM/SOLICITUD-fin
       
      //RM *ACECRM/APPROV--inicio
      crearRM('RM *ACECRM/APPROV-',/(?<=predeterminado\s{0,}del\s{0,}gerente.*\n).*/)
      //RM *ACECRM/APPROV--fin

      //RM *ACECRM/TRSTAT-inicio
      crearRM('RM *ACECRM/TRSTAT-',/(?<=(Centro\s{0,}de\s{0,}coste|Cost\s{0,}Center)\s{0,}\().*(?=\))/)
      //RM *ACECRM/TRSTAT-fin
      
      //RM *ACECRM/PROYECTO-inicio
      crearRM('RM *ACECRM/PROYECTO-',/(?<=Personalizado 04\:(.*\n){1,2}.*\().*(?=\)\n)/)
      //RM *ACECRM/PROYECTO-fin
     
      console.log(this.array_rms)
    }

        },
    }
</script>

<style lang="scss" scoped>

</style>