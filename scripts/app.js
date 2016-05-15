import Vue from 'vue';
import VueRouter from 'vue-router';
import $ from 'jquery';

Vue.use(VueRouter);

const App = Vue.extend({});
const router = new VueRouter();

const Welcome = Vue.extend({
  template: '<p>Welcome Home</p>'
});

router.map({
  '/': {
    component: Welcome
  }
});

$(function() {
  router.start(App, '#app');
});
