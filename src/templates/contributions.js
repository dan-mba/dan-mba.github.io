import React from "react";
import {Typography, Grid, Container} from "@mui/material";
import {styled} from '@mui/material/styles'
import {graphql} from "gatsby";
import loadable from "@loadable/component";
import Layout from "../components/Layout";
import ContribCard from "../components/ContribCard";

const RepoPagination = loadable(() => import("../components/RepoPagination"));

const LayoutContainer = styled(Container)({
  padding: '0 min(2%, 1em)'
});

const GridContainer = styled(Grid)({
  padding: '2em 0'
});

const Title = styled(Typography)({
  padding: '1em 0 0'
});

const LinkArea = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '0 0 1em'
});


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
      <LayoutContainer maxWidth="xl" disableGutters>
        <Title variant="h3" align="center">Open Source Contributions</Title>
        <GridContainer container spacing={4} justifyContent="center" alignItems="stretch">
          {items}
        </GridContainer>
        {numberOfPages == 1 ? null :
          <LinkArea>
            <RepoPagination page={humanPageNumber} count={numberOfPages} baseLink={'/contributions'}/>
          </LinkArea>}
      </LayoutContainer>
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
        descriptionHTML
        name
        stargazerCount
        url
      }
    }
  }
`
