import React from "react";
import {Avatar, Chip, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "gatsby-theme-material-ui";
import {Helmet} from "react-helmet";
import Layout from "../components/Layout";

const useStyles = makeStyles(theme => ({
  grid: {
    padding: '5em 1em 2em',
    [theme.breakpoints.down('md')]: {
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
}));

export default function Home({pageContext: {topics}}) {
  const classes = useStyles();

  const items = topics.map((topic, index) => (
    <Grid item key={index} classes={{item: classes.gridItem}}>
      <Link to={`/topics/${topic.name}`} className={classes.pointer}>
        <Chip color="secondary" variant="outlined" classes={{root: `${classes.pointer} ${classes.chip}`}}
          label={topic.name} avatar={<Avatar>{topic.count}</Avatar>}
        />
      </Link>
    </Grid>
  ));

  return (
    <Layout>
      <Helmet>
        <title>{`Daniel Burkhardt - Portfolio Topics`}</title>
        <meta property="og:title" content={`Daniel Burkhardt - Portfolio Topics`}/>
        <meta name="description"
          content={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Topics`}
        />
        <meta name="og:description"
          content={`Software Development Portfolio Site for Daniel Burkhardt - Portfolio Topics`}
        />
      </Helmet>
      <Grid container justifyContent="center" alignItems="center" classes={{root: classes.grid}}>
        {items}
      </Grid>
    </Layout>
  );
};
