import {Typography, Popover, Paper, Button, MenuList, MenuItem} from "@mui/material";
import {LinkedIn, GitHub} from "@mui/icons-material";
import {IconButton, Link} from "gatsby-theme-material-ui";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {linkBar, paper, button, link, icon, menuType} from "./DesktopMenu.module.css";

const MenuType = ({children}) => (
  <Typography variant="h6" className={menuType}>
    {children}
  </Typography>
);

export default function DesktopMenu() {
  return (
    <div id="desktop-links" className={linkBar}>
      <Link to="/" color="inherit" underline="none" className={link}>
        <Typography variant="h5">About</Typography>
      </Link>
      <PopupState variant="popover" popupId="portfolio-menu">
        {(popupState) => (
          <>
            <Button className={button}
              color="inherit" size="large"
              aria-haspopup="true"
              {...bindTrigger(popupState)}
            >
              Portfolio
            </Button>
            <Popover keepMounted
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
              <Paper className={paper}>
                <MenuList autoFocusItem={popupState.isOpen} id="menu-list-grow">
                  <MenuItem component={Link} to="/portfolio/" underline="none">
                    <MenuType>
                      Projects
                    </MenuType>
                  </MenuItem>
                  <MenuItem component={Link} to="/topics/" underline="none">
                    <MenuType>
                      Topics
                    </MenuType>
                  </MenuItem>
                  <MenuItem component={Link} to="/contributions/" underline="none">
                    <MenuType>
                      Contributions
                    </MenuType>
                  </MenuItem>
                </MenuList>
              </Paper>
            </Popover>
          </>
        )}
      </PopupState>
      <IconButton className={icon}
        color="inherit"
        aria-label="GitHub"
        href="https://github.com/dan-mba"
        target="_blank"
        rel="noreferrer noopener"
        size="large">
        <GitHub fontSize="large"/>
      </IconButton>
      <IconButton className={icon}
        color="inherit"
        aria-label="LinkedIn"
        href="https://linkedin.com/danburkhardt"
        target="_blank"
        rel="noreferrer noopener"
        size="large">
        <LinkedIn fontSize="large" />
      </IconButton>
    </div>
  );
}
