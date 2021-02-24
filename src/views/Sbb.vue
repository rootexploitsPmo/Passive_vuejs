<template>
 <div>
     
 <Header titulo="SBB"/>
 
 <BodySbb/>
 
 </div>

</template>

<script>
 import BodySbb from '../components/sbb/BodySbb'
 import Header from "../components/Header"
export default {
  
components: {
 BodySbb,
 Header,
},
}
</script>

<style>
</style>