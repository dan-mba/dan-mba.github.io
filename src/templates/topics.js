import {Avatar, Chip, Grid, Link} from "@mui/material";
// Use Link from reach-router to prevent gatsby preloading all links
import {Link as ReachLink} from "@gatsbyjs/reach-router";
import Layout from "../components/Layout";
import {container, item, link, chip} from "./topics.module.css";


export default function Topics({pageContext: {topics}}) {
  const items = topics.map((topic, index) => (
    <Grid item key={index} className={item}>
      <Link to={`/topics/${topic.name}`} underline="none" component={ReachLink} className={link}>
        <Chip color="secondary" variant="outlined" label={topic.name} className={chip}
          avatar={<Avatar>{topic.count}</Avatar>}
        />
      </Link>
    </Grid>
  ));

  return (
    <Layout title={`Daniel Burkhardt - Portfolio Topics`}
      description={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Topics`}
    >
      <Grid container justifyContent="center" alignItems="center" className={container}>
        {items}
      </Grid>
    </Layout>
  );
};
