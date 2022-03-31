import {Typography, Grid, Container} from "@mui/material";
import {graphql} from "gatsby";
import loadable from "@loadable/component";
import Layout from "../components/Layout";
import ContribCard from "../components/ContribCard";
import {layout, grid, title, linkArea} from "./portfolio.module.css";

const RepoPagination = loadable(() => import("../components/RepoPagination"));


export default function Contributions({data, pageContext: {numberOfPages, humanPageNumber}}) {
  const repos = data.repos.nodes;
  const items = repos.map((repo, index) => (
    <Grid item xs={12} md={6} key={repo.name}>
      <ContribCard repo={repo} index={index}/>
    </Grid>
  ));

  return (
    <Layout title={`Daniel Burkhardt - Contributions`}
      description={`Software Development Portfolio Site for Daniel Burkhardt - Contributions`}
    >
      <Container maxWidth="xl" disableGutters className={layout}>
        <Typography variant="h3" align="center" className={title}>Open Source Contributions</Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch" className={grid}>
          {items}
        </Grid>
        {numberOfPages == 1 ? null :
          <div className={linkArea}>
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
        descriptionEmoji
        name
        stargazerCount
        url
      }
    }
  }
`
