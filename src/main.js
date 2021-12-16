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

const firebaseConfig = {};

firebase.initializeApp(firebaseConfig);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCImWLz8klqZL26xTOk4KrUWGBqR9s_sMQ',
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
