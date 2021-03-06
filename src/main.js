import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//Firebase
import firebase from 'firebase';
import { firebaseConfig } from "./config/firebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.use(ElementUI);
//Vue.use(Notification);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import SmartTable from 'vuejs-smart-table'
Vue.use(SmartTable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
