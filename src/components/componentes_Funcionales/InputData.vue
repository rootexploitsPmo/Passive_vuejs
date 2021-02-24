<template>
  <div class='contenedor_input'>
   <h1 id='codigoFuente'>Pegar codigo fuente</h1>

    <textarea id="TextData" v-model="texto" cols="100" rows="20"></textarea>
            
   <button class="btn_generar" @click="getData(texto)" >GENERAR</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      texto: ''
    }
  },
methods: {
    getData(dato) {
        this.$emit('accion',dato)
       this.texto=''
       
    }
},
}
</script>

<style>
.contenedor_input{
  display: flex;
  flex-flow: column;
  text-align: center;
  justify-content:center;
    align-items: center;

}
#codigoFuente {
color: white;
    font-size: 2.7vw;
    font-family: 'Roboto', sans-serif;
}
#TextData{
width: 40vw;
    transition: all 0.5s ease;
    border: none;
}
.btn_generar{
border: solid 1px white;
    padding: 15px;
    cursor: pointer;
    transition: all 0.5s ease;
    font-size: 0.8vw;
    background: white;
    color: #ff8787;
  /* margin: 0px auto 0px 80px;*/
    width: 130px;
        margin-top: 20px;
            border-radius: 36px;
}
</style>