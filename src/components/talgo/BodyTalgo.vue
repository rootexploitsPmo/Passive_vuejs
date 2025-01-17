<template>
  <div class="ContenedorPrincipal-component">
        <div class="rutas">
  <InputData @accion='GetData'/>
 </div>
   <div class="respuesta_talgo">
      <ContenedoresTexto v-for="(item, index) in array_hecho" :key='index' :texto="item"/>
      <div class="cCopiars">
      <BotonCopiar   :arrayDatos='array_hecho'/>
      </div>
      
       </div> 

       

       <router-link to="/" class="home">home </router-link>


  </div>
</template>

<script>
import VueRouter from 'vue-router'
import InputData from '../componentes_Funcionales/InputData'
import KitPassive from '../../modulos/KitPassive'
import ContenedoresTexto from '../componentes_Funcionales/Contenedores_texto'
import BotonCopiar from '../componentes_Funcionales/BotonCopiar'
import BotonesHoverVue from '../BotonesHover.vue'
export default {
    data() {
        return {
            array_hecho:[]
           
        }
    },
components: {
 VueRouter,InputData,ContenedoresTexto,BotonCopiar

},methods: {
    GetData(dato) {
        function no_encontrado(texto, texto2) {
        alert(texto);

        var motivo = prompt(texto2);

        motivo = motivo.toUpperCase();
        return motivo;
}
      var valor_Textoarea = dato //CONTIENE EL TEXTO INTRODUCIDO POR EL USUARIO
        var verificacion_autorizada = true
        //var verificacion_autorizada = /(?<=C\d{5}\d{8}\n)(Autorizada|Approved)/.test(valor_Textoarea);
      // limpiamos el array para que no se acomulen peticiones anteriores
      this.array_hecho=[]
                        //--fin
                        var rm_pscpet_valor = KitPassive.buscar_Match(/C\d{10,}(?=\n)/, valor_Textoarea);
                        var rm_pscpet_result = "RM*PSCPETVIAJE-" + rm_pscpet_valor;
                        
                        this.array_hecho.push(rm_pscpet_result);
                        console.log("RM*PSCPETVIAJE-")
                        console.log(rm_pscpet_result)

                        //SEGUNDO RM
                        var rm_acc_valor = KitPassive.buscar_Match(/(?<=C\d{5})\d{8}/, rm_pscpet_result);
                        var rm_acc_result = "RM*ACC" + rm_acc_valor;
                        this.array_hecho.push(rm_acc_result);
                        console.log("RM*ACC")
                        console.log(rm_acc_result)
                        // TERCER RM -primera parte
                        var Listauthorizer =valor_Textoarea.match(/(?<=\n)\d{1,}\s\-\s(\w{1,}(\s|)){1,}(?=\n)/g)
                        
                        var rmPeticionario =``
                        let authorizer="" 
                        let peticionario=""
                        if(Listauthorizer!=null){
                            authorizer=Array.from(Listauthorizer).pop()
                            peticionario=Listauthorizer[0]
                            console.log("ok:")
                            console.log(peticionario)
                        let getNamberauthorizer=/\d{1,}(?=\s\-)/.exec(authorizer)[0]
                        let getNamberPeticionario=/\d{1,}(?=\s\-)/.exec(peticionario)[0]

                          rmPeticionario=`RM*ACECRM/N EMPLEADO PETICIONARIO-${getNamberPeticionario}`
                        
                        this.array_hecho.push(rmPeticionario);
                      }else{
                        let newValue=prompt("Número de peticionario")
                        rmPeticionario=`RM*ACECRM/N EMPLEADO PETICIONARIO-${newValue}`
                        
                        this.array_hecho.push(rmPeticionario);

                      }
                         
                        
                         var nameAuthorizer = /(?<=\d{1,}\s\-\s).*/.exec(authorizer)[0]
                         alert(nameAuthorizer)
                         console.log(authorizer)
                         console.log(nameAuthorizer)
                         let lengthNameAuthorizer=nameAuthorizer.length
                         if(lengthNameAuthorizer >= 40){
                          let newValue=prompt("Agrege un nombre valido(maximo:40 caracteres):")
                           nameAuthorizer=newValue
                         }
                         console.log(lengthNameAuthorizer)
                         var rmNameAuthorizer =
                        "RM*ACECRM/NOMBRE AUTORIZADOR-" + nameAuthorizer;

                        this.array_hecho.push(rmNameAuthorizer);
                        var rm_centroCoste_valor = valor_Textoarea.match(/\S{1,}(?=\s\-.*\n)/g)
                        console.log(`test:`)
                        console.log(rm_centroCoste_valor)
                        let rmCentroDecoste=""
                        if(rm_centroCoste_valor!=null){
                          rmCentroDecoste=`RM*ACECRM/CENTRO COSTE-${rm_centroCoste_valor[1]}`
                          this.array_hecho.push(rmCentroDecoste);  
                        }else{
                          let newValue=prompt("Centro de coste:")
                          rmCentroDecoste=`RM*ACECRM/CENTRO COSTE-${newValue}`
                        }
                        

                        var reatrp_valor = KitPassive.buscar_Match(
                        /CLIENT\sMTG|INTL\sMTG|OTHER|REPAIR\sMAINT|TRNG\sSEMINAR/,
                        valor_Textoarea
                        );
                        var reatrp_result = ""
                         if(reatrp_valor!=false){
                           reatrp_result = "RM*ACECRM/REATRP-" + reatrp_valor;
                          this.array_hecho.push(reatrp_result);
                         }else{
                          
                          let newValue=prompt("REATRP:")
                          reatrp_result = "RM*ACECRM/REATRP-" + newValue;
                          this.array_hecho.push(reatrp_result);

                         }
                        

                        var TQ_rm_valor = valor_Textoarea.match(/(?<=Porcentaje\s(.*\s))(\d{0,}\-\d{0,}|\d{0,})/g)
                        var TQ_rm_result = "RM*ACECRM/TQ3CD3-" + TQ_rm_valor;
                        if(TQ_rm_valor!=null){

                           TQ_rm_result = "RM*ACECRM/TQ3CD3-" + TQ_rm_valor[0];
                        this.array_hecho.push(TQ_rm_result);
                        }else{
                          let newValue=prompt("TQ3CD3:")
                           TQ_rm_result = "RM*ACECRM/TQ3CD3-" + newValue;
                        this.array_hecho.push(TQ_rm_result);

                        }
                        
                        var RM_imputacion_VALOR = valor_Textoarea.match(/(?<=Objeto de imputación 2\s).*(?=\nNombre\sde\sla\sempresa)/g)
                        var RM_imputacion_result =""
                        if(RM_imputacion_VALOR!=null){
                      if(RM_imputacion_VALOR[0]!=''){
                        RM_imputacion_result =
                          "RM*ACECRM/OBJETO IMPUTACION 2-" + RM_imputacion_VALOR[0];
                        this.array_hecho.push(RM_imputacion_result);
                      }else{
                        let newValue=prompt("OBJETO IMPUTACION 2:")
                          RM_imputacion_result =
                          "RM*ACECRM/OBJETO IMPUTACION 2-" + newValue;
                          this.array_hecho.push(RM_imputacion_result);
                      }
                        }else{
                          let newValue=prompt("OBJETO IMPUTACION 2:")
                          RM_imputacion_result =
                          "RM*ACECRM/OBJETO IMPUTACION 2-" + newValue;
                          this.array_hecho.push(RM_imputacion_result);
                        }
                      
                     
                        
                    let nombreVia=valor_Textoarea.match(/(?<=Nombre de la vía\/ empresa en).*(?=\n)/g) 
                    console.log("nombreVia")
                    
                    console.log(nombreVia)
                     let buildRmVia=""
                    if(nombreVia!=null){
                      if(nombreVia[0]!=''){
                        buildRmVia = `RM*ACECRM/NOMBRE VIA-${nombreVia[0]}`
                        this.array_hecho.push(buildRmVia);   
                      }else{
                        let newValue=prompt("Nombre de la via:") 
                      buildRmVia = `RM*ACECRM/NOMBRE VIA-${newValue}`
                      this.array_hecho.push(buildRmVia);   
                      }
                    }else{
                      let newValue=prompt("Nombre de la via:") 
                      buildRmVia = `RM*ACECRM/NOMBRE VIA-${newValue}`
                      this.array_hecho.push(buildRmVia);   
                    }
                    
                    //(?<=Nº de la vía \/empresa en\s).*
                    let nameStreetRoad=valor_Textoarea.match(/(?<=Nº de la vía \/empresa en\s).*(?=\ndestino)/g)
                    
                    let buildNamberStreetRoad=""
                    if(nameStreetRoad!=null){
                      buildNamberStreetRoad = `RM*ACECRM/NUMERO-${nameStreetRoad}`
                      this.array_hecho.push(buildNamberStreetRoad);

                    }else{
                      let newNamberStreetRoad=prompt("Número de via:")

                      buildNamberStreetRoad= `RM*ACECRM/NUMERO-${newNamberStreetRoad}`
                      this.array_hecho.push(buildNamberStreetRoad)
                    }
                    
                    let localidadPoblacion=KitPassive.buscar_Match(/(?<=Localidad \/ empresa en\s).*(?=\ndestino)/,valor_Textoarea)
                    let buildlocalidadPoblacion=''
                    if(localidadPoblacion!=false){
                        buildlocalidadPoblacion="RM*ACECRM/LOCALIDAD-POBLACION-"+localidadPoblacion
                        this.array_hecho.push(buildlocalidadPoblacion)
                    }else{
                      let newValue=prompt("LOCALIDAD-POBLACION:")
                      buildlocalidadPoblacion="RM*ACECRM/LOCALIDAD-POBLACION-"+newValue
                      this.array_hecho.push(buildlocalidadPoblacion)
                    }

                    let codigoPostal=KitPassive.buscar_Match(/(?<=Código Postal \/ empresa en\s).*(?=\ndestino)/,valor_Textoarea)
                    let buildcodigoPostal=''
                    if(codigoPostal!=false){
                      buildcodigoPostal="RM*ACECRM/CODIGO POSTAL-"+codigoPostal
                      
                      this.array_hecho.push(buildcodigoPostal)

                    }else{
                      let newValue=prompt("CODIGO POSTAL:")
                      buildcodigoPostal="RM*ACECRM/CODIGO POSTAL-"+newValue 
                      this.array_hecho.push(buildcodigoPostal)

                    }
                    
                    
                    
 
                        console.log(this.array_hecho)
                        
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

</style>