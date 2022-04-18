<template>
  <div class="ContenedorPrincipal-component">
        <div class="rutas">
  <InputData @accion='Getdata'/>
  <div class="contenedor_alerta heartBeat" :style="alertaCohche">
    <p class="mensaje_alerta">
      TIENES QUE RESERVAR COCHE
    </p>
  </div>
  </div>
   <div class="respuesta_g200">
    <ContenedoresTexto :texto='lineass'/>
      <div class="repuestasDOS" id="repuestasDOS">
            <div class="divSegmento" data-children-count="1">
            <label for="segmento">Valor de segmento</label>
            <input v-model="valor_segmento">
        </div>

        <div class="segundSEG" id="segundSEG">
<p id="reservaCode0">RM*ACC{{Localizador}}/S{{valor_segmento}}</p>
<p id="reservaCode1">RM*ACEMPN-{{Localizador}}/S{{valor_segmento}}</p>
<p>RM*ACEMPA-7X/S{{valor_segmento}}</p>
<p>RM*ACESAL-0.0/S{{valor_segmento}}</p>
<p>RM*ACEMPT-0.0/S{{valor_segmento}}</p>
<p>RM*PSCSCOM-0.0/S{{valor_segmento}}</p>
<p>RM*ACECOM-00.00/S{{valor_segmento}}</p>
<p>RM*ACELCTB-CJM/S{{valor_segmento}}</p>
<p>RM*ACESUP-7X/S{{valor_segmento}}</p>
    <BotonCopiar  @copiar='CopiarTextoRM' :arrayDatos='arrayRM'/>   
        </div>
        </div>
       </div> 
       <router-link to="/" class="home">home </router-link>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import InputData from '.././/componentes_Funcionales/InputData'
import ContenedoresTexto from '.././componentes_Funcionales/Contenedores_texto'
import KitPassive from '../../modulos/KitPassive'
import BotonCopiar from '../componentes_Funcionales/BotonCopiar'
export default {
  data() {
    return {
      statusCoche: false,
      lineass: '',
      Localizador:'',
      arrayRM:[],
      valor_segmento: '',
    }
  },
    
components: {
 VueRouter,
 InputData,
 ContenedoresTexto,
 BotonCopiar
},methods: {
  Getdata(data) {
    ///LIMPIAMOS
  
    ///LIMPIAMOS
      function formatoFecha(inputFecha) {
  var arrayFechas_Letras = [];
  arrayFechas_Letras["01"] = "JAN";
  arrayFechas_Letras["02"] = "FEB";
  arrayFechas_Letras["03"] = "MAR";
  arrayFechas_Letras["04"] = "APR";
  arrayFechas_Letras["05"] = "MAY";
  arrayFechas_Letras["06"] = "JUN";
  arrayFechas_Letras["07"] = "JUL";
  arrayFechas_Letras["08"] = "AUG";
  arrayFechas_Letras["09"] = "SEP";
  arrayFechas_Letras["10"] = "OCT";
  arrayFechas_Letras["11"] = "NOV";
  arrayFechas_Letras["12"] = "DEC";
  var parte1 = KitPassive.buscar_Match(
    /\d{2}(?=\/\d{2}\/)|\d{2}(?=\.\d{2}\.)/,
    inputFecha
  );
  var parte2 = /(?<=\d{2}\/)\d{2}(?=\/\d{4})|(?<=\d{2}\.)\d{2}(?=\.\d{4})/.exec(
    inputFecha
  );

  var parte2Text = parte2[0].toUpperCase();
  var parte3 = KitPassive.buscar_Match(/(?<=\/\d{2}\/)\d{4}/, inputFecha);
  var fecha_final = parte1 + arrayFechas_Letras[parte2Text];
  return fecha_final;
}




    var texto_Area_V = data
    var haycoche = /Coches|coches|coche|Coche/.test(texto_Area_V);
      if(haycoche) {
        this.statusCoche=true
      }else{
        this.statusCoche=false
      }

      var numero_vuelo = KitPassive.buscar_Match(/(?<=Nº\s*de\s*vuelo:.)\d{1,}/, texto_Area_V);

      var rango_digitos = numero_vuelo.length;
         if (rango_digitos < 4) {
            var numero_ceros = 4 - rango_digitos;
            numero_ceros = parseInt(numero_ceros);
            var numero_nuevo = numero_vuelo.padStart(numero_ceros + rango_digitos, 0);
        } else {
              var numero_nuevo = numero_vuelo;
                }

        var fecha_salida = KitPassive.buscar_Match(
    /(?<=salida:.)\d{2}\/\d{2}\/\d{4}/,
    texto_Area_V
  );
  var formato_fecha = formatoFecha(fecha_salida);
  var hora_salida = KitPassive.buscar_Match(
    /(?<=salida:.\d{2}\/\d{2}\/\d{4}\s*)\d{2}\:\d{2}/,
    texto_Area_V
  );

  hora_salida = hora_salida.replace(":", "");
  var hora_llegada = KitPassive.buscar_Match(
    /(?<=(Regreso:|llegada:).\d{2}\/\d{2}\/\d{4}\s*)\d{2}\:\d{2}/,
    texto_Area_V
  );
      hora_llegada = hora_llegada.replace(":", "");
      var ciudad_salida = KitPassive.buscar_Match(/(?<=Salida:.)\w{0,}/, texto_Area_V);
      var ciudad_llegada = KitPassive.buscar_Match(/(?<=Llegada:.)\w{0,}/, texto_Area_V);
  //esta xpresion regular no es del todo correcta pero nos funciona para saber el numero de pasajeros pero no para capturar el nombre completo de los pasajeros pero ese no es el objetivo ahora mismo.
      var pasajeros = texto_Area_V.match(
          /(?<=(Viajeros:.*\n)|(Viajeros:.*\n(.*\n){1,}))(\w{0,}[A-Z-Ñ](\s{0,}|)){1,6}\n/g
          );
      var numero_pasajeros = pasajeros.length;
      var localizador = KitPassive.buscar_Match(/(?<=Reserva\s{0,})\d{1,}/, texto_Area_V);
      this.Localizador = localizador;
  var linea ="SS7X" + numero_nuevo + "Y" + formato_fecha + ciudad_salida + ciudad_llegada + "GK" + numero_pasajeros + "/" + hora_salida + hora_llegada + "/" + localizador;
  this.lineass=linea
  },
  CopiarTextoRM(){
    var segmento=this.valor_segmento
    var localizador=this.Localizador
   this.arrayRM.push('RM*ACC'+localizador+'/S'+this.valor_segmento)
    this.arrayRM.push('RM*ACEMPN-'+localizador+'/S'+this.valor_segmento)


    var listaRM=['RM*ACEMPA-7X/S','RM*ACESAL-0.0/S','RM*ACEMPT-0.0/S','RM*PSCSCOM-0.0/S','RM*ACECOM-00.00/S','RM*ACELCTB-CJM/S','RM*ACESUP-7X/S']
    listaRM.forEach(element => {
      this.arrayRM.push(element+this.valor_segmento);
    })
    ///RESETEAMOS EL ARRAY PARA NO ACOMULAR DATOS
this.arrayRM=[]
  }
},computed: {
  alertaCohche() {
    return [this.statusCoche ? {'display':'flex'} : {'display':'none'}];
  }
},
}
</script>

<style>
.segundSEG {
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding: 20px;
    align-items: center;
    font-size: 20px;

}
.segundSEG>p{
  margin-bottom: -4px;
}

.respuesta_g200{
grid-column: 2;
    grid-row: 1/11;
    justify-content: center;
    padding-top: 111px;
    font-family: 'Roboto', sans-serif;
}
.divSegmento{
      font-size: 24px;
    display: flex;
    justify-content: center;
}
.divSegmento>input{
  border: solid 1.5px #ff8787;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    width: 100px;
    margin-left: 15px;
}
.contenedor_alerta{
position: relative;
    top: 13%;
    justify-content: center;
    display: flex;
    FONT-SIZE: 1.8vw;
    font-weight: bolder;
    color: #ff8787;
    background: white;
    padding: 14px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    border-radius: 15px;
     font-family: 'Roboto', sans-serif;
}

</style>