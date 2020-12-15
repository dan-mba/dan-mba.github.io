import React, {useState} from "react";
import {AppBar, Hidden, Toolbar, Typography, Menu, MenuItem} from "@material-ui/core";
import {LinkedIn, GitHub, Home, Code, Menu as MenuIcon} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton, Link} from "gatsby-theme-material-ui";

const useStyles = makeStyles({
  toolbar: {
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
    padding: '0 1%'
  },
  handwriting: {
    fontFamily: '"Damion", cursive',
    paddingLeft: '12px'
  },
  linkbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1
  },
  linkitem: {
    padding: '16px 12px 8px'
  },
  iconRoot: {
    flexDirection: 'column'
  },
  menuIconText: {
    fontSize: '.9rem'
  },
  menuText: {
    flexGrow: 1,
    textAlign: 'right',
    paddingLeft: '2rem'
  }
})

export default function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = (event) => {
    setAnchorEl(null);
  }

  return(
    <AppBar position="relative" id="nav-bar">
      <Toolbar className={classes.toolbar} disableGutters>
        <Typography className={classes.handwriting} variant="h3">
          Dan
        </Typography>
        <Hidden mdDown>
          <div className={classes.linkbar}>
            <Link to="/" color="inherit" underline="none" className={classes.linkitem}>
              <Typography variant="h5">About</Typography>
            </Link>
            <Link to="/portfolio" color="inherit" underline="none" className={classes.linkitem}>
              <Typography variant="h5">Portfolio</Typography>
            </Link>
            <IconButton
              color="inherit"
              aria-label="GitHub"
              href="https://github.com/dan-mba"
              target="_blank"
              rel="noreferrer noopener"
            >
              <GitHub fontSize="large"/>
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="LinkedIn"
              href="https://linkedin.com/danburkhardt"
              target="_blank"
              rel="noreferrer noopener"
            >
              <LinkedIn fontSize="large" />
            </IconButton>
            </div>
        </Hidden>
        <Hidden lgUp>
          <div className={classes.linkbar}>
            <IconButton
              color="inherit"
              aria-controls="menu-dropdown"
              aria-haspopup="menu"
              disableRipple
              classes={{label: classes.iconRoot}}
              onClick={handleClick}
            >
              <MenuIcon />
              <div className={classes.menuIconText}>Menu</div>
            </IconButton>
          </div>
          <Menu
            id="menu-dropdown"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/" color="inherit" underline="none">
              <Home />
              <Typography variant="h5" className={classes.menuText}>About</Typography>
            </MenuItem>
            <MenuItem component={Link} to="/portfolio" color="inherit" underline="none">
              <Code />
              <Typography variant="h5" className={classes.menuText}>Portfolio</Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              color="inherit"
              href="https://github.com/dan-mba"
              target="_blank"
              rel="noreferrer noopener"
              onClick={handleClose}
            >
              <GitHub/>
              <Typography variant="h5" className={classes.menuText}>GitHub</Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              color="inherit"
              href="https://linkedin.com/danburkhardt"
              target="_blank"
              rel="noreferrer noopener"
              onClick={handleClose}
            >
              <LinkedIn />
              <Typography variant="h5" className={classes.menuText}>LinkedIn</Typography>
            </MenuItem>
          </Menu>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
