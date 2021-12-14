/* eslint-disable no-unused-vars */
import firebase from 'firebase';

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async upload({ dispatch }, { username, typeDocument, url }) {
      await firebase
        .database()
        .ref('/documents')
        .push()
        .set({
          username,
          typeDocument,
          url,
        });
    },
    async uploadWorksheet({ dispatch }, { worksheet }) {
      await firebase
        .database()
        .ref('/worksheets')
        .push()
        .set({
          worksheet,
        });
    },
  },
};
