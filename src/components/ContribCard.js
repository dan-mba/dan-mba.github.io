import React from "react";
import {Badge, Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Code, StarOutlineRounded} from "@material-ui/icons";
import {Link} from "gatsby-theme-material-ui";
import IconTooltip from "./IconTooltip";
import theme from "../gatsby-theme-material-ui-top-layout/theme";

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '1em .25em .5em',
    marginLeft: '12px'
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
    marginLeft: '16px'
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
  },
 avatar:{
    alignSelf: 'start',
    marginRight: '28px'
  },
  badge: {
    fontSize: '0.9rem',
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  star: {
    fontSize: '48px'
  }
});

export default function ContribCard({repo}) {
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
          {
            root: classes.header,
            title: classes.title,
            subheader: classes.subheader,
            action: classes.action,
            avatar: classes.avatar,
          }
        }
        title={repo.name}
        titleTypographyProps={{align: 'center', variant: 'h5'}}
        subheader={cropString(repo.description)}
        subheaderTypographyProps={{align: 'center', color: 'secondary', variant: 'body1'}}
        action={
          <IconTooltip title="code repository" url={repo.url}
            icon={<Code/>} buttonClass={classes.button}
          />
        }
        avatar={
          <Badge badgeContent={repo.stargazerCount} max={9999}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            classes={{root: classes.badgeRoot, badge: classes.badge}}
            aria-label={`${repo.stargazerCount} stars`}
          >
            <StarOutlineRounded color="secondary" classes={{root: classes.star}}/>
          </Badge>
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
