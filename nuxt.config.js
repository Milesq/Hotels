const content = `Znajdź najlepsze miejsce nad wodą już w 30 sekund!
Wybieraj spośród setek obiektów w całej Polsce! Poznaj atrakcje, ceny,
godziny otwarcia, opinie i inne informacje zebrane w jednym miejscu!
Największa Polska baza basenów, aquaparków, kąpielisk i saun czekających na Ciebie!`;

export default {
  mode: 'universal',
  head: {
    htmlAttrs: {
      lang: 'pl'
    },
    title: 'Największa baza basenów, aquaparków, saun w Polsce!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content },
      { name: 'author', content: 'Milesq' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Hind:400,500,600,700&amp;subset=latin-ext'
      }
    ]
  },
  loading: {
    color: 'green',
    height: '5px',
    duration: 1500,
    continuous: true
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-leaflet'
  ],
  plugins: ['~/plugins/vue-select'],
  workbox: {
    offlinePage: '/offline'
  },
  manifest: {
    name: 'Baza Polskich basenów',
    lang: 'pl',
    theme_color: '#5d8fe4'
  },
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }

      config.module.rules.push({
        test: /\.md$/,
        loader: 'raw-loader',
        exclude: /(node_modules)/
      });
    }
  }
};
