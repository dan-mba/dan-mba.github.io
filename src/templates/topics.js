import React from "react";
import {Avatar, Chip, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "gatsby-theme-material-ui";
import {Helmet} from "react-helmet";
import Layout from "../components/Layout";

const useStyles = makeStyles({
  paper: {
    margin: '4px',
    padding: '8px',
    minHeight: '80vh',
    display: 'flex'
  },
  flexArea: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 'initial'
  },
  chip: {
    margin: '8px 6px'
  },
  pointer: {
    cursor: 'pointer'
  }
});

export default function Home({pageContext: {topics}}) {
  const classes = useStyles();

  const items = topics.map((topic, index) => (
    <Link to={`/topics/${topic.name}`} key={index} className={`${classes.pointer} ${classes.chip}`}>
      <Chip color="secondary" variant="outlined" className={classes.pointer}
        label={topic.name} avatar={<Avatar>{topic.count}</Avatar>}
      />
    </Link>
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
      <Paper classes={{root: classes.paper}}>
        <div className={classes.flexArea}>{items}</div>
      </Paper>
    </Layout>
  );
};
