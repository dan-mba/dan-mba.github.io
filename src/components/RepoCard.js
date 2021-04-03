import React from "react";
import {Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Typography, Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Code, Link as LinkIcon} from "@material-ui/icons";
import {IconButton, Link} from "gatsby-theme-material-ui";
import {GatsbyImage, getImage} from "gatsby-plugin-image";

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
    flexDirection: 'column'
  },
  img: {
    maxHeight: '50vw',
    height: '240px',
  },
  desc: {
    margin: '5px 0',
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
      <CardMedia>
          <GatsbyImage
            image={getImage(repo.localImage)}
            alt={`${repo.name} image`}
            className={classes.img}
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
              <Link to={`/topics/${topic}`} className={classes.pointer}>
                <Chip color="secondary" variant="outlined" size="small"
                  label={topic} key={topic}
                  className={`${classes.topic} ${classes.pointer}`}
                />
              </Link>
            )
          })}
        </div>
      </CardContent>
      <CardActions>
        <Tooltip title="code repository">
          <IconButton 
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
