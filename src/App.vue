<template>
  <div id="app">
    <Header/>
    <!-- 路由组件出口地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index'
import Footer from './components/Footer/index'


export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //通过Vuex发请求，获取TypeNav的数据，存储于仓库当中
    this.$store.dispatch('categoryList')
    
  }
}
</script>

<style>

</style>
