import {Badge, Card, CardContent, CardHeader, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Code, StarOutlineRounded} from "@mui/icons-material";
import {Link} from "gatsby-theme-material-ui";
import IconTooltip from "./IconTooltip";
import theme from "../gatsby-theme-material-ui-top-layout/theme";


const CardRoot = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
})

const Header = styled(CardHeader)({
  padding: '1rem .25rem .5rem',
  marginLeft: '12px',  
  '.MuiCardHeader-title': {
    marginBottom: '.75rem',
    fontWeight: '500'
  },
  '.MuiCardHeader-subheader': {
    minHeight: '4.5rem',
  },
  '.MuiCardHeader-action': {
    margin: 0,
    marginLeft: '16px'
  },
  '.MuiCardHeader-avatar': {
    alignSelf: 'start',
    marginRight: '28px'
  },
})

const Content = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: '0 16px'
});

const StarBadge = styled(Badge)({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '50%',
  '.MuiBadge-badge': {
    fontSize: '0.9rem',
    border: `1px solid ${theme.palette.secondary.main}`,
    top: 0,
    left: 0,
    right: 'unset',
    transform: 'translate(24px, -40%)',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.contrastText,
  }
});

const StarIcon = styled(StarOutlineRounded)({
  color: theme.palette.secondary.contrastText,
  fontSize: '48px',
});

const Spacer = styled('div')({
  marginBottom: '1.3rem'
})

export default function ContribCard({repo}) {
  

  return (
    <CardRoot>
      <Header
        title={repo.name}
        titleTypographyProps={{align: 'center', variant: 'h5'}}
        subheader={repo.descriptionEmoji}
        subheaderTypographyProps={{align: 'center', color: 'secondary', variant: 'body1'}}
        action={
          <IconTooltip title="code repository" url={repo.url} icon={<Code/>} />
        }
        avatar={
          <StarBadge badgeContent={repo.stargazerCount} max={9999}
            aria-label={`${repo.stargazerCount} stars`}
          >
            <StarIcon color="secondary"/>
          </StarBadge>
        }
      />
      <Content>
        {!repo.contributionPrs ? null : 
          <div>
            <Typography variant="h6" align="center">Pull Requests</Typography>
            {repo.contributionPrs.map((r,i) => (
              <Link key={i} underline="hover" href={r.url}
                target="_blank" rel="noreferrer noopener"
              >
                <Typography variant="body1">
                  {r.title}
                </Typography>
              </Link>
            ))}
          </div>
        }
        {repo.contributionPrs && repo.contributionIssues ?
          <Spacer/> : null
        }
        {!repo.contributionIssues ? null : 
          <div>
            <Typography variant="h6" align="center">Issues</Typography>
            {repo.contributionIssues.map((r,i) => (
              <Link key={i} underline="hover" href={r.url}
                target="_blank" rel="noreferrer noopener"
              >
                <Typography variant="body1">
                  {r.title}
                </Typography>
              </Link>
            ))}
          </div>
        }
      </Content>
    </CardRoot>
  );
}
