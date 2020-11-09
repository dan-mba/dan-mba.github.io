module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-material-ui`,
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: "Roboto",
                variants: ["300", "400", "500"],
              },
              {
                family: "Damion",
                variants: ["400"],
              },
            ],
          },
        },
      },
    },
  ],
};
