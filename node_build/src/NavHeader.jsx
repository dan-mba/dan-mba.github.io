/*
 * NavHeader.jsx
 *
 * The NavHeader component is displayed at the top of the page
 * on all routes
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Link,
  Menu, MenuItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import CodeIcon from '@material-ui/icons/Code';
import MessageIcon from '@material-ui/icons/Message';
import { menuOpen, menuClose, menuSelect } from './redux/actions/nav';

import liLogo from './img/In-2CRev-34px-Rn.png';

const styles = {
  appBar: {
    width: '100%',
    top: 0,
  },
  toolbar: {
    maxWidth: '900px',
    margin: '0 auto',
    width: '99%',
    justifyContent: 'space-between',
  },
  linkedin: {
    flex: 'none',
  },
  name: {
    fontSize: '2.25rem',
  },
  buttonRoot: {
    flexDirection: 'column',
  },
  iconButton: {
    padding: '4px',
  },
  menuText: {
    fontSize: '.9rem',
  },
};

const menuItems = ['/', '/experience', '/education', '/code', '/contact'];

export class NavHeader extends React.Component {
  constructor(props) {
    super(props);

    props.dispatch(menuSelect(menuItems.indexOf(props.location.pathname) + 1));
  }

  render() {
    const { classes, dispatch, anchorEl, selectedIndex } = this.props;

    return (
      <AppBar
        position="fixed"
        className={classes.appBar}
        id="nav-header"
      >

        <Toolbar
          className={classes.toolbar}
          disableGutters
        >
          <IconButton
            color="inherit"
            aria-label="Menu"
            disableRipple
            className={classes.iconButton}
            classes={{ label: classes.buttonRoot }}
            onClick={(event) => dispatch(menuOpen(event.currentTarget))}
          >
            <MenuIcon />
            <div className={classes.menuText}>Menu</div>
          </IconButton>
          <Typography variant="h4" align="right" color="inherit" className={classes.name}>
            Daniel Burkhardt
          </Typography>
          <Link
            href="https://www.linkedin.com/in/danburkhardt"
            className={classes.linkedin}
            underline="none"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={liLogo} alt="LinkedIn" />
          </Link>
        </Toolbar>

        <Menu
          id="menu-dropdown"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => dispatch(menuClose())}
        >
          <MenuItem
            onClick={() => dispatch(menuSelect(1))}
            component={React.forwardRef((props, ref) => <RouterLink to="/" {...props} ref={ref} />)}
            selected={selectedIndex === 1}
          >
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </MenuItem>
          <MenuItem
            onClick={() => dispatch(menuSelect(2))}
            component={React.forwardRef((props, ref) => <RouterLink to="/experience" {...props} ref={ref} />)}
            selected={selectedIndex === 2}
          >
            <ListItemIcon>
              <WorkIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Experience" />
          </MenuItem>
          <MenuItem
            onClick={() => dispatch(menuSelect(3))}
            component={React.forwardRef((props, ref) => <RouterLink to="/education" {...props} ref={ref} />)}
            selected={selectedIndex === 3}
          >
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Education" />
          </MenuItem>
          <MenuItem
            onClick={() => dispatch(menuSelect(4))}
            component={React.forwardRef((props, ref) => <RouterLink to="/code" {...props} ref={ref} />)}
            selected={selectedIndex === 4}
          >
            <ListItemIcon>
              <CodeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Code Samples" />
          </MenuItem>
          <MenuItem
            onClick={() => dispatch(menuSelect(5))}
            component={React.forwardRef((props, ref) => <RouterLink to="/contact" {...props} ref={ref} />)}
            selected={selectedIndex === 5}
          >
            <ListItemIcon>
              <MessageIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </MenuItem>
        </Menu>
      </AppBar>
    );
  }
}

NavHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  anchorEl: PropTypes.object,
  selectedIndex: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect((state) => state.nav)(withRouter(withStyles(styles)(NavHeader)));
