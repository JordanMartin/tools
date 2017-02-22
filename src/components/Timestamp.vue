<template>
  <div class="tool-wrapper">

    <img src="/static/images/stopwatch.png">
    <h1 class="tool-name">Timestamp calculator</h1>
    
    <div class="block">
      <label class="labeled-input">
        <span>Timestamp in milliseconds</span>
        <input id="ts-input" class="input" type="text" size="12" v-on:keyup="onTsChange"
          :class="{error: tsError}" placeholder="_____________" data-mask="_____________">
      </label>

      <span class="transfert-arrow">⇄</span>

      <label class="labeled-input">
        <span>Date DD/MM/YYYY HH:MM:SS,mmm</span>
        <input id="date-input" class="input" type="text" size="22" v-on:keyup="onDateChange"
          :class="{error: dateError}" placeholder="__/__/____ __:__:__,___" data-mask="__/__/____ __:__:__,___">
      </label>
    </div>

    <div class="block">
      <h2>Current timestamp</h2>
      <div class="curr-ts">
        <span id="currTs">{{ currentTs }}</span> <img src="/static/images/clipboard.png" class="img-btn" alt="copy" title="copy" v-on:click="copyElementContent('#currTs')"/>
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
    this.textMasks = []
    _.each(document.querySelectorAll('input[data-mask]'), input => {
      let textMask = TextMask({
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

      this.textMasks.push(textMask)
    })

    this.$tsInput = document.querySelector('#ts-input')
    this.$dateInput = document.querySelector('#date-input')

    // Refresh current timestamp every seconds
    this.currentTsTimer = setInterval(() => (this.currentTs = new Date().getTime()), 111)
  },
  destroyed () {
    clearInterval(this.currentTsTimer)
    this.textMasks.forEach(tm => tm.destroy())
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
      this.dateError = false
    },
    onDateChange: function (ev) {
      let date = ev.target.value.replace(/[_]/, 0)
      this.$tsInput.value = moment(date, 'DD/MM/YYYY HH:mm:ss,SSS').unix() * 1000
      this.dateError = isNaN(this.$tsInput.value)
    }
  },
  computed: {
    currentTsSeconds: function () {
      return Math.trunc(this.currentTs / 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .block {
    margin: 40px 0;
  } 
  .ts-input-label {
    display: block;
    margin-bottom: 10px;
  }
  .labeled-input {
    display: inline-block;

    > span {
      display: block;
      text-align: left;
      font-size: 0.9em;
      margin-bottom: 2px;
      color: #bbb;
    }
  }
  .input {
    background: #404552;
    color: #d3dae3;
    padding: 10px 20px;
    border: none;
    border-left: solid 10px #4caf50;
    box-shadow: 1px 1px 10px #222;
    border-radius: 3px;

    font-size: 20px;
    font-family: monospace;
    text-align: left;

    &:active, &:focus {
      outline: none;
    }
    &.error {
      border-color: #f44336;
      box-shadow: 1px 1px 5px rgba(255, 100, 100, 0.7);
    }
  }
  .curr-ts {
    font-family: monospace;
    font-size: 20px;
  }
  .transfert-arrow {
    font-size: 30px;
    margin: 0 10px;
    top: 4px;
    position: relative;
  }
</style>
