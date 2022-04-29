import {Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Code, Link as LinkIcon} from "@mui/icons-material";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import IconTooltip from "./IconTooltip";
import PreloadImage from "./PreloadImage";
import TopicChip from "./TopicChip";

const CardRoot = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const Header = styled(CardHeader)({
  padding: '1rem 4px',
  height: '7rem', 
});

const Content = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column'
});

const Description = styled(Typography)({
  margin: '.5rem 0 1rem',
  flexGrow: 1
});

const TopicArea = styled('div')({
  display: 'flex',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap' 
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
      {index === 0 ? <PreloadImage image={getImage(repo.localImage)} /> : null}
      <Content>
        <Description variant="body1" align="center">
          {repo.description}
        </Description>
        <TopicArea>
          {repo.topics.map(topic => {
            return (
              <TopicChip size="small" name={topic} key={topic} />
            )
          })}
        </TopicArea>
      </Content>
      <CardActions>
        <IconTooltip top title="code repository" url={repo.url} icon={<Code/>} />
        {!repo.homepageUrl ? null:
          <IconTooltip top title="demo site" url={repo.homepageUrl} icon={<LinkIcon/>} />
        }
      </CardActions>
    </CardRoot>
  );
}
