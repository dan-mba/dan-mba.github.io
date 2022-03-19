import {useState} from 'react';
import {Popover, Typography} from '@mui/material';
import {styled} from '@mui/material/styles'
import {IconButton} from "gatsby-theme-material-ui";

const Text = styled(Typography)({
  color: '#fff',
  padding: '4px 8px',
  fontSize: '0.75rem',
  maxWidth: '300px',
  wordWrap: 'break-word',
  fontWeight: 400,
  lineHeight: '1.4em',
  borderRadius: '4px;',
  backgroundColor: 'rgba(97, 97, 97, 0.9)',
});

const MenuPopover = styled(Popover)({
  pointerEvents: 'none',
  '.MuiPopover-paper': {
    backgroundColor: 'transparent',
    margin: '.5rem 0'
  },
});

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
    <MenuPopover
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
      disableRestoreFocus
    >
      <Text>{title}</Text>
    </MenuPopover>
  </>;
}
