import React from "react";
import {Typography, Grid, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {graphql} from "gatsby";
import {Helmet} from "react-helmet";
import Layout from "../components/Layout";
import TopicCard from "../components/TopicCard";

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

export default function Home({data, pageContext: {topic}}) {
  const classes = useStyles();
  const repos = data.repos.nodes;
  const items = repos.map((repo, index) => (
    <Grid item xs={12} md={6} lg={4} key={repo.name} classes={{root: classes.gridItem}}>
      <TopicCard repo={repo} index={index} />
    </Grid>
  ));

  return (
    <Layout>
      <Helmet>
        <title>{`Daniel Burkhardt - Portfolio Topic - ${topic}`}</title>
        <meta property="og:title" content={`Daniel Burkhardt - Portfolio Topics - ${topic}`}/>
        <meta name="description"
          content={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Topics - ${topic}`}
        />
        <meta name="og:description"
          content={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Topics - ${topic}`}
        />
      </Helmet>
      <Container maxWidth="xl" disableGutters>
        <Typography variant="h3" align="center" className={classes.title}>{topic}</Typography>
        <Grid container justify="center" alignItems="stretch" classes={{root: classes.gridRoot}}>
          {items}
        </Grid>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($topic: String) {
    repos: allRepo(
      sort: {fields: [isPinned, pushedAt], order: [DESC, DESC]}
      filter: {topics: {in: [$topic]}}
    ) {
      nodes {
        name
        id
        languages {
          name
          size
        }
        description
        homepageUrl
        url
      }
    }
  }
`
