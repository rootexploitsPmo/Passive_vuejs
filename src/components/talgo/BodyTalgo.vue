<template>
    <div class="ContenedorPrincipal-component">
          <div class="rutas">
    <InputData @accion='GetData'/>
   </div>
     <div class="respuesta_talgo">
        <ContenedoresTexto v-for="(item, index) in listRM" :key='index' :texto="item"/>
        <div class="cCopiars">
        <BotonCopiar   :arrayDatos='listRM'/>
       
        </div>
         </div> 
         <router-link to="/" class="home">home </router-link>
  
         
         <div class="container-select" v-show="popupSelect.display">
  <div class="popupSelect">
    <p>{{popupSelect.titlePopup}}</p>

    <div class="container-option">
      <select v-model="popupSelect.value">
        <option v-for="(item, index) in popupSelect.list_options_popup" :key='index'  :value="item">{{ item }}</option>
        
      </select>
    </div>
    <div class="container-insert-value">
      <p>Insertar manualmente</p>
      <input type="text" v-model="popupSelect.value_input">
    </div>
    <div class="container-btn-option">
      <button @click="mostrarValor">confirmar</button>
     
    </div>
  </div>
</div>
    </div>
  </template>
  
  <script>
  import VueRouter from 'vue-router'
  import InputData from '../componentes_Funcionales/InputData'
  import KitPassive from '../../modulos/KitPassive'
  import ContenedoresTexto from '../componentes_Funcionales/Contenedores_texto'
  import BotonCopiar from '../componentes_Funcionales/BotonCopiar'
  export default {
      data() {
          return {
              listRM:[],
              popupSelect:{
                display:false,
                value:"",
                titlePopup:"",
              list_options_popup:[],
              value_input:""
            },
            listPopup:[]
              

             
          }
      },
  components: {
   VueRouter,InputData,ContenedoresTexto,BotonCopiar
  
  },methods: {
    buscarMatch(expresion,text,rm,callback){
  let getElement=text.match(expresion)
  if(getElement!=null){
    console.log(getElement.length)
    let total=getElement.length
    if(total>1){
      console.log(getElement)
      // alert(`Hay varios resultados encontrados para ${rm}`)
      this.listPopup.push({
              titlePopup:`Se han encontrado varios resultados al construir ${rm}. Seleccione el correcto o insértelo manualmente.`,
              list_options_popup:getElement
              ,rm:rm,
              callback:callback
            })
            
           

          }else{
      console.log(getElement)
      callback(getElement[0])
 
    }
    
  
  }else{
    // alert("no hay resultados")
    var motivo = prompt(`No se ha encontrado un valor para ${rm}.Inserte el valor manualmente`);
  
  motivo = motivo.toUpperCase();
 callback(motivo)
  }
    
  
  },
      GetData(dato) {
          function no_encontrado(texto, texto2) {
          alert(texto);
  
          var motivo = prompt(texto2);
  
          motivo = motivo.toUpperCase();
          return motivo;
  }

  // this.checkSelects()
                    
        var valor_Textoarea = dato //CONTIENE EL TEXTO INTRODUCIDO POR EL USUARIO
          var verificacion_autorizada = true
          //var verificacion_autorizada = /(?<=C\d{5}\d{8}\n)(Autorizada|Approved)/.test(valor_Textoarea);
           
                          // limpiamos el array para que no se acomulen peticiones anteriores
                          this.listRM=[]
                          //--fin
                          var rm_pscpet_valor = this.buscarMatch(/C\d{10,}(?=\n)/, valor_Textoarea,"RM*PSCPETVIAJE-",(res)=>{
                            this.listRM.push(`RM*PSCPETVIAJE-${res}`)
                          });
                       
                        
                          console.log(rm_pscpet_valor)
                          
                
  
                          //SEGUNDO RM
                          var rm_acc_valor = this.buscarMatch(/(?<=C\d{5})\d{8}/, valor_Textoarea,"RM*ACC",(res)=>{
                            this.listRM.push(`RM*ACC${res}`)
                          });
                            
                              
                          // TERCER RM -primera parte
                          var numero_autorizador_valor = this.buscarMatch(
                          /(?<=\D)\d{0,}(?=\s{0,}\-\s{0,}.*\n\C\d{0,}\s)/,
                          valor_Textoarea,"RM*ACECRM/N EMPLEADO PETICIONARIO-",(res)=>{
                            this.listRM.push(`RM*ACECRM/N EMPLEADO PETICIONARIO-${res}`)
                          }
                          );
                         
                         
                          // TERCER RM -segunda parte
                          var nombre_autorizador_valor = this.buscarMatch(
                          /(?<=\d{1,}\s\-\s)\w{1,}.*/g,
                          valor_Textoarea,"RM*ACECRM/NOMBRE AUTORIZADOR-",(res)=>{
                            let total=res.length
                            
                            if(total>=40){
                              alert(
                              "El nombre de autorizador:" +
                              res +
                                  " supera el número de caracteres permitidos, Por favor introduzca el nombre con menos caracteres"
                              );
                              var nuevo_valor = prompt(
                              "Nombre autorizador: " + res
                              );
                              
                              this.listRM.push(`RM*ACECRM/NOMBRE AUTORIZADOR-${nuevo_valor}`)
                            }else{
                              this.listRM.push(`RM*ACECRM/NOMBRE AUTORIZADOR-${res}`)
                            }
                            

                          }
                          );
                          
                          //  RM Centro de coste
                          var rm_centroCoste_valor =  this.buscarMatch(/(?<=\d{0,7}\s\-\s.*\n).*(?=\s\-)/g,valor_Textoarea,"RM*ACECRM/CENTRO COSTE-",(res)=>{
                           this.listRM.push(`RM*ACECRM/CENTRO COSTE-${res}`)
                          }
                          );
                         
                        
                          //   RM*ACECRM/REATRP-
                          var reatrp_valor = this.buscarMatch(
                          /CLIENT\sMTG|INTL\sMTG|OTHER|REPAIR\sMAINT|TRNG\sSEMINAR/,
                          valor_Textoarea,"RM*ACECRM/REATRP-",(res)=>{
                            this.listRM.push(`RM*ACECRM/REATRP-${res}`);
                          }
                          );
  
                         
                          //RM TQ3CD3
                          var TQ_rm_valor = this.buscarMatch(
                          /(?<=Porcentaje\s(.*\s))(\d{0,}\-\d{0,}|\d{0,})/,
                          valor_Textoarea,"RM*ACECRM/TQ3CD3-",(res)=>{
                            this.listRM.push(`RM*ACECRM/TQ3CD3-${res}`);
                          }
                          );
                          
                          
                          //SEPTIMO RM
                          var RM_imputacion_VALOR = this.buscarMatch(
                          /(?<=Objeto de imputación\s\d{0,}\s)\S{0,}(?=\n)/,
                          valor_Textoarea,"RM*ACECRM/OBJETO IMPUTACION 2-",(res)=>{
                            this.listRM.push(`RM*ACECRM/OBJETO IMPUTACION 2-${res}`);
                          }
                          );
                         
                         
                      //R23: RM*ACECRM/NOMBRE VIA-
                      let nombreVia=this.buscarMatch(/(?<=NOMBRE VIA\s).*/,valor_Textoarea,"RM*ACECRM/NOMBRE VIA-",(res)=>{
                        this.listRM.push(`RM*ACECRM/NOMBRE VIA-${res}`);
                      })
                      
                      let numeroVia=this.buscarMatch(/(?<=NUMERO\s).*/,valor_Textoarea,"RM*ACECRM/NUMERO-",(res)=>{
                        this.listRM.push(`RM*ACECRM/NUMERO-${res}`)
                      })
                      
                      // RM*ACECRM/LOCALIDAD-POBLACION-
                      let localidadPoblacion=this.buscarMatch(/(?<=LOCALIDAD-POBLACION-\s).*/,valor_Textoarea,"RM*ACECRM/LOCALIDAD-POBLACION-",(res)=>{
                        this.listRM.push(`RM*ACECRM/LOCALIDAD-POBLACION-${res}`)
                      })
                          
                       // RM*ACECRM/CODIGO POSTAL-
                       let codigoPostal=this.buscarMatch(/(?<=CODIGO POSTAL\s).*/,valor_Textoarea,"RM*ACECRM/CODIGO POSTAL-",(res)=>{
                        this.listRM.push(`RM*ACECRM/CODIGO POSTAL-${res}`)
                       })
                       this.checkSelects()
                          return 
  },


  checkSelects(){
   let allChecks=this.listPopup.length
   let select=this.listPopup[0]
   if(allChecks!=0){ 
    this.popupSelect.display=true
    this.popupSelect.titlePopup=select.titlePopup
    this.popupSelect.list_options_popup=select.list_options_popup
    this.popupSelect.callback=select.callback
    
    this.listPopup.shift(); // Esto elimina el primer elemento del array listPopup
  }else{
    this.popupSelect.display=false
  }
  },
  mostrarValor(){
    if(this.popupSelect.value_input!=""){

this.popupSelect.callback(this.popupSelect.value_input)
this.checkSelects()
    }else{
      
      this.popupSelect.callback(this.popupSelect.value)
      this.checkSelects()
    }
  
  }
  }
  }
  </script>
  
  <style>
  
  .respuesta_talgo{
  grid-column: 2;
      grid-row: 1/11;
   
      justify-content: center;
          padding-top: 111px;
  }
  
.popupSelect{
padding: 10px;
position: absolute;
box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
font-size: 20px;
z-index: 10;
background: white;
}
.container-option{
  display: flex;
  justify-content: center;
  padding: 10px;
  
}
.container-select{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
      
}
.container-btn-option{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 30px;
}
.container-insert-value{
  display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
}
.container-insert-value > input{
  width: 200px;
}

  </style>