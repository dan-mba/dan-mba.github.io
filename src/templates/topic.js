import {Typography, Grid, Container} from "@mui/material";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import TopicCard from "../components/TopicCard";
import {title, container} from "./topic.module.css";

export default function Topic({data, pageContext: {topic}}) {
  const repos = data.repos.nodes;
  const items = repos.map((repo, index) => (
    <Grid item xs={12} md={6} lg={4} key={repo.name}>
      <TopicCard repo={repo} index={index} />
    </Grid>
  ));

  return (
    <Layout title={`Daniel Burkhardt - Portfolio Topic - ${topic}`}
      description={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Topics - ${topic}`}
    >
      <Container maxWidth="xl" disableGutters>
        <Typography variant="h3" align="center" className={title}>{topic}</Typography>
        <Grid container columnSpacing={3} rowSpacing={2} justifyContent="center" alignItems="stretch" className={container}>
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
