/* eslint-disable */
import data from '../assets/data.json';

export default {
  state: {
    data,
  },
  getters: {
    applicationData: s => s.data
  },
  mutations: {},
  actions: {},
};
