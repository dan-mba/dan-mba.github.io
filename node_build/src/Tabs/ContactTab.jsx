/* eslint-disable prefer-template */
/*
 * Tabs/ContactTab.js
 *
 * The ContactTab component is displayed on the /contact route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardMedia, CardContent, CardActions, Chip, Link, Typography, withStyles }
  from '@material-ui/core';
import mapImg from '../img/map.png';

const styles = {
  root: {
    padding: '75px 0 10px',
    minHeight: '100vh',
    width: '98%',
    margin: '0 auto',
  },
  card: {
    padding: '8px 1%',
  },
  body: {
    padding: '8px 0',
  },
  img: {
    height: '200px',
    width: '200px',
    margin: '0 auto',
  },
  content: {
    padding: '16px 4px',
  },
  chipBox: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '1%',
    fontWeight: '500',
  },
  link: {
    margin: '0 auto',
  },
};

export const ContactTab = ({ classes }) => (
  <Grid
    id="contact-tab"
    container
    spacing={1}
    justify="center"
    className={classes.root}
  >
    <Grid item sm={12} lg={11}>
      <Card className={classes.card}>
        <CardMedia image={mapImg} className={classes.img} />
        <CardContent>
          <Typography variant="body1" className={classes.body}>
            <span style={{ textAlign: 'center', display: 'block' }}>
              I currently reside in southern Broward County Florida.
            </span>
            <br />
            I would be interested in hearing about opportunities in South or Central Florida,
            including these markets:
          </Typography>
          <div className={classes.chipBox}>
            {['Fort Lauderdale', 'Miami', 'West Palm Beach', 'Fort Myers', 'Tampa', 'Orlando'].map(
              (city) => (
                <Chip label={city} key={city} color="secondary" className={classes.chip} />
              ),
            )}
          </div>
        </CardContent>
        <CardActions>
          <Link
            underline="none"
            href="https://www.linkedin.com/in/danburkhardt"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
            variant="button"
            color="secondary"
          >
            Contact me on LinkedIn
          </Link>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
);

ContactTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactTab);
