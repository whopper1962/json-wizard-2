import Vue from 'vue';
import VueRouter from 'vue-router';

// components
import HomeView from '@/views/HomeView';
import UserManualView from '@/views/UserManualView.vue'
import ManualIndexVue from '@/components/ManualIndex.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HOME_VIEW',
    component: UserManualView
  },
  {
    path: '/converter',
    name: 'CONVERTER_VIEW',
    component: HomeView
  },
  {
    path: '/manuals/:manualCategory',
    name: 'MANUAL_INDEX',
    component: ManualIndexVue
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
