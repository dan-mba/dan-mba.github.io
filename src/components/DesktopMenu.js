import React, {useRef, useEffect, useState} from "react";
import {Typography, Popper, Grow, Paper,Button, ClickAwayListener, MenuList, MenuItem} from "@material-ui/core"
import {LinkedIn, GitHub} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {decomposeColor, recomposeColor, hexToRgb, rgbToHex} from "@material-ui/core/styles/colorManipulator"
import {IconButton, Link} from "gatsby-theme-material-ui";

const fullBlue = (color) => {
  const sec = decomposeColor(color[0] === '#' ? hexToRgb(color) : color);
  const blue = 255 - sec.values[2];
  for(let i = 0; i < sec.values.length; i++) {
    sec.values[i] += blue;
  }
  return rgbToHex(recomposeColor(sec));
}

const useStyles = makeStyles(theme => ({
  linkBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1
  },
  linkItem: {
    padding: '16px 12px 8px',
  },
  hover: {
    '&:hover': {
      color: fullBlue(theme.palette.secondary.main)
    }
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  buttonStyle: {
    textTransform: 'none',
    lineHeight: 1.334,
    fontSize: '1.5rem',
    fontWeight: 400,
    padding: '16px 12px 8px'
  },
  menuFont: {
    fontWeight: 400
  }
}));

export default function DesktopMenu() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return(
    <div className={classes.linkBar}>
      <Link to="/" color="inherit" underline="none" className={`${classes.linkItem} ${classes.hover}`}>
        <Typography variant="h5">About</Typography>
      </Link>
      <Button
        ref={anchorRef} color="inherit" size="large"
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        classes={{root: `${classes.buttonStyle} ${classes.hover}`}}
      >
        Portfolio
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper classes={{root: classes.paper}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem component={Link} to="/portfolio" underline="none" onClick={handleClose}>
                    <Typography variant="h6" classes={{root: `${classes.menuFont} ${classes.hover}`}}>
                      Projects
                    </Typography>
                  </MenuItem>
                  <MenuItem component={Link} to="/topics" underline="none" onClick={handleClose}>
                    <Typography variant="h6" classes={{root: `${classes.menuFont} ${classes.hover}`}}>
                      Topics
                    </Typography>
                  </MenuItem>
                  <MenuItem component={Link} to="/contributions" underline="none" onClick={handleClose}>
                    <Typography variant="h6" classes={{root: `${classes.menuFont} ${classes.hover}`}}>
                      Contributions
                    </Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <IconButton
        color="inherit"
        aria-label="GitHub"
        href="https://github.com/dan-mba"
        target="_blank"
        rel="noreferrer noopener"
        className={classes.hover}
      >
        <GitHub fontSize="large"/>
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="LinkedIn"
        href="https://linkedin.com/danburkhardt"
        target="_blank"
        rel="noreferrer noopener"
        className={classes.hover}
      >
        <LinkedIn fontSize="large" />
      </IconButton>
    </div>
  );
}
