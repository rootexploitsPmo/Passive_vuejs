import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Expedia from '../views/Expedia.vue'
import Renfe from '../views/Renfe.vue'
import Sbb from '../views/Sbb.vue'
import Ryanair from '../views/Ryanair.vue'
import Vueling from '../views/Vueling.vue'
import G200 from '../views/G200.vue'
import PlannerIndra from '../views/PlannerIndra.vue'
import Talgo from '../views/Talgo'
import Roche from '../views/Roche'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/expedia',
    name: 'expedia',
    component: Expedia
  },{
    path: '/renfe',
    name: 'renfe',
    component: Renfe
  },
  {
    path: '/sbb',
    name: 'sbb',
    component: Sbb
  },
  {
    path: '/ryanair',
    name: 'ryanair',
    component: Ryanair
  },{
    path: '/vueling',
    name: 'vueling',
    component: Vueling
  },{
    path: '/g200',
    name: 'g200',
    component: G200
  },{
    path: '/plannerIndra',
    name: 'plannerIndra',
    component: PlannerIndra
  },{
    path: '/talgo',
    name: 'talgo',
    component: Talgo
  },{
    path:'/roche',
    name:'roche',
    component: Roche
  }

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
