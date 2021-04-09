import React from "react";
import {Avatar, Chip, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "gatsby-theme-material-ui";
import {graphql} from "gatsby";
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

export default function Home({data}) {
  const classes = useStyles();
  const topics = data.repos.topics;

  topics.sort((a,b) => {
    if (b.totalCount - a.totalCount !== 0) {
      return b.totalCount - a.totalCount;
    }

    return a.fieldValue.localeCompare(b.fieldValue);
  })

  const items = topics.map((topic, index) => (
    <Link to={`/topics/${topic.fieldValue}`} key={index} className={`${classes.pointer} ${classes.chip}`}>
      <Chip color="secondary" variant="outlined" className={classes.pointer}
        label={topic.fieldValue} avatar={<Avatar>{topic.totalCount}</Avatar>}
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

export const pageQuery = graphql`
  query {
    repos: allRepo {
      topics: group(field: topics) {
        fieldValue
        totalCount
      }
    }
  }
`
