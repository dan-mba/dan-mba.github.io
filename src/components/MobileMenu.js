import React, {useState} from "react";
import {Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {LinkedIn, GitHub, Home, Code, Menu as MenuIcon} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton, Link} from "gatsby-theme-material-ui";

const useStyles = makeStyles(theme => ({
  linkbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1
  },
  drawerRoot: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  iconColor: {
    color: theme.palette.primary.contrastText
  },
  iconRoot: {
    flexDirection: 'column'
  },
  menuIconText: {
    fontSize: '.9rem'
  },
  menuSlim: {
    paddingTop: 0
  },
  menuTextSlim: {
    margin: 0
  }
}))

export default function MobileMenu() {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);

  const closeDrawer = () => setDrawer(false);

  const openDrawer = () => setDrawer(true);

  return(
    <Hidden lgUp>
      <div className={classes.linkbar}>
        <IconButton
          color="inherit"
          aria-controls="menu-dropdown"
          aria-haspopup="menu"
          disableRipple
          classes={{label: classes.iconRoot}}
          onClick={openDrawer}
        >
          <MenuIcon />
          <div className={classes.menuIconText}>Menu</div>
        </IconButton>
      </div>
      <Drawer
        id="menu-drawer"
        anchor="right"
        open={drawer}
        onClose={closeDrawer}
        classes={{paper: classes.drawerRoot}}
      >
        <List>
          <ListItem component={Link} to="/" color="inherit" underline="none">
            <ListItemIcon classes={{root: classes.iconColor}}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="About" primaryTypographyProps={{variant: "h5"}}/>
          </ListItem>
          <ListItem color="inherit" underline="none">
            <ListItemIcon classes={{root: classes.iconColor}}>
              <Code />
            </ListItemIcon>
            <ListItemText primary="Portfolio" primaryTypographyProps={{variant: "h5"}}
              classes={{root: classes.menuTextSlim}}
              />
          </ListItem>
          <ListItem component={Link} to="/portfolio" color="inherit" underline="none"
            classes={{root: classes.menuSlim}}
            >
            <ListItemText primary="Projects" primaryTypographyProps={{variant: "h6", align: "right"}}
              classes={{root: classes.menuTextSlim}}
              />
          </ListItem>
          <ListItem component={Link} to="/topics" color="inherit" underline="none"
            classes={{root: classes.menuSlim}}
          >
            <ListItemText primary="Topics" primaryTypographyProps={{variant: "h6", align: "right"}}
              classes={{root: classes.menuTextSlim}}
            />
          </ListItem>
          <ListItem
            component={Link}
            color="inherit"
            underline="none"
            href="https://github.com/dan-mba"
            target="_blank"
            rel="noreferrer noopener"
            onClick={closeDrawer}
          >
            <ListItemIcon classes={{root: classes.iconColor}}>
              <GitHub/>
            </ListItemIcon>
            <ListItemText primary="GitHub" primaryTypographyProps={{variant: "h5"}}/>
          </ListItem>
          <ListItem
            component={Link}
            color="inherit"
            underline="none"
            href="https://linkedin.com/danburkhardt"
            target="_blank"
            rel="noreferrer noopener"
            onClick={closeDrawer}
          >
            <ListItemIcon classes={{root: classes.iconColor}}>
              <LinkedIn />
            </ListItemIcon>
            <ListItemText primary="LinkedIn" primaryTypographyProps={{variant: "h5"}}/>
          </ListItem>
        </List>
      </Drawer>
    </Hidden>
  );
}
