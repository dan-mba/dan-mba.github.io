import React from "react";
import {Typography, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "gatsby-theme-material-ui";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import RepoCard from "../components/RepoCard";

const useStyles = makeStyles({
  paper: {
    margin: '4px',
    padding: '8px'
  },
  linkArea: {
    display: 'flex',
    justifyContent: 'center',
  },
  links: {
    padding: '8px'
  }
});

export default function Home({data, pageContext: {previousPagePath, nextPagePath}}) {
  const classes = useStyles();
  const repos = data.repos.nodes;
  const items = repos.map(repo => (
    <Grid item xs={12} md={6} key={repo.name}>
      <RepoCard repo={repo} />
    </Grid>
  ));

  return (
    <Layout>
      <div className={classes.paper}>
        <Typography variant="h3" align="center">Portfolio</Typography>
      </div>
      <Grid container justify="center" alignItems="stretch" spacing={1}>
        {items}
      </Grid>
      <div className={classes.linkArea}>
        {!previousPagePath ? null:
          <Link to={previousPagePath} underline="none" className={classes.links} variant="h6">Prev</Link>
        }
        {!nextPagePath ? null:
          <Link to={nextPagePath} underline="none" className={classes.links} variant="h6">Next</Link>
        }
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    repos: allRepo(
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
        url
      }
    }
  }
`
