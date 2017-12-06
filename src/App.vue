<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="sass">
  @import '~sass/reset'
  @import '~sass/fonts'
  @import '~sass/variables'
  @import '~sass/typography'
  
  html, body, #app
    background-color: $bg-color
    text-align: center
    
</style>
