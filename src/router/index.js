import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import DashboardIPFS from '@/components/DashboardIPFS'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/ipfs',
      name: 'ipfs',
      component: DashboardIPFS
    }
  ]
})
