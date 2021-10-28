import React from "react";
import {AppBar, Toolbar, Typography, useMediaQuery} from "@mui/material";
import {styled} from '@mui/material/styles';
import loadable from "@loadable/component";
import theme from "../gatsby-theme-material-ui-top-layout/theme";
import MobileMenu from "./MobileMenu";

const DesktopMenu = loadable(()=> import("./DesktopMenu"));

const StyledToolbar = styled(Toolbar)({
  maxWidth: theme.breakpoints.values.xl,
  margin: '0 auto',
  width: '100%',
  padding: '0 1%'
});

const Handwriting = styled(Typography)({
  fontFamily: '"Damion", cursive',
  paddingLeft: '12px'
});

export default function NavBar() {
  return(
    <AppBar position="sticky" id="nav-bar">
      <StyledToolbar disableGutters>
        <Handwriting variant="h3">
          Dan
        </Handwriting>
        {useMediaQuery(theme.breakpoints.up('md')) ? <DesktopMenu/> : <MobileMenu/>}
      </StyledToolbar>
    </AppBar>
  );
};
