<template>
  <div class="wrapper">
    <h1>Timestamp calculator</h1>

    <label class="ts-input-label" for="ts-input">Enter your timestamp (10 or 13 digits)</label>
    <input id="ts-input" size="13" type="text" :class="{error: inputError}" v-model="timestamp">

    <div v-if="!inputError" class="formatted">
      <h3>Formatted date</h3>
      <div v-for="result in results">{{ result }}</div>
    </div>
    <div v-else>
      Invalid timestamp. It must be 10 digits in seconds or 13 digits in miliseconds.
    </div>

   <h2>Current timestamp</h2>
   <div>
     In seconds: <span id="currTsSeconds">{{ currentTsSeconds }}</span> <button v-on:click="copyElementContent('#currTsSeconds')">copy</button>
   </div>
   <div>
     In milliseconds: <span id="currTs">{{ currentTs }}</span> <button v-on:click="copyElementContent('#currTs')">copy</button>
   </div>
  </div>
</template>

<script>
import moment from 'moment'
import { copyElementContent } from '../../private_modules/clipboard'

export default {
  mounted () {
    setInterval(() => (this.currentTs = new Date().getTime()), 1000)
  },
  data: function () {
    return {
      timestamp: String(new Date().getTime()),
      currentTs: new Date().getTime(),
      formats: [
        'MMMM DD MMMM YYYY HH:mm:ss,SSS',
        'DD/MM/YYYY HH:mm:ss,SSS'
      ]
    }
  },
  methods: {
    copyElementContent
  },
  computed: {
    currentTsSeconds: function () {
      return Math.trunc(this.currentTs / 1000)
    },
    results: function () {
      let ts = Number(this.timestamp.trim())

      if (this.timestamp.length === 10) {
        ts *= 1000
      }

      return this.formats.map(format => moment(ts).format(format))
    },
    inputError: function () {
      if (!this.timestamp) {
        return true
      }
      let ts = this.timestamp.trim()
      let lengthOk = ts.length === 10 || ts.length === 13
      let validInt = !isNaN(ts)

      return !(lengthOk && validInt)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    text-align: center;
  }
  .ts-input-label {
    display: block;
    margin-bottom: 10px;
  }
  #ts-input {
    padding: 10px 20px;
    border: none;
    border-left: solid 10px seagreen;
    box-shadow: 1px 1px 5px #bbb;
    border-radius: 3px;

    font-size: 20px;
    font-family: monospace;
    text-align: center;

    &:active, &:focus {
      outline: none;
    }
    &.error {
      border-color: red;
      box-shadow: 1px 1px 5px red;
    }
  }
  .formatted {
    margin-top: 10px;
    > div {
      padding: 5px;
    }
  }
</style>
