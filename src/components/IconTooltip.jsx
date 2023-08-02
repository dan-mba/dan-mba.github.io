import {Tooltip} from '@mui/material';
import {styled} from '@mui/material/styles'
import {IconButton} from "gatsby-theme-material-ui";

const Button = styled(IconButton)({
  padding: '0 12px',
});

export default function IconTooltip({icon, title, top, url}) {
  return (
    <Tooltip
      title={title}
      placement={top ? 'top' : 'bottom'}
      PopperProps={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -15],
            },
          },
        ],
      }}
    >
      <Button
        aria-label={title}
        href={url}
        disableRipple
        target="_blank"
        rel="noreferrer noopener"
      >
        {icon}
      </Button>
    </Tooltip>
  );
}
