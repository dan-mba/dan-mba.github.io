import React from "react";
import {Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";
import {graphql} from "gatsby";
import {Helmet} from "react-helmet";
import Img from "gatsby-image";
import {Link} from "gatsby-theme-material-ui";
import BackgroundImage from "../components/BackgtoundImage";
import Layout from "../components/Layout";
import PageData from "../data/index.yml";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: '10px 4px',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

  },
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
  p: {
    padding: '10px 5px 20px',
    maxWidth: '800px'
  },
  spacer: {
    padding: '10px 0'
  },
  map: {
    margin: '10px 0 5px'
  }
}));

export default function Home({data}) {
  const classes = useStyles();
  const heroImgData = data.hero.childImageSharp.fluid;
  const mapImgData = data.map.childImageSharp.fixed;

  return (
    <Layout>
      <Helmet>
        <title>{PageData.title}</title>
        <meta property="og:title" content={PageData.title} />
        <meta name="description" content={PageData.description} />
        <meta name="og:description" content={PageData.description} />
      </Helmet>
      <BackgroundImage className={classes.hero} fluid={heroImgData}>
        <div className={classes.heroText}>
          <Typography variant="h3">{PageData.name}</Typography>
          <Typography variant="h4">{PageData.jobtitle}</Typography>
          <Typography variant="h4">{PageData.langs}</Typography>
        </div>
      </BackgroundImage>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">{PageData.heading}</Typography>
        {PageData.paragraphs.map((d, i) => {
          return (
            <span key={i}>
              {!d.title ? <div className={classes.spacer}></div> : 
                !d.titleUrl ?
                <Typography variant="h5" align="center">{d.title}</Typography> :
                <Link href={d.titleUrl} underline="none" target="_blank" rel="noopener noreferrer">
                  <Typography variant="h5" color="secondary" align="center">{d.title}</Typography>
                </Link>
              }
              <Typography variant="body1" className={classes.p}>{d.p}</Typography>
            </span>
          );
        })}
        <Img fixed={mapImgData} className={classes.map} alt="Map of Florida with Pin in Broward County"/>
        <Typography variant="body1" className={classes.p}>
          {PageData.mapparagraph}
        </Typography>
      </Paper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexPage {
    hero: file(relativePath: {eq: "binary.jpg" }) {
      childImageSharp {
        fluid (maxWidth: 2000, srcSetBreakpoints: [800, 1200, 1600, 2000], quality: 70) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    map: file(relativePath: {eq: "map.png" }) {
      childImageSharp {
        fixed (width: 300, height: 300, quality: 80) {
          ...GatsbyImageSharpFixed_withWebp_tracedSVG
        }
      }
    }
  }
`
