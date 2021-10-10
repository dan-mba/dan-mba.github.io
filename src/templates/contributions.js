import React from "react";
import {Typography, Grid, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {graphql} from "gatsby";
import loadable from "@loadable/component";
import Layout from "../components/Layout";
import ContribCard from "../components/ContribCard";

const RepoPagination = loadable(() => import("../components/RepoPagination"));

const useStyles = makeStyles({
  title: {
    padding: '1em 0 0'
  },
  gridRoot: {
    padding: '2em .5em'
  },
  gridItem: {
    padding: '1em .5em'
  },
  linkArea: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 0 1em'
  }
});

export default function Home({data, pageContext: {numberOfPages, humanPageNumber}}) {
  const classes = useStyles();
  const repos = data.repos.nodes;
  const items = repos.map((repo) => (
    <Grid item xs={12} md={6} key={repo.name} classes={{root: classes.gridItem}}>
      <ContribCard repo={repo} />
    </Grid>
  ));

  return (
    <Layout title={`Daniel Burkhardt - Contributions`}
      description={`Software Development Portfolio Site for Daniel Burkhardt - Contributions`}
    >
      <Container maxWidth="xl" disableGutters>
        <Typography variant="h3" align="center" className={classes.title}>Open Source Contributions</Typography>
        <Grid container justifyContent="center" alignItems="stretch" classes={{root: classes.gridRoot}}>
          {items}
        </Grid>
        {numberOfPages == 1 ? null :
          <div className={classes.linkArea}>
            <RepoPagination page={humanPageNumber} count={numberOfPages} baseLink={'/contributions'}/>
          </div>}
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($skip: Int, $limit: Int) {
    repos: allContrib(
      sort: {fields: [totalContribs, name], order: [DESC, ASC]},
      skip: $skip,
      limit: $limit
    ) {
      nodes {
        contributionIssues {
          closedAt
          title
          url
        }
        contributionPrs {
          mergedAt
          title
          url
        }
        description
        name
        stargazerCount
        url
      }
    }
  }
`
