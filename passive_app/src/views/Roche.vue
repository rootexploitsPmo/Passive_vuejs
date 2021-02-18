<template>
 <div>    
 <Header titulo="ROCHE"/>
 
 <Roche/>
 
 </div>

</template>

<script>
 import Roche from '../components/roche/Roche' 
 import Header from "../components/Header"
export default {
  
components: {
 Roche,
 Header,
},
}
</script>

<style>
</style>