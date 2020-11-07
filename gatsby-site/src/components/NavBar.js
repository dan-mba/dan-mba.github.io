import React from "react";
import {AppBar, Hidden, Toolbar, Typography} from "@material-ui/core";
import {LinkedIn, GitHub} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton} from "gatsby-theme-material-ui"

const useStyles = makeStyles({
  toolbar: {
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
    padding: '0 1%'
  },
  buttonbar: {
    display: 'flex',
    justifyContent: 'right',
    flexGrow: 1
  }
})

export default function NavBar() {
  const classes = useStyles();

  return(
    <AppBar position="relative" id="nav-bar">
      <Toolbar className={classes.toolbar} disableGutters>
        <Typography variant="h4">
          Daniel Burkhardt
        </Typography>
        <Hidden mdDown>
          <div className={classes.buttonbar}>
            <IconButton color="inherit" href="https://github.com/dan-mba">
              <GitHub fontSize="large"/>
            </IconButton>
            <IconButton color="inherit"href="https://linkedin.com/danburkhardt">
              <LinkedIn fontSize="large" />
            </IconButton>
            </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
