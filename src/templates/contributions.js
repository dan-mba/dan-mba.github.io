import {lazy, Suspense} from "react";
import {Typography, Grid, Container} from "@mui/material";
import {styled} from '@mui/material/styles'
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ContribCard from "../components/ContribCard";

const RepoPagination = lazy(() => import("../components/RepoPagination"));

const LayoutContainer = styled(Container)({
  padding: '0 min(2vw, 1rem)'
});

const GridContainer = styled(Grid)({
  padding: '1.5rem 0'
});

const Title = styled(Typography)({
  padding: '3rem 0 0'
});

const LinkArea = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '0 0 1rem'
});

export default function Contributions({data, pageContext: {numberOfPages, humanPageNumber}}) {
  const repos = data.repos.nodes;
  const items = repos.map((repo, index) => (
    <Grid item xs={12} md={6} key={repo.name}>
      <ContribCard repo={repo} index={index}/>
    </Grid>
  ));

  return (
    <Layout>
      <LayoutContainer maxWidth="xl" disableGutters>
        <Title variant="h3" align="center">Open Source Contributions</Title>
        <GridContainer container spacing={4} justifyContent="center" alignItems="stretch">
          {items}
        </GridContainer>
        {numberOfPages == 1 ? null :
          <LinkArea>
            <Suspense fallback={<div></div>}>
              <RepoPagination page={humanPageNumber} count={numberOfPages} baseLink={'/contributions'}/>
            </Suspense>
          </LinkArea>
        }
      </LayoutContainer>
    </Layout>
  );
};

export const Head = ({pageContext: {numberOfPages, humanPageNumber}}) => (
  <SEO title={`Daniel Burkhardt - Contributions${numberOfPages == 1 ? '' : ` Page ${humanPageNumber}`}`}
    description={`Software Development Portfolio Site for Daniel Burkhardt - Contributions${numberOfPages == 1 ? '' : ` Page ${humanPageNumber}`}`}
  />
)

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
