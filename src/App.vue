<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script>
import HomePage from "./views/HomePage.vue"
export default {
  name: 'App',
  components: {
    HomePage
  },
}
</script>

<style lang="less" scoped>
#app{
  background-color: #eee;
}
</style>
