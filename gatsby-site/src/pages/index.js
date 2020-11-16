import React from "react";
import {Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";
import {graphql} from "gatsby";
import BackgroundImage from "../components/BackgtoundImage";
import Layout from "../components/Layout";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: '4px',
    padding: '8px'
  },
  hero: {
    width: '100%',
    height: '400px'
  },
  heroText : {
    color: theme.palette.primary.contrastText,
    backgroundColor: fade(theme.palette.primary.main,0.5),
    padding: '2px',
    textAlign: 'center',
    borderRadius: '5px'
  }
}));

export default function Home({data}) {
  const classes = useStyles();
  const imgData = data.hero.childImageSharp.fluid;
  console.log(JSON.stringify(imgData))

  return (
    <Layout>
      <BackgroundImage className={classes.hero} fluid={imgData}>
        <div className={classes.heroText}>
          <Typography variant="h3">Daniel Burkhardt</Typography>
          <Typography variant="h4">Software Engineer</Typography>
          <Typography variant="h4">
            JavaScript (React, Vue.js, Node.js) - Python
          </Typography>
        </div>
      </BackgroundImage>
      <Paper className={classes.paper}>
        <Typography variant="body1">Hello world!</Typography>
      </Paper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexPage {
    hero: file(relativePath: {eq: "binary.jpg" }) {
      childImageSharp {
        fluid (maxWidth: 2000, srcSetBreakpoints: [800, 1200, 1600, 2000], quality: 80) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`
