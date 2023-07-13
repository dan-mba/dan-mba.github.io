import {useState} from "react";
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {styled} from '@mui/material/styles';
import {LinkedIn, GitHub, Home, Code, Menu as MenuIcon} from "@mui/icons-material";
import {IconButton, Link} from "gatsby-theme-material-ui";
import theme from "../gatsby-theme-material-ui-top-layout/theme";

const LinkBar = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexGrow: 1
});

const ButtonIcon = styled(IconButton)({
    flexDirection: 'column'
});

const MenuIconText = styled('div')({
  fontSize: '.9rem',
})

const MenuDrawer = styled(Drawer)({
  '.MuiPaper-root': {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'unset',
    color: theme.palette.primary.contrastText,
    minWidth: '14rem',
    overflow: 'hidden'
  }
});

const ListIcon = styled(ListItemIcon)({
  color: theme.palette.primary.contrastText
});

const SlimListItem = styled(ListItem)({
  paddingTop: 0,
  marginLeft: '56px'
});

const SlimListText = styled(ListItemText)({
  margin: 0,
  '.MuiListItemText-primary': {
    fontWeight: 400
  }
});

export default function MobileMenu() {
  const [drawer, setDrawer] = useState(false);
  const closeDrawer = () => setDrawer(false);
  const openDrawer = () => setDrawer(true);

  return <>
    <LinkBar>
      <ButtonIcon
        id="menu-button"
        color="inherit"
        aria-controls="menu-drawer"
        aria-haspopup="menu"
        disableRipple
        onClick={openDrawer}
        size="large">
        <MenuIcon />
        <MenuIconText>Menu</MenuIconText>
      </ButtonIcon>
    </LinkBar>
    <MenuDrawer
      id="menu-drawer"
      anchor="right"
      open={drawer}
      onClose={closeDrawer}
      ModalProps={{keepMounted: true}}
    >
      <List>
        <ListItem component={Link} to="/" color="inherit" underline="none">
          <ListIcon>
            <Home />
          </ListIcon>
          <ListItemText primary="About" primaryTypographyProps={{variant: "h5"}}/>
        </ListItem>
        <ListItem color="inherit" underline="none">
          <ListIcon>
            <Code />
          </ListIcon>
          <SlimListText primary="Portfolio" primaryTypographyProps={{variant: "h5"}}/>
        </ListItem>
        <SlimListItem component={Link} to="/portfolio/" color="inherit" underline="none">
          <SlimListText primary="Projects" primaryTypographyProps={{variant: "h6"}}/>
        </SlimListItem>
        <SlimListItem component={Link} to="/topics/" color="inherit" underline="none">
          <SlimListText primary="Topics" primaryTypographyProps={{variant: "h6"}}/>
        </SlimListItem>
        <SlimListItem component={Link} to="/contributions/" color="inherit" underline="none">
          <SlimListText primary="Contributions" primaryTypographyProps={{variant: "h6"}}/>
        </SlimListItem>
        <ListItem
          component={Link}
          color="inherit"
          underline="none"
          href="https://github.com/dan-mba"
          target="_blank"
          rel="noreferrer noopener"
          onClick={closeDrawer}
        >
          <ListIcon>
            <GitHub/>
          </ListIcon>
          <ListItemText primary="GitHub" primaryTypographyProps={{variant: "h5"}}/>
        </ListItem>
        <ListItem
          component={Link}
          color="inherit"
          underline="none"
          href="https://www.linkedin.com/in/danburkhardt/"
          target="_blank"
          rel="noreferrer noopener"
          onClick={closeDrawer}
        >
          <ListIcon>
            <LinkedIn />
          </ListIcon>
          <ListItemText primary="LinkedIn" primaryTypographyProps={{variant: "h5"}}/>
        </ListItem>
      </List>
    </MenuDrawer>
  </>;
}
