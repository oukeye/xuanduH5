const CompressionPlugin = require('compression-webpack-plugin');

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: '广州玄度科技'||process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#d4531e' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/loading.js', ssr: true },
    { src: '~/plugins/mint-ui.js', ssr: true },

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy'

  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {

  },
  proxy: [
    [
      '/api',
      {
        // target:'http://172.17.0.117:9528',
        target:'http://localhost:9528',
        pathRewrite: { '^/api': '/api' }
      }
    ],

  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    maxChunkSize: 560000, // 单个包最大尺寸
    extractCSS: false, // 单独提取 css  boolean
    loaders: {
      less: {
        javascriptEnabled: true
      }
    },
    postcss: {
      // 添加插件名称作为键，参数作为值
      // 使用npm或yarn安装它们
      plugins: {
        // 通过传递 false 来禁用插件
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {},
        'postcss-px2rem': {
          baseDpr: 1,             // base device pixel ratio (default: 2)
          threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
          remVersion: true,       // whether to generate rem version (default: true)
          remUnit: 37.5 / 1.6,            // rem unit value (default: 75)
          remPrecision: 3         // rem precision (default: 6)
        },
        // 'autoprefixer': {
        //   browsers: ['last 3 versions']
        // }
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        maxAsyncRequests: 7,
        cacheGroups: {
          mint: {
            test: /node_modules[\\/]mint-ui/,
            chunks: 'all',
            priority: 20,
            name: true
          },
        }
      }
    },
    plugins: [
      new CompressionPlugin({
        cache: true,
      })
    ]
  },
  router: {
    base: '/h5/',
    middleware: [ 'axios']
  },
}
