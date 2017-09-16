import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import character from './modules/character';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    character,
  },
});
