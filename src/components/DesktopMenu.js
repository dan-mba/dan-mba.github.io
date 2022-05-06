import {useEffect, useRef, useState} from "react";
import {Typography, Popper, Grow, ClickAwayListener, Paper, Button, MenuList, MenuItem} from "@mui/material";
import {LinkedIn, GitHub} from "@mui/icons-material";
import {decomposeColor, recomposeColor, hexToRgb, rgbToHex, styled} from "@mui/material/styles";
import {IconButton, Link} from "gatsby-theme-material-ui";
import theme from "../gatsby-theme-material-ui-top-layout/theme";

const fullBlue = (color) => {
  const sec = decomposeColor(color[0] === '#' ? hexToRgb(color) : color);
  const blue = 255 - sec.values[2];
  for(let i = 0; i < sec.values.length; i++) {
    sec.values[i] += blue;
  }
  return rgbToHex(recomposeColor(sec));
}

const myBlue = fullBlue(theme.palette.secondary.main);

const LinkBar = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexGrow: 1
});

const StyledPaper = styled(Paper)({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText
});

const StyledButton = styled(Button)({
  textTransform: 'none',
  lineHeight: 1.334,
  fontSize: '1.5rem',
  fontWeight: 400,
  padding: '16px 12px 8px',
  '&:hover': {
    color: myBlue
  }
});

const HoverLink = styled(Link)({
  padding: '16px 12px 8px',
  '&:hover': {
    color: myBlue
  }
});

const HoverIcon = styled(IconButton)({
  '&:hover': {
    color: myBlue
  }
});

const MenuType = styled(Typography)({
  fontWeight: 400,
  '&:hover': {
    color: myBlue
  }
});

export default function DesktopMenu() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <LinkBar id="desktop-links">
      <HoverLink to="/" color="inherit" underline="none">
        <Typography variant="h5">About</Typography>
      </HoverLink>
      <StyledButton
        id="portfolio-button"
        color="inherit" size="large"
        aria-controls={open ? 'portfolio-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        aria-describedby="link-menu"
        placement="bottom-start"
        ref={anchorRef}
        onClick={handleToggle}
      >
        Portfolio
      </StyledButton>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal keepMounted>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-start' ? 'center top' : 'center bottom' }}
          >
            <StyledPaper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open} id="portfolio-menu"
                  aria-labelledby="portfolio-button" onKeyDown={handleListKeyDown}
                >
                  <MenuItem component={Link} to="/portfolio/" underline="none" onClick={handleClose}>
                    <MenuType variant="h6">Projects</MenuType>
                  </MenuItem>
                  <MenuItem component={Link} to="/topics/" underline="none" onClick={handleClose}>
                    <MenuType variant="h6">Topics</MenuType>
                  </MenuItem>
                  <MenuItem component={Link} to="/contributions/" underline="none" onClick={handleClose}>
                    <MenuType variant="h6">Contributions</MenuType>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </StyledPaper>
          </Grow>
        )}
      </Popper>
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
