import React from "react";
import {AppBar, Toolbar, Typography, useMediaQuery} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import loadable from "@loadable/component";
import theme from "../gatsby-theme-material-ui-top-layout/theme";
import MobileMenu from "./MobileMenu";

const DesktopMenu = loadable(()=> import("./DesktopMenu"));

const useStyles = makeStyles({
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
});

export default function NavBar() {
  const classes = useStyles();

  return(
    <AppBar position="sticky" id="nav-bar">
      <Toolbar className={classes.toolbar} disableGutters>
        <Typography className={classes.handwriting} variant="h3">
          Dan
        </Typography>
        {useMediaQuery(theme.breakpoints.up('md')) ? <DesktopMenu/> : <MobileMenu/>}
      </Toolbar>
    </AppBar>
  );
};
