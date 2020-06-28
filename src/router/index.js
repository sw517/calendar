import Vue from 'vue';
import VueRouter from 'vue-router';
import CalendarView from '../views/CalendarView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'CalendarView',
    component: CalendarView,
  },
  {
    path: '/pizza',
    name: 'PizzariaView',
    // route level code-splitting
    // this generates a separate chunk (watch.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "watch" */ '../views/PizzariaView.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
