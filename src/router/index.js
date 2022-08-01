//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';

//使用插件
Vue.use(VueRouter)

//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重新编成式路由跳转 以防止报错： Vue-router3新加入的promise报错 // Vue-router4应该没有这个问题了
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)

    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

//重新编成式路由跳转 以防止报错： Vue-router3新加入的promise报错 // Vue-router4应该没有这个问题了
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)

    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

//配置路由
export default new VueRouter({
    //配置路由
    routes:[
        {
            path:"/home",
            component: Home,
            meta:{show:true}
        },
        {
            path:"/search/:searchcontent?", //加入？以防止 编程式跳转进search时用对象写法还缺少params参数 出现的报错
            component: Search,
            meta:{show:true},
            name:'search',
            //路由组件传参
            //props传参 (只能用于params 传参)
            //props:true,
            //对象写法
            //props:{a:1,b:2} 固定值
            //函数写法:可以params参数、query参数，通过props传递给路由组件
            props:($route)=>{
                return {searchcontent:$route.params.searchcontent}
            }
        },
        {
            path:"/login",
            component: Login,
            meta:{show:false}
        },
        {
            path:"/register",
            component: Register,
            meta:{show:false}
        },
        {
            path:'*',
            redirect:'/home',
            meta:{show:true}
        }
    ]
})