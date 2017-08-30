'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';

import progressbar from './progressbar';

const routes = [
  {
    path: '/dashboard',
    component: r => require.ensure([], () => r(require('./dashboard/dashboard.component')), 'dashboard')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  progressbar.start();
  next();
})
router.afterEach((router) => {
  setTimeout(() => {
    progressbar.finish();
  }, 500)
})

export default router;
