const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy: {
      '/api': {  // 代理规则（按需修改前缀）
        target: 'https://img2.tapimg.com', // 目标域名
        changeOrigin: true, // 修改请求头中的 Host
        secure: true, // 如果是 HTTPS，需开启
        pathRewrite: {
          '^/api': '' // 移除 /api 前缀（可选）
        }
      }
    }
  }
})
