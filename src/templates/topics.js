import {Avatar, Chip, Grid, Link} from "@mui/material";
import {styled} from "@mui/material/styles";
// Use Link from reach-router to prevent gatsby preloading all links
import {Link as ReachLink} from "@gatsbyjs/reach-router";
import Layout from "../components/Layout";
import theme from "../gatsby-theme-material-ui-top-layout/theme"


const GridContainer = styled(Grid)({
  padding: '5em 1em 2em',
  display: 'flex',
  margin: '0 auto',
  maxWidth: '90ch',
  [theme.breakpoints.down('lg')]: {
    padding: '2em 2%'
  }
});

const GridItem = styled(Grid)({
  margin: '.5em'
});

const TopicLink = styled(Link)({
  cursor: 'pointer'
});

const TopicChip = styled(Chip)({
  fontSize: '1em',
  cursor: 'pointer'
});

export default function Topics({pageContext: {topics}}) {
  const items = topics.map((topic, index) => (
    <GridItem item key={index}>
      <TopicLink to={`/topics/${topic.name}/`} underline="none" component={ReachLink}>
        <TopicChip color="secondary" variant="outlined" label={topic.name}
          avatar={<Avatar>{topic.count}</Avatar>}
        />
      </TopicLink>
    </GridItem>
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
