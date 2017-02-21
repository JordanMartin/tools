<template>
  <div class="wrapper">
    <img src="/static/images/coding.png">
    <h1>Code Editor</h1>

    <div class="controls">
      syntax: 
      <select v-model="syntaxName">
        <option v-for="s in syntaxList" :value="s.name">{{ s.name }}</option>
      </select>
      <button v-on:click="copy">copy</button>
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
    this.$textarea.addEventListener('scroll', (ev) => {
      this.$viewer.scrollTop = ev.target.scrollTop
    })
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

<style lang="scss" scoped>
  .wrapper {
    text-align: center;
    background-image: url(/static/bg/escheresque_ste.png);
    background-color: #86e5ec;
    padding: 50px;
    color: #fefefe;
  }
  #code-wrapper {
    border-radius: 5px;
    box-shadow: 0 0 10px #000;
  }
  .controls {
    margin: 10px 0;
  }
</style>
