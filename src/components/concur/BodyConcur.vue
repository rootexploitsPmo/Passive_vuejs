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
        allRms= allRms.concat(`RM*ACECRM/SOLICITUD-${rm};`)
    
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
        var array_fechas = [];
array_fechas["COMISION DE SERVICIOS"] = "A";
array_fechas["SINDICAL"] = "D";
array_fechas["INVITADOS"] = "G";
array_fechas["GRUPOS Y CONVENCIONES"] = "H";
array_fechas["FORMACIÓN"] = "I";
array_fechas["Viaje de Rotación"] = "J";
array_fechas["COMERCIAL"] = "L";
array_fechas["TRABAJO DE CAMPO"] = "M";
array_fechas["EXPATRIADOS"] = "N";
array_fechas["VIAJES PARA FAMILIARES"] = "R";

let rm=`RM*ACECRM/REATRP-${array_fechas[reatrp]};`
        this.rms.push(rm)
    allRms= allRms.concat(rm)
  
    }else{
        let rm=`RM*ACECRM/REATRP-NO ENCONTRADO ❌`
        this.rms.push(rm)
    }
    this.copy.push(allRms)
console.log(allRms);




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