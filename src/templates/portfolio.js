import React from "react";
import {Typography, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
//import {Link} from "gatsby-theme-material-ui";
import {graphql} from "gatsby";
import {Helmet} from "react-helmet";
import Layout from "../components/Layout";
import RepoCard from "../components/RepoCard";
import RepoPagination from "../components/RepoPagination";

const useStyles = makeStyles({
  paper: {
    margin: '4px',
    padding: '8px'
  },
  gridRoot: {
    padding: '4px'
  },
  linkArea: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1.5em 0'
  }
});

export default function Home({data, pageContext: {numberOfPages, humanPageNumber}}) {
  const classes = useStyles();
  const repos = data.repos.nodes;
  const items = repos.map((repo, index) => (
    <Grid item xs={12} md={6} key={repo.name} classes={{root: classes.gridRoot}}>
      <RepoCard repo={repo} index={index}/>
    </Grid>
  ));

  return (
    <Layout>
      <Helmet>
        <title>{`Daniel Burkhardt - Portfolio Page ${humanPageNumber}`}</title>
        <meta property="og:title" content={`Daniel Burkhardt - Portfolio Page ${humanPageNumber}`}/>
        <meta name="description"
          content={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Page ${humanPageNumber}`}
        />
        <meta name="og:description"
          content={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Page ${humanPageNumber}`}
        />
      </Helmet>
      <Typography variant="h3" align="center" className={classes.paper}>Portfolio</Typography>
      <Grid container justifyContent="center" alignItems="stretch" classes={{root: classes.gridRoot}}>
        {items}
      </Grid>
      <div className={classes.linkArea}>
        <RepoPagination page={humanPageNumber} count={numberOfPages} baseLink={'/portfolio'}/>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    repos: allRepo(
      sort: {fields: [isPinned, pushedAt], order: [DESC, DESC]}
      skip: $skip
      limit: $limit
    ) {
      nodes {
        name
        id
        topics
        languages {
          name
          size
        }
        description
        homepageUrl
        openGraphImageUrl
        localImage {
          childImageSharp {
            gatsbyImageData(
              width: 500,
              layout: CONSTRAINED,
              placeholder: NONE,
              quality: 70,
              outputPixelDensities: [0.5, 0.75, 1, 1.5, 2]
            )
          }
        }
        url
      }
    }
  }
`
