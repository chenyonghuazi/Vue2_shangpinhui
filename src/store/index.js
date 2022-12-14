import Vue from 'vue';
import Vuex from 'vuex';

//需要使用插件一次
Vue.use(Vuex);

//引入模块化小仓库
import home from './home';
import search from './search';

//对外暴露Store类的一个实例
export default new Vuex.Store({
    
    //实现vuex仓库
    modules:{
        home,
        search
    }


});