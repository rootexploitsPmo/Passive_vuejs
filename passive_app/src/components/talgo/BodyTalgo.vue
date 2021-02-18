<template>
  <div class="ContenedorPrincipal">
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
export default {
    data() {
        return {
            array_hecho:[],
            listado:['pimiento','tomate','cebolla','pepino','aguacate'],
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
        var verificacion_autorizada = /(?<=C\d{5}\d{8}\n)(Autorizada|Approved)/.test(valor_Textoarea);

            if (verificacion_autorizada != true) {
                    alert("No se admiten solicitudes no autorizadas");
                    }else{ 
                        var rm_pscpet_valor = KitPassive.buscar_Match(/C\d{10,}(?=\n)/, valor_Textoarea);
                        var rm_pscpet_result = "RM*PSCPETVIAJE-" + rm_pscpet_valor;
                        this.array_hecho.push(rm_pscpet_result);
                        //SEGUNDO RM
                        var rm_acc_valor = KitPassive.buscar_Match(/(?<=C\d{5})\d{8}/, rm_pscpet_result);
                        var rm_acc_result = "RM*ACC" + rm_acc_valor;
                        this.array_hecho.push(rm_acc_result);
                        // TERCER RM -primera parte
                        var numero_autorizador_valor = KitPassive.buscar_Match(
                        /(?<=\D)\d{0,}(?=\s{0,}\-\s{0,}.*\n\C\d{0,}\s)/,
                        valor_Textoarea
                        );
                        if (numero_autorizador_valor === undefined) {
                        var texto1 =
                            "Numero de peticionario no encontrado,introduzcalo manualmente";
                        var texto2 = "Numero de peticionario";
                        numero_autorizador_valor = no_encontrado(texto1, texto2);
                        }
                        var numero_autorizador_result =
                        "RM*ACECRM/N EMPLEADO PETICIONARIO-" + numero_autorizador_valor;
                        this.array_hecho.push(numero_autorizador_result);

                        // TERCER RM -segunda parte
                        var nombre_autorizador_valor = KitPassive.buscar_Match(
                        /(?<=\D\d{0,}\s{0,}\-\s).*(\n\w{0,}|)(?=\n(\#\n|\F\.))/,
                        valor_Textoarea
                        );
                        var arranombre = nombre_autorizador_valor.split(" ");
                        var contadorN = 0;
                        console.log(arranombre[0].length);
                        for (let index = 0; index < arranombre.length; index++) {
                        const element = arranombre[index].length;
                        contadorN = contadorN + element;

                        if (contadorN >= 40) {
                            alert(
                            "El nombre de autorizador:" +
                                nombre_autorizador_valor +
                                " supera el numero de caracteres permitidos,Por favor introduzca el nombre con menos caracteres"
                            );
                            var nuevo_valor = prompt(
                            "Nombre autorizador: " + nombre_autorizador_valor
                            );
                            nombre_autorizador_valor = nuevo_valor;
                        }
                        }
                        var nombre_autorizador_result =
                        "RM*ACECRM/NOMBRE AUTORIZADOR-" + nombre_autorizador_valor;

                        this.array_hecho.push(nombre_autorizador_result);
                        // CUARTO RM
                        var rm_centroCoste_valor = valor_Textoarea.match(
                        /(?<=\d{0,7}\s\-\s.*\n).*(?=\s\-)/g
                        );
                        if (rm_centroCoste_valor === undefined) {
                        var texto1 = "Centro de coste no encontrado,introduzcalo manualmente";
                        var texto2 = "Centro de coste";
                        rm_centroCoste_valor = no_encontrado(texto1, texto2);
                        }

                        var centro_de_coste_result =
                        "RM*ACECRM/CENTRO COSTE-" + rm_centroCoste_valor[0];
                        this.array_hecho.push(centro_de_coste_result);
                        // QUINTO RM
                        var reatrp_valor = KitPassive.buscar_Match(
                        /CLIENT\sMTG|INTL\sMTG|OTHER|REPAIR\sMAINT|TRNG\sSEMINAR/,
                        valor_Textoarea
                        );

                        var reatrp_result = "RM*ACECRM/REATRP-" + reatrp_valor;

                        this.array_hecho.push(reatrp_result);
                        //sexto RM
                        var TQ_rm_valor = KitPassive.buscar_Match(
                        /(?<=Porcentaje\s(.*\s))(\d{0,}\-\d{0,}|\d{0,})/,
                        valor_Textoarea
                        );
                        var TQ_rm_result = "RM*ACECRM/TQ3CD3-" + TQ_rm_valor;
                        this.array_hecho.push(TQ_rm_result);

                        //SEPTIMO RM
                        var RM_imputacion_VALOR = KitPassive.buscar_Match(
                        /(?<=Objeto de imputación\s\d{0,}\s)\S{0,}(?=\n)/,
                        valor_Textoarea
                        );
                        var RM_imputacion_result =
                        "RM*ACECRM/OBJETO IMPUTACION 2-" + RM_imputacion_VALOR;

                        if (RM_imputacion_VALOR != undefined) {
                        this.array_hecho.push(RM_imputacion_result);
                        }
                    }
                    console.log(this.array_hecho);
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