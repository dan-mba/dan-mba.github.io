/*
 * util/gridItems.jsx
 *
 * components usied in a grid to replicate the behaviorof  material-ui ListItem component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Link } from '@material-ui/core';
import ArrowIcon from '@material-ui/icons/ArrowRightRounded';

const useStyles = makeStyles({
  Root: {
    padding: '6px 0',
    width: '100%',
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  CodeRoot: {
    padding: '0',
    width: '100%',
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  WorkRoot: {
    padding: '2px 0',
  },
  Icon: {
    marginRight: '4px',
    minWidth: '32px',
    display: 'inline-flex',
    flexShrink: 0,
  },
  SmIcon: {
    marginRight: '4px',
    minWidth: '20px',
    display: 'inline-flex',
    flexShrink: 0,
  },
  Text: {
    padding: '0',
    margin: '0',
  },
  Type: {
    lineHeight: 1.1,
  },
});

export function GISmall(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.CodeRoot}>
      <span className={classes.SmIcon}>
        <ArrowIcon color="primary" fontSize="small" />
      </span>
      <span className={`${classes.Text} MuiTypography-body1`}>
        {children}
      </span>
    </div>
  );
}

GISmall.propTypes = {
  children: PropTypes.string.isRequired,
};

export function GIWithLink(props) {
  const { children, link } = props;
  const classes = useStyles();

  return (
    <div className={classes.CodeRoot}>
      <span className={classes.Icon}>
        <ArrowIcon color="primary" fontSize="small" />
      </span>
      <span className={`${classes.Text} ${classes.Type} MuiTypography-body1`}>
        <Link href={link} variant="inherit" target="_blank" rel="noopener noreferrer">
          {children}
        </Link>
      </span>
    </div>
  );
}

GIWithLink.propTypes = {
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
