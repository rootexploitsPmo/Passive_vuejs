<template>
  <div class="ContenedorPrincipal-component">
        <div class="rutas">
            <!-- <div @click="load"  class="iraTras">BACK</div> -->
<InputData @accion='GetData'/>
  </div>
   <div class="respuesta_Ryanair">
    <div id="contenido-ruta" class="contenido-ruta" data-children-count="1">
    <table id="ida">
        <tbody><tr><td style="font-size: 25px; text-align: center;">{{titulovueloStatus ? "VUELO 1":"IDA"}}</td></tr>
        <tr>
            <td>Compañía</td>
            <td id="compa">VY</td>
        </tr>
        <tr>
            <td>Nº de Vuelo</td>
            <td>{{Ida.numeroVuelo}}</td>
        </tr>
        <tr>
            <td>Fecha de Salida
            </td>
            <td >{{Ida.fechaSalida}}</td>
        </tr>
        <tr>
            <td>Ciudad de Salida
            </td>
            <td>{{Ida.ciudadSalida}}</td>
        </tr>
        <tr>
            <td>Ciudad de llegada</td>
            <td>{{Ida.ciudadLlegada}}</td>
        </tr>
        <tr>
            <td>Numero de Pasajeros</td>
            <td style="padding-left:15px">{{Ida.numeroPasajero}}</td>
        </tr>
        <tr>
            <td>Hora de salida
            </td>
            <td >{{Ida.horaSalida}}</td>
        </tr>
        <tr>
            <td>Hora de llegada</td>
            <td>{{Ida.horaLlegada}}</td>
        </tr>
        <tr>
            <td>Localizador</td>
            <td>{{Ida.Localizador}}</td>
        </tr>
    </tbody></table>
    <table  :style="activar">
            <tbody><tr><td style="font-size: 25px; text-align: center;">{{titulovueloStatus ? "VUELO 2":"VUELTA"}}</td></tr>
            <tr>
                <td>Compañía</td>
                <td>VY</td>
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
                <td style="padding-left:15px">{{Vuelta.numeroPasajero}}</td>
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
            <td>{{Segmentos.importeBruto}}</td>
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
        Ida:{
        numeroVuelo: '',
        fechaSalida:'',
        ciudadSalida:'',
        ciudadLlegada:'',
        numeroPasajero: '',
        horaSalida:'',
        horaLlegada:'',
        Localizador:'',
       
        },
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
       
        },
        array_SS:[],
        Segmentos:{
          numeroSegmento: '',
           importeBruto: '',
          PSCREF:'',
          FPCC:'',
          Sobremision:'',
          },
          array_segmentos:[],
          arrayVariablesG:[],
          titulovueloStatus:false
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
    var numeros_vuelo=valor_textoArea.match(/(VY)\d{1,}(?=\n)/g);
    var localizador_v=KitPassive.buscar_Match(/(?<=(Código de Reserva\:\s{2,}|Código de reserva|Código de reserva\s{1}))\w{1,}/,valor_textoArea);
    var horas_vuelos=valor_textoArea.match(/(?<=\t{0,})\d{2}\:\d{2}/g);
    var input_ciudad=valor_textoArea.match(/((?<=\w{1,}\s{1,}(\(\w{1,}\)\s|)\()[A-Z]{3,}(?=\)\:(\n|))|(?<=\w{1,}\s\((\w{1,}\))\n)[A-Z]{3})|(?<=\w{1,}\n)[A-Z]{3}(?=\d{2}\:\d{2})|[A-Z]{3}(?=\n\d{2}\:\d{2})|(?<=\()[A-Z]{3}(?=\))/g)
    var fechas =valor_textoArea.match(/((?<=(Ida|Vuelta)\:\s{0,})\d{2}\/\d{2}\/\d{4}|.*\,\s\d{2}\s\w{1,}\,\s\d{4})|(?<=Vuelo\s\d\:)\d{2}\/\d{2}\/\d{4}/g)
    // var numeroPersona=valor_textoArea.match(/\n[0-9]\w\s{1}(?!\n)/g);
    var fecha_depurada=KitPassive.TransforDate(fechas);

    //Creamos una validación para saber si es un ida y vuelta o vuelo 1 y vuelo 2 , de modo  que podamos cambiar el titutlo de las tablas
    var tituloVuelotest=/Vuelo\s\d\:(?=\d{2}\/\d{2}\/\d{4})/.test(valor_textoArea)
    if(tituloVuelotest){
        this.titulovueloStatus=true
    }
    console.log(tituloVuelotest)
  

     var numeroPersona=prompt("Número de pasajeros");
     //ESTE CAMPO ES OBLIGATORIO POR LO QUE SI NO SE COMPLETA NO PODRÁ CONTINUAR
    if(numeroPersona===null||numeroPersona===''){
        return
    }
    var importeBruto=KitPassive.buscar_Match(/(?<=(Importe|Total)\:(\s|))\d{1,}(\,\d{1,}|\.\d{1,}|)/,valor_textoArea)
    //preguntamos si en el importe hay un punto o una coma para remplazar en caso de que  haya coma por un punto.
    var delimitador=/\,/.test(importeBruto);
        if(delimitador){
                importeBruto=importeBruto.replace(",",".");
                        }

                     
//Declaramos las variables para tener un lectura mas facil del codigo.
    let ida_numeroVuelo=numeros_vuelo[0]
    let ida_fechaDeSalida=fechas[0]
    let ida_ciudadSalida=input_ciudad[0]
    let ida_ciudadLlegada=input_ciudad[1]
    let ida_numeroPasajeros=numeroPersona
    let ida_horaDeSalida=horas_vuelos[0]
    let ida_horaDeLlegada= horas_vuelos[1]
    let ida_localizador=localizador_v
// asignamos las variables a la tabla que se mostrará al usurio.
this.Ida.numeroVuelo=ida_numeroVuelo
this.Ida.fechaSalida=ida_fechaDeSalida
this.Ida.ciudadSalida=ida_ciudadSalida
this.Ida.ciudadLlegada=ida_ciudadLlegada
this.Ida.numeroPasajero=ida_numeroPasajeros
this.Ida.horaSalida=ida_horaDeSalida
this.Ida.horaLlegada=ida_horaDeLlegada
this.Ida.Localizador=ida_localizador

// CONTRUIMOS LOS SEGMENTOS SS



        //TRATAMOS LAS FECHAS PARA CAMBIAR SU FORMATO PAR QUE SEA ADMISIBLE PARA AMADEUS.
           let fechaIdaAmadeus=fecha_depurada[0]
           
        //QUITAMOS LOS PUNTOS DE LA HORA
         ida_horaDeSalida=ida_horaDeSalida.replace(":",'')
        ida_horaDeLlegada=ida_horaDeLlegada.replace(":","")

                //CREACIÓN DE LINEA SS
                var LineaIda="SS"+ida_numeroVuelo+"Y"+fechaIdaAmadeus+ida_ciudadSalida+ida_ciudadLlegada+"GK"+ida_numeroPasajeros+"/"+ida_horaDeSalida+ida_horaDeLlegada+"/"+ida_localizador;//GK numero de pasajeros (entre ciudad y  /)
            //REALIZAMOS EL PUSH  EN EL ARRAY QUE GUARDA LAS LINEAS QUE SE COPIARAN.

                this.array_SS.push(LineaIda)


//CREAMOS UNA VALIDACIÓN PARA DETERMINAR SI HAY VUELTA EN LA RESERVA 
            //USAREMOS LA VARIBLE FECHAS PARA VER EL RANGO DEL ARRAY SI ES MAYOR A 1 SIGNIFICA QUE HAY VUELTA TAMBIEN , SI SOLO ES 1 SIGNIFICA QUE SOLO HAY IDA.
            if(fechas.length > 1){
                console.log(horas_vuelos)
                //activamos la tabla para que sea visible(se complementa con computed)
                this.Vuelta.Satatus=true
                 let Vuelta_numeroVuelo=numeros_vuelo[1]
                let Vuelta_fechaDeSalida=fechas[1]
                let Vuelta_ciudadSalida=input_ciudad[2]
                let Vuelta_ciudadLlegada=input_ciudad[3]
                let Vuelta_numeroPasajeros=numeroPersona
                let Vuelta_horaDeSalida=horas_vuelos[2]
                let Vuelta_horaDeLlegada= horas_vuelos[3]
                let Vuelta_localizador=localizador_v
                //ASIGNAMOS LAS VARIABLES AL CUADRO DE VUELTA PARA QUE SE AVISIBLES PARA EL USUARIO.
                this.Vuelta.numeroVuelo=Vuelta_numeroVuelo
                this.Vuelta.numeroVuelo=Vuelta_numeroVuelo
                this.Vuelta.fechaSalida=Vuelta_fechaDeSalida
                this.Vuelta.ciudadSalida=Vuelta_ciudadSalida
                this.Vuelta.ciudadLlegada=Vuelta_ciudadLlegada
                this.Vuelta.numeroPasajero=Vuelta_numeroPasajeros
                this.Vuelta.horaSalida=Vuelta_horaDeSalida
                this.Vuelta.horaLlegada=Vuelta_horaDeLlegada
                this.Vuelta.Localizador=Vuelta_localizador

                   //TRATAMOS LAS FECHAS PARA CAMBIAR SU FORMATO PAR QUE SEA ADMISIBLE PARA AMADEUS.
                  let fechaVueltaAmadeus=fecha_depurada[1]


                     //QUITAMOS LOS PUNTOS DE LA HORA
                 Vuelta_horaDeSalida=Vuelta_horaDeSalida.replace(":",'')
                 Vuelta_horaDeLlegada=Vuelta_horaDeLlegada.replace(":","")


            var LineaVuelta="SS"+Vuelta_numeroVuelo+"Y"+fechaVueltaAmadeus+Vuelta_ciudadSalida+Vuelta_ciudadLlegada+"GK"+Vuelta_numeroPasajeros+"/"+Vuelta_horaDeSalida+Vuelta_horaDeLlegada+"/"+Vuelta_localizador;//GK numero de pasajeros (entre ciudad y  /)
            
            // //CREACIÓN DE LINEA SS VUELTA
            this.array_SS.push(LineaVuelta)

            }else{
                 this.Vuelta.Satatus=false
            }



//IMPORTE  EN EL APARTADO DE SEGMENTOS 
this.Segmentos.importeBruto=importeBruto
  },Getsegmentos(){
    //CREAMOS LOS EGMENTOS
    let importeBruto=this.Segmentos.importeBruto
   var rmacc="RM*ACC"+this.Ida.Localizador+"/S"+this.Segmentos.numeroSegmento;
  var rmacempn="RM*ACEMPN-"+this.Ida.Localizador+"/S"+this.Segmentos.numeroSegmento;
  var rmacempa="RM*ACEMPA-VY/S"+this.Segmentos.numeroSegmento;
  var rmacevo="RM*ACELVO-HO/s"+this.Segmentos.numeroSegmento;
  var rmacesal="RM*ACESAL-"+importeBruto+"/S"+this.Segmentos.numeroSegmento;
this.array_segmentos.push(rmacc,rmacempn,rmacempa,rmacesal);

  var rmacecom="RM*ACECOM-00.00"+"/S"+this.Segmentos.numeroSegmento;
  var pscscom="RM*PSCSCOM-"+this.Segmentos.Sobremision+"/S"+this.Segmentos.numeroSegmento;
  var rmacesup="RM*ACESUP-VY/s"+this.Segmentos.numeroSegmento;
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
</style>