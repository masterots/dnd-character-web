import Vue from 'vue';
import Router from 'vue-router';
import Character from '@/components/character';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Character',
      component: Character,
    },
  ],
});
