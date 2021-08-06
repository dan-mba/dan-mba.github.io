import React from "react";
import {Typography, Grid, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {graphql} from "gatsby";
import {Helmet} from "react-helmet";
import Layout from "../components/Layout";
import ContribCard from "../components/ContribCard";

const useStyles = makeStyles({
  title: {
    padding: '1em 0 0'
  },
  gridRoot: {
    padding: '2em .5em'
  },
  gridItem: {
    padding: '1em .5em'
  }
});

export default function Home({data}) {
  const classes = useStyles();
  const repos = data.repos.nodes;
  const items = repos.map((repo, index) => (
    <Grid item xs={12} md={6} key={repo.name} classes={{root: classes.gridItem}}>
      <ContribCard repo={repo} index={index} />
    </Grid>
  ));

  return (
    <Layout>
      <Helmet>
        <title>{`Daniel Burkhardt - Contributions`}</title>
        <meta property="og:title" content={`Daniel Burkhardt - Contributions`}/>
        <meta name="description"
          content={`Software Development Portfolio Site for Daniel Burkhardt - Contributions`}
        />
        <meta name="og:description"
          content={`Software Development Portfolio Site for Daniel Burkhardt - Contributions`}
        />
      </Helmet>
      <Container maxWidth="xl" disableGutters>
        <Typography variant="h3" align="center" className={classes.title}>Open Source Contributions</Typography>
        <Grid container justifyContent="center" alignItems="stretch" classes={{root: classes.gridRoot}}>
          {items}
        </Grid>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    repos: allContrib(
      sort: {fields: [totalContribs, name], order: [DESC, ASC]}
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
        url
      }
    }
  }
`
