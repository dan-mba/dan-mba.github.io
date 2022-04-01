import {Avatar, Chip, Grid, Link} from "@mui/material";
import {styled} from "@mui/material/styles";
// Use Link from reach-router to prevent gatsby preloading all links
import {Link as ReachLink} from "@gatsbyjs/reach-router";
import Layout from "../components/Layout";
import theme from "../gatsby-theme-material-ui-top-layout/theme"

const GridContainer = styled(Grid)({
  padding: '2em 1vw',
  margin: '0 auto',
  maxWidth: '90ch',
  [theme.breakpoints.up('lg')]: {
    padding: '5rem 1rem 2rem',
  }
});

export default function Topics({pageContext: {topics}}) {
  const items = topics.map((topic) => (
    <Grid item m={1} key={topic}>
      <Link to={`/topics/${topic.name}/`} style={{cursor: 'pointer'}}
        underline="none" component={ReachLink}
      >
        <Chip color="secondary" variant="outlined" label={topic.name} size="large"
          avatar={<Avatar>{topic.count}</Avatar>} style={{cursor: 'pointer'}}
        />
      </Link>
    </Grid>
  ));

  return (
    <Layout title={`Daniel Burkhardt - Portfolio Topics`}
      description={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Topics`}
    >
      <GridContainer container justifyContent="center" alignItems="center">
        {items}
      </GridContainer>
    </Layout>
  );
};
