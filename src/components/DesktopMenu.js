import React from "react";
import {Typography, Popover, Paper, Button, MenuList, MenuItem} from "@material-ui/core";
import {LinkedIn, GitHub} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {decomposeColor, recomposeColor, hexToRgb, rgbToHex} from "@material-ui/core/styles/colorManipulator"
import {IconButton, Link} from "gatsby-theme-material-ui";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import theme from "../gatsby-theme-material-ui-top-layout/theme";

const fullBlue = (color) => {
  const sec = decomposeColor(color[0] === '#' ? hexToRgb(color) : color);
  const blue = 255 - sec.values[2];
  for(let i = 0; i < sec.values.length; i++) {
    sec.values[i] += blue;
  }
  return rgbToHex(recomposeColor(sec));
}

const useStyles = makeStyles({
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
});

export default function DesktopMenu() {
  const classes = useStyles();
  
  return(
    <div className={classes.linkBar}>
      <Link to="/" color="inherit" underline="none" className={`${classes.linkItem} ${classes.hover}`}>
        <Typography variant="h5">About</Typography>
      </Link>
      <PopupState variant="popover" popupId="portfolio-menu">
        {(popupState) => (
          <>
            <Button
              color="inherit" size="large"
              aria-haspopup="true"
              {...bindTrigger(popupState)}
              classes={{root: `${classes.buttonStyle} ${classes.hover}`}}
            >
              Portfolio
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Paper classes={{root: classes.paper}}>
                <MenuList autoFocusItem={popupState.isOpen} id="menu-list-grow">
                  <MenuItem component={Link} to="/portfolio" underline="none">
                    <Typography variant="h6" classes={{root: `${classes.menuFont} ${classes.hover}`}}>
                      Projects
                    </Typography>
                  </MenuItem>
                  <MenuItem component={Link} to="/topics" underline="none">
                    <Typography variant="h6" classes={{root: `${classes.menuFont} ${classes.hover}`}}>
                      Topics
                    </Typography>
                  </MenuItem>
                  <MenuItem component={Link} to="/contributions" underline="none">
                    <Typography variant="h6" classes={{root: `${classes.menuFont} ${classes.hover}`}}>
                      Contributions
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Paper>
            </Popover>
          </>
        )}
      </PopupState>
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
