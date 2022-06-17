// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//  全局方法
import globalFunctions from './assets/js/globalFunctions'
Vue.use(globalFunctions)


import QS from 'qs' // 使用qs对post传送的据序列化
Vue.prototype.qs = QS; 
// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://121.4.78.106:8000/" // 默认连接地址 
axios.defaults.timeout = 100000; // 响应时间
// axios.defaults.withCredentials = false;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
