require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "images",
        path: `${__dirname}/static/img`
      }
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'Repo',
        imagePath: 'openGraphImageUrl',
      },
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
                family: "Roboto",
                variants: ["300", "400", "500"],
                strategy: "cdn",
              },
              {
                family: "Damion",
                variants: ["400"],
                strategy: "cdn"
              },
            ],
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        disable: true,
      }
    },
  ],
};
