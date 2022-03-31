import {useState} from 'react';
import {Popover, Typography} from '@mui/material';
import {IconButton} from "gatsby-theme-material-ui";
import {text, popover} from "./IconTooltip.module.css";

export default function IconTooltip({style, icon, title, top, url}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return <>
    <IconButton
      aria-label={title}
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      style={style ? style : {}}
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      size="large">
      {icon}
    </IconButton>
    <Popover
      id="mouse-over-popover"
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: top ? 'top' : 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: top ? 'bottom' : 'top',
        horizontal: 'center',
      }}
      onClose={handlePopoverClose}
      classes={{root: popover}}
      disableRestoreFocus
    >
      <Typography classes={{root: text}}>{title}</Typography>
    </Popover>
  </>;
}
