<template>
  <div class="wrapper">
    <img src="/static/stopwatch.png" alt="">
    <h1>Timestamp calculator</h1>
    
    Enter a timestamp (in milliseconds) or a date
    <br><br>
    <input id="ts-input" class="input" type="text" size="16" v-on:keyup="onTsChange"
      :class="{error: tsError}" placeholder="_____________" data-mask="_____________">
    
    <span class="transfert-arrow">⇄</span>

    <input id="date-input" class="input" type="text" size="23" v-on:keyup="onDateChange"
      :class="{error: dateError}" placeholder="DD/MM/YYYY HH:MM:SS,mmm" data-mask="__/__/____ __:__:__,___">

   <h2>Current timestamp</h2>
   <div class="curr-ts">
     <span id="currTs">{{ currentTs }}</span> <button v-on:click="copyElementContent('#currTs')">copy</button>
   </div>
   </div>
  </div>
</template>

<script>
import moment from 'moment'
import TextMask from 'vanilla-text-mask'
import { copyElementContent } from '../../private_modules/clipboard'
import _ from 'lodash'

export default {
  mounted () {
    _.each(document.querySelectorAll('input[data-mask]'), input => {
      TextMask({
        inputElement: input,
        mask: input.getAttribute('data-mask').split('').map(c => {
          if (c === '_') {
            return /\d/
          } else if (c === '#') {
            return /[A-Z]/i
          } else {
            return c
          }
        }),
        placeholderChar: '_',
        keepCharPositions: true
      })
    })

    this.$tsInput = document.querySelector('#ts-input')
    this.$dateInput = document.querySelector('#date-input')

    // Refresh current timestamp every seconds
    this.currentTsTimer = setInterval(() => (this.currentTs = new Date().getTime()), 111)
  },
  destroyed () {
    clearInterval(this.currentTsTimer)
  },
  data: function () {
    return {
      timestamp: String(new Date().getTime()),
      currentTs: new Date().getTime(),
      tsError: false,
      dateError: false
    }
  },
  methods: {
    copyElementContent,
    onTsChange: function (ev) {
      let tsValue = ev.target.value.replace(/[,_ ]/g, '')
      let ts = Number(tsValue)
      this.$dateInput.value = moment(ts).format('DD/MM/YYYY HH:mm:ss,SSS')
    },
    onDateChange: function (ev) {
      let date = ev.target.value.replace(/[_]/, 0)
      this.$tsInput.value = moment(date, 'DD/MM/YYYY HH:mm:ss,SSS').unix()
    }
  },
  computed: {
    currentTsSeconds: function () {
      return Math.trunc(this.currentTs / 1000)
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
    background-color: #86e5ec;
    padding: 50px;
  }
  .ts-input-label {
    display: block;
    margin-bottom: 10px;
  }
  .input {
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
      box-shadow: 1px 1px 5px rgba(255, 100, 100, 0.7);
    }
  }
  .curr-ts {
    font-family: monospace;
    font-size: 20px;
  }
  .transfert-arrow {
    font-size: 21px;
    margin: 0 10px;
    display: inline-block;
  }
</style>
