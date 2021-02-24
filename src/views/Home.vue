<template>
<div>
<Header/>
<Body/>
</div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header"
import Body from "../components/Body"
export default {
  name: 'Home',
  components: {
 Header,Body
  }
}
</script>
