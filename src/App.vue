<template>
  <div id="app">
  
  <router-link class="back-home-btn" tag="div" :to="{name: 'home'}">
    <a><img src="/static/images/back-home.png" /></a>
    <span>Jordan's Toolbox</span>
  </router-link>
      
    </router-link>

    <router-view class="active-tool"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style src="styles/global.scss" lang="scss"></style>
<style lang="scss" scoped>
  .active-tool {
    margin-top: 80px;
  }
</style>
