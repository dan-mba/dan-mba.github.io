import React from "react";
import {Card, CardActions, CardContent, CardHeader, Typography, Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Code, Link as LinkIcon} from "@material-ui/icons";
import {IconButton} from "gatsby-theme-material-ui";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '16px 4px'
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '0 16px'
  },
  desc: {
    margin: 0,
    flexGrow: 1
  },
  button: {
    padding: '0 12px 6px'
  }
}));

export default function RepoCard({repo, index}) {
  const classes = useStyles();

  return (
    <Card classes={{root: classes.root}}>
      <CardHeader
        classes={{root: classes.header}}
        title={repo.name}
        titleTypographyProps={{align: 'center'}}
        subheader={repo.languages.map(l => `${l.name}: ${l.size}%`).join(', ')}
        subheaderTypographyProps={{align: 'center'}}
      />
      <CardContent classes={{root: classes.grow}}>
        <Typography variant="body1" align="center" className={classes.desc}>
          {repo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="code repository">
          <IconButton
            classes={{root: classes.button}}
            aria-label="code repository"
            href={repo.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Code />
          </IconButton>
        </Tooltip>
        {!repo.homepageUrl ? null:
          <Tooltip title="demo site">
            <IconButton
              classes={{root: classes.button}}
              aria-label="demo site"
              href={repo.homepageUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <LinkIcon />
            </IconButton>
          </Tooltip>
        }
      </CardActions>
    </Card>
  );
}
