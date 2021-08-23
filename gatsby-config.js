const config = {
  // Project title. Used as SEO title and PWA name
  title: 'Parkbee Frontend Challenge',
  // Project short name. Used by PWA
  shortTitle: 'ParkBee',
  // Project description. Used in SEO meta tag and by PWA
  description: 'An Gatsby, TS, Storybook, Jest, PWA application for the frontend challenge @ ParkBee.',
  // Keywords describing the project. Used in SEO meta tag
  keywords: ['gatsby', 'react', 'typescript', 'storybook', 'jest', 'pwa', 'graphql'],
  // Absolute deployment path (without trailing slash). Used as base URL in SEO meta tags
  baseUrl: 'https://gfs-parkbee.netlify.app',
  // Site language. Added in html tag and PWA manifest
  lang: 'en',
  // Path to main favicon. Recommended size: 512x512. Other sizes are generated automatically
  favicon: 'src/images/favicon.png',
  // Theme color. Used as color of device toolbar in supported browsers
  themeColor: '#8261f0',
  // Background color. Used as background on PWA launch screen. Recommended to make it the same as body color
  backgroundColor: '#8261f0',
}

module.exports = {
  siteMetadata: {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    baseUrl: config.baseUrl,
    lang: config.lang,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        start_url: '/',
        display: 'standalone',
        name: config.title,
        short_name: config.shortTitle,
        description: config.description,
        lang: config.lang,
        icon: config.favicon,
        theme_color: config.themeColor,
        background_color: config.backgroundColor,
      },
    },
  ],
}
