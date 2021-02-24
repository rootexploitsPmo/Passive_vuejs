<template>
  <div class='btn_copiar' :style='activarAnimacion' v-clipboard:copy="aCopiar" @click="copiarArray">{{textoBoton}}</div>

</template>

<script>
export default {
data() {
    return {
        arrayElementos: [],
        aCopiar:'',
        animacion:false,
        textoBoton:'COPIAR'
    }
},
props: {
   arrayDatos:Array,
},methods: {
    copiarArray() {
    this.$emit('copiar')//Para expedia   
    //this.$emit('Getsegmentos')//Para ryanair
    this.textoBoton='COPIADO'
    const datos_ordenados= this.arrayDatos.join('\n')

    this.aCopiar=datos_ordenados
    console.log(datos_ordenados)
    this.animacion=true
    setTimeout(()=>{this.animacion=false; this.textoBoton='COPIAR'},2000)
    }
},computed: {
    activarAnimacion() {
        return [this.animacion ? {'animation-name': 'copiado'} : {'animation-name':'none'} ]
    }
},
}
</script>

<style>
.btn_copiar {
    margin: 0 auto;
    border: solid 1px white;
    padding: 15px;
    cursor: pointer;
    transition: all 0.5s ease;
    font-size: 0.8vw;
    background: white;
    color: #ff8787;
    width: 130px;
    margin-top: 20px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    text-align: center;
    font-family: 'Heebo', sans-serif;
            animation: 3s   cubic-bezier(0.42, 0, 0, 1.13);
            animation-name: copiado;
            transition: ease all 1s;
                border-radius: 36px;
} 
@keyframes copiado {
                0%{
                    background:#8eff8e;
                    color: white
                }
                50%{
                    background:#8eff8e;
                    color: white
                }
                100%{
                    background:white;
                }
            }

</style>