const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      port: '3333',
      open: true,
      client: {
        overlay: false
      },
      proxy: {
        '/steel': {
          target: 'http://123.57.172.51:8080',
          changeOrigin: true
        }
      }
    }
  }
})
