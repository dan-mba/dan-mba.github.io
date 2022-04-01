import {Grid} from "@mui/material";
import {styled} from "@mui/material/styles";
import Layout from "../components/Layout";
import TopicChip from "../components/TopicChip";
import theme from "../gatsby-theme-material-ui-top-layout/theme";

const GridContainer = styled(Grid)({
  padding: '2em 1vw',
  margin: '0 auto',
  maxWidth: '90ch',
  [theme.breakpoints.up('lg')]: {
    padding: '4.5rem 1rem 2rem',
  }
});

export default function Topics({pageContext: {topics}}) {
  const items = topics.map((topic) => (
    <Grid item m={1} key={topic}>
      <TopicChip size="large" name={topic.name} count={topic.count}/>
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
