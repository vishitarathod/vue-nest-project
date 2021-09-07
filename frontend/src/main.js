import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import Routes from './router/index.js';
import { FormModel } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(FormModel);
// Vue.use(router)
Vue.use(Antd);


Vue.use(router)

new Vue({
  render: h => h(App),
}).$mount('#app')
