import {AppBar, Toolbar, Typography, useMediaQuery} from "@mui/material";
import loadable from "@loadable/component";
import theme from "../gatsby-theme-material-ui-top-layout/theme";
import MobileMenu from "./MobileMenu";
import {toolbar, handwriting} from "./NavBar.module.css";

const DesktopMenu = loadable(()=> import("./DesktopMenu"));

export default function NavBar() {
  return(
    <AppBar position="sticky" id="nav-bar">
      <Toolbar disableGutters className={toolbar}>
        <Typography variant="h3" className={handwriting} style={{minWidth: '100px'}}>
          Dan
        </Typography>
        {useMediaQuery(theme.breakpoints.up('md')) ? <DesktopMenu/> : <MobileMenu/>}
      </Toolbar>
    </AppBar>
  );
};
