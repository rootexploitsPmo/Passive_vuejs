<template>
  <div class="ContenedorPrincipal">
    <div class="rutas">
          
        <ul class="menu">
            <li @click="buscarBox">Hotel</li> 
            <li @click="buscarBox">Tren</li>
            <li @click="buscarBox">Aereo</li>
            <li @click="buscarBox">Planner</li>
        </ul>
      
    </div>
   <div class="respuesta">
      <Herramientas :nombre="nombre"/>
       </div>  
  </div>
</template>

<script>
import BotonesHover from './BotonesHover'
import Herramientas from './Herramientas'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      nombre: [],
      hotel:[{
            titulo:'Expedia',
            url:'/expedia'},
            ],
      tren:[
        {
             titulo:'Renfe',
        url:'/renfe'
        },
        {
    titulo:'sbb',
    url:'/sbb'
        }
    ],
    aereo:[
      {
         titulo:'VY / FR NO BSP',
            url:'/remarkslcc'
      },{
        titulo:'Vueling',
        url:'/vueling'
      },
      {
        titulo:'G200',
        url:'/g200'
      }
    ]
    ,
    planner:[
      {
        titulo:'Indra',
            url:'/PlannerIndra'
      },
      {
        titulo:'Talgo',
        url:'/talgo'
      },{
      titulo:'Roche',
      url:'/roche'
      }
    ]
    }
  },
components: {
    BotonesHover,
    Herramientas
},methods: {
  buscarBox(nombre) {
    const nombre_herramienta=nombre.target.innerHTML
    if(nombre_herramienta === 'Hotel'){
      this.nombre = this.hotel
    }
    if(nombre_herramienta === 'Tren'){
      this.nombre = this.tren
    }
    if(nombre_herramienta === 'Aereo'){
      this.nombre = this.aereo
    }
    if(nombre_herramienta === 'Planner'){
      this.nombre = this.planner
    }
    

  }
},computed: {

},
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
    justify-content: flex-end;
    align-items: center;
    z-index: 2;

}
.respuesta{
grid-column: 2;
    grid-row: 1/11;
    display: flex;
    justify-content: center;
        padding-top: 111px;
}
.menu{
    list-style: none;
}
.menu>li{
color: #ffffff;
    margin: 44px;
    padding: 10px;
    text-align: center;
    border-radius: 7px;
    font-family: 'Roboto', sans-serif;
    /* transform: rotate(45deg); */
    cursor: pointer;
    font-size: 4rem;
    transition: transform .25s ease;
    text-transform: uppercase;
}
.menu>li:hover{
    transform: translateX(1em) translateZ(0);
    color:#6f6f6f
}
.menu>li:before {
  pointer-events: none;
  content: ">";
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  transform: translateX(-1.5em) translateZ(0);
  transition: transform .25s ease, opacity .25s ease;
  color:#6f6f6f;
}
li:hover .menu>li,
.menu>li:hover {
  transform: translateX(1em) translateZ(0);
}

li:hover .menu>li:before,
.menu>li:hover:before {
  transform: translateX(-1em) translateZ(0);
  opacity: 1;
}
.contenedor_btn_copiar{
display: flex;
    padding: 0;
    margin: 0;
    position: relative;
    top: -22px;

}
</style>