import {Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Link, Typography} from "@mui/material";
import {Code, Link as LinkIcon} from "@mui/icons-material";
// use Link from reach router to avoid pre-fetching topics
import {Link as ReachLink} from "@gatsbyjs/reach-router";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import IconTooltip from "./IconTooltip";
import PreloadImage from "./PreloadImage";
import {root, content, topicArea, topicLink, topicChip} from "./RepoCard.module.css";

export default function RepoCard({repo, index}) {
  return (
    <Card className={root}>
      <CardHeader
        title={repo.name}
        titleTypographyProps={{align: 'center'}}
        subheader={repo.languages.map(l => `${l.name}: ${l.size}%`).join(', ')}
        subheaderTypographyProps={{align: 'center', color: 'secondary'}}
        style={{
          padding: '0.5em  4px',
          height: '7rem',
        }}
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
      <CardContent className={content}>
        <Typography variant="body1" align="center"
          style={{
            margin: '0.5em 0 1em',
            flexGrow: 1,
          }}
        >
          {repo.description}
        </Typography>
        <div className={topicArea}>
          {repo.topics.map(topic => {
            return (
              <Link to={`/topics/${topic}`} component={ReachLink} key={topic} className={topicLink}>
                <Chip color="secondary" variant="outlined" size="small" label={topic} className={topicChip}/>
              </Link>
            )
          })}
        </div>
      </CardContent>
      <CardActions>
        <IconTooltip top title="code repository" url={repo.url} icon={<Code/>}/>
        {!repo.homepageUrl ? null:
          <IconTooltip top title="demo site" url={repo.homepageUrl} icon={<LinkIcon/>}/>
        }
      </CardActions>
    </Card>
  );
}
