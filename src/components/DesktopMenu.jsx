import {LinkedIn, GitHub} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {useLocation} from "@reach/router";
import {IconButton, Link} from "gatsby-theme-material-ui";
import theme from "../gatsby-theme-material-ui-top-layout/theme";

const myBlue = theme.util.lightBlue

const LinkBar = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexGrow: 1
});

const NavbarDiv = styled('div')({
    margin: '0px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: 1.334,
    letterSpacing: '0.02857em',
});

const HoverLink = styled(Link)({
  margin: '16px 10px 8px',
  textUnderlineOffset: '6px',
  textDecorationThickness: '2px',
  '&:hover': {
    color: myBlue
  }
});

const HoverIcon = styled(IconButton)({
  padding: '0',
  margin: '12px 4px',
  '&:hover': {
    color: myBlue
  }
});

export default function DesktopMenu() {
  const location = useLocation();
  function underline (path) {
    if (location.pathname === path) {
      return "always";
    }
    return "none";
  }
  return (
    <LinkBar id="desktop-links">
      <HoverLink to="/" color="inherit" underline={underline('/')}>
        <NavbarDiv>About</NavbarDiv>
      </HoverLink>
      <HoverLink to="/portfolio/" color="inherit" underline={underline('/portfolio/')}>
        <NavbarDiv>Projects</NavbarDiv>
      </HoverLink>
      <HoverLink to="/technologies/" color="inherit" underline={underline('/technologies/')}>
        <NavbarDiv>Technologies</NavbarDiv>
      </HoverLink>
      <HoverLink to="/contributions/" color="inherit" underline={underline('/contributions/')}>
        <NavbarDiv>Contributions</NavbarDiv>
      </HoverLink>
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
        href="https://www.linkedin.com/in/danburkhardt/"
        target="_blank"
        rel="noreferrer noopener"
        size="large">
        <LinkedIn fontSize="large" />
      </HoverIcon>
    </LinkBar>
  );
}
