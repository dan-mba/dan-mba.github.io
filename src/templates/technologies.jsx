import {Suspense} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {styled} from "@mui/material/styles";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import TechChip from "../components/TechChip";

const GridContainer = styled(Grid)(({theme}) => ({
  padding: '2rem 1vw',
  margin: '0 auto',
  maxWidth: '90ch',
  [theme.breakpoints.up('lg')]: {
    padding: '4.5rem 1rem 2rem',
  }
}));

export default function Technologies({pageContext: {topics}}) {
  const items = topics.map((topic) => (
    <Grid m={0.5} key={topic.name}>
      <TechChip size="large" name={topic.name} count={topic.count}/>
    </Grid>
  ));

  return (
    <Layout>
      <Suspense>
        <GridContainer container justifyContent="center" alignItems="center">
          {items}
        </GridContainer>
      </Suspense>
    </Layout>
  );
};

export const Head = () => (
  <SEO title={`Daniel Burkhardt - Portfolio Technologies`}
    description={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Technologies`}
  />
)
