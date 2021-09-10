import React from "react";
import {Card, CardActions, CardContent, CardHeader, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Code, Link as LinkIcon} from "@material-ui/icons";
import IconTooltip from "./IconTooltip";

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '1em .25em .5em'
  },
  subheader: {
    minHeight: '3em',
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
});

export default function RepoCard({repo}) {
  const classes = useStyles();

  return (
    <Card classes={{root: classes.root}}>
      <CardHeader
        classes={{root: classes.header, subheader: classes.subheader}}
        title={repo.name}
        titleTypographyProps={{align: 'center'}}
        subheader={repo.languages.map(l => `${l.name}: ${l.size}%`).join(', ')}
        subheaderTypographyProps={{align: 'center', color: 'secondary'}}
      />
      <CardContent classes={{root: classes.grow}}>
        <Typography variant="body1" align="center" className={classes.desc}>
          {repo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconTooltip title="code repository" buttonClass={classes.button}
          url={repo.url} icon={<Code/>}
        />
        {!repo.homepageUrl ? null:
          <IconTooltip title="demo site" buttonClass={classes.button}
            url={repo.homepageUrl} icon={<LinkIcon/>}
          />
        }
      </CardActions>
    </Card>
  );
}
