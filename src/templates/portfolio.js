import React from "react";
import {Typography, Grid, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {graphql} from "gatsby";
import loadable from "@loadable/component";
import Layout from "../components/Layout";
import theme from "../gatsby-theme-material-ui-top-layout/theme";
import RepoCard from "../components/RepoCard";

const RepoPagination = loadable(() => import("../components/RepoPagination"));

const useStyles = makeStyles({
  container: {
    padding: '0 min(2%, 1em)'
  },
  gridContainer: {
    padding: '2em 0'
  },
  gridItem: {
    paddingTop: '1em',
    paddingBottom: '1em'
  },
  gridLeft: {
    [theme.breakpoints.up('md')]: {
      paddingRight: '1em'
    }
  },
  gridRight: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '1em'
    }
  },
  title: {
    padding: '1em 0 0'
  },
  linkArea: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 0 1em'
  }
});

export default function Home({data, pageContext: {numberOfPages, humanPageNumber}}) {
  const classes = useStyles();
  const repos = data.repos.nodes;
  const items = repos.map((repo, index) => (
    <Grid item xs={12} md={6} key={repo.name} classes={{
      item: `${classes.gridItem} ${index%2===0 ? classes.gridLeft : classes.gridRight}`
    }}>
      <RepoCard repo={repo} index={index}/>
    </Grid>
  ));

  return (
    <Layout title={`Daniel Burkhardt - Portfolio Page ${humanPageNumber}`}
      description={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Page ${humanPageNumber}`}
    >
      <Container maxWidth="xl" disableGutters className={classes.container}>
        <Typography variant="h3" align="center" className={classes.title}>Portfolio</Typography>
        <Grid container justifyContent="center" alignItems="stretch" classes={{container: classes.gridContainer}}>
          {items}
        </Grid>
        <div className={classes.linkArea}>
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
