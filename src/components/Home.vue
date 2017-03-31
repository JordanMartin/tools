<template>
  <div class="wrapper">
    <h1 class="title">Jordan's Toolbox</h1>

    <h2>Customs tools</h2>
    <div class="tools-list">
      <router-link :to="{name: 'timestamp'}">
        <img src="/static/images/stopwatch.png" />
        <span>Timestamp</span>
      </router-link>

      <router-link :to="{name: 'code-editor'}">
        <img src="/static/images/coding.png" />
        <span>Code Editor</span>
      </router-link>
    </div>

    <h2>Bookmarks</h2>
    <div class="bookmark-list">
      <a href="https://regex101.com/">
        <img src="/static/images/regex.png" />
        <span>Regex</span>
      </a>
      <a href="https://www.w3schools.com/charsets/ref_utf_arrows.asp">
        <span>UTF-8 Icons</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px 50px;
}
.tools-list {
    > a {
      display: inline-block;
      padding: 50px;
      margin: 20px;
      text-decoration: none;
      background: rgba(0, 0, 0, 0.65);
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
      box-shadow: 1px 1px 13px #999;

      img {
        max-width: 64px;
        max-height: 64px;
      }

      span {
        margin-top: 5px;
        display: block;
      }

      transition: all .15s;
      &:hover {
        padding: 55px;
        margin: 15px;
        transform: translate(7px, -7px);
        box-shadow: -5px 5px 60px #555;
      }
  }
}
.bookmark-list {
  > a {
    display: inline-block;
    padding: 10px 30px;
    margin: 20px;
    text-decoration: none;
    background: rgba(0, 0, 0, 0.65);
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    box-shadow: 1px 1px 13px #999;

    img {
      max-width: 64px;
      max-height: 64px;
    }

    span {
      margin-top: 5px;
      display: block;
    }

    transition: all .15s;
    &:hover {
      padding: 15px 35px;
      margin: 15px;
      transform: translate(7px, -7px);
      box-shadow: -5px 5px 60px #555;
    }
  }
}
</style>
