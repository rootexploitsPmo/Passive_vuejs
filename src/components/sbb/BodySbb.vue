<template>
  <div class="ContenedorPrincipal">
        <div class="rutas">
<InputData @accion='GetData'/>
  </div>
   <div class="respuesta_sbb">
     <ContedoresTexto  v-for="(item,index) in array_data" :key="index" :texto='item'/> 
      
       </div> 
       <router-link to="/" class="home">home </router-link>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import InputData from '../componentes_Funcionales/InputData'
import ContedoresTexto from '../componentes_Funcionales/Contenedores_texto'
import KitPassive from '../../modulos/KitPassive'//en esta parte no vamos a poder utilizar este kit ya que las funciones utilizadas aqui son especiales para esta herramientea en concreto

export default {
    data() {
      return {
        array_data: []
      }
    },
components: {
 VueRouter,
 InputData,
 ContedoresTexto
},methods: {
  GetData(data) {

  //Reset para no duplicar datos
  this.array_data=[]
//FUNCIONES QUE CAMBIAR A EL KIT_PASSIVE
var normalize = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç-è,", 
        to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc e ",
        mapping = {};
   
    for(var i = 0, j = from.length; i < j; i++ )
        mapping[ from.charAt( i ) ] = to.charAt( i );
   
    return function( str ) {
        var ret = [];
        for( var i = 0, j = str.length; i < j; i++ ) {
            var c = str.charAt( i );
            if( mapping.hasOwnProperty( str.charAt( i ) ) )
                ret.push( mapping[ c ] );
            else
                ret.push( c );
        }      
        return ret.join( '' );
    }
   
  })();
function buscar_Match(expresionregular,textoareaw){
    var  buscando_Match=expresionregular.test(textoareaw);
    var  buscando_Match_Plano=expresionregular.exec(textoareaw);

        if(buscando_Match===true ){


                return buscando_Match_Plano[0];

            }
            }
function formatoFecha(inputFecha){
    var arrayFechas_Letras=[];
      arrayFechas_Letras["01"]="JAN";
      arrayFechas_Letras["02"]="FEB";
      arrayFechas_Letras["03"]="MAR";
      arrayFechas_Letras["04"]="APR";
      arrayFechas_Letras["05"]="MAY";
      arrayFechas_Letras["06"]="JUN";
      arrayFechas_Letras["07"]="JUL";
      arrayFechas_Letras["08"]="AUG";
      arrayFechas_Letras["09"]="SEP";
      arrayFechas_Letras["10"]="OCT";
      arrayFechas_Letras["11"]="NOV";
      arrayFechas_Letras["12"]="DEC";
      var parte1=buscar_Match(/\d{2}(?=\/\d{2}\/)|\d{2}(?=\.\d{2}\.)/,inputFecha);
      var parte2=/(?<=\d{2}\/)\d{2}(?=\/\d{4})|(?<=\d{2}\.)\d{2}(?=\.\d{4})/.exec(inputFecha);
      var    parte2Text=parte2[0].toUpperCase();
      var parte3=buscar_Match(/(?<=\/\d{2}\/)\d{4}/,inputFecha);
      var fecha_final=parte1+arrayFechas_Letras[parte2Text];
      return fecha_final;
  
  }
function quitarSpacio(input) {
    var texto_sin_espacio=input.replace(" ","");
    return texto_sin_espacio;
}

function creartexto(inpuText){
    var TextoAcolocar=document.createTextNode(inpuText);
    return TextoAcolocar;
    }
//FUNCIONES QUE CAMBIAR A EL KIT_PASSIVE

   
    //CONTIENE EL TEXTO A AANALISAR
    var texto_Area = data
    // EMPEZAMOS CON LA EXTRACCION DE LOS DATOS QUE NECESITAMOS 
    var tickets=texto_Area.match(/Ticket\s\d{1,2}/g);
    var numero_tickets=tickets.length;
   
 
    var fechas_inicio=texto_Area.match(/(?<=Valid:\n)\d{2}\.\d{2}\.\d{4}|\d{2}\/\d{2}\/\d{4}/g);
    var divisa=texto_Area.match(/CHF\s\d{2,}\.\d{2,}/g);
    var localizador=texto_Area.match(/(?<=Order\s*no\.:\n)\d{1,}/g);
    var ciudad_origen=texto_Area.match(/(?<=Point-to-point\s*Ticket\n).*|(?<=\s*Ticket\n).*/g);
    var ciudad_destino=texto_Area.match(/((?<=\s*via\s*(\w{1,}|)Lausanne.*\n).*)|(?<=\s*via\s*\w{1,}.*Lausanne\s*.*\n).*(\-|).*\n(?=1)|(?<=Point-to-point\s*Ticket\n.*(\n))\S.*/g);

    for(var i=0; i<=numero_tickets; i++){
     
      if(tickets[i]){

          var n_ticked=i+1;
      var input_agente=prompt("AEROPUERTO TICKED "+n_ticked);
      input_agente=input_agente.toUpperCase();


        var fechas_AMADEUS=formatoFecha(fechas_inicio[i]);
        var divisa_sin_Spacio=quitarSpacio(divisa[i]);
        var ciudad_origen_R=normalize(ciudad_origen[i]);
        var ciudad_destino_R=normalize(ciudad_destino[i]);
        var lineas="RU 1A HK1 "+input_agente+" "+fechas_AMADEUS+"-OTROS-TRENINTERN/CIA-90494/TARIFA-"+divisa_sin_Spacio+"/LC-"+localizador[i]+"/TXT-"+ciudad_origen_R+"-"+ciudad_destino_R;
        //imprimimos en pantalla
      this.array_data.push(lineas)
    }
     
    
    }
    this.array_data.push('RM*ACEHCO-00.00')
  }
},
}
</script>

<style>


.respuesta_sbb{
  grid-column: 2;
    grid-row: 1/11;
    display: flex;
    flex-flow: column;
    padding-top: 112px;
}

</style>