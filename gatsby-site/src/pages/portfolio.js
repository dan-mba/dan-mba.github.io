import React from "react";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {graphql} from "gatsby";
import Layout from "../components/Layout";

const useStyles = makeStyles({
  paper: {
    margin: '4px',
    padding: '8px'
  }
});

export default function Home({data}) {
  const classes = useStyles();
  const repos = data.github.user.repositories.nodes;
  const items = repos.map(repo => (
    <li>{repo.name}</li>
  ));

  return (
    <Layout>
      <Paper className={classes.paper}>
        <ul>{items}</ul>
      </Paper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query PortfolioPage {
    github {
      user(login: "dan-mba") {
        repositories(first: 100) {
          nodes {
            name
          }
        }
      }
    }
  }
`
