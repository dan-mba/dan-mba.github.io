import { Suspense } from "react";
import {Typography, Container} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {styled} from "@mui/material/styles";
import {graphql} from "gatsby";
import {getImage} from "gatsby-plugin-image";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import PreloadImage from "../components/PreloadImage";
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
    <Grid xs={12} lg={6} key={repo.name}>
      {index === 0 ? 
        <RepoCard repo={repo} index={index}/> :  
        <Suspense>
          <RepoCard repo={repo} index={index}/>
        </Suspense>
      }
    </Grid>
  ));

  return (
    <Layout>
      <LayoutContainer maxWidth="xl" disableGutters>
        <Title variant="h3" align="center">Personal Projects</Title>
        <GridContainer container columnSpacing={{xs:0, lg:4}} rowSpacing={4} justifyContent="center" alignItems="stretch">
          {items}
        </GridContainer>
        <LinkArea>
          <RepoPagination page={humanPageNumber} count={numberOfPages} baseLink={'/projects'}/>
        </LinkArea>
      </LayoutContainer>
    </Layout>
  );
};

export const Head = ({data, pageContext: {humanPageNumber}}) => {
  const repo = data.repos.nodes[0];
  const image = getImage(repo.localImage);
  return (
    <SEO title={`Daniel Burkhardt - Projects Page ${humanPageNumber}`}
      description={`Software Development Portfolio Site for Daniel Burkhardt - Projects Page ${humanPageNumber}`}
    >
      <PreloadImage image={image} />
    </SEO>
  )
}

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    repos: allRepo(
      sort: [{isPinned: DESC}, {pushedAt: DESC}]
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
