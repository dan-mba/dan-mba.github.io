import {Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Code, Link as LinkIcon} from "@mui/icons-material";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import IconTooltip from "./IconTooltip";
import TechChip from "./TechChip";

const CardRoot = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const Header = styled(CardHeader)({
  padding: '1rem 4px',
  height: '7rem', 
  '.MuiCardHeader-subheader': {
    margin: '0 auto'
  }
});

const Content = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column'
});

const Description = styled(Typography)({
  margin: '.5rem auto 1rem',
  flexGrow: 1
});

const TechArea = styled('div')({
  display: 'flex',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap' 
})

const Actions = styled(CardActions)({
  justifyContent: "space-between"
})

export default function RepoCard({repo, index}) {
  return (
    <CardRoot>
      <Header
        title={repo.name}
        titleTypographyProps={{align: 'center'}}
        subheader={repo.languages.map(l => `${l.name}: ${l.size}%`).join(', ')}
        subheaderTypographyProps={{align: 'center', color: 'secondary'}}
      />
      <GatsbyImage
        image={getImage(repo.localImage)}
        alt={`${repo.name} image`}
        objectFit="contain"
        loading={
          /* Only use eager loading on first card for mobile performance */
          index===0 ? "eager" : "lazy"
        }
      />
      <Content>
        <Description variant="body1" align="center">
          {repo.description}
        </Description>
        <TechArea>
          {repo.topics.map(topic => {
            return (
              <TechChip size="small" name={topic} key={topic} />
            )
          })}
        </TechArea>
      </Content>
      <Actions>
        <IconTooltip top title="code repository" url={repo.url} icon={<Code/>}/>
        {!repo.homepageUrl ? null:
          <IconTooltip top title="demo site" url={repo.homepageUrl} icon={<LinkIcon/>}/>
        }
      </Actions>
    </CardRoot>
  );
}
