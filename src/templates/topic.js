import React from "react";
import {Typography, Grid, Container} from "@mui/material";
import {styled} from "@mui/material/styles"
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import TopicCard from "../components/TopicCard";
import theme from "../gatsby-theme-material-ui-top-layout/theme";

const Title = styled(Typography)({
  padding: '1em 0 0'
});

const GridContainer = styled(Grid)({
  padding: '2em min(2%, .5em)',
  gap: '1.5em 1em'
});

const GridItem = styled(Grid)({
  [theme.breakpoints.only('md')]: {
    flexBasis: 'calc(50% - .5em)',
  },
  [theme.breakpoints.up('lg')]: {
    flexBasis: 'calc(33% - .67em)',
  },
});

export default function Topic({data, pageContext: {topic}}) {
  const repos = data.repos.nodes;
  const items = repos.map((repo, index) => (
    <GridItem item xs={12} md={6} lg={4} key={repo.name}>
      <TopicCard repo={repo} index={index} />
    </GridItem>
  ));

  return (
    <Layout title={`Daniel Burkhardt - Portfolio Topic - ${topic}`}
      description={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Topics - ${topic}`}
    >
      <Container maxWidth="xl" disableGutters>
        <Title variant="h3" align="center">{topic}</Title>
        <GridContainer container justifyContent="center" alignItems="stretch">
          {items}
        </GridContainer>
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
