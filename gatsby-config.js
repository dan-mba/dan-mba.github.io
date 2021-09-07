require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: 'https://dan-mba.github.io'
  },
  plugins: [
    'repos-source-plugin',
    'contrib-source-plugin',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "images",
        path: `${__dirname}/static/img`
      }
    },
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-theme-material-ui`,
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: "Damion",
                variants: ["400"],
                text: 'Dan',
                strategy: 'base64',
              },
              {
                family: "Roboto",
                variants: ["300", "400", "500"],
              },
            ],
          },
          formats: ["woff2"],
        },
      },
    },
    //'gatsby-plugin-webpack-bundle-analyser-v2'
  ],
};
