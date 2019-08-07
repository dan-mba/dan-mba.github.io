/*
 * Tabs/SchoolTab.js
 *
 * The SchoolTab component is displayed on the /education route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardMedia, CardContent, Link, Typography, CardActions, withStyles }
  from '@material-ui/core';

import butlerImg from '../img/ablsocialmediabadge_general.png';
import purdueImg from '../img/engineering_logo.png';

const styles = {
  root: {
    padding: '75px 0 10px',
    margin: '0 auto',
    width: '98%',
  },
  media: {
    width: '150px',
    margin: '0 auto',
  },
  cardContent: {
    padding: '12px 8px 0',
    textAlign: 'center',
  },
  card: {
    paddingTop: '12px',
  },
  title: {
    fontSize: '1.1rem',
    lineHeight: '1.3',
    fontWeight: '500',
  },
  subtitle: {
    fontSize: '1rem',
    lineHeight: '1.3',
  },
  link: {
    margin: '0 auto',
    fontWeight: '300',
  },
};

const School = ({ university, location, degree, subject, date, img, errimg, link, classes }) => (
  <Grid item sm={10} md={8} lg={5}>
    <Card className={classes.card}>
      <CardMedia
        component="img"
        alt={university}
        image={img}
        onError={(e) => { e.target.onerror = null; e.target.src = errimg; }}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" className={classes.title}>
          {degree}
          <br />
          {subject}
        </Typography>
        <Typography variant="h5" className={classes.subtitle}>
          {`${university} - ${location}`}
          <br />
          {date}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          underline="none"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
          variant="button"
          color="secondary"
        >
          {`Visit ${university} Website`}
        </Link>
      </CardActions>
    </Card>
  </Grid>
);

School.propTypes = {
  university: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  errimg: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const SchoolTab = ({ classes }) => (
  <Grid
    container
    spacing={1}
    justify="space-evenly"
    className={classes.root}
  >
    <School
      university="Butler University"
      location="Indianapolis, IN"
      degree="Master of Business Administration"
      subject="Finance"
      date="August 2008"
      img={butlerImg}
      errimg="https://www.butler.edu/sites/default/files/ablsocialmediabadge_general.png"
      link="https://www.butler.edu/mba"
      classes={classes}
    />
    <School
      university="Purdue University"
      location="West Lafayette, IN"
      degree="Bachelor of Science"
      subject="Computer Engineering"
      date="May 1997"
      img={purdueImg}
      errimg="https://engineering.purdue.edu/~prism/images/sm_logo.jpg"
      link="https://engineering.purdue.edu/ECE"
      classes={classes}
    />
  </Grid>
);

SchoolTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SchoolTab);
