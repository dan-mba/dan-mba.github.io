import {Suspense} from "react";
import {Typography, Container} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {styled} from "@mui/material/styles"
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TopicCard from "../components/TopicCard";

const Title = styled(Typography)({
  padding: '3rem 0 0'
});

const GridContainer = styled(Grid)({
  padding: '1.5rem min(2vw, .5rem)'
});

export default function Topic({data, pageContext: {topic}}) {
  const repos = data.repos.nodes;
  const items = repos.map((repo, index) => (
    <Grid xs={12} md={6} lg={4} key={repo.name}>
      <TopicCard repo={repo} index={index} />
    </Grid>
  ));

  return (
    <Layout>
      <Container maxWidth="xl" disableGutters>
        <Title variant="h3" align="center">{topic}</Title>
        <Suspense>
          <GridContainer container columnSpacing={3} rowSpacing={2} justifyContent="center" alignItems="stretch">
            {items}
          </GridContainer>
        </Suspense>
      </Container>
    </Layout>
  );
};

export const Head = ({pageContext: {topic}}) => (
  <SEO title={`Daniel Burkhardt - Portfolio Topic - ${topic}`}
    description={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Topics - ${topic}`}
  />
)

export const pageQuery = graphql`
  query ($topic: String) {
    repos: allRepo(
      sort: [{isPinned: DESC}, {pushedAt: DESC}]
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
