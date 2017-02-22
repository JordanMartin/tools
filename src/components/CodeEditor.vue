<template>
  <div class="tool-wrapper">
    <img src="/static/images/coding.png">
    <h1>Code Editor</h1>

    <div class="controls">
      
      <div class="select">
        <span>Syntax:</span>
        <select v-model="syntaxName">
          <option v-for="s in syntaxList" :value="s.name">{{ s.name }}</option>
        </select>
      </div>
      <img src="/static/images/clipboard.png" class="img-btn" alt="copy" title="copy" v-on:click="copy"/>
    </div>
    
    <div id="code-wrapper"></div>
  </div>
</template>
 
<style src="prismjs/themes/prism-coy.css" lang="css"></style>
<script>
import Prism from 'prismjs'
import 'prismjs/components/prism-java.min.js'
import 'prismjs/components/prism-batch.min.js'
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/components/prism-sql.min.js'
import 'prismjs/components/prism-php.min.js'
import 'prismjs/components/prism-docker.min.js'

import { copyNodeContent } from '../../private_modules/clipboard'

export default {
  mounted () {
    this.$wrapper = document.querySelector('#code-wrapper')
    this.$textarea = document.createElement('textarea')
    this.$viewer = document.createElement('div')

    this.$wrapper.appendChild(this.$textarea)
    this.$wrapper.appendChild(this.$viewer)

    this.$wrapper.className += ' code-editor'

    this.$textarea.addEventListener('input', (ev) => {
      this.updateHighlight()
    })
    this.$textarea.onmousewheel = (ev) => {
      ev.target.scrollTop -= ev.wheelDeltaY
      ev.preventDefault()
    }
    this.$textarea.addEventListener('scroll', (ev) => {
      this.$viewer.scrollTop = ev.target.scrollTop
    }, true)
    this.$textarea.addEventListener('keydown', ev => {
      if (ev.keyCode === 9) {
        ev.target.value += '    '
        ev.preventDefault()
      }
    })
  },
  destroyed () {
  },
  data: function () {
    return {
      syntaxName: 'Javascript',
      syntaxList: [
        { name: 'Javascript', value: Prism.languages.javascript },
        { name: 'CSS', value: Prism.languages.css },
        { name: 'HTML', value: Prism.languages.html },
        { name: 'Java', value: Prism.languages.java },
        { name: 'PHP', value: Prism.languages.php },
        { name: 'SQL', value: Prism.languages.sql },
        { name: 'Batch', value: Prism.languages.batch },
        { name: 'Bash', value: Prism.languages.bash },
        { name: 'Dockerfile', value: Prism.languages.docker }
      ]
    }
  },
  methods: {
    copy: function () {
      copyNodeContent(this.$viewer)
    },
    updateHighlight: function () {
      let code = this.$textarea.value
      let html = Prism.highlight(code, this.syntax)
      this.$viewer.innerHTML = html
    }
  },
  computed: {
    syntax: function () {
      return this.syntaxList.filter(s => s.name === this.syntaxName)[0].value
    }
  },
  watch: {
    syntax: function (newSyntax) {
      this.updateHighlight()
    }
  }
}
</script>

<style lang="scss">
.select {
  display: inline-block;
  color: #fff;
  background: #009688;
  border-bottom: solid 2px #00ccb9;
  border-right: solid 2px #00ccb9;
  border-radius: 5px;
  overflow: hidden;

  span {
    display: inline-block;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.1);
    padding: 6px 13px;
  }
  > select {
    padding: 5px 8px;
    background: #009688;
    border: none;
    color: #fff;
    font-size: 16px;
    &:focus {
      outline: none;
    }
  }
}
.code-editor {
    position: relative;
    background: #fff;
    color: #000;
    padding: 15px;
    overflow: hidden;
    height: 500px;

    > textarea {
      position: absolute;
      font-size: 15px;
      font-family: monospace;
      width: calc(100% - 16px);
      top: 15px;
      left: 15px;
      z-index: 1;
      opacity: 0.4;
      border: none;
      padding: 0;
      background: transparent;
      min-height: 500px;
      resize: none;
      word-break: break-all;
      overflow-y: scroll;
      &:hover, &:focus {
        outline: none;
      }
    }
    > div {
      pointer-events: none;
      position: absolute;
      top: 15px;
      left: 15px;
      right: 16px;
      bottom: 15px;
      z-index: 2;
      text-align: left;
      font-size: 15px;
      font-family: monospace;
      white-space: pre-wrap;
      word-break: break-all;
      overflow: hidden;
    }
  }
</style>
<style lang="scss" scoped>
  #code-wrapper {
    border-radius: 5px;
    box-shadow: 0 0 10px #000;
  }
  .controls {
    margin: 10px 0;
  }
</style>
