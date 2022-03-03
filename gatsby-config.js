require('dotenv').config()

module.exports = {
  siteMetadata: {
    siteTitle: 'CHOPOVA LOWENA',
    siteTitleDefault: 'CHOPOVA LOWENA',
    siteUrl: 'https://chopovalowena.com',
    hrefLang: 'en',
    siteDescription: 'Chopova Lowena E-Commerce and Portfolio site',
    siteImage: '',
    twitter: '',
  },
  flags: {
    FAST_DEV: true,
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-shopify',
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ['collections'],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-gatsby-cloud',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/favicon.png',
      },
    },
  ].filter(Boolean),
}
