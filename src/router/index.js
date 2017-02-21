import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import Timestamp from 'components/Timestamp'
import CodeEditor from 'components/CodeEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/timestamp',
      name: 'timestamp',
      component: Timestamp
    },
    {
      path: '/code-editor',
      name: 'code-editor',
      component: CodeEditor
    }
  ]
})
