import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import vueSignature from 'vue-signature';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

require('./assets/css/styles.css');

Vue.use(DatePicker);
Vue.use(vueSignature);

const firebaseConfig = {
  apiKey: 'AIzaSyCFcObRTHR0gnMtTWEdIKazHEaL3eDIHik',
  authDomain: 'trucks-nx.firebaseapp.com',
  databaseURL: 'https://trucks-nx.firebaseio.com',
  projectId: 'trucks-nx',
  storageBucket: 'trucks-nx.appspot.com',
  messagingSenderId: '889346311012',
  appId: '1:889346311012:web:e7041805342e892da73071',
  measurementId: 'G-PVSBMTZHQ2',
};

firebase.initializeApp(firebaseConfig);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC-xWvuu3wzo9JCTzfBjwX05ufyBdT1hlk',
    libraries: 'places',
  },
  installComponents: true,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
