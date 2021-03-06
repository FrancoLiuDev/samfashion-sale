const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  /*
   ** Headers of the page
   */
  dev: true,
  head: {
    title: 'intro',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'membership managerment'
      }
    ],
    
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },{
      rel: 'stylesheet',
      type: 'text/css',
      href: '//unpkg.com/bootstrap/dist/css/bootstrap.min.css'
    },
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: '//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    extend(config) {
      const alias = (config.resolve.alias = config.resolve.alias || {})
      alias['@Views'] = path.join(this.options.rootDir, 'views')
      alias['@Requests'] = path.join(this.options.rootDir, 'requests')
      alias['@Mixins'] = path.join(this.options.rootDir, 'mixins')
      alias['@Configs'] = path.join(this.options.rootDir, 'configs')
      alias['@Components'] = path.join(this.options.rootDir, 'components/components')
      alias['@Assets'] = path.join(this.options.rootDir, 'assets')
      alias['@Static'] = path.join(this.options.rootDir, 'static')
      alias['@Store'] = path.join(this.options.rootDir, 'store')
      alias['@Delegate'] = path.join(this.options.rootDir, 'store/delegate')
      alias['@Models'] = path.join(this.options.rootDir, 'models')

 

    }
    /*
     ** Run ESLint on save
     */
  },
  plugins: ['~/plugins/vue-factory'],
  modules: [
    ['bootstrap-vue/nuxt', { css: false }]


  ]
}
