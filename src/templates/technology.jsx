import { Suspense } from "react";
import {Typography, Container} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {styled} from "@mui/material/styles"
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TechCard from "../components/TechCard";

const Title = styled(Typography)({
  padding: '3rem 0 0'
});

const GridContainer = styled(Grid)({
  padding: '1.5rem min(2vw, .5rem)'
});

export default function Technology({data, pageContext: {topic}}) {
  const repos = data.repos.nodes;
  const items = repos.map((repo, index) => (
    <Grid xs={12} md={6} lg={4} key={repo.name}>
      <TechCard repo={repo} index={index} />
    </Grid>
  ));

  return (
    <Layout>
      <Container maxWidth="xl" disableGutters>
        <Title variant="h3" align="center">{topic}</Title>
        <GridContainer container columnSpacing={{xs:0, md:3}} rowSpacing={2} justifyContent="center" alignItems="stretch">
          <Suspense>{items}</Suspense>
        </GridContainer>
      </Container>
    </Layout>
  );
};

export const Head = ({pageContext: {topic}}) => (
  <SEO title={`Daniel Burkhardt - Portfolio Technology - ${topic}`}
    description={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Technology - ${topic}`}
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
