require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  jsxRuntime: "automatic",
  siteMetadata: {
    siteUrl: 'https://dan-mba.github.io'
  },
  trailingSlash: 'always',
  plugins: [
    {
      resolve: 'repos-source-plugin',
      options: {
        githubUserId: 'dan-mba',
        githubUserToken: process.env.GITHUB_TOKEN,
        portfolioLanguages: ['JavaScript','Vue','Python','TypeScript']
      }
    },
    {
      resolve: 'contrib-source-plugin',
      options: {
        githubUserId: 'dan-mba',
        githubUserToken: process.env.GITHUB_TOKEN,
        repoFilter: [{owner: 'firstcontributions', name: 'first-contributions'}],
        issueFilter: [
          {owner: 'gatsbyjs', name: 'gatsby', number: 36192},
          {owner: 'EddieHubCommunity', name: 'support', number: 5763}
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/',
      }
    },
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
