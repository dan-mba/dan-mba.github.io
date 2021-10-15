import React from "react";
import {Typography, Popover, Paper, Button, MenuList, MenuItem} from "@mui/material";
import {LinkedIn, GitHub} from "@mui/icons-material";
import {decomposeColor, recomposeColor, hexToRgb, rgbToHex, styled} from "@mui/material/styles";
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

const LinkBar = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexGrow: 1
});

const MyPaper = styled(Paper)({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText
});

const MyButton = styled(Button)({
  textTransform: 'none',
  lineHeight: 1.334,
  fontSize: '1.5rem',
  fontWeight: 400,
  padding: '16px 12px 8px',
  '&:hover': {
    color: fullBlue(theme.palette.secondary.main)
  }
});

const HoverLink = styled(Link)({
  padding: '16px 12px 8px',
  '&:hover': {
    color: fullBlue(theme.palette.secondary.main)
  }
});

const HoverIcon = styled(IconButton)({
  '&:hover': {
    color: fullBlue(theme.palette.secondary.main)
  }
});

const MenuType = styled(Typography)({
  fontWeight: 400,
  '&:hover': {
    color: fullBlue(theme.palette.secondary.main)
  }
});



export default function DesktopMenu() {
  return (
    <LinkBar id="desktop-links">
      <HoverLink to="/" color="inherit" underline="none">
        <Typography variant="h5">About</Typography>
      </HoverLink>
      <PopupState variant="popover" popupId="portfolio-menu">
        {(popupState) => (
          <>
            <MyButton
              color="inherit" size="large"
              aria-haspopup="true"
              {...bindTrigger(popupState)}
            >
              Portfolio
            </MyButton>
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
              <MyPaper>
                <MenuList autoFocusItem={popupState.isOpen} id="menu-list-grow">
                  <MenuItem component={Link} to="/portfolio" underline="none">
                    <MenuType variant="h6">
                      Projects
                    </MenuType>
                  </MenuItem>
                  <MenuItem component={Link} to="/topics" underline="none">
                    <MenuType variant="h6">
                      Topics
                    </MenuType>
                  </MenuItem>
                  <MenuItem component={Link} to="/contributions" underline="none">
                    <MenuType variant="h6">
                      Contributions
                    </MenuType>
                  </MenuItem>
                </MenuList>
              </MyPaper>
            </Popover>
          </>
        )}
      </PopupState>
      <HoverIcon
        color="inherit"
        aria-label="GitHub"
        href="https://github.com/dan-mba"
        target="_blank"
        rel="noreferrer noopener"
        size="large">
        <GitHub fontSize="large"/>
      </HoverIcon>
      <HoverIcon
        color="inherit"
        aria-label="LinkedIn"
        href="https://linkedin.com/danburkhardt"
        target="_blank"
        rel="noreferrer noopener"
        size="large">
        <LinkedIn fontSize="large" />
      </HoverIcon>
    </LinkBar>
  );
}
