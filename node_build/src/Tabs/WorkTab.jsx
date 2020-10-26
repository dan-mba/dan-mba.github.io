/* eslint react/jsx-curly-brace-presence: 0 */
/*
 * Tabs/WorkTab.js
 *
 * The WorlTab component is displayed on the /experience route
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardActions, CardContent, Collapse, IconButton,
  Typography, Avatar, Grid, List, withStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LItem } from '../util/ListItems';
import { JOBS } from '../config/jobs';
import styles from './WorkTabStyles';

/* eslint-disable-next-line  max-len */
const Job = ({ title, subtitle, employer, dates, image, errimg, description, details, classes }) => {
  const [expanded, toggleExpanded] = useState(false);

  return (
    <Grid item sm={12} lg={10}>
      <Card>
        <CardHeader
          className={classes.header}
          classes={{
            title: classes.title,
            subheader: classes.subheader,
            avatar: classes.avatarRoot,
            content: classes.content,
          }}
          avatar={(
            <Avatar
              alt={title}
              src={image.default}
              data-img={errimg}
              className={classes.avatar}
            />
          )}
          title={!subtitle ? title : (
            <span>
              {title}
              <br />
              {subtitle}
            </span>
          )}
          titleTypographyProps={{ variant: 'h5' }}
          subheader={(
            <span>
              {employer}
              <br />
              {dates}
            </span>
          )}
          subheaderTypographyProps={{ variant: 'h5' }}
        />
        <CardActions>
          <Typography variant="h5" className={classes.jobDescription}>
            {description}
          </Typography>
          <IconButton
            className={!expanded ? classes.expand : classes.expandOpen}
            onClick={() => toggleExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {details.map((detail, index) => {
              if (index === 0) {
                return (
                  <Typography variant="body1" paragraph key={`detail-${index}`}>{detail}</Typography>
                );
              }
              if (typeof (detail) === 'string') {
                return (
                  <Typography variant="body1" key={`detail-${index}`}>{detail}</Typography>
                );
              }
              return (
                <span key={`detail-${index}`}>
                  <Typography variant="body1">{detail.title}</Typography>
                  <List className={classes.list}>
                    {detail.list.map((item, listIndex) => (
                      <LItem key={`list-${listIndex}`}>{item}</LItem>
                    ))}
                  </List>
                </span>
              );
            })}
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

Job.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  employer: PropTypes.string.isRequired,
  dates: PropTypes.string.isRequired,
  errimg: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  details: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export const WorkTab = ({ classes }) => (
  <Grid container spacing={2} justify="center" className={classes.root} id="work-tab">
    {JOBS.map((job, index) => <Job {...job} classes={classes} key={index} />)}
  </Grid>
);

WorkTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkTab);
