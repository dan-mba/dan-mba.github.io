import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {alpha} from "@material-ui/core/styles/colorManipulator";
import {getImage} from "gatsby-plugin-image";
import {graphql} from "gatsby";
import {Helmet} from "react-helmet";
import BackgroundImage from "../components/BackgtoundImage";
import Layout from "../components/Layout";


const useStyles = makeStyles(theme => ({
  hero: {
    width: '100%',
    height: '400px'
  },
  heroText: {
    color: theme.palette.primary.contrastText,
    backgroundColor: alpha(theme.palette.primary.main,0.5),
    padding: '2px',
    textAlign: 'center',
    borderRadius: '5px'
  },
}));

export default function FourZeroFour({data}) {
  const classes = useStyles();
  const heroImgData = getImage(data.hero);

  return (
    <Layout>
      <Helmet>
        <title>Page Not Found</title>
        <meta property="og:title" content="Page Not Found" />
      </Helmet>
      <BackgroundImage className={classes.hero} image={heroImgData}>
        <div className={classes.heroText}>
          <Typography variant="h3">Page Not Found</Typography>
          <Typography variant="body1">Oops! The page you are looking for has been removed or relocated</Typography>
        </div>
      </BackgroundImage>
    </Layout>
  );
};

export const pageQuery = graphql`
  query FourZeroFourPage {
    hero: file(relativePath: {eq: "binary.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1000, layout: CONSTRAINED, placeholder: NONE, quality: 50)
      }
    }
  }
`
