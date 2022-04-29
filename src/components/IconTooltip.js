import {Tooltip} from '@mui/material';
import {styled} from '@mui/material/styles'
import {IconButton} from "gatsby-theme-material-ui";

const Button = styled(IconButton)({
  padding: '0 12px 6px',
});

export default function IconTooltip({icon, title, url}) {
  return (
    <Tooltip title={title}>
      <Button
        aria-label={title}
        href={url}
        target="_blank"
        rel="noreferrer noopener"
      >
        {icon}
      </Button>
    </Tooltip>
  );
}
