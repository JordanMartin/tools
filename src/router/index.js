import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import Timestamp from 'components/Timestamp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/timestamp',
      name: 'timestamp',
      component: Timestamp
    }
  ]
})
