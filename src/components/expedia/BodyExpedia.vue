<template>
  <div class="ContenedorPrincipal">
    <div class="rutas">
    <InputData @accion="getData"/>
           
  
  </div>
   <div class="respuesta_expedia">
     <ContenedoresTexto :texto='Data'/>
        <div class="box_configuracion">
            <div>
        <label for="ciudad"> CIUDAD</label>
         <input type="text" id="ciudad" v-model="Ciudad" @change="modificacionCT">
             </div>
        <div>
         <label for="habitacion"> TIPO DE HABITACIÓN</label>
         <input type="text" id="habitacion"  v-model="TipoHabitacion" @change="modificacionCT">
         </div>
        </div>
      <div class="segmentos">
          <div class="segmentos_titulos">
<p>  SEGMENTO	</p>
<p>  PRESTARARIO	</p>
<p>  Tipo de bono Ej. HR/HO/PP	</p>
<p>  Regimen Ej. BE/BB/MP/AI	</p>
<p>  Comision Ej. 10.00	</p>
<p>  Volcar a Exp. Ej E00/1620/141424/1	</p>
<p>  Sobrecomisión</p>
          </div>
          <div class="segmentos_input">
            <input type="text"  v-model="Segmento">
            <div>
                <input type="text" v-model="Prestatario">
                <input type="text"  v-model="PrestatarioAUX">
            </div>
            <input type="text" v-model="TipoBono">
            <input type="text" v-model="Regimen">
            <input type="text" v-model="Comision">
            <input type="text" v-model="VolcarAExp">
            <input type="text" v-model="Sobrecomision">
            
          </div>
   
      </div>
        <BotonCopiar @copiar='getSegmentos' :arrayDatos='arrayLineasProcesadas'/>
       </div> 
       <router-link to="/" class="home">home </router-link>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import InputData from '../componentes_Funcionales/InputData'
import BotonCopiar from '../componentes_Funcionales/BotonCopiar'
import ContenedoresTexto from '../componentes_Funcionales/Contenedores_texto'
import KitPassive from '../../modulos/KitPassive'
export default {
    data() {
        return {
           
            Segmento:'',
            Prestatario:'',
            PrestatarioAUX:'167467',
            TipoBono:'',
            Regimen:'',
            Comision:'',
            VolcarAExp:'',
            Sobrecomision:'',
            arrayData:[],
            arrayLineasProcesadas:[],
            Ciudad:'',
            TipoHabitacion:'',
            Data:'',
            lineap1:'',
            lineap2:'',
            lineap3:'',

        }
        
    },
    
components: {
 VueRouter,
 InputData,
 BotonCopiar,
 ContenedoresTexto
},
methods: {
    getData(data) {
    var getCiudad= prompt("Por favor,inserte la ciudad");
    var getTipodeHabitacion= prompt("Por favor,inserte tipo de habitación")
        if (getCiudad != null&& getTipodeHabitacion != null ) {
            console.log(getCiudad,getTipodeHabitacion)
     var destino=getCiudad
        var tipoHabitacion=getTipodeHabitacion
   

    




    //INICIO DE PROCESO(RM)
    var valor_textoArea=data
    var inicioL="HU1AHK";
    //TODO PRIMER SEGMENTO-INICIO//
    

    var fecha_en_sal=  KitPassive.buscar_Match(/(?<=HU1AHK\d{1,}\w{1,3})\d{1,}\w{1,}\-\d{1,}\w{1,}/,valor_textoArea);
   
    var observaciones="/SI-EXPEDIA";

    var nombreHotel=  KitPassive.buscar_Match(/(?<=HN-).*(?=\/HC)/,valor_textoArea);
    var direccion_one=  KitPassive.buscar_Match(/(?<=AD-).*(?=\/PH)/,valor_textoArea);
    
    
    var direccion_two=  KitPassive.buscar_Match(/(?<=HC-).*(?=\/AD)/,valor_textoArea);
   
   
    var telefono=  KitPassive.buscar_Match(/(?<=PH-).*(?=\/RT)/,valor_textoArea);
    

    
    var confirmacion=  KitPassive.buscar_Match(/(?<=CF-).*(?=\/RQ)/,valor_textoArea);
    var tarifa=  KitPassive.buscar_Match(/(?<=RQ-).*/,valor_textoArea);
   
   
    var rangoFechas=  KitPassive.buscar_Match(/\d{2}\w{3}\-\d{2}\w{3}/,valor_textoArea);
    var numeroP=  KitPassive.buscar_Match(/(?<=^\w{6})\d{0,}/,valor_textoArea);
    var total_V=  KitPassive.buscar_Match(/(?<=\w{3}).*/,tarifa);
    var divisa=  KitPassive.buscar_Match(/(?<=RQ-)(\w{2}|\w{3})(?=\d)/,valor_textoArea);
    total_V=parseFloat(total_V);
    var total_total= KitPassive.numeronoches(rangoFechas,numeroP,total_V);
    console.log(rangoFechas,numeroP,total_V);
    //console.log(total_total);

    //LIMPIAR - 
    direccion_one= KitPassive.limpiar(direccion_one);
    telefono= KitPassive.limpiar(telefono);
    direccion_two= KitPassive.limpiar(direccion_two);
    nombreHotel= KitPassive.limpiar(nombreHotel);
    confirmacion= KitPassive.limpiar(confirmacion);
    //LIMPIAR -
    
    var LineaFinal=inicioL+numeroP+destino+fecha_en_sal+"/HN-"+nombreHotel+"/AP-"+direccion_one+""+direccion_two+"/PH-"+telefono+"/HAB-"+tipoHabitacion+"/LC-"+confirmacion+"/TARIFA-"+divisa+total_total.toFixed(2)+observaciones;
   
    this.Data=LineaFinal
    this.Ciudad=destino
    this.TipoHabitacion=tipoHabitacion
    //variables para utilizar cuando el usuario modifique el campo de ciudad
this.lineap1=inicioL+numeroP
this.lineap2=fecha_en_sal+"/HN-"+nombreHotel+"/AP-"+direccion_one+""+direccion_two+"/PH-"+telefono+"/HAB-"
this.lineap3="/LC-"+confirmacion+"/TARIFA-"+divisa+total_total.toFixed(2)+observaciones;
}
     //FINAL DEL PRIMER APARTADO   
    },
    
    getSegmentos(){
        //f = fila + numero de fila
    var arrayProcesar=this.arrayLineasProcesadas
      var f1="RM*PSCCIA-"+this.Prestatario+"/"+ this.PrestatarioAUX+"/S"+this.Segmento
      var f2="RM*PSCPAGADERO:EXPEDIA"+"/S"+this.Segmento     
      var f3="RM*ACEHVO-"+this.TipoBono
      var f4="RM*ACEBOA-"+this.Regimen
      var f5="RM*ACEHCO-"+this.Comision
      var f6="RM*PSCREF-"+this.VolcarAExp
      var f7="RM*PSCSCOM-"+this.Sobrecomision
      
      var array_campos=[this.Prestatario,this.Segmento,this.TipoBono,this.Regimen,this.Comision,this.VolcarAExp,this.Sobrecomision]
        var arrayF=[f1,f2,f3,f4,f5,f6,f7] 
      for (var index = 0; index <= array_campos.length; index++) {
           if(array_campos[index]!=""){
            this.arrayLineasProcesadas.push(arrayF[index])
           }
            
        }
   this.arrayLineasProcesadas=[]

}
,modificacionCT(){
    var lineamodificada=this.lineap1+this.Ciudad+this.lineap2+this.TipoHabitacion+this.lineap3;

    this.Data=lineamodificada;
    console.log(this.TipoHabitacion)
}
    
},
computed: {
   
}
}
</script>

<style>
.ContenedorPrincipal {
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 69%;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: repeat(10,1fr);
    font-size: 40px;
}
.rutas{
    grid-column: 1;
    grid-row: 1/11;
    background: #ff8787;
    display: flex;
    justify-content:flex-start;
    align-items: center;
    z-index: 2;
flex-flow: column;
padding-top: 111px;
}
.respuesta_expedia{
grid-column: 2;
    grid-row: 1/11;
    display: flex;
    /* justify-content: center;
        padding-top: 111px; */
    flex-flow: column;
    padding-top: 90px;
}
.home{
 position: fixed;
    top: 84%;
    z-index: 2;
    left: 90%;
       padding: 2.6vw;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    border-radius: 13%;
    border: solid 0px;
    background: url(../../imagenes/home.svg);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    color: #ffffff00;
    transform: scale(0.5);
}
.home:focus{
border:none;
}
.segmentoEx{
    background: #FFEB3B;
    padding: 30px;
    cursor: pointer;
    border-radius: 8px;
    margin: 50px;
    transition: all 0.5s cubic-bezier(0.25, 0.1, 0, 1.11);
}
.box_configuracion{
    display: flex;
    font-size: 16px;
    flex-flow: column;
    font-family: 'Heebo', sans-serif;
    align-items: center;
}
.box_configuracion >div> label{
    
}
#ciudad{
    border: solid 1.5px #ff8787;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    width: 100px;
           margin-left: 117px;
}
.box_configuracion > div>input{
    border: solid 1.5px #ff8787;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    width: 100px;
    margin-left: 15px;
}
.segmentos{
        font-size: 16px;
    font-family: 'Heebo', sans-serif;
    display: flex;
    margin-top: 8%;
    padding-left: 170px;
}
.segmentos_input{
        display: flex;
    flex-flow: column;
}
.segmentos_input >input,.segmentos_input > div >input{
        margin: 11px;
        border: solid 1.5px #ff8787;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    width: 144px;
    
}
</style>