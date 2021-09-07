<template>
<div>
<the-header></the-header>
<router-view></router-view>
</div>
</template>

<script>
import TheHeader from './components/nav/TheHeader.vue'


export default {
  components:{
    TheHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
