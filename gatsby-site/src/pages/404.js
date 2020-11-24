import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";
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
    backgroundColor: fade(theme.palette.primary.main,0.5),
    padding: '2px',
    textAlign: 'center',
    borderRadius: '5px'
  },
}));

export default function FourZeroFour({data}) {
  const classes = useStyles();
  const heroImgData = data.hero.childImageSharp.fluid;

  return (
    <Layout>
      <Helmet>
        <title>Page Not Found</title>
        <meta property="og:title" content="Page Not Found" />
      </Helmet>
      <BackgroundImage className={classes.hero} fluid={heroImgData}>
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
        fluid (maxWidth: 2000, srcSetBreakpoints: [800, 1200, 1600, 2000], quality: 70) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
