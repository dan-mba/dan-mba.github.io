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
    paddingInline: '4px',
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
    marginRight: '16px'
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

const Item = styled(Typography)({
  maxWidth: 'unset',
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
          <StarBadge
            badgeContent={repo.stargazerPrint}
            max={1000}
            aria-label={`${repo.stargazerCount} stars`}
          >
            <StarIcon color="secondary"/>
          </StarBadge>
        }
      />
      <Content>
        {repo.contributionPrs?.length > 0 ? 
          <div>
            <Typography variant="h6" align="center">Pull Requests</Typography>
            {repo.contributionPrs.map((r,i) => (
              <Link key={i} underline="hover" href={r.url}
                target="_blank" rel="noreferrer noopener"
                color="inherit"
              >
                <Item variant="body1">
                  {r.title}
                </Item>
              </Link>
            ))}
          </div> : null
        }
        {(repo.contributionPrs?.length > 0) && (repo.contributionIssues?.length > 0) ?
          <Spacer/> : null
        }
        {repo.contributionIssues?.length > 0 ? 
          <div>
            <Typography variant="h6" align="center">Issues</Typography>
            {repo.contributionIssues.map((r,i) => (
              <Link key={i} underline="hover" href={r.url}
                target="_blank" rel="noreferrer noopener"
                color="inherit"
              >
                <Typography variant="body1">
                  {r.title}
                </Typography>
              </Link>
            ))}
          </div> : null
        }
      </Content>
    </CardRoot>
  );
}
