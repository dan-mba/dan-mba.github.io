import {useState} from "react";
import {Drawer, Link, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {LinkedIn, GitHub, Home, Code, Menu as MenuIcon} from "@mui/icons-material";
import {IconButton} from "gatsby-theme-material-ui";
//use Link from reach-router to avoid pre-fetching on mobile
import {Link as ReachLink} from "@gatsbyjs/reach-router";
import {linkBar, buttonIcon, menuIconText, menuDrawer, listIcon, slimListItem, slimListText} from "./MobileMenu.module.css";

const Lnk = ({children, ...props}) => (
  <Link component={ReachLink} {...props}>
    {children}
  </Link>
)

const ListIcon = ({children}) => (
  <ListItemIcon className={listIcon} >
    {children}
  </ListItemIcon>
);


const SlimListItem = ({children, ...props}) => (
  <ListItem className={slimListItem} component={Lnk} color="inherit" underline="none" {...props}>
    {children}
  </ListItem>
);

const SlimListText = (props) => (
  <ListItemText className={slimListText} primaryTypographyProps={{variant: "h6"}} {...props}/>
);

export default function MobileMenu() {
  const [drawer, setDrawer] = useState(false);
  const closeDrawer = () => setDrawer(false);
  const openDrawer = () => setDrawer(true);

  return <>
    <div className={linkBar}>
      <IconButton
        id="menu-button"
        color="inherit"
        aria-controls="menu-drawer"
        aria-haspopup="menu"
        disableRipple
        onClick={openDrawer}
        size="large"
        className={buttonIcon}
      >
        <MenuIcon />
        <div className={menuIconText}>Menu</div>
      </IconButton>
    </div>
    <Drawer
      id="menu-drawer"
      anchor="right"
      className={menuDrawer}
      open={drawer}
      onClose={closeDrawer}
      ModalProps={{keepMounted: true}}
    >
      <List>
        <ListItem component={Lnk} to="/" color="inherit" underline="none">
          <ListIcon>
            <Home />
          </ListIcon>
          <ListItemText primary="About" primaryTypographyProps={{variant: "h5"}}/>
        </ListItem>
        <ListItem color="inherit" underline="none">
          <ListIcon>
            <Code />
          </ListIcon>
          <SlimListText primary="Portfolio"/>
        </ListItem>
        <SlimListItem to="/portfolio/">
          <SlimListText primary="Projects"/>
        </SlimListItem>
        <SlimListItem to="/topics/">
          <SlimListText primary="Topics"/>
        </SlimListItem>
        <SlimListItem to="/contributions/">
          <SlimListText primary="Contributions"/>
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
          href="https://linkedin.com/danburkhardt"
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
    </Drawer>
  </>;
}
