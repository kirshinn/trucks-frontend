import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/* eslint-disable */
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/upload',
      name: 'Upload',
      component: () => import('../views/Upload.vue'),
    },
    {
      path: '/application',
      name: 'Application',
      component: () => import('../views/Application.vue'),
    },
    {
      path: '/contacts',
      name: 'Contact',
      component: () => import('../views/Contact.vue'),
    },
  ],

});

export default router;
