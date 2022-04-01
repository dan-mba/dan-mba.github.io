import {Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Link, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Code, Link as LinkIcon} from "@mui/icons-material";
// use Link from reach router to avoid pre-fetching topics
import {Link as ReachLink} from "@gatsbyjs/reach-router";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import IconTooltip from "./IconTooltip";
import PreloadImage from "./PreloadImage";

const CardRoot = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const Header = styled(CardHeader)({
  padding: '1em 4px',
  height: '8em', 
});

const Content = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column'
});

const Description = styled(Typography)({
  margin: '.5em 0 1em',
  flexGrow: 1
});

const TopicArea = styled('div')({
  display: 'flex',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap' 
})

const TopicLink = styled(Link)({
  cursor: 'pointer'
});

const TopicChip = styled(Chip)({
  margin: '4px',
  cursor: 'pointer'
});

export default function RepoCard({repo, index}) {
  return (
    <CardRoot>
      <Header
        title={repo.name}
        titleTypographyProps={{align: 'center'}}
        subheader={repo.languages.map(l => `${l.name}: ${l.size}%`).join(', ')}
        subheaderTypographyProps={{align: 'center', color: 'secondary'}}
      />
      <CardMedia>
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
      </CardMedia>
      <Content>
        <Description variant="body1" align="center">
          {repo.description}
        </Description>
        <TopicArea>
          {repo.topics.map(topic => {
            return (
              <TopicLink to={`/topics/${topic}/`} component={ReachLink} key={topic}>
                <TopicChip color="secondary" variant="outlined" size="small" label={topic}/>
              </TopicLink>
            )
          })}
        </TopicArea>
      </Content>
      <CardActions>
        <IconTooltip top title="code repository" url={repo.url} icon={<Code/>}/>
        {!repo.homepageUrl ? null:
          <IconTooltip top title="demo site" url={repo.homepageUrl} icon={<LinkIcon/>}/>
        }
      </CardActions>
    </CardRoot>
  );
}
