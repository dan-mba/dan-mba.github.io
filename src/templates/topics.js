import React from "react";
import {Typography, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "gatsby-theme-material-ui";
import {graphql} from "gatsby";
import {Helmet} from "react-helmet";
import Layout from "../components/Layout";
import TopicCard from "../components/TopicCard";

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
  },
  links: {
    padding: '8px'
  }
});

export default function Home({data, pageContext: {topic}}) {
  const classes = useStyles();
  const repos = data.repos.nodes;
  const items = repos.map((repo, index) => (
    <Grid item xs={12} md={6} key={repo.name} classes={{root: classes.gridRoot}}>
      <TopicCard repo={repo} index={index} />
    </Grid>
  ));

  return (
    <Layout>
      <Helmet>
        <title>{`Daniel Burkhardt - ${topic} Portfolio Topic`}</title>
        <meta property="og:title" content={`Daniel Burkhardt - ${topic} Portfolio Topic`}/>
        <meta name="description"
          content={`Software Development Portfolio Site for Daniel Burkhardt - ${topic} Portfolio Topic`}
        />
        <meta name="og:description"
          content={`Software Development Portfolio Site for Daniel Burkhardt - ${topic} Portfolio Topic`}
        />
      </Helmet>
      <Typography variant="h3" align="center" className={classes.paper}>{topic}</Typography>
      <Grid container justify="center" alignItems="stretch" classes={{root: classes.gridRoot}}>
        {items}
      </Grid>
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
