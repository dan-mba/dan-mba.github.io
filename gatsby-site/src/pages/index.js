import React from "react";
import {Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core/styles/colorManipulator"
import {graphql} from "gatsby";
import BackgroundImage from "gatsby-background-image";
import Layout from "../components/Layout";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: '4px',
    padding: '8px'
  },
  hero: {
    width: '100%',
    height: '480px'
  },
  heroBox: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heroText : {
    color: theme.palette.secondary.contrastText,
    backgroundColor: fade(theme.palette.secondary.main,0.75),
    padding: '2px',
    textAlign: 'center',
    borderRadius: '5px'
  }
}));

export default function Home({data}) {
  const classes = useStyles();
  const imgData = data.hero.childImageSharp.fluid;

  return (
    <Layout>
      <BackgroundImage Tag="section" className={classes.hero} fluid={imgData}>
        <div className={classes.heroBox}>
          <div className={classes.heroText}>
            <Typography variant="h3">Daniel Burkhardt</Typography>
            <Typography variant="h4">Software Engineer</Typography>
            <Typography variant="h4">
              JavaScript (React, Vue.js, Node.js) - Python
            </Typography>
          </div>
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
        fluid (maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
