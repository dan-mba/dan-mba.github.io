import {Typography, Grid, Container} from "@mui/material";
import {graphql} from "gatsby";
import loadable from "@loadable/component";
import Layout from "../components/Layout";
import RepoCard from "../components/RepoCard";
import {layout, grid, title, linkArea} from "./portfolio.module.css";

const RepoPagination = loadable(() => import("../components/RepoPagination"));

export default function Portfolio({data, pageContext: {numberOfPages, humanPageNumber}}) {
  const repos = data.repos.nodes;
  const items = repos.map((repo, index) => (
    <Grid item xs={12} md={6} key={repo.name}>
      <RepoCard repo={repo} index={index}/>
    </Grid>
  ));

  return (
    <Layout title={`Daniel Burkhardt - Portfolio Page ${humanPageNumber}`}
      description={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Page ${humanPageNumber}`}
    >
      <Container maxWidth="xl" disableGutters className={layout}>
        <Typography variant="h3" align="center" className={title}>Portfolio</Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch" className={grid}>
          {items}
        </Grid>
        <div className={linkArea}>
          <RepoPagination page={humanPageNumber} count={numberOfPages} baseLink={'/portfolio'}/>
        </div>
      </Container>
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
              width: 572,
              layout: CONSTRAINED,
              placeholder: NONE,
              quality: 40,
              outputPixelDensities: [0.67, 0.75, 1, 1.25, 1.5, 1.75, 2]
            )
          }
        }
        url
      }
    }
  }
`
