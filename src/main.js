import Vue from 'vue';
import App from './App.vue';
import router from '@/router'; //路由
import TypeNav from '@/components/TypeNav'; //全局组件
import store from '@/store'; //Vuex
import '@/mock/mockServe'; //引入MockServe.js 模拟返回数据

Vue.config.productionTip = false;

//注册全局组件 参数1：全局组件的名字 参数2：全局组件本身
Vue.component(TypeNav.name,TypeNav);

//引入element UI
import ElementUI from 'element-ui';
//引入element UI的全部样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
