import React from "react";
import {Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Link, Typography} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {Code, Link as LinkIcon} from "@mui/icons-material";
// use Link from reach router to avoid pre-fetching topics
import {Link as ReachLink} from "@gatsbyjs/reach-router";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import IconTooltip from "./IconTooltip";

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '1em 4px',
    height: '8em',
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  desc: {
    margin: '.5em 0 1em',
    flexGrow: 1
  },
  topicArea: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
  topic: {
    margin: '4px'
  },
  pointer: {
    cursor: 'pointer'
  }
});

export default function RepoCard({repo, index}) {
  const classes = useStyles();

  return (
    <Card classes={{root: classes.root}}>
      <CardHeader
        classes={{root: classes.header}}
        title={repo.name}
        titleTypographyProps={{align: 'center'}}
        subheader={repo.languages.map(l => `${l.name}: ${l.size}%`).join(', ')}
        subheaderTypographyProps={{align: 'center', color: 'secondary'}}
      />
      <CardMedia>
        <GatsbyImage
          image={getImage(repo.localImage)}
          alt={`${repo.name} image`}
          objectFit="contain"
          loading={
            /* Only use eager loading on first card for mobile performance */
            index===0 ? "eager" : "lazy"
          }
        />
      </CardMedia>
      <CardContent classes={{root: classes.grow}}>
        <Typography variant="body1" align="center" className={classes.desc}>
          {repo.description}
        </Typography>
        <div className={classes.topicArea}>
          {repo.topics.map(topic => {
            return (
              <Link to={`/topics/${topic}`} component={ReachLink}
                className={classes.pointer} key={topic}
              >
                <Chip color="secondary" variant="outlined" size="small"
                  label={topic} className={`${classes.topic} ${classes.pointer}`}
                />
              </Link>
            )
          })}
        </div>
      </CardContent>
      <CardActions>
        <IconTooltip top title="code repository" url={repo.url} icon={<Code/>}/>
        {!repo.homepageUrl ? null:
          <IconTooltip top title="demo site" url={repo.homepageUrl} icon={<LinkIcon/>}/>
        }
      </CardActions>
    </Card>
  );
}
