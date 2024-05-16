<template>
  <div class="ContenedorPrincipal-component">
        <div class="rutas">
            <inputData @accion='Getdata'/>
  </div>
   <div class="respuesta_vueling">
    <ContenedoresTexto v-for="(item,index) in rms" :key="index" :texto="item"/> 
     <BotonCopiar :arrayDatos="copy"/>
       </div>

       <router-link to="/" class="home">home </router-link>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import inputData from '../componentes_Funcionales/InputData'
import KitPassive from '../../modulos/KitPassive'
import BotonCopiar from '.././componentes_Funcionales/BotonCopiar' 
import MostrarRMS from '../componentes_Funcionales/MostrarRMS.vue'
import PackRMS from '../componentes_Funcionales/PackRMS.vue'
import ContenedoresTexto from '../componentes_Funcionales/Contenedores_texto.vue'

export default {
    data() {
        return {
            rms:[],
            copy:[]
        }
    },
components: {
 VueRouter,
 inputData,
 BotonCopiar,
 ContenedoresTexto
},methods: {
    Getdata(data) {
          

        // REINICIAMOS LOS CAMPOS CADA VEZ QUE GENERE UNO NUEVO
this.rms=[]
    var valor_textoArea=data;
    var allRms=""
    this.copy=[]
    var solicitud=valor_textoArea.match(/(?<=Identificador de solicitud.*)\w{2,}(?=\n)/);
    if(solicitud!=null){
        let rm=`RM*ACECRM/SOLICITUD-${solicitud};`
        this.rms.push(rm)
        allRms= allRms.concat(`${rm}`)
    
    }else{
        let rm=`RM*ACECRM/SOLICITUD-NO ENCONTRADO ❌`
        this.rms.push(rm)
    }
    var trstat=valor_textoArea.match(/(?<=tipo de objeto de coste :.*\()\w{1,}(?=\))/);
    if(trstat!=null){
        let rm=`RM*ACECRM/TRSTAT-${trstat};`
        this.rms.push(rm)
    allRms= allRms.concat(rm)
    }else{
        let rm=`RM*ACECRM/TRSTAT-NO ENCONTRADO ❌`
        this.rms.push(rm)
    }
    var proyecto=valor_textoArea.match(/(?<=centro de coste :.*\().*(?=\))/);
    if(proyecto!=null){
        let rm=`RM*ACECRM/PROYECTO-${proyecto};`
        this.rms.push(rm)
    allRms= allRms.concat(rm)
    }else{
        let rm=`RM*ACECRM/PROYECTO-NO ENCONTRADO ❌`
        this.rms.push(rm)
    }
    var approv=valor_textoArea.match(/(?<=Correo electrónico predeterminado del gerente :.*)\w{1,}.*\@.*/);
    if(approv!=null){
        let rm=`RM*ACECRM/APPROV-${approv};`
        this.rms.push(rm)
    allRms= allRms.concat(rm)
    }else{
        let rm=`RM*ACECRM/APPROV-NO ENCONTRADO ❌`
        this.rms.push(rm)
    }
    var reatrp=valor_textoArea.match(/(?<=Tipo de viaje.*)\w{2,}.*(?=\n)/);
    if(reatrp!=null){
        var travelType = [];
travelType["Viaje de Negocios"] = "A";
travelType["Viaje Sindical"] = "D";
travelType["INVITADO"] = "G";
travelType["GRUPOS Y CONVENCIONES"] = "H";
travelType["Viaje de Formación"] = "I";
travelType["Viaje de Rotación"] = "J";
travelType["COMERCIAL"] = "L";
travelType["TRABAJO DE CAMPO"] = "M";
travelType["EXPATRIADOS"] = "N";
travelType["VIAJES PARA FAMILIARES"] = "R";

let rm=`RM*ACECRM/REATRP-${travelType[reatrp]};`
        this.rms.push(rm)
    allRms= allRms.concat(rm)
  
    }else{
        let rm=`RM*ACECRM/REATRP-NO ENCONTRADO ❌`
        this.rms.push(rm)
    }
    allRms= allRms.concat(`RM*MODIFIED BY AGENT;AP//////////TKT YA EMITIDO SIN SINCRO////////`)
    this.copy.push(allRms)
console.log(allRms);
  this.rms.push(`RM*MODIFIED BY AGENT`)
  this.rms.push(`AP//////////TKT YA EMITIDO SIN SINCRO////////`)


    },
},computed: {

  activar(){
   return [this.Vuelta.Satatus ? {'display': 'inline-table'} : {'display':' none'} ]
  }
}
}
</script>

<style>

.respuesta_vueling{
grid-column: 2;
    grid-row: 1/11;
    display: flex;
    justify-content: center;
        padding-top: 111px;
            flex-flow: column;
}

</style>