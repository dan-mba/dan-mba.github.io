import React from 'react';
import { Popover, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from "gatsby-theme-material-ui";

const useStyles = makeStyles({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    backgroundColor: 'transparent',
    margin: '.5rem 0'
  },
  typography: {
    color: '#fff',
    padding: '4px 8px',
    fontSize: '0.75rem',
    maxWidth: '300px',
    wordWrap: 'break-word',
    fontWeight: 400,
    lineHeight: '1.4em',
    borderRadius: '4px;',
    backgroundColor: 'rgba(97, 97, 97, 0.9)',
  }
});

export default function IconTooltip({buttonClass, icon, title, top, url}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton 
        aria-label="code repository"
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        classes={buttonClass ? {root: buttonClass} : {}}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {icon}
      </IconButton>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: top ? 'top' : 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: top ? 'bottom' : 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography className={classes.typography}>{title}</Typography>
      </Popover>
    </>
  );
}
