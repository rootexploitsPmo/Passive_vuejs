<template>
  <p class="segmentoG" @click='copiar' :style='activarAnimacion' v-clipboard:copy="texto">{{texto}}</p>
</template>

<script>
export default {
data() {
    return {
        textoCopiar:'',
        animacion:false,
    }
},
props: {
    texto:String,
},
methods: {
    copiar() {
  this.animacion=true
    setTimeout(()=>{this.animacion=false;},2000)
    }
},computed: {

activarAnimacion() {
        return [this.animacion ? {'animation-name': 'copiado'} : {'animation-name':'none'} ]
    } 
    
},
}
</script>

<style>
.segmentoG{
background: #FFEB3B;
    padding: 30px;
    cursor: pointer;
 border-radius: 36px;
   /* margin: 50px;*/
    transition: all 0.5s cubic-bezier(0.25, 0.1, 0, 1.11);
    animation: 3s   cubic-bezier(0.42, 0, 0, 1.13);
            animation-name: copiado;
            transition: ease all 1s;
            font-size: 15px;
            font-family: 'Heebo', sans-serif;
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