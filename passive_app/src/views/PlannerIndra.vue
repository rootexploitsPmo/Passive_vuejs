<template>
 <div>
     
 <Header titulo="PLANNER-INDRA"/>
 
 <BodyIndra/>
 
 </div>

</template>

<script>
 import BodyIndra from '../components/plannerIndra/BodyIndra' 
 import Header from "../components/Header"
export default {
  
components: {
 BodyIndra,
 Header,
},
}
</script>

<style>
</style>