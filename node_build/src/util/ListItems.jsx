/*
 * util/ListItems.jsx
 *
 * a collection of components wrapping the material-ui ListItem component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText, Link, makeStyles } from '@material-ui/core';
import ArrowIcon from '@material-ui/icons/ArrowRightRounded';
import BigArrowIcon from '@material-ui/icons/ArrowForwardIosRounded';

const useStyles = makeStyles({
  liRoot: {
    padding: '6px 0',
  },
  liCodeRoot: {
    padding: '0',
  },
  liWorkRoot: {
    padding: '2px 0',
  },
  liIcon: {
    marginRight: '4px',
    minWidth: '32px',
  },
  liSmIcon: {
    marginRight: '4px',
    minWidth: '20px',
  },
  liText: {
    padding: '0',
    margin: '0',
  },
  liType: {
    lineHeight: 1.1,
  },
});

export function LINoLink(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <ListItem disableGutters className={classes.liRoot}>
      <ListItemIcon className={classes.liIcon}>
        <BigArrowIcon color="primary" />
      </ListItemIcon>
      <ListItemText className={classes.liText}>
        {children}
      </ListItemText>
    </ListItem>
  );
}

LINoLink.propTypes = {
  children: PropTypes.string.isRequired,
};

export function LISmall(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <ListItem disableGutters className={classes.liCodeRoot}>
      <ListItemIcon className={classes.liSmIcon}>
        <ArrowIcon color="primary" fontSize="small" />
      </ListItemIcon>
      <ListItemText className={classes.liText}>
        {children}
      </ListItemText>
    </ListItem>
  );
}

LISmall.propTypes = {
  children: PropTypes.string.isRequired,
};

export function LItem(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <ListItem disableGutters className={classes.liWorkRoot}>
      <ListItemIcon className={classes.liIcon}>
        <ArrowIcon color="primary" />
      </ListItemIcon>
      <ListItemText className={classes.liText}>
        {children}
      </ListItemText>
    </ListItem>
  );
}

LItem.propTypes = {
  children: PropTypes.string.isRequired,
};

export function LIWithLink(props) {
  const { children, link } = props;
  const classes = useStyles();

  return (
    <ListItem disableGutters className={classes.liCodeRoot}>
      <ListItemIcon className={classes.liIcon}>
        <ArrowIcon color="primary" fontSize="small" />
      </ListItemIcon>
      <ListItemText classes={{ root: classes.liText, primary: classes.liType }}>
        <Link href={link} variant="inherit" target="_blank" rel="noopener noreferrer">
          {children}
        </Link>
      </ListItemText>
    </ListItem>
  );
}

LIWithLink.propTypes = {
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
