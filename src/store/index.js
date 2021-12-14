import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import applicationData from './applicationData';
import uploadDocument from './uploadDocument';

Vue.use(Vuex);

/* eslint-disable */
export default new Vuex.Store({
  state: {
    company: 'NorthEast Xpress Inc.',
    step: localStorage.getItem('step') || 0,
  },
  mutations: {
    prevStep(state, payload) { state.step-- },
    nextStep(state, payload) { state.step++ },
  },
  actions: {
  },
  getters: {
  },
  modules: {
    applicationData,
    uploadDocument
  },
  plugins: [
    createPersistedState()
  ]
});
