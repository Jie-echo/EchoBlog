import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import '../src/assets/public/common.less'
Vue.use(Antd);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
