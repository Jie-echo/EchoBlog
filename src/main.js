import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import Antd from "ant-design-vue";
import moment from "moment";
import "ant-design-vue/dist/antd.css";
import '../src/assets/public/common.less'
Vue.use(Antd);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
//定义全局过滤器实现日期格式化
Vue.filter("format", function(input, fmtstring) {
    // 使用momentjs这个日期格式化类库实现日期的格式化功能
    return moment(input).format(fmtstring);
  });
   
  Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
