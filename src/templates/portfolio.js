import {Typography, Grid, Container} from "@mui/material";
import {styled} from "@mui/material/styles";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import RepoCard from "../components/RepoCard";
import RepoPagination from "../components/RepoPagination";

const LayoutContainer = styled(Container)({
  padding: '0 min(2vw, 1rem)'
});

const GridContainer = styled(Grid)({
  padding: '1.5rem 0',
});

const Title = styled(Typography)({
  padding: '3rem 0 0'
});

const LinkArea = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '0 0 1rem'
});

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
      <LayoutContainer maxWidth="xl" disableGutters>
        <Title variant="h3" align="center">Portfolio</Title>
        <GridContainer container spacing={4} justifyContent="center" alignItems="stretch">
          {items}
        </GridContainer>
        <LinkArea>
          <RepoPagination page={humanPageNumber} count={numberOfPages} baseLink={'/portfolio'}/>
        </LinkArea>
      </LayoutContainer>
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
              outputPixelDensities: [1, 1.125, 1.25, 1.375, 1.5, 1.625, 1.75, 1.875, 2]
            )
          }
        }
        url
      }
    }
  }
`
