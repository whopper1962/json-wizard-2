import Vue from 'vue';
import VueRouter from 'vue-router';

// components
import HomeView from '@/views/HomeView';
import UserManualView from '@/views/UserManualView.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HOME_VIEW',
    component: HomeView
  },
  {
    path: '/user-manual',
    name: 'USER_MANUAL',
    component: UserManualView
  },
  {
    path: '*',
    redirect: {
      name: 'HOME_VIEW'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
