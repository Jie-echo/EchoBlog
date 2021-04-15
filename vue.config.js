module.exports = {
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    // 设置代理
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: "8080",
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
        .rule('')
        .test(/\.md$/)
        .use('html-loader')
        .loader('html-loader')
        .end()
        .use('markdown-loader')
        .loader('markdown-loader')
        .end()
    }
};
