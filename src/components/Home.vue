<template>
  <div>
    <h1 class="title">Jordan's Toolbox</h1>
    <h2>Tools list</h2>
    <ul class="tools-list">
      <li><router-link :to="{name: 'timestamp'}">Timestamp</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.tools-list {
  > li {
    > a {
      display: block;
      text-decoration: none;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      padding: 10px;
    }
    background: coral;
    border: solid 2px #666;
    display: inline-block;
  }
}
</style>
