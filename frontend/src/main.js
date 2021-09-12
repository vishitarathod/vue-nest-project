import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import BaseButton from './components/base/Button.vue'
import store from './store/index'
import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

const app=createApp(App);
// app.config.productionTip = false;
// app.use(Antd);
app.use(router)
app.component('BaseButton',BaseButton)
app.use(store);
app.use(VueLoaders);
app.mount('#app');
