import React from "react";
import {Card, CardContent, CardHeader, Typography, Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Code} from "@material-ui/icons";
import {IconButton, Link} from "gatsby-theme-material-ui";

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '1em .25em .5em',
    marginLeft: '36px'
  },
  title: {
    marginBottom: '.5em',
    fontWeight: '500'
  },
  subheader: {
    minHeight: '4.5em',
  },
  action: {
    margin: 0,
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '0 16px'
  },
  contribSpacer: {
    marginBottom: '1.5em'
  },
  button: {
    padding: '0 12px 6px'
  }
});

export default function RepoCard({repo}) {
  const classes = useStyles();

  const cropString = (str) => {
    if (str.length > 80) {
      const word = str.substring(80).indexOf(' ');
      if (word < 0) {
        return str;
      }

      return `${str.substring(0, 80+word)}...`;
    }
    return str;
  }

  return (
    <Card classes={{root: classes.root}}>
      <CardHeader
        classes={
          {root: classes.header, title: classes.title, subheader: classes.subheader, action: classes.action}
        }
        title={repo.name}
        titleTypographyProps={{align: 'center'}}
        subheader={cropString(repo.description)}
        subheaderTypographyProps={{align: 'center', color: 'secondary'}}
        action={
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
        }
        />
      <CardContent classes={{root: classes.grow}}>
        {!repo.contributionPrs ? null : 
          <div>
            <Typography variant="h6" align="center">Pull Requests</Typography>
            {repo.contributionPrs.map((r,i) => (
              <Link key={i} underline="hover" href={r.url}
              target="_blank" rel="noreferrer noopener"
              >
                <Typography variant="body1">
                  {r.title}
                </Typography>
              </Link>
            ))}
          </div>
        }
        {repo.contributionPrs && repo.contributionIssues ?
          <div className={classes.contribSpacer}></div> : null
        }
        {!repo.contributionIssues ? null : 
          <div>
            <Typography variant="h6" align="center">Issues</Typography>
            {repo.contributionIssues.map((r,i) => (
              <Link key={i} underline="hover" href={r.url}
                target="_blank" rel="noreferrer noopener"
              >
                <Typography variant="body1">
                  {r.title}
                </Typography>
              </Link>
            ))}
          </div>
        }
      </CardContent>
    </Card>
  );
}
