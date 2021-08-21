// Extend default Gatsby config with SVGR support, aliases and Webpack Bundle Analyzer
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

exports.onCreateWebpackConfig = ({ getConfig, actions, loaders, stage }) => {
  const existingConfig = getConfig()

  const rules = existingConfig.module.rules.map(rule => {
    if (String(rule.test) === String(/\.(ico|svg|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/)) {
      return {
        ...rule,
        exclude: path.resolve(__dirname, './src/icons'),
      }
    }
    return rule
  })

  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /(\\|\/)mapbox-gl\.js$/,
            use: loaders.null(),
          },
          {
            test: /(\\|\/)mapbox-gl-geocoder/,
            use: loaders.null(),
          },
        ],
      },
    })
  }

  actions.replaceWebpackConfig({
    ...existingConfig,
    module: {
      ...existingConfig.module,
      rules,
    },
  })

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.svg$/,
          include: path.resolve(__dirname, './src/icons'),
          issuer: /\.((j|t)sx?)$/,
          use: {
            loader: require.resolve(`@svgr/webpack`),
            options: {
              titleProp: true,
            },
          },
        },
      ],
    },
    plugins:
      stage === 'build-javascript'
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              defaultSizes: 'gzip',
              openAnalyzer: false,
              generateStatsFile: true,
            }),
          ]
        : [],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  })
}
