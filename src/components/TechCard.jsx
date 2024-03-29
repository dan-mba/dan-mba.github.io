import {Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Code, Link as LinkIcon} from "@mui/icons-material";
import IconTooltip from "./IconTooltip";

const CardRoot = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const Header = styled(CardHeader)({
  padding: '1rem .25rem .5rem',
  '.MuiCardHeader-subheader': {
    minHeight: '3rem',
  },
});

const Content = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: '0 16px'
});

const Description = styled(Typography)({
  margin: 0,
  flexGrow: 1
});

export default function TechCard({repo}) {
  return (
    <CardRoot>
      <Header
        title={repo.name}
        titleTypographyProps={{align: 'center'}}
        subheader={repo.languages.map(l => `${l.name}: ${l.size}%`).join(', ')}
        subheaderTypographyProps={{align: 'center', color: 'secondary'}}
      />
      <Content>
        <Description variant="body1" align="center">
          {repo.description}
        </Description>
      </Content>
      <CardActions>
        <IconTooltip title="code repository" url={repo.url} icon={<Code/>} />
        {!repo.homepageUrl ? null:
          <IconTooltip title="demo site" url={repo.homepageUrl} icon={<LinkIcon/>} />
        }
      </CardActions>
    </CardRoot>
  );
}
