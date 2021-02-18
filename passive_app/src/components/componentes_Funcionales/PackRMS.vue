<template>
  <div class="box_rm">
      <div class="box_rm_inputs">
      <input type="text" name="" v-for="(item,index) in arraRenfe[0]" :key="index+5" :value="item">
    </div>
    <div class="box_copiar">
        <input :value="textoBoton" :style='activarAnimacion'   type="button" class="button_copiar"  v-clipboard:copy="textoParacopiar" @click="copiarTexto"> 
        
        </div>
  </div>
</template>

<script>
import BotonCopiar from '../componentes_Funcionales/BotonCopiar'
export default {
    components: {
        BotonCopiar,
    },
    data() {
        return {
            textoParacopiar: [],
            animacion:false,
            textoBoton:'COPIAR'
        }
    },
props: {
    arrayLC:Array,
    arraRenfe:Array,
    segmentoPasajero:Boolean
},
methods: {
    copiarTexto() {
        if(this.segmentoPasajero){
        var numeroPasajero=prompt("INSERTE EL NUMERO DE PASAJERO")
        var numeroSegmento=prompt("INSERTE EL NUMERO DE SEGMENTO")

        this.textoParacopiar= this.arraRenfe[0].join('/P'+numeroPasajero+'/S'+numeroSegmento+'\n')
        console.log(this.textoParacopiar)
        }else{
            this.textoParacopiar= this.arraRenfe[0].join('\n')
        }
        this.textoBoton='COPIADO'
        this.animacion=true
    setTimeout(()=>{this.animacion=false; this.textoBoton='COPIAR'},2000)
       
    }
},computed: {
    activarAnimacion() {
        return [this.animacion ? {'animation-name': 'copiado'} : {'animation-name':'none'} ]
    }
}
}
</script>

<style>
.box_rm {
    display: flex;
    margin: 8px;
}
.box_rm_inputs {
    border: solid 1px #ff8787;
    padding: 2px;
}
.button_copiar {
    transition: ease all 1.5s;
    height: 100%;
    background: #ff8787;
    border: none;
    cursor: pointer;
    padding: 20px;
    width: 100%;
    padding: 20px;
    animation: 3s   cubic-bezier(0.42, 0, 0, 1.13);
            animation-name: copiado;
            transition: ease all 1s;
}
.box_rm_inputs>input {
    border: solid 2px #ff8787;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-radius: 2px;
    padding: 4px;
    margin: 10px;
    width: 90%;
    outline: 0px;
}
</style>