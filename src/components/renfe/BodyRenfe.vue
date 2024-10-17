<template>
  <div class="ContenedorPrincipal-component">
        <div class="rutas">
            <InputData @accion="GetData"/>
  </div>
   <div class="respuesta_renfe">
     <ContenedoresTexto v-for="(item,index) in array_RU1AHK1" :key="index" :texto='array_RU1AHK1[index]'/>
      

  
       <PackRMS  v-for="(array,index) in array_renfe" :key="index+31"  :arraRenfe='array' :segmentoPasajero='true' />
      
      <PackRMS  :arraRenfe='array_SEG' :segmentoPasajero='false'/>
         </div>
       <router-link to="/" class="home">home </router-link>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import InputData from '../componentes_Funcionales/InputData'
import ContenedoresTexto from '../componentes_Funcionales/Contenedores_texto'
import PackRMS from '../componentes_Funcionales/PackRMS'
import KitPassive from '../../modulos/KitPassive'
export default {
    data() {
      return {
        array_RU1AHK1: [],
        array_SEG: [],
        array_renfe: []
      }
    },
components: {
 VueRouter,
 InputData,
 ContenedoresTexto,
 PackRMS
},methods: {
    GetData(data){
     // console.log(data); contiene el texto para analisar
    var valor_Textoarea = data
    
// INICIO DE MIGRASION 

//ESTE CONTENIDO CONTIENE LA SEGUNDA PARTE DE LOS RM LOS QUE USUAMOS EN  EL COMPONENTE PackRMS 
    var numero_veces=valor_Textoarea.match(/(?<=Billete\/Ticket:\S{0,}\s{0,})\d{0,}|(?<=Nº\s{0,}Billete:\s{0,})\w{1,}(?=\s|\n)/g); // CONTIENE EL NUMERO DE BILLETES ENCONTRADOS
    
    
    var rm_billete_tarifa=valor_Textoarea.match(/\w{1,}.*(?=\sT\.C|\s(Metálico|Metalico))/g); //CONTIENE EL CONTENIDO DE LOS BILLETES ENCONTRADOS
    //limpiamos el array de RM
    var rm_lista_tarifa=rm_billete_tarifa.map((x)=>{ // CON ESTE MAP CONSEGUIMOS SUSTITUIR O QUITAR EL SIGNO DEL EURO YA QUE NO LO NECESITAMOS

   
      let   nuevo_valor="RM*RENFE-"+x
      
        return nuevo_valor
    })


//ESTE CONTENIDO CONTIENE LA SEGUNDA PARTE DE LOS RM 
//ARRAY PARA PINTAR EN LA APP
var array_rm_P=[]
var array_rm_LC=[]
 var contadorCero=0;
    var contadorCero_tk=0;
       var conta_destino=1;
       
for(var i=1; i<=numero_veces.length; i++){
      var fechas=valor_Textoarea.match(/\d{2}\/\w{3}\.\/\d{4}|\d{2}\/\d{2}\/\d{4}\n/g);
      var fecsal=KitPassive.formatoFecha(fechas[contadorCero]);
      var codLc=KitPassive.buscar_Match(/(?<=TREN:\D{0,}\s{0,})\w{1,}|(?<=Localizador:\s{0,})\w{1,}(?=\s)/,valor_Textoarea);
      
      var ciudad_Origen=valor_Textoarea.match(/(?<=Origen:\s{0,}\s{0}).*/g);
      var ciudad_Destino=valor_Textoarea.match(/(?<=Destino:\s{0,}\s{0}).*/g);
      var horas=valor_Textoarea.match(/\d{2}\:\d{2}(?=\n)/g);
     
      var numeros_de_tren=valor_Textoarea.match(/\d{4,}(?=\n\d{1,}\/\d{1,}\/\d{1,}\n\d{1,}\/\d{1,}\/\d{1,})/g);
      var transporte=valor_Textoarea.match(/(?<=Destino:.*\n)\w{1,}(?=\s\w{1,}.*\n)/g);  
      var coches=valor_Textoarea.match(/(?<=Coche:\s{0,})\d{1,}/g);
      var texto_oches=/\d{2}/.exec(coches[contadorCero_tk]);

      if(texto_oches===null){
        coches[contadorCero_tk]="000"+coches[contadorCero_tk];
      }else{
        coches[contadorCero_tk]="00"+coches[contadorCero_tk];
      }
      
      var plaza=valor_Textoarea.match(/(?<=Plaza:\s{0,})\d{1,}\w{1,}/g);
      var texto_plaza=/\d{2}/.exec(plaza[contadorCero_tk]);
      
      var total_totales=valor_Textoarea.match(/(?<=TOTAL\s{0,})(\d{1,}\,\d{0,}|\d{1,}\.\d{1,}\,\d{0,})/g);
      
      if(texto_plaza===null){
        
        plaza[contadorCero_tk]="0"+plaza[contadorCero_tk];
      

      }
      
      //var clases=valor_Textoarea.match(/(?<=Destino:\s{0,}\s{0}.*\n\w{1,}\s)(ESTÁNDAR|CONFORT)/g);
      
      var clases=valor_Textoarea.match(/(ESTÁNDAR|CONFORT|TURISTA)/g);

      var tar=valor_Textoarea.match(/(.*)(?=\sT\.C|\s(Metálico|Metalico))/g);
      console.log(numeros_de_tren)
      
      //s1t
      
       console.log("PLZ:"+plaza[contadorCero_tk]+" C:"+clases[contadorCero_tk]+" TAR:"+tar[contadorCero_tk])


      

      console.log("TAR:"+tar[contadorCero_tk])

      var primersegmento="RU1AHK1XZJ "+fecsal +"*RENFE-LC:"+codLc+" TK:"+numero_veces[contadorCero_tk]+ ", ORIG:"+ciudad_Origen[contadorCero_tk]+" "+horas[contadorCero]+", DEST:"+ciudad_Destino[contadorCero_tk]+" "+horas[conta_destino]+", TREN:"+numeros_de_tren[contadorCero_tk]+" "+transporte[contadorCero_tk]+",COCHE:"+coches[contadorCero_tk]+" PLZ:"+plaza[contadorCero_tk]+",C:"+clases[contadorCero_tk]+" TAR:"+tar[contadorCero_tk];
     array_rm_P.push(primersegmento);
    

//SEGUNDA PARTE 
 var forma_de_pago=/\d{1,}\*{1,}\d{1,}/.test(valor_Textoarea);
        var fp="";
        if(forma_de_pago===true){
          fp="CREDITCARD";
        }else{
          fp="CASH";
        }
       var lineastk="RM***RENFE LC:"+codLc+",TK:"+numero_veces[contadorCero_tk]+",IMP:"+total_totales[contadorCero_tk]+",TASA:"+"0.00"+",GESTION:"+"0.00"+" FP:"+fp;
       array_rm_LC.push(lineastk)
       array_rm_LC.push(rm_lista_tarifa[contadorCero_tk])
      if(array_rm_LC.length===4){
        this.array_renfe.push([array_rm_LC])
        array_rm_LC=[]
      }
       
        conta_destino=conta_destino+2;
     
      contadorCero_tk++
      contadorCero=contadorCero+2;
   
}

if(array_rm_LC.length===2){
  this.array_renfe.push([array_rm_LC])
}

      var ultima_1="RM *ACC"+codLc;
       var ultima_2="RM*ACERNF-"+codLc;
       var ultima_3="RM*PNR HAS PASSED ROBOTICS";
       var TC=/((?<=T\.C\.\:\s{0,})\S.*)|(Metálico|Metalico)/.exec(valor_Textoarea)
       console.log([TC])
       
       if(TC[0]==="Metalico"){
        TC[0]="CASH"
       }
       var ultima_4="RM*RENFE FP:"+TC[0]
      
       var array_SEGA=[ultima_1,ultima_2,ultima_3,ultima_4];
      this.array_SEG.push(array_SEGA)
      this.array_RU1AHK1=array_rm_P;


    }

}
}
</script>

<style>
.respuesta_renfe{
  grid-column: 2;
    grid-row: 1/11;
    display: flex;
    flex-flow: column;
    padding-top: 112px;
}
</style>