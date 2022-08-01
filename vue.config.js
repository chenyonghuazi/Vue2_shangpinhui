const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  //代理解决跨域
  devServer:{
    proxy:{
      '/api':{
        target:'http://39.98.123.211', //数据服务器
        // pathRewrite: {'^/api':''}
      }
    }
  }
})
