import {Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import {Code, Link as LinkIcon} from "@mui/icons-material";
import IconTooltip from "./IconTooltip";
import {card, header, content, description} from "./TopicCard.module.css";

const buttonStyle = {
  padding: '0 12px 6px'
};

export default function RepoCard({repo}) {
  return (
    <Card className={card}>
      <CardHeader className={header}
        title={repo.name}
        titleTypographyProps={{align: 'center'}}
        subheader={repo.languages.map(l => `${l.name}: ${l.size}%`).join(', ')}
        subheaderTypographyProps={{align: 'center', color: 'secondary'}}
      />
      <CardContent className={content}>
        <Typography variant="body1" align="center" className={description}>
          {repo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconTooltip title="code repository" style={buttonStyle}
          url={repo.url} icon={<Code/>}
        />
        {!repo.homepageUrl ? null:
          <IconTooltip title="demo site" style={buttonStyle}
            url={repo.homepageUrl} icon={<LinkIcon/>}
          />
        }
      </CardActions>
    </Card>
  );
}
