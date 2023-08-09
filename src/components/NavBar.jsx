import {AppBar, Toolbar, Typography, useMediaQuery} from "@mui/material";
import {styled} from '@mui/material/styles';
import {Link} from "gatsby-theme-material-ui";
import theme from "../gatsby-theme-material-ui-top-layout/theme";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const StyledToolbar = styled(Toolbar)({
  maxWidth: theme.breakpoints.values.xl,
  margin: '0 auto',
  width: '100%',
  padding: '0 1%'
});

const Handwriting = styled(Typography)({
  fontFamily: '"Damion", cursive',
  paddingLeft: '12px',
  minWidth: '100px',
});

export default function NavBar() {
  return(
    <AppBar position="sticky" id="nav-bar">
      <StyledToolbar disableGutters>
        <Link to="/"  color="inherit" underline="none">
          <Handwriting variant="h3">
            Dan
          </Handwriting>
        </Link>
        {useMediaQuery(theme.breakpoints.up('lg')) ?
          <DesktopMenu/> :
          <MobileMenu/>
        }
      </StyledToolbar>
    </AppBar>
  );
};
