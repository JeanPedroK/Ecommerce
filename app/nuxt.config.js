const isDev = (process.env.NODE_ENV == 'development');

const prefix = isDev ? 'http://kunsler.alexjonas.local' : '';

export default {

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Künsler Moda Íntima',
    htmlAttrs: {
      lang: 'pt-BR'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Künsler Moda Íntima conforto e qualidade' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'author', content: 'Alex.js www.alexjonas.com.br' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
      { rel: 'stylesheet', href: `${prefix}/custom/css.php` }
    ],
    script: [
      { hid: 'custom', src: `${prefix}/custom/js.php`, defer: true }
    ]
  },

  router: {
    middleware: 'initialize'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/themask',
    '@/plugins/bootstrap',
    '@/plugins/formatdate',
    '@/plugins/dateFormat',
    '@/plugins/formatvalor',
    '@/plugins/uppercase',
    '@/plugins/formatInstallment',
    // global mixing
    '@/mixins/global',
    '@/plugins/sweetalert2',

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: [
      './assets/scss/mixins.scss',
      './assets/scss/variables.scss'
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',

    // https://www.npmjs.com/package/@nuxtjs/toast
    '@nuxtjs/toast',

    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    // https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt',
  ],

  ssr: false,

  toast: {
    theme: "bubble",
    action: {
      text: 'fechar',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    },
    position: "bottom-center",
    duration: 3000,
    register: [
      {
        name: 'my-error',
        message: 'Oops...Algo deu errado',
        options: {
          type: 'error',
        }
      }
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: isDev ? `${prefix}/api` : '/api',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true,
    },
    extractCSS: true
  },
  loading: '~/components/LoadingBar.vue'
}
