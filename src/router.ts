// Home
import Home from './home/pages/Home.vue'

// Calendar
import Dashboard from './calendar/pages/Dashboard.vue'

import * as VueRouter from 'vue-router'

const routes = [
  // Home
  { path: '/', component: Home },

  // Calendar
  { path: '/dashboard', component: Dashboard },
]

let webHistory:any;

if(process.env.IS_ELECTRON == "false"){
  webHistory = VueRouter.createWebHistory();
}
else if(process.env.IS_ELECTRON == "true"){
  webHistory = VueRouter.createWebHashHistory();
}

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {

    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
        offset: { y: 80 }
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.afterEach((to, from, fail) => {
  console.log(fail)
})

export default router
