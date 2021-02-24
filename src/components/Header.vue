<template>
  <div class="header">
   <router-link to="/">  <img :src="src" alt=""> </router-link>
   <div class="titulo">
<h1 >{{titulo}}</h1>
    </div>
  </div>

</template>

<script>
import VueRouter from 'vue-router'
export default {
 
  components: {
    VueRouter,
  },
data() {
    return {
        src: 'https://passives.000webhostapp.com/passive.svg'
    }
},
props: {
  titulo:String
},
methods: {
  /* Mayusculas() {
    
    return this.titulo= this.titulo.toUpperCase() 
  } */
},

}
</script>
<style>
.header  {
  height: 70px;
    margin: 0;
    overflow: hidden;
    display: flex;
    justify-content:flex-start;
    background-size: 10%;
    background-position: 0% 50%;
    background-repeat: no-repeat;
    padding: 20px;
    position: fixed;
    width: 100%;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    z-index: 3;
    background: white;
}
.header >a> img {
width: 10vw;
    height: 9vh;
}
.header >a{
margin: 0px;
    position: relative;
    top: -17px;
}
.titulo{
     position: relative;
    left: 60%;
    color: #ff8787;
    font-size: 1.3vw;
    top: -29px;
    font-family: 'Heebo', sans-serif;
}

</style>