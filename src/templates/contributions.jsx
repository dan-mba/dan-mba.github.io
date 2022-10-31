import {Suspense} from "react";
import {Typography, Container} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {styled} from '@mui/material/styles'
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ContribCard from "../components/ContribCard";
import RepoPagination from "../components/RepoPagination";

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
    <Grid xs={12} md={6} key={repo.name}>
      <ContribCard repo={repo} index={index}/>
    </Grid>
  ));

  return (
    <Layout>
      <LayoutContainer maxWidth="xl" disableGutters>
        <Title variant="h3" align="center">Open Source Contributions</Title>
        <Suspense>
          <GridContainer container spacing={4} justifyContent="center" alignItems="stretch">
            {items}
          </GridContainer>
          {numberOfPages == 1 ? null :
            <LinkArea>
              <RepoPagination page={humanPageNumber} count={numberOfPages} baseLink={'/contributions'}/>
            </LinkArea>
          }
        </Suspense>
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
      sort: {fields: [totalContribs, sortName], order: [DESC, ASC]},
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
        stargazerPrint
        url
      }
    }
  }
`
