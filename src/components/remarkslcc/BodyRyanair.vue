<template>
  <div class="ContenedorPrincipal">
        <div class="rutas">
             <div @click="load"  class="iraTras">BACK</div>
<InputData @accion='GetData'/>
  </div>
   <div class="respuesta_Ryanair">
    <div id="contenido-ruta" class="contenido-ruta" data-children-count="1">
    <table id="ida">
        <tbody><tr><td style="font-size: 25px; text-align: center;">IDA</td></tr>
        <tr>
            <td>Compañía</td>
            <td id="compa">VY</td>
        </tr>
        <tr>
            <td>Nº de Vuelo</td>
            <td>{{numeroVuelo}}</td>
        </tr>
        <tr>
            <td>Fecha de Salida
            </td>
            <td >{{fechaSalida}}</td>
        </tr>
        <tr>
            <td>Ciudad de Salida
            </td>
            <td>{{ciudadSalida}}</td>
        </tr>
        <tr>
            <td>Ciudad de llegada</td>
            <td>{{ciudadLlegada}}</td>
        </tr>
        <tr>
            <td>Numero de Pasajeros</td>
            <td >{{numeroPasajero}}</td>
        </tr>
        <tr>
            <td>Hora de salida
            </td>
            <td >{{horaSalida}}</td>
        </tr>
        <tr>
            <td>Hora de llegada</td>
            <td>{{horaLlegada}}</td>
        </tr>
        <tr>
            <td>Localizador</td>
            <td>{{Localizador}}</td>
        </tr>
    </tbody></table>
    <table  :style="activar">
            <tbody><tr><td style="font-size: 25px; text-align: center;">VUELTA</td></tr>
            <tr>
                <td>Compañía</td>
                <td>FR</td>
            </tr>
            <tr>
                <td>Nº de Vuelo</td>
                <td>{{Vuelta.numeroVuelo}}</td>
            </tr>
            <tr>
                <td>Fecha de Salida
                </td>
                <td>{{Vuelta.fechaSalida}}</td>
            </tr>
            <tr>
                <td>Ciudad de Salida
                </td>
                <td >{{Vuelta.ciudadSalida}}</td>
            </tr>
            <tr>
                <td>Ciudad de llegada</td>
                <td >{{Vuelta.ciudadLlegada}}</td>
            </tr>
            <tr>
                <td>Numero de Pasajeros</td>
                <td>{{Vuelta.numeroPasajeros}}</td>
            </tr>
            <tr>
                <td>Hora de salida</td>
                <td >{{Vuelta.horaSalida}}</td>
            </tr>
            <tr>
                <td>Hora de llegada</td>
                <td >{{Vuelta.horaLlegada}}</td>
            </tr>
            <tr>
                <td>Localizador</td>
                <td>{{Vuelta.Localizador}}</td>
            </tr>
        </tbody></table>
       
    </div>
      <div class='btnRyanairCopiar'>
        <BotonCopiar :arrayDatos='array_SS'/>
      </div>
      <div class="segundaparte" data-children-count="5">
    <table>
        <tbody data-children-count="3">
        <tr>
            <td>Segmento Vuelos</td>
            <td ><input  class="SegmentoV"  v-model="Segmentos.numeroSegmento"></td>
        </tr>
       
        <tr>
            <td>Importe Bruto</td>
            <td>{{importeBruto}}</td>
        </tr>
        <tr>
            <td>RM*PSCREF-</td>
            <td><input  class="SegmentoV" v-model="Segmentos.PSCREF"></td>
        </tr>
        <tr>
            <td>FPCC ejem. AX111111111111/1111</td>
            <td><input class="SegmentoV" v-model="Segmentos.FPCC"></td>
        </tr>
        <!--
        <tr>
            <td>Nº de Billete 1
            </td>
            <td ><input type="text"id="NumeroBillete"></td>
            
        </tr>
    -->
       </tbody><tbody id="Segmentosadd" ></tbody>
        <tbody><tr id="nodobe">
            <td>Sobrecomisión</td>
            <td ><input  class="SegmentoV" v-model="Segmentos.Sobremision"></td>
        </tr>
    </tbody>
    </table>
    
</div>
      <div class='btnRyanairCopiar'>
        <BotonCopiar :arrayDatos='array_segmentos' @copiar="Getsegmentos"/>
      </div>
       </div> 
       
       <router-link to="/" class="home">home </router-link>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import InputData from '../componentes_Funcionales/InputData'
import BotonCopiar from '../componentes_Funcionales/BotonCopiar'
import KitPassive from '../../modulos/KitPassive'
export default {
    data() {
      return {
        numeroVuelo: '',
        fechaSalida:'',
        ciudadSalida:'',
        ciudadLlegada:'',
        numeroPasajero: '',
        horaSalida:'',
        horaLlegada:'',
        Localizador:'',
        importeBruto: '',
        Vuelta:{
        Satatus:false,
        numeroVuelo: '',
        fechaSalida:'',
        ciudadSalida:'',
        ciudadLlegada:'',
        numeroPasajero: '',
        horaSalida:'',
        horaLlegada:'',
        Localizador:'',
        importeBruto: '',
        },
        array_SS:[],
        Segmentos:{
          numeroSegmento: '',
          PSCREF:'',
          FPCC:'',
          Sobremision:'',
          },
          array_segmentos:[],
          arrayVariablesG:[]
      }
    },
components: {
 VueRouter,
 InputData,
 BotonCopiar
},methods: {
    load(){
       location.reload();
    },
  GetData(data){
// RESETEAMOS EL ARRAY SS PARA QUE NO SE QUEDEN GUARDADOS LOS DATOS DE LA 'SESION' ANTERIOR 
this.array_SS=[]
//El texto para analisar 
 
 var valor_textoArea=data;

// Obtenemos todos los datos que necesitamos del texto introducido por el usuario
    var numeros_vuelo=valor_textoArea.match(/(FR|VY)\d{1,}(?=\n)/g);
    var localizador_v=KitPassive.buscar_Match(/(?<=Número de reserva\:\n).*/,valor_textoArea);
    var horas_vuelos=valor_textoArea.match(/(?<=\w{1,}\s{0,}\-\s{0,})\d{2}\:\d{2}\n/g);
    var input_ciudad=valor_textoArea.match(/(?<=Llegada.*\n).*/g)
   
    var ciudad=input_ciudad[0].match(/(?<=\()\w{1,4}[A-Za-z](?=\))/g);
    
    var fechas=valor_textoArea.match(/\d{2}\/\d{2}\/\d{4}/g);
    var Numero_pasajeros=valor_textoArea.match(/(Sr|Sra)(?=\s{0}(\.|))/g);
    var Importe_bruto_v=KitPassive.buscar_Match(/(?<=Recibo\:\n.*\n)\d{1,}(\.|\,)\d{1,}(?=\s{0,}\w{1,}\n)/,valor_textoArea);
                                      Importe_bruto_v=Importe_bruto_v.replace(",",".");
                                        var importeBruto=parseFloat(Importe_bruto_v);
// Obtenemos todos los datos que necesitamos del texto introducido por el usuario

//ASOCIAMOS LAS VARIABLES DE VDATA A LAS VARIABLES CREADAS CON LOS DATOS RECOLECTADOS 
this.numeroVuelo=numeros_vuelo[0]
this.fechaSalida=fechas[0]
this.ciudadSalida=ciudad[0]
this.ciudadLlegada=ciudad[1]
this.numeroPasajero=Numero_pasajeros.length
this.horaSalida=horas_vuelos[0]
this.horaLlegada=horas_vuelos[1]
this.Localizador=localizador_v
this.importeBruto=importeBruto
//ASOCIAMOS LAS VARIABLES DE VDATA A LAS VARIABLES CREADAS CON LOS DATOS RECOLECTADOS 

//CREAMOS FORMATOS DE FECHAS VALIDOS PARA QUE AMADEUS LO ACEPTE
                                //?FECHAS ASOCIATIVAS--INICIO
                                var array_fechas=[];
                                array_fechas["01"]="JAN";
                                array_fechas["02"]="FEB";
                                array_fechas["03"]="MAR";
                                array_fechas["04"]="APR";
                                array_fechas["05"]="MAY";
                                array_fechas["06"]="JUN";
                                array_fechas["07"]="JUL";
                                array_fechas["08"]="AUG";
                                array_fechas["09"]="SEP";
                                array_fechas["10"]="OCT";
                                array_fechas["11"]="NOV";
                                array_fechas["12"]="DEC";
                               
                                var fecha_Mes=/(?<=\d{2}\/)\d{2}(?=\/\d{4})/.exec(fechas[0]);
                                var fecha_numero=/\d{2}(?=\/\d{2}\/\d{4})/.exec(fechas[0]);
                                if(fecha_numero[0].length<=1){
                                  fecha_numero[0]="0"+fecha_numero[0];
                                }
                                
                               
                                //?FECHAS ASOCIATIVAS --FIN  

                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--INICIO

                                ciudad[0]=ciudad[0].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudad[0]=ciudad[0].replace(/\n{0,}$/,"");
                                ciudad[1]=ciudad[1].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudad[1]=ciudad[1].replace(/\n{0,}$/,"");
                             
                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--FIN

                                //?FORMATO DE HORA (QUITAR  ":" )--INICIO
                                horas_vuelos[0]=horas_vuelos[0].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[0]=horas_vuelos[0].replace(/\n{0,}$/,"");
                                horas_vuelos[1]=horas_vuelos[1].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[1]=horas_vuelos[1].replace(/\n{0,}$/,"");
                                horas_vuelos[0]=horas_vuelos[0].replace(/\:/,"");
                                horas_vuelos[1]=horas_vuelos[1].replace(/\:/,"");
                                //?FORMATO DE HORA (QUITAR  ":" )--FIN

//CREAMOS FORMATOS DE FECHAS VALIDOS PARA QUE AMADEUS LO ACEPTE                                
      var LineaIda="SS"+numeros_vuelo[0]+"Y"+fecha_numero[0]+array_fechas[fecha_Mes[0]]+ciudad[0]+ciudad[1]+"GK"+Numero_pasajeros.length+"/"+horas_vuelos[0]+horas_vuelos[1]+"/"+localizador_v;//GK numero de pasajeros (entre ciudad y  /)
 this.array_SS.push(LineaIda);

//DESARROLLO DEL APARTADO 'VUELTA' 

   var numero_salidas=valor_textoArea.match(/Salida/g);
    var n_veces=numero_salidas.length;
    if(n_veces===2){
      // ACTIVAMOS LA TABLA DE 'VUELTA' PARA MOSTRAR LOS DATOS
      this.Vuelta.Satatus=true
      // ACTIVAMOS LA TABLA DE 'VUELTA' PARA MOSTRAR LOS DATOS
      
      var ciudad_vuelta=input_ciudad[1].match(/(?<=\()\w{1,4}[A-Za-z](?=\))/g);

      //ASOCIAMOS LAS VARIABLES DE VDATA-VUELTA A LAS VARIABLES CREADAS CON LOS DATOS RECOLECTADOS 
      
        this.Vuelta.numeroVuelo=numeros_vuelo[1]
        this.Vuelta.fechaSalida=fechas[1]
        this.Vuelta.ciudadSalida=ciudad_vuelta[0]
        this.Vuelta.ciudadLlegada=ciudad_vuelta[1]
        this.Vuelta.numeroPasajero=Numero_pasajeros.length
        this.Vuelta.horaSalida=horas_vuelos[2]
        this.Vuelta.horaLlegada=horas_vuelos[3]
        this.Vuelta.Localizador=localizador_v;

       //ASOCIAMOS LAS VARIABLES DE VDATA-VUELTA A LAS VARIABLES CREADAS CON LOS DATOS RECOLECTADOS 
     
     var array_fechas_Vuelta=[];
                                array_fechas_Vuelta["01"]="JAN";
                                array_fechas_Vuelta["02"]="FEB";
                                array_fechas_Vuelta["03"]="MAR";
                                array_fechas_Vuelta["04"]="APR";
                                array_fechas_Vuelta["05"]="MAY";
                                array_fechas_Vuelta["06"]="JUN";
                                array_fechas_Vuelta["07"]="JUL";
                                array_fechas_Vuelta["08"]="AUG";
                                array_fechas_Vuelta["09"]="SEP";
                                array_fechas_Vuelta["10"]="OCT";
                                array_fechas_Vuelta["11"]="NOV";
                                array_fechas_Vuelta["12"]="DEC";
                               
                                 fecha_Mes=/(?<=\d{2}\/)\d{2}(?=\/\d{4})/.exec(fechas[1]);
                                 
                                 fecha_numero=/\d{2}(?=\/\d{2}\/\d{4})/.exec(fechas[1]);
                                if(fecha_numero[0].length<=1){
                                   
                                  fecha_numero[0]="0"+fecha_numero[0];
                                }
                                
                                //var dec=fecha_Mes[0].toUpperCase();
                                //?FECHAS ASOCIATIVAS --FIN  

                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--INICIO
                              
                                ciudad_vuelta[0]=ciudad_vuelta[0].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudad_vuelta[0]=ciudad_vuelta[0].replace(/\n{0,}$/,"");
                                ciudad_vuelta[1]=ciudad_vuelta[1].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudad_vuelta[1]=ciudad_vuelta[1].replace(/\n{0,}$/,"");
                                
                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--FIN

                                //?FORMATO DE HORA (QUITAR  ":" )--INICIO
                                horas_vuelos[2]=horas_vuelos[2].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[2]=horas_vuelos[2].replace(/\n{0,}$/,"");
                                horas_vuelos[3]=horas_vuelos[3].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[3]=horas_vuelos[3].replace(/\n{0,}$/,"");
                                horas_vuelos[2]=horas_vuelos[2].replace(/\:/,"");
                                horas_vuelos[3]=horas_vuelos[3].replace(/\:/,"");
                                //?FORMATO DE HORA (QUITAR  ":" )--FIN
                                    
     
     
     var LineaVuelta="SS"+numeros_vuelo[1]+"Y"+fecha_numero[0]+array_fechas_Vuelta[fecha_Mes[0]]+ciudad_vuelta[0]+ciudad_vuelta[1]+"GK"+Numero_pasajeros.length+"/"+horas_vuelos[2]+horas_vuelos[3]+"/"+localizador_v;
    this.array_SS.push(LineaVuelta);
    }
  
  //DESARROLLO DE LA SEGUNDA PARTE 'SEGMENTOS'
 this.arrayVariablesG.push(localizador_v,importeBruto)
  },
  Getsegmentos() {
    ///LIMPIAMOS EL ARRAY PARA QUE NO SE ACOMULEN LOS DATOS QUE YA NO QUEREMOSs
  
    //DESARROLLO DE LA SEGUNDA PARTE 'SEGMENTOS'
    var localizador_v=this.arrayVariablesG[0]
    var importeBruto= this.arrayVariablesG[1]
    
  var rmacc="RM*ACC"+localizador_v+"/S"+this.Segmentos.numeroSegmento;
  var rmacempn="RM*ACEMPN-"+localizador_v+"/S"+this.Segmentos.numeroSegmento;
  var rmacempa="RM*ACEMPA-FR/S"+this.Segmentos.numeroSegmento;
  var rmacevo="RM*ACELVO-HO/s"+this.Segmentos.numeroSegmento;
  var rmacesal="RM*ACESAL-"+importeBruto+"/S"+this.Segmentos.numeroSegmento;
this.array_segmentos.push(rmacc,rmacempn,rmacempa,rmacesal);

  var rmacecom="RM*ACECOM-00.00"+"/S"+this.Segmentos.numeroSegmento;
  var pscscom="RM*PSCSCOM-"+this.Segmentos.Sobremision+"/S"+this.Segmentos.numeroSegmento;
  var rmacesup="RM*ACESUP-FR/s"+this.Segmentos.numeroSegmento;
  var rmpscref_texto="RM*PSCREF-"+this.Segmentos.PSCREF+"/s"+this.Segmentos.numeroSegmento; 
  var fpcc_texto="FPCC"+this.Segmentos.FPCC;
  var acempt ="RM*ACEMPT-00.00/s"+this.Segmentos.numeroSegmento;
  var acecom = "RM*ACECOM-00.00/s"+this.Segmentos.numeroSegmento;
  
  if(this.Segmentos.PSCREF===""){
    rmpscref_texto=""
} 

    if(this.Segmentos.FPCC===""){
        fpcc_texto=""
    } 
  if(this.Segmentos.Sobremision!=""){
    this.array_segmentos.push(pscscom,rmacecom,rmacesup,rmacevo,rmpscref_texto,fpcc_texto,acempt,acecom);
  }else{
    this.array_segmentos.push(rmacesup,rmpscref_texto,rmacevo,fpcc_texto,acempt,acecom)
  }
  this.array_segmentos=[]
  }
},computed: {
  activar(){
   return [this.Vuelta.Satatus ? {'display': 'inline-table'} : {'display':' none'} ]
  }
}
}
</script>

<style>

.respuesta_Ryanair{
  grid-area: none;
grid-column: 2;
    grid-row: 1/11;
    display: flex;
    justify-content: center;
        padding-top: 111px;
        flex-flow: column;
}
.contenido-ruta {
    display: flex;
   
        font-family: 'Roboto', sans-serif;
            font-size: 18px;
}
.contenido-ruta>table {
    margin: 20px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    padding: 20px;
}
.contenido-ruta>table {
    margin: 20px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    padding: 20px;
}
.btnRyanairCopiar{
display: flex;
    padding: 0;
    margin: 0;
    position: relative;
    top: -22px;

}
.segundaparte {
    display: flex;
    justify-content: center;
    margin: 20px;
        font-family: 'Roboto', sans-serif;
    font-size: 18px;
}
.segundaparte>table {
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    padding: 50px;
}
.SegmentoV {
    border: solid 2px #ff8787;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    outline: none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
}
.iraTras{
   width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #ffffff;
    font-family: 'Heebo', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 19px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    position: absolute;
    left: 12px;
    top: 87%;
    transform: scale(.8);
    cursor: pointer;
}
</style>