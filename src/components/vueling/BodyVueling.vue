<template>
  <div class="ContenedorPrincipal-component">
        <div class="rutas">
            <inputData @accion='Getdata'/>
  </div>
   <div class="respuesta_vueling">
       <div class="contenido-ruta">
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
            <td>Numero de asientos</td>
            <td >{{numeroAsientos}}</td>
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
                <td>Numero de asientos</td>
                <td>{{Vuelta.numeroAsientos}}</td>
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
<div class='contenedor_btn_copiar'>
        <BotonCopiar :arrayDatos='array_SS'/>
      </div>
      <div class="segundaparte">
    <table>
        <tbody >
        <tr>
            <td>Segmento Vuelos</td>
            <td ><input :style="segmentoError" class="SegmentoV"  v-model="Segmentos.numeroSegmento"></td>
        </tr>

        <tr>
            <td>Importe Bruto</td>
            <td>{{Segmentos.importe}}</td>
        </tr>
        <tr>
            <td> Tax</td>
            <td><input  class="SegmentoV" v-model="Segmentos.Tax"></td>
        </tr>
        <tr v-for="(items, index)  in arrayNumeroBilletes" :key="index">
            <td>Nº de Billete {{index+1}}</td>
            <td>{{items}}</td>
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
<div class='contenedor_btn_copiar'>
        <BotonCopiar :arrayDatos='array_segmentos' @copiar='GetSegmentos'/>
      </div>
       </div>

       <router-link to="/" class="home">home </router-link>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import inputData from '../componentes_Funcionales/InputData'
import KitPassive from '../../modulos/KitPassive'
import BotonCopiar from '.././componentes_Funcionales/BotonCopiar'
export default {
    data() {
        return {
            numeroVuelo: '',
        fechaSalida:'',
        ciudadSalida:'',
        ciudadLlegada:'',
        numeroAsientos: '',
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
        numeroAsientos: '',
        horaSalida:'',
        horaLlegada:'',
        Localizador:'',
        importeBruto: '',
        },
        array_SS:[],
        Segmentos:{
          numeroSegmento: '',
          importe: '',
          Tax:'',
          Nbillete:'',
          Sobremision:'',
          },
          array_segmentos:[],
          arrayNumeroBilletes:[]
        }
    },
components: {
 VueRouter,
 inputData,
 BotonCopiar
},methods: {
    Getdata(data) {
          // REINICIAMOS LOS CAMPOS CADA VEZ QUE GENERE UNO NUEVO
            this.arrayNumeroBilletes=[]
            this.array_SS=[]

        // REINICIAMOS LOS CAMPOS CADA VEZ QUE GENERE UNO NUEVO

    var valor_textoArea=data;
    var numeros_vuelo=valor_textoArea.match(/(?<=Vuelo\s{0,}VY)\d{1,}|(?<=VY)\d{1,}/g);
    var numeros_de_billetes=valor_textoArea.match(/(?<=TKTT\s{0,})\d{1,}(?=\n)/g);
    var horas_vuelos=valor_textoArea.match(/(?<=\w{1,}\s{0,}\(.*\)\:\s{0,}(\w{1,}\s{0,}(\d{1,}|\w)\s{0,}|))\d{2}\:\d{2}|(?<=\w{1,}\s{0,}(\(\w{1,}\)\s{0,}\(.*\)\:\s{0,}))\d{1,}\:\d{2}|\n\d{2}\:\d{2}((?=h)|(?=))/g);
    var ciudades=valor_textoArea.match(/(?<=\w{1,}\s(\(\w{1,}\)\s\()).*\w{1,}?(?=\)\:)|(?<=\w{1,}\s\()\w{3,4}(?=\)\:)|\n{1}[A-Z]{3}\n/g);
    var fechas=valor_textoArea.match(/(?<=(Miércoles|Jueves|Viernes|Lunes|Martes|Sábado|Domingo)(\,|\s{0,})\s).*/g);
    var localizador_v=KitPassive.buscar_Match(/(?<=\w{1,}\s{0,}\d{1,}(\:|)(\s{0,}|)\w{1,}\ó\w{1,}\s{0,}\w{1,}\s{0,}\w{1,}\:\s{0,})\w{1,}|(?<=Código de reserva).*/,valor_textoArea);
    var numero_Asiento=numeros_de_billetes.length;

    //asignamos la informacion extraida de la data
        this.numeroVuelo=numeros_vuelo[0]
        this.fechaSalida=fechas[0]
        this.ciudadSalida=ciudades[0]
        this.ciudadLlegada=ciudades[1]
        this.numeroAsientos=numeros_de_billetes.length
        this.horaSalida=horas_vuelos[0]
        this.horaLlegada=horas_vuelos[1]
        this.Localizador=localizador_v

        //  Depuramos los ultimos datos para crear el RM
         var array_fechas=[];
                                array_fechas["ENERO"]="JAN";
                                array_fechas["FEBRERO"]="FEB";
                                array_fechas["MARZO"]="MAR";
                                array_fechas["ABRIL"]="APR";
                                array_fechas["MAYO"]="MAY";
                                array_fechas["JUNIO"]="JUN";
                                array_fechas["JULIO"]="JUL";
                                array_fechas["AGOSTO"]="AUG";
                                array_fechas["SEPTIEMBRE"]="SEP";
                                array_fechas["OCTUBRE"]="OCT";
                                array_fechas["NOVIEMBRE"]="NOV";
                                array_fechas["DICIEMBRE"]="DEC";

                                var fecha_Mes=/(?<=(\d\d|\d)\s)\w{1,}/.exec(fechas[0]);
                                var fecha_numero=/(?<=\w{0,}\,\s{0,})\d{1,}|(?<=)\d{1,}/.exec(fechas[0]);
                                if(fecha_numero[0].length<=1){
                                  fecha_numero[0]="0"+fecha_numero[0];
                                }

                                var dec=fecha_Mes[0].toUpperCase();
                                //?FECHAS ASOCIATIVAS --FIN

                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--INICIO

                                ciudades[0]=ciudades[0].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudades[0]=ciudades[0].replace(/\n{0,}$/,"");
                                ciudades[1]=ciudades[1].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudades[1]=ciudades[1].replace(/\n{0,}$/,"");
                                console.log(ciudades[1]);
                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--FIN

                                //?FORMATO DE HORA (QUITAR  ":" )--INICIO
                                horas_vuelos[0]=horas_vuelos[0].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[0]=horas_vuelos[0].replace(/\n{0,}$/,"");
                                horas_vuelos[1]=horas_vuelos[1].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[1]=horas_vuelos[1].replace(/\n{0,}$/,"");
                                horas_vuelos[0]=horas_vuelos[0].replace(/\:/,"");
                                horas_vuelos[1]=horas_vuelos[1].replace(/\:/,"");
                                //?FORMATO DE HORA (QUITAR  ":" )--FIN



   var LineaIda="SSVY"+numeros_vuelo[0]+"Y"+fecha_numero[0]+array_fechas[dec]+ciudades[0]+ciudades[1]+"GK"+numero_Asiento+"/"+horas_vuelos[0]+horas_vuelos[1]+"/"+localizador_v;
   console.log(LineaIda);

   this.array_SS.push(LineaIda);

   //vuelta

        var HayVuelta=/Vuelta|BasicVuelo\s{0,}2/.test(valor_textoArea);//comprobamos que hay vuelta en la solicitud
        if(HayVuelta===true){
           this.Vuelta.Satatus=true


this.Vuelta.numeroVuelo=numeros_vuelo[1]
this.Vuelta.fechaSalida=fechas[1]
this.Vuelta.ciudadSalida=ciudades[2]
this.Vuelta.ciudadLlegada=ciudades[3]
this.Vuelta.numeroAsientos=numeros_de_billetes.length
this.Vuelta.horaSalida=horas_vuelos[2]
this.Vuelta.horaLlegada=horas_vuelos[3]
this.Vuelta.Localizador=localizador_v

//CREAMOS FORMATOS VALIDOS PARA CREAR LA LINEAS QUE SE COMPIRARAN----------------------------VUELTA---------------------------------
                                //?FECHAS ASOCIATIVAS--INICIO
                                var array_fechas_Vuelta=[];
                                array_fechas_Vuelta["ENERO"]="JAN";
                                array_fechas_Vuelta["FEBRERO"]="FEB";
                                array_fechas_Vuelta["MARZO"]="MAR";
                                array_fechas_Vuelta["ABRIL"]="APR";
                                array_fechas_Vuelta["MAYO"]="MAY";
                                array_fechas_Vuelta["JUNIO"]="JUN";
                                array_fechas_Vuelta["JULIO"]="JUL";
                                array_fechas_Vuelta["AGOSTO"]="AUG";
                                array_fechas_Vuelta["SEPTIEMBRE"]="SEP";
                                array_fechas_Vuelta["OCTUBRE"]="OCT";
                                array_fechas_Vuelta["NOVIEMBRE"]="NOV";
                                array_fechas_Vuelta["DICIEMBRE"]="DEC";

                                 fecha_Mes=/(?<=(\d\d|\d)\s)\w{1,}/.exec(fechas[1]);

                                 fecha_numero=/(?<=\w{0,}\,\s{0,})\d{1,}|(?<=)\d{1,}/.exec(fechas[1]);
                                 console.log(fechas[1],fecha_numero)
                                if(fecha_numero[0].length<=1){

                                  fecha_numero[0]="0"+fecha_numero[0];
                                }

                                var dec=fecha_Mes[0].toUpperCase();
                                //?FECHAS ASOCIATIVAS --FIN

                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--INICIO

                                ciudades[2]=ciudades[2].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudades[2]=ciudades[2].replace(/\n{0,}$/,"");
                                ciudades[3]=ciudades[3].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudades[3]=ciudades[3].replace(/\n{0,}$/,"");
                                console.log(ciudades[1]);
                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--FIN

                                //?FORMATO DE HORA (QUITAR  ":" )--INICIO
                                horas_vuelos[2]=horas_vuelos[2].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[2]=horas_vuelos[2].replace(/\n{0,}$/,"");
                                horas_vuelos[3]=horas_vuelos[3].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[3]=horas_vuelos[3].replace(/\n{0,}$/,"");
                                horas_vuelos[2]=horas_vuelos[2].replace(/\:/,"");
                                horas_vuelos[3]=horas_vuelos[3].replace(/\:/,"");
                                //?FORMATO DE HORA (QUITAR  ":" )--FIN



   var LineaVuelta="SSVY"+numeros_vuelo[1]+"Y"+fecha_numero[0]+array_fechas_Vuelta[dec]+ciudades[2]+ciudades[3]+"GK"+ numero_Asiento+"/"+horas_vuelos[2]+horas_vuelos[3]+"/"+localizador_v;

this.array_SS.push(LineaVuelta)

console.log(this.array_SS)
 }else{
               this.Vuelta.Satatus=false;
           }

//  CALCULO DE IMPORTE

var Importe_bruto_v=KitPassive.buscar_Match(/((?<=Precio total:\s)|((?<=Total:\s)))\d{1,}\,\d{1,}/,valor_textoArea);
                                        Importe_bruto_v=Importe_bruto_v.replace(",",".");
                                        var importe=parseFloat(Importe_bruto_v);

                                        var Importe_bruto_final=importe/numeros_de_billetes.length;
                                        var Importe_bruto_final_f=Importe_bruto_final.toFixed(2);

                                        this.Segmentos.importe=Importe_bruto_final_f
// CALCULAMOS EL TAX
var tax_v=KitPassive.buscar_Match(/(?<=Tasas\s)\d{1,}\,\d{1,}|(?<=Tasas)\d{1,}\,\d{1,}/,valor_textoArea);
                                            tax_v=tax_v.replace(",",".");
                                            var imTasas=parseFloat(tax_v);

                                        var tax_v_final=imTasas/numeros_de_billetes.length;
                                        var TAX=tax_v_final.toFixed(2);
                                        this.Segmentos.Tax=TAX;

                                        ///ASIGNAMOS LOS NUMEROS DE BILLETES PARA UTILIZARLOS EN LOS SEGMENTOS
                                        console.log(numeros_de_billetes)
                                        this.arrayNumeroBilletes=numeros_de_billetes
    },GetSegmentos(){

        var numeroSegmento=this.Segmentos.numeroSegmento
        if(numeroSegmento!=""){


        var Localizador=this.Localizador
            var rmacc="RM*ACC"+Localizador+"/s"+numeroSegmento;
            var rmacempn="RM*ACEMPN-"+Localizador+"/s"+numeroSegmento;
            var rmacempa="RM*ACEMPA-030/s"+numeroSegmento;
            var rmacesal="RM*ACESAL-"+this.Segmentos.importe+"/s"+numeroSegmento;
            var rmacempt="RM*ACEMPT-"+this.Segmentos.Tax+"/s"+numeroSegmento;
            var rmacelctb="RM*ACELCTB-ETN/s"+numeroSegmento;
            var rmacesup=  "RM*ACESUP-030/s"+numeroSegmento;
                this.array_segmentos.push(rmacc,rmacempn,rmacempa,rmacesal,rmacempt,rmacelctb,rmacesup)
                this.arrayNumeroBilletes.forEach(item=> {
                var rmactkt='RM*ACETKT-'+item+'/S'+numeroSegmento

                this.array_segmentos.push(rmactkt)
    })

    var rmacecom="RM*ACECOM-00.00"+"/s"+numeroSegmento;
    var pscscom="RM*PSCSCOM-"+this.Segmentos.Sobremision+"/s"+numeroSegmento;


if (this.Segmentos.Sobremision!="") {
    this.array_segmentos.push(rmacecom,pscscom)
}

      }else{

            alert("Es necesario  segmento")
      }
      //RESETEAMOS LOS ARRAY PARA NO ACOMULAR LOS DATOS

         this.array_segmentos=[]

          //RESETEAMOS LOS ARRAY PARA NO ACOMULAR LOS DATOS

     }
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