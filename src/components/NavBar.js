import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const useStyles = makeStyles(theme => ({
  toolbar: {
    maxWidth: theme.breakpoints.values.xl,
    margin: '0 auto',
    width: '100%',
    padding: '0 1%'
  },
  handwriting: {
    fontFamily: '"Damion", cursive',
    paddingLeft: '12px'
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return(
    <AppBar position="relative" id="nav-bar">
      <Toolbar className={classes.toolbar} disableGutters>
        <Typography className={classes.handwriting} variant="h3">
          Dan
        </Typography>
        <DesktopMenu />
        <MobileMenu />
      </Toolbar>
    </AppBar>
  );
};
