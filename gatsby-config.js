require('dotenv').config()

module.exports = {
  siteMetadata: {
    siteTitle: 'gatsby-starter-shopify',
    siteTitleDefault: 'gatsby-starter-shopify by @GatsbyJS',
    siteUrl: 'https://shopify-demo.gatsbyjs.com',
    hrefLang: 'en',
    siteDescription:
      'A Gatsby starter using the latest Shopify plugin showcasing a store with product overview, individual product pages, and a cart.',
    siteImage: '/default-og-image.jpg',
    twitter: '@gatsbyjs',
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
  ].filter(Boolean),
}
