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
            <td id="compa">FR</td>
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
    var numeros_vuelo=valor_textoArea.match(/(VY)\d{1,}(?=\n)/g);
    var localizador_v=KitPassive.buscar_Match(/(?<=Código de Reserva\:\s{2,}).*/,valor_textoArea);
    var horas_vuelos=valor_textoArea.match(/(?<=\t{0,})\d{2}\:\d{2}/g);
    var input_ciudad=valor_textoArea.match(/(?<=\w{1,}\s{1,}\()\w{3,}/g)
    var fechas =valor_textoArea.match(/(?<=(Ida|Vuelta)\:\s{0,})\d{2}\/\d{2}\/\d{4}/g)
    var numeroPersona=valor_textoArea.match(/\n[0-9]\w\s{1}(?!\n)/g);
    

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