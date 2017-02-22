<template>
  <div id="app">
  
    <router-link class="top-header" tag="div" :to="{name: 'home'}">
      <a><img src="/static/images/back-home.png" class="img-btn" /></a>
      <span>Jordan's Toolbox</span>
    </router-link>
      
    <div class="active-tool">
      <router-view ></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style src="styles/global.scss" lang="scss"></style>
<style lang="scss" scoped>
</style>
