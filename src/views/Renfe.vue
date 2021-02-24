<template>
 <div>
     
 <Header titulo="RENFE"/>
 
 <BodyRenfe/>
 
 </div>

</template>

<script>
 import StandarBody from '../components/StandarBody' 
 import Header from "../components/Header"
 import BodyRenfe from '../components/renfe/BodyRenfe'
export default {
  
components: {
 StandarBody,
 Header,
 BodyRenfe
}
}
</script>

<style>
</style>