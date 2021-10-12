import React from "react";
import {Avatar, Chip, Grid, Link} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
// Use Link from reach-router to prevent gatsby preloading all links
import {Link as ReachLink} from "@gatsbyjs/reach-router";
import Layout from "../components/Layout";
import theme from "../gatsby-theme-material-ui-top-layout/theme"

const useStyles = makeStyles({
  grid: {
    padding: '5em 1em 2em',
    [theme.breakpoints.down('lg')]: {
      padding: '2em 2%'
    },
    display: 'flex',
    margin: '0 auto',
    maxWidth: '90ch'
  },
  gridItem: {
    margin: '.5em'
  },
  chip: {
    fontSize: '1em',
  },
  pointer: {
    cursor: 'pointer'
  }
});

export default function Home({pageContext: {topics}}) {
  const classes = useStyles();

  const items = topics.map((topic, index) => (
    <Grid item key={index} classes={{item: classes.gridItem}}>
      <Link to={`/topics/${topic.name}`} className={classes.pointer} component={ReachLink}>
        <Chip color="secondary" variant="outlined" classes={{root: `${classes.pointer} ${classes.chip}`}}
          label={topic.name} avatar={<Avatar>{topic.count}</Avatar>}
        />
      </Link>
    </Grid>
  ));

  return (
    <Layout title={`Daniel Burkhardt - Portfolio Topics`}
      description={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Topics`}
    >
      <Grid container justifyContent="center" alignItems="center" classes={{root: classes.grid}}>
        {items}
      </Grid>
    </Layout>
  );
};
